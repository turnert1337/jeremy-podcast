# Skill — `/refactor-tasklist`

**File:** `03_tasklist_skills/01_refactor_tasklist.md`
**Invoked by:** the user, when they say "sweep / refactor the tasklist," or detect that the master tasklist has accumulated completed tasks or grown unwieldy.
**Purpose:** Coordinate four sub-skills (`/sweep-tasks` → `/reorder-tasks` → `/renumber-tasks` → `/tasklist-factcheck`) in strict order, then print a single result block.

**Read first:** `03_tasklist_skills/00_tasklist_agent.md` — the rules of engagement.

---

## When to run

- User says "sweep the tasklist" / "refactor the tasklist" / "/refactor-tasklist."
- Frame Capacity Meter flagged the master tasklist as the heaviest contributor (suggested by `/frame-capacity`).
- The number of `✅` completed tasks in the master is ≥ 3 (rough heuristic).

---

## Step 0 — Snapshot

Before doing ANYTHING, read and snapshot:

- `04_production_master_tasklist/00_Master_Tasklist.md` (the current state)
- A count of tasks by status: `🟡 in-progress: N`, `🔴 not-started: M`, `🟠 waiting: P`, `✅ complete: Q`

Print a one-line preflight:

```
Preflight: 12 tasks total — 3 in-progress, 6 not-started, 1 waiting, 2 complete.
```

If there are zero `✅` tasks AND the user didn't specifically ask for a reorder: ask "Nothing to sweep — do you want to reorder/renumber anyway, or skip refactor?" Loop on response.

---

## Step 1 — Confirm scope with the user (single batched ask)

Ask once, capture both answers:

```
Two quick questions before I refactor:

  A. Sweep — Found N completed tasks: [comma-separated titles].
     Proceed with sweep?  [Y] / [N]

  B. Reorder — How should I order the remaining tasks?
     [keep] preserve current relative order, just renumber
     [describe] tell me what should move up/down
     [guess]  use project context to order by likelihood of next work
```

If user says `[N]` to A AND `[keep]` to B, this is just a renumber. Skip to Step 4.

If user says `[describe]`, prompt for the priority directive in free form.

---

## Step 2 — SWEEP phase

Invoke `/sweep-tasks` (`03_tasklist_skills/02_sweep_tasks.md`).

Pass: the snapshot from Step 0, the list of completed tasks to sweep.

Wait for return. The sub-skill returns:

- The new sweep file path (`_swept/NN_Complete_Sweep_YYYY-MM-DD.md`).
- The number of tasks swept.
- The number of open sub-items promoted to new master tasks.
- The new master tasklist state (completed tasks removed; promoted tasks added; **not** yet reordered, **not** yet renumbered).

If `/sweep-tasks` returns an error, halt. Surface the error verbatim.

---

## Step 3 — REORDER phase

Invoke `/reorder-tasks` (`03_tasklist_skills/03_reorder_tasks.md`).

Pass: the user's reorder directive from Step 1B + the post-sweep master tasklist.

Wait for return. The sub-skill returns:

- The reordered master tasklist (with **old numbers still in place** — reorder physically moves the rows, does NOT renumber yet).
- A migration map of old → new positions (for the renumber pass).

---

## Step 4 — RENUMBER phase (the dedicated pass)

Invoke `/renumber-tasks` (`03_tasklist_skills/04_renumber_tasks.md`).

Pass: the reordered master from Step 3.

Wait for return. The sub-skill returns:

- The fully renumbered master tasklist (summary table 1, 2, 3, ...; detail headings match).
- A mapping table of old number → new number, for cross-reference updates.
- A list of cross-references updated.

---

## Step 5 — FACT-CHECK phase

Invoke `/tasklist-factcheck` (`03_tasklist_skills/05_tasklist_factcheck.md`).

Pass: the original snapshot from Step 0, the new sweep file from Step 2, and the final master tasklist from Step 4.

The validator wave dispatches THREE independent agents IN PARALLEL:

1. **Sweep validator** — every completed task ended up in the sweep file; detail blocks are character-identical.
2. **Reorder validator** — group ordering (🟡 → 🔴 → 🟠) respected; user's priority directive honored.
3. **Renumber validator** — summary numbers and detail-heading numbers match 1:1; sequential, no gaps; detail content character-identical except for heading numbers.

Wait for all three. Collect PASS/FAIL.

---

## Step 6 — Print the result

If ALL THREE validators PASS:

```
─────────────────────────────────────────────────────────────
TASKLIST REFACTOR — Sweep #NN
─────────────────────────────────────────────────────────────
Swept ............. [count] tasks → _swept/NN_Complete_Sweep_YYYY-MM-DD.md
Promoted .......... [count] open sub-items as new master tasks
Reordered ......... [count] remaining tasks
Renumbered ........ 1 .. [count]
Cross-refs ........ [count] updated
─────────────────────────────────────────────────────────────
🟢 sweep verified
🟢 reorder verified
🟢 renumber verified
🟢 tasklist refactor complete
─────────────────────────────────────────────────────────────
```

If ANY validator FAILed:

```
─────────────────────────────────────────────────────────────
TASKLIST REFACTOR — Sweep #NN — INCOMPLETE
─────────────────────────────────────────────────────────────
[same body as above, but with 🔴 on failed lines]
─────────────────────────────────────────────────────────────

DIAGNOSTICS — issues caught during fact-check
─────────────────────────────────────────────────────────────
[Sweep validator]   PASS|FAIL
  └─ [specific finding]
[Reorder validator] PASS|FAIL
  └─ [specific finding]
[Renumber validator] PASS|FAIL
  └─ [specific finding]
─────────────────────────────────────────────────────────────

Action: review diagnostics, then either accept the partial
refactor or revert. To revert: copy the snapshot from
Step 0 back into 04_production_master_tasklist/00_Master_Tasklist.md.
(The pre-refactor snapshot is preserved in this session's
context.)
```

---

## Step 7 — Update the master tasklist metadata

After a successful refactor, update the top of `00_Master_Tasklist.md`:

```markdown
*Started: YYYY-MM-DD · Last refactored: 2026-05-23*

**Active clusters:** [updated]
**Handoff sequence:** [updated]
**Archived:** _swept/01_Complete_Sweep_*.md, _swept/02_Complete_Sweep_*.md, ..., _swept/NN_Complete_Sweep_2026-05-23.md
```

---

## Hard rules

- **The strict order is sacred:** sweep → reorder → renumber → fact-check. Do NOT rearrange.
- **Each sub-skill runs as a separate invocation.** Don't inline their logic — call them by file.
- **Fact-check runs in PARALLEL** (three independent agents).
- **Print exactly one final receipt.** Sub-skills don't print their own receipts — only this coordinator does.
- **Preserve the snapshot.** The Step 0 snapshot must remain available in this session's context so a revert is possible until the user accepts the refactor.
- **Do not auto-commit.** The session-log skill handles git. The refactor finishes by leaving the master tasklist in a clean refactored state; the next `/session-log` invocation will commit it.
- **If anything fails, never silently continue.** Halt with a Diagnostics block.
