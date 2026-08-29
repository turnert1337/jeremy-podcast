# Skill — `/renumber-tasks`

**File:** `03_tasklist_skills/04_renumber_tasks.md`
**Invoked by:** `/refactor-tasklist` (Step 4), OR directly by the user.
**Purpose:** Renumber the (already-reordered) master tasklist so that the summary table and detail-block headings are sequential, gap-free, and **identical** between the two halves.

This is a **dedicated single-purpose skill**. The previous tasklist system collapsed this into the reorder skill and sometimes forgot to do it. By splitting it out:

- The renumber pass is impossible to skip — the coordinator literally calls a separate file.
- It's easy for a novice to find and fix when something's wrong.
- The fact-checker has a dedicated validator for this exact concern.

**Read first:** `03_tasklist_skills/00_tasklist_agent.md`.

---

## When to run

- Called by `/refactor-tasklist` Step 4 (after `/reorder-tasks`).
- User explicitly says "renumber" — useful after manually editing the master tasklist.

---

## Input

- The reordered master tasklist (summary rows and detail blocks in the desired final order, but with stale/non-sequential heading numbers).
- The migration map from `/reorder-tasks` (or built fresh if invoked standalone — see Step 0).

---

## Step 0 — If invoked standalone, build the migration map

If called directly (not via `/refactor-tasklist`):

1. Read `04_production_master_tasklist/00_Master_Tasklist.md`.
2. Walk the summary table top to bottom. For each row, capture `current_number`.
3. Build a fresh migration map: `[ { old_number: <row's current number>, new_position: <1-indexed row position> }, ... ]`.

If invoked by `/refactor-tasklist`, the map was already built — use it.

---

## Step 1 — Verify summary table and detail blocks are in matching order

Read the file. Walk:
- Top half (summary table): list every `current_number` in row order.
- Bottom half (detail blocks): list every `## Task N — ...` heading's `N` in document order.

These two lists MUST be identical (same numbers, same order). If they're not, halt with an error:

```
RENUMBER PRECONDITION FAILED.

Summary table order: [7, 2, 11, 3, 5]
Detail block order:  [7, 2, 11, 5, 3]   ← mismatch on positions 4–5

The reorder step did not move both halves consistently.
Run /reorder-tasks again, then retry renumber.
```

---

## Step 2 — Build the new-number assignment

For each row in the new (post-reorder) order, assign new numbers sequentially starting at 1:

```
position  old_number  new_number
--------  ----------  ----------
       1           7           1
       2           2           2
       3          11           3
       4           3           4
       5           5           5
```

The result: a complete `old_number → new_number` map.

---

## Step 3 — Renumber the summary table

In the summary table, replace the `#` column values with the new numbers, top to bottom.

**Only the `#` column changes.** The Status column and Task column are untouched.

---

## Step 4 — Renumber the detail headings

Walk the detail blocks in document order. For each `## Task N — ...` heading, replace `N` with the new number from the assignment map.

**Only the number in the heading changes.** The title and emoji are preserved. The body of the detail block is untouched — character-identical to before.

---

## Step 5 — Verify the 1:1 match (internal pre-check)

Before returning, this skill runs its own internal pre-check:

1. Walk the summary table top to bottom: collect the `#` column values into `summary_numbers`.
2. Walk the detail blocks top to bottom: collect the `## Task N` numbers into `detail_numbers`.
3. Assert: `summary_numbers == detail_numbers` (same length, same values, same order).
4. Assert: `summary_numbers == [1, 2, 3, ..., len(summary_numbers)]` (sequential, no gaps).

If either assertion fails, halt with an error showing both arrays. The fact-checker will catch it too, but failing here means we don't release bad state.

---

## Step 6 — Update cross-references

Cross-references inside detail blocks may mention old task numbers. Walk every detail block and replace:

- `**Blocked on:** Task <old_number>` → `**Blocked on:** Task <new_number>` (using the assignment map)
- Any free-text `Task <old_number>` mention inside a detail block — replace ONLY if the number unambiguously refers to a renumbered task (look for the word "Task" or "task" immediately before the number). Do NOT replace numbers in unrelated contexts (e.g., "10:30 AM," "version 7.2").

Also update file-level metadata:
- `**Active clusters:**` line: if clusters were named by Task number (rare), update.
- `**Handoff sequence:** Task N → M → ...` line: rewrite using new numbers.

Record every change made:

```
Cross-refs updated: 4
  - Task 4 detail: "Blocked on: Task 7" → "Blocked on: Task 1"
  - Top metadata: "Handoff sequence: Task 7 → Task 11" → "Handoff sequence: Task 1 → Task 3"
  - ...
```

**Sweep files are NEVER updated.** They are frozen history.

---

## Step 7 — Return

Return to the caller:

```json
{
  "renumbered_count": 5,
  "assignment_map": [
    { "old": 7,  "new": 1 },
    { "old": 2,  "new": 2 },
    { "old": 11, "new": 3 },
    { "old": 3,  "new": 4 },
    { "old": 5,  "new": 5 }
  ],
  "cross_refs_updated": 4,
  "cross_ref_changes": [
    "Task 4 detail: 'Blocked on: Task 7' → 'Blocked on: Task 1'",
    "Top metadata: 'Handoff sequence: Task 7 → Task 11' → 'Handoff sequence: Task 1 → Task 3'",
    "..."
  ],
  "internal_precheck": "PASS"
}
```

---

## Hard rules

- **Only headings and cross-references change.** Detail block body content is character-identical before and after. If a single character of body content differs, the renumber validator fails.
- **Summary and detail must match 1:1.** This is THE invariant this skill exists to enforce. The internal pre-check (Step 5) is non-negotiable.
- **Sequential, no gaps.** After renumber, the numbers are `1, 2, 3, ..., len`. Always.
- **Never touch sweep files.** Sweep files are frozen. Their task numbers reflect the state at sweep time, on purpose.
- **Halt loudly on precondition failure.** If the summary table and detail blocks are out of order before renumber starts, do NOT try to fix it — that's `/reorder-tasks`' job. Halt and surface the error.
- **Document every cross-ref change.** The return value lists every change so the fact-checker (and the user) can spot-check.
- **One pass.** This skill does its job in one sweep — no iteration, no "try again." If the precondition is wrong, fix the precondition (run reorder again), then call renumber once cleanly.
