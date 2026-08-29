# 00 — Tasklist Agent (Rules of Engagement)

**This is not a skill — it is the rulebook every tasklist skill obeys.** Read this once. The skills below reference it.

> Cloned and hardened from the road-tested CA Casepack Detection tasklist system. Key change: a dedicated `/renumber-tasks` skill closes a gap where the previous system sometimes forgot to renumber.

---

## The six rules

### Rule 1 — No summarization. Ever.

Refactoring is **structural rearrangement only** — copy-paste, reorder, renumber. Content is **never** trimmed, shortened, reworded, or "cleaned up."

If a detail block is 4000 characters long, it stays 4000 characters long after a refactor. The numbers on the headings may change. Nothing else.

### Rule 2 — Completed tasks go to sweep files, not the trash.

Every completed task and its full detail block is preserved verbatim in a dated `_swept/NN_Complete_Sweep_YYYY-MM-DD.md` file. The sweep file is the historical record.

Sweep files are **frozen** — never edited after creation.

### Rule 3 — Sweep → Reorder → Renumber → Fact-check. In that order.

This is the strict sequence the `/refactor-tasklist` coordinator follows:

1. **Sweep** completed tasks to a new dated sweep file.
2. **Reorder** the remaining tasks by status group and user priority.
3. **Renumber** — a dedicated pass that ensures the summary table and detail headings match 1:1.
4. **Fact-check** — a parallel wave of three validators.

Never collapse sweep and reorder. Never skip renumber. Never run fact-check before renumber.

### Rule 4 — Open sub-items in completed tasks get promoted.

When sweeping a completed task that contains open checkboxes (`[ ]`) or TODO markers, each open item is **promoted to a new master task** with a provenance line:

```
**Promoted from:** Task N ({title}) during sweep on YYYY-MM-DD.
```

The original task still gets swept verbatim — the promotion creates a NEW task in the master, it does not modify the swept content.

### Rule 5 — Cross-references update on renumber.

When tasks are renumbered, references to old numbers update automatically:

- `**Blocked on:** Task 7` → updated to the new number
- The `**Active clusters:**` line at the top of the master tasklist
- The `**Handoff sequence:**` line
- Any "see Task N" mentions inside detail blocks

Sweep files are **never updated**. They are frozen history; the references inside them are accurate at the time of the sweep.

### Rule 6 — Independent fact-checkers verify every operation.

After sweep + reorder + renumber, the coordinator dispatches THREE independent validators in parallel:

| Validator | Verifies |
|-----------|----------|
| Sweep | Every completed task ended up in the sweep file. Detail blocks are character-identical. No active tasks were accidentally swept. |
| Reorder | Group ordering respected (🟡 in-progress → 🔴 not-started → 🟠 waiting → ⚪ parked). User's priority directive honored. |
| Renumber | Summary table numbers match detail-block heading numbers 1:1. Sequential, no gaps. No content modified inside detail blocks (only heading numbers). |

Each validator returns PASS / FAIL with specifics. The coordinator collects all three and prints them.

### Rule 7 — Meeting-sourced tasks carry citations.

When a task is added to the master tasklist because of a processed meeting (typically via `/process-meeting`), its detail block carries a back-reference of the canonical form:

```
(learned in the meeting with NAME on YYYY-MM-DD — 05_meeting_management/2_processed/YYYY-MM-DD-with-slug.md)
```

The citation is appended at the end of the detail block, after the provenance line. It is **never summarised** — it is the literal file path. During a sweep, the citation goes with the swept task verbatim (Rule 1 still applies). The renumber pass does NOT touch citations — they reference processed-meeting filenames, which are stable across tasklist renumbers.

If a tasklist row claims to come from a meeting and the referenced file does not exist in `2_processed/`, that's a `/tasklist-factcheck` failure under the citation sub-check (see Rule 6, Sweep validator's extended remit below).

> Source of truth for the citation format: `05_meeting_management/00_module_rules.md` Section 1.

---

## The master tasklist structure (canonical)

### File: `04_production_master_tasklist/00_Master_Tasklist.md`

