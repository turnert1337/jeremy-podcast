# Skill — `/reorder-tasks`

**File:** `03_tasklist_skills/03_reorder_tasks.md`
**Invoked by:** `/refactor-tasklist` (Step 3), OR directly by the user.
**Purpose:** Reorder the (post-sweep) master tasklist by status group and the user's priority directive. Physically rearrange rows — does NOT renumber. Renumbering is the next sub-skill.

**Read first:** `03_tasklist_skills/00_tasklist_agent.md`.

---

## When to run

- Called by `/refactor-tasklist` Step 3.
- User explicitly says "reorder only" without a sweep.

---

## Input

- The (already-swept) master tasklist.
- The user's reorder directive from `/refactor-tasklist` Step 1B: `keep` / `describe <text>` / `guess`.

---

## Step 1 — Group tasks by status

Walk the summary table. Bucket every task into one of four groups:

- **Group 1:** all `🟡` in-progress tasks
- **Group 2:** all `🔴` not-started tasks
- **Group 3:** all `🟠` waiting/blocked tasks (detail block names what — *waiting on Priya · waiting on legal · waiting on Snyk fix*)
- **Group 4:** all `⚪` parked tasks (optional bucket — deliberately deferred, not blocked)

(No `✅` tasks should be present — they were swept. If any are, halt with an error.)

---

## Step 2 — Within-group ordering

Apply the user's directive within each group:

### Directive: `keep`

Preserve current relative order. Group 1 keeps its existing internal order, Group 2 keeps its existing internal order, Group 3 keeps its existing internal order. (Easiest case.)

### Directive: `describe <text>`

Parse the user's free-form priorities. Common patterns:
- "Email digest first, then French translation" → Email digest moves to top of its group, French translation second
- "Push the bulk-run task down" → Bulk-run goes to the bottom of its group
- "Group everything related to cleanup together at the end" → Apply cluster grouping within Group 2 / Group 3

If the directive is ambiguous, ask one clarifying question, then re-apply.

### Directive: `guess`

Use project context to order by likelihood of next work. Heuristics (in order of weight):

1. **Dependency chains.** If Task A is blocked on Task B, Task B should come before Task A.
2. **In-progress momentum.** Within Group 1, keep tasks that were touched most recently (per session log) at the top.
3. **Quick wins.** Within Group 2, surface tasks with short estimated effort.
4. **Cluster adjacency.** Tasks sharing a cluster letter (from the `**Active clusters:**` line) cluster together.
5. **Recent mentions.** Tasks mentioned in the last 3 session-log entries get a small boost.

If multiple heuristics conflict, the higher-priority one wins. Tiebreaker: lower task number (oldest task first).

---

## Step 3 — Concatenate groups

Build the final ordered list: **Group 1 (in-progress)** → **Group 2 (not-started)** → **Group 3 (waiting)**.

This is the new logical order. The rows have NOT been renumbered yet — they still carry their old task numbers from before the sweep.

---

## Step 4 — Physically reorder both halves

In the master tasklist file:

1. **Reorder the summary table rows** — write them in the new order, top to bottom.
2. **Reorder the detail blocks below the fold** — same order as the summary table.
3. **Do NOT change the heading numbers.** A row that used to be `## Task 7 — Foo 🔴` stays `## Task 7 — Foo 🔴` — just physically moved up or down.

After this step, the summary table and the detail blocks are in the same relative order, but the numbers may look out of order (e.g., the summary table reads "Task 7, Task 2, Task 11, Task 3, ..."). That's expected. Renumbering is the next skill.

---

## Step 5 — Build the migration map

For each row in the new order, record `(old_number, new_position)` where new_position is the 1-indexed row number it ended up in. Example:

```
old_number  new_position
----------  ------------
        7             1
        2             2
       11             3
        3             4
        5             5
```

Pass this map to `/renumber-tasks` in the next phase.

---

## Step 6 — Return

Return to the caller:

```json
{
  "reorder_directive": "guess",
  "groups": { "in_progress": 1, "not_started": 3, "waiting": 1 },
  "ordered_old_numbers": [7, 2, 11, 3, 5],
  "migration_map": [
    { "old_number": 7, "new_position": 1 },
    { "old_number": 2, "new_position": 2 },
    { "old_number": 11, "new_position": 3 },
    { "old_number": 3, "new_position": 4 },
    { "old_number": 5, "new_position": 5 }
  ],
  "master_tasklist_state": "<rows are reordered, numbers unchanged>"
}
```

---

## Hard rules

- **Reorder ONLY.** This skill does NOT renumber. That's `/renumber-tasks`'s job.
- **Group ordering is fixed:** 🟡 → 🔴 → 🟠 → ⚪. Never reversed, never mixed.
- **Detail blocks move with their summary rows.** A row's detail block must always be in the same relative position as its summary row. After reorder, the file scans top-to-bottom: summary table in new order, then detail blocks in the SAME new order.
- **Detail block content is never modified.** No edits to the inside of a detail block during reorder. Headings keep their old numbers.
- **Halt on `✅` tasks.** If any completed tasks remain in the master, this skill exits with an error. Sweep first.
- **Ask once if ambiguous.** A single clarifying question is fine. Don't ping-pong with the user.
- **`guess` mode is documented in detail blocks.** When `guess` is used, add a short note in the migration map for any non-obvious ordering choice. The fact-checker will spot-check these.
