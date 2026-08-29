# Skill — `/tasklist-factcheck`

**File:** `03_tasklist_skills/05_tasklist_factcheck.md`
**Invoked by:** `/refactor-tasklist` (Step 5).
**Purpose:** Run three independent validators IN PARALLEL against the post-refactor state. Each validator focuses on one phase of the refactor (sweep, reorder, renumber) and reports PASS/FAIL with specifics.

**Read first:** `03_tasklist_skills/00_tasklist_agent.md`.

---

## When to run

- Called by `/refactor-tasklist` Step 5.
- User wants to verify a refactor that's already happened (e.g., a manual edit they're worried about): "/tasklist-factcheck" standalone.

---

## Inputs

Passed by `/refactor-tasklist`:

- `original_snapshot` — the master tasklist's full text BEFORE any refactor.
- `new_sweep_file_path` — the sweep file created during this refactor.
- `final_master_state` — the master tasklist after sweep + reorder + renumber.
- `migration_map` — from `/reorder-tasks` and `/renumber-tasks`.

If invoked standalone, the user provides paths and the skill reads the files. (Standalone runs cannot validate "reorder honored user directive" because they have no record of the directive — they validate sweep and renumber only.)

---

## Dispatch: three validators in parallel

The skill spawns three independent sub-agents, in parallel. They do not share state.

---

## Validator 1 — Sweep validator

**Sub-agent reads:** `original_snapshot` + `new_sweep_file_path` + `final_master_state`.

Checks:

| Check | Pass condition |
|-------|----------------|
| 1.1 — All completed tasks captured | Every task in `original_snapshot` with status `✅` appears in the new sweep file. |
| 1.2 — Detail blocks verbatim | For each swept task: the detail block in the sweep file is character-identical to the detail block in `original_snapshot`. (Line-by-line comparison; whitespace included.) |
| 1.3 — No active tasks swept | No task in the sweep file has status `🟡`, `🔴`, or `🟠` in `original_snapshot`. |
| 1.4 — Swept tasks gone from master | None of the swept tasks (by old number) appear in `final_master_state`. |
| 1.5 — Open sub-items promoted | Every open sub-item (`[ ]` / TODO) found in swept tasks has a corresponding new task in `final_master_state` with the provenance line. |
| 1.6 — No duplicates | No task appears in BOTH the sweep file and `final_master_state`. |

Return: each check as PASS or FAIL with the offending content quoted.

---

## Validator 2 — Reorder validator

**Sub-agent reads:** `original_snapshot` + `final_master_state` + `migration_map`.

Checks:

| Check | Pass condition |
|-------|----------------|
| 2.1 — Same task count | `final_master_state` has the same number of (non-swept) tasks as `original_snapshot` had (excluding the swept set), plus any promoted tasks. |
| 2.2 — Group ordering | In `final_master_state`, all `🟡` tasks come before all `🔴` tasks, which come before all `🟠` tasks. |
| 2.3 — User directive honored | If the directive was `keep`: within each group, the relative order of tasks matches `original_snapshot` (modulo swept tasks). If `describe`: the user's stated priorities are visible in the new order (e.g., the named "first" task IS in position 1 of its group). If `guess`: any tasks with explicit blockers come AFTER the tasks they're blocked on (where possible). |
| 2.4 — No lost tasks | Every old task number in `migration_map` resolves to a row in `final_master_state`. |
| 2.5 — No injected tasks | Every row in `final_master_state` either has an old number in `migration_map` or is a promoted task (with the provenance line). |

Return: each check as PASS or FAIL with specifics.

---

## Validator 3 — Renumber validator

**Sub-agent reads:** `final_master_state` ONLY (this validator is purely structural).

Checks:

| Check | Pass condition |
|-------|----------------|
| 3.1 — Summary numbers sequential | Summary table `#` column reads `1, 2, 3, ..., N` with no gaps and no duplicates. |
| 3.2 — Detail headings sequential | Detail block `## Task N` numbers read `1, 2, 3, ..., N` with no gaps and no duplicates. |
| 3.3 — Summary ↔ detail 1:1 match | For every row `i`, `summary_table[i].number == detail_blocks[i].number`. |
| 3.4 — Same length | Summary table length == detail block count. |
| 3.5 — No orphan detail blocks | Every detail block has a matching summary row. |
| 3.6 — No orphan summary rows | Every summary row has a matching detail block. |
| 3.7 — Cross-references resolve | Every `**Blocked on:** Task N` reference points to a task that exists in the current numbering. |

Return: each check as PASS or FAIL.

---

## Coordinator step — Aggregate

After all three validators return, build the aggregated result:

```json
{
  "sweep":    { "result": "PASS" | "FAIL", "findings": [...] },
  "reorder":  { "result": "PASS" | "FAIL", "findings": [...] },
  "renumber": { "result": "PASS" | "FAIL", "findings": [...] }
}
```

The aggregated `"result"` of each validator is FAIL if any of its checks failed; PASS otherwise.

Return this to `/refactor-tasklist`. The coordinator handles the receipt + Diagnostics formatting.

---

## Hard rules

- **Three INDEPENDENT validators.** They must not share state or work in serial. Run them in parallel sub-agents.
- **No fixing during validation.** Validators REPORT. They never write to the master tasklist or sweep file.
- **Quote, don't paraphrase.** If a check fails, the validator's finding must quote the offending content from the file.
- **Validator 3 is structural-only.** It doesn't need any history — just the final master state. This is why it can run standalone (when invoked by a user worried about a manual edit).
- **Sweep files are read-only inputs.** This skill never writes to a sweep file under any circumstance.