```markdown
# Master Tasklist — [Project Name]

*Started: YYYY-MM-DD · Last refactored: YYYY-MM-DD*

**Active clusters:** A (cluster description), B (cluster description), ...
**Handoff sequence:** Task N → M → ...
**Archived:** _swept/01_Complete_Sweep_YYYY-MM-DD.md, _swept/02_Complete_Sweep_YYYY-MM-DD.md, ...

---

## Status key

| Status | Meaning |
|--------|---------|
| 🟡 | **In progress** — work is actively underway. |
| 🔴 | **Not started** — queued, no work done yet. |
| 🟠 | **Waiting on** — blocked on a person, decision, dependency, or external answer. Detail block names what (e.g., *waiting on Priya's review · waiting on legal sign-off · waiting on Snyk fix release*). |
| ✅ | **Complete** (transient) — done; swept to `_swept/` on next `/refactor-tasklist`. |
| ⚪ | **Parked** (optional) — deliberately set aside; not blocked, just deferred. |

> Reorder priority during `/refactor-tasklist`: 🟡 → 🔴 → 🟠 → ⚪ → ✅.

---

## Above the fold — Active tasks

| # | Status | Task |
|---|--------|------|
| 1 | 🟡 | **[Task 1 title]** — one-liner. (see detail below) |
| 2 | 🔴 | **[Task 2 title]** — one-liner. |
| 3 | 🟠 | **[Task 3 title]** — one-liner. waiting on X. |

---

## Below the fold — Detail blocks

## Task 1 — [Title] 🟡

**New YYYY-MM-DD.** Initial context.
**YYYY-MM-DD update:** progress notes.

**What:** [specifics]
**Why:** [rationale]

- bullet
- bullet
  - sub-bullet

[Long-form content. No length limit. Code blocks, citations, links, sub-checkboxes all fair game.]

[If the task was seeded from a processed meeting, the citation appears as the LAST line of the detail block:]

(learned in the meeting with Priya on 2026-05-22 — 05_meeting_management/2_processed/2026-05-22-with-priya.md)

---

## Task 2 — [Title] 🔴

...

---

## Task 3 — [Title] 🟠

**Blocked on:** Task 7 OR external dependency.

...
```

### Status emojis (canonical)

| Emoji | Meaning | Group | Order |
|-------|---------|-------|-------|
| 🟡 | In progress | Group 1 | First |
| 🔴 | Not started | Group 2 | Second |
| 🟠 | Waiting / blocked — *waiting on X, Y, Z* (the detail block names what) | Group 3 | Third |
| ⚪ | Parked (optional) — deliberately deferred, not blocked | Group 4 | Fourth |
| ✅ | Complete (transient — swept on next refactor) | — | swept |

The reorder pass groups in this order: 🟡 → 🔴 → 🟠 → ⚪ → ✅ (✅ rows are about to be swept anyway, so they sink to the bottom).

Above-the-fold and below-the-fold both carry the same emoji for the same task. Always.

### Sequential numbering

After every refactor: 1, 2, 3, 4, ... No gaps. Legacy numbers are discarded. The reasoning is that the *file* of swept tasks (`_swept/`) preserves any old number references via verbatim copy; the live master tasklist always renumbers cleanly so the active state has no holes.

---

## Sweep file structure (canonical)

### File: `_swept/NN_Complete_Sweep_YYYY-MM-DD.md`

```markdown
# Complete Sweep — YYYY-MM-DD

**Swept by:** The Relay Frame (/sweep-tasks)
**Tasks swept:** 3 (Task 1 — A, Task 4 — B, Task 7 — C)
**Sweep number:** NN (sequential)

---

## Task 1 — [Title] ✅

[VERBATIM detail block, character-identical to what was in the master at sweep time]

---

## Task 4 — [Title] ✅

[VERBATIM]

---

## Task 7 — [Title] ✅

[VERBATIM]
```

**Critical:** numbers in sweep files reflect what the task was numbered at the time of sweep. They are NOT updated when the live master renumbers. Sweep files are frozen.

---

## How `_swept/` is numbered

Sweep files are numbered `01_`, `02_`, `03_`, ... by date order of sweep. The number is independent of the master tasklist's task numbers. The naming convention is:

```
NN_Complete_Sweep_YYYY-MM-DD.md
```

If two sweeps happen the same day, the second one becomes `Complete_Sweep_YYYY-MM-DD_b.md`. Rare in practice.

---

## What the skills do

| Skill | Does |
|-------|------|
| `/sweep-tasks` | Archive completed tasks to a new sweep file (verbatim) + promote open sub-items |
| `/reorder-tasks` | Reorder remaining tasks by group + user priority (no renumbering yet) |
| `/renumber-tasks` | Dedicated pass: renumber summary table and detail headings together; verify 1:1 match |
| `/tasklist-factcheck` | Parallel validators for sweep, reorder, and renumber |
| `/refactor-tasklist` | Coordinator that runs all four in order |

Each skill is a separate file. Read the one you're about to call. Don't trust memory.

---

## Why this is split out into five files (not one)

A single combined skill (the original CA Casepack `/refactor-tasklist`) sometimes "forgot to renumber" because the renumber step was buried inside the reorder skill as Step 5 of 9. Splitting the renumber into its own file makes it impossible to skip — the coordinator literally has to call the file by name, and the fact-checker explicitly validates the renumber pass.

Modular skills are easier for a novice (or Haiku-class agent) to navigate. If something's wrong, you open the file named for the thing that's wrong.
