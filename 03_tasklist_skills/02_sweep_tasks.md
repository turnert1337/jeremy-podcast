# Skill — `/sweep-tasks`

**File:** `03_tasklist_skills/02_sweep_tasks.md`
**Invoked by:** `/refactor-tasklist` (Step 2), OR directly by the user for a sweep-only operation.
**Purpose:** Move all `✅` completed tasks from the master tasklist into a new dated sweep file. Verbatim. Promote any open sub-items in those tasks as new master tasks.

**Read first:** `03_tasklist_skills/00_tasklist_agent.md`.

---

## When to run

- Called by `/refactor-tasklist` Step 2.
- User explicitly says "just sweep" / "/sweep-tasks" without wanting a full refactor.

---

## Step 1 — Snapshot

Read `04_production_master_tasklist/00_Master_Tasklist.md`. Capture full contents.

Identify all tasks with status `✅`. Build the sweep list:

```
Sweep list:
  - Task 3 — Email digest scoping
  - Task 7 — French translation pass 1
  - Task 11 — Bulk-run hashing
```

If no `✅` tasks: return `{ "swept": 0, "promoted": 0, "sweep_file": null }` to caller. Halt.

---

## Step 2 — Determine sweep file path

Look at `04_production_master_tasklist/_swept/`. Find the highest existing sweep number (e.g., last file is `07_Complete_Sweep_2026-05-20.md` → next is `08`).

New sweep file path:
```
04_production_master_tasklist/_swept/NN_Complete_Sweep_YYYY-MM-DD.md
```

Where `NN` is the next number (zero-padded to 2 digits) and `YYYY-MM-DD` is today.

If a file already exists for today, append `_b`, `_c`, etc. (rare).

---

## Step 3 — Detect open sub-items in completed tasks

For each completed task in the sweep list, scan its detail block for open sub-items:

- Markdown checkboxes: `- [ ]` or `* [ ]`
- TODO markers in the text: lines starting with `TODO:`, `TBD:`, `OPEN:`, or matching the regex `\bTODO\b` / `\bTBD\b`

For each open sub-item found, build a **promotion record**:

```
{
  "from_task_number": 3,
  "from_task_title": "Email digest scoping",
  "open_item_text": "Decide cron interval (daily vs weekly)",
  "promoted_task_title": "Email digest: decide cron interval (daily vs weekly)",
  "provenance": "**Promoted from:** Task 3 (Email digest scoping) during sweep on 2026-05-23."
}
```

Note: the open sub-item text becomes the new task's one-liner; the provenance line goes into the new task's detail block. The original swept task is NOT modified — promotion creates a NEW task in the master.

---

## Step 4 — Write the sweep file

Create the new file with this exact structure:

```markdown
# Complete Sweep — YYYY-MM-DD

**Swept by:** The Relay Frame (/sweep-tasks)
**Tasks swept:** N (Task 3 — Email digest scoping, Task 7 — French translation pass 1, Task 11 — Bulk-run hashing)
**Sweep number:** NN

---

## Task 3 — Email digest scoping ✅

[VERBATIM detail block — character-identical to what was in the master]

---

## Task 7 — French translation pass 1 ✅

[VERBATIM detail block]

---

## Task 11 — Bulk-run hashing ✅

[VERBATIM detail block]
```

**Critical:** the detail block content is copied **character-for-character**. Whitespace, line breaks, code blocks, inline emoji, links — all preserved exactly. No reformatting.

---

## Step 5 — Update the master tasklist

In `00_Master_Tasklist.md`:

1. **Remove** the swept tasks' rows from the above-the-fold summary table.
2. **Remove** the swept tasks' detail blocks from below the fold.
3. **Add** the promoted tasks (one per open sub-item from Step 3) as new rows in the summary table with status `🔴` (not started) and a one-liner. Add their detail blocks below the fold with the provenance line.
4. **Update** the `**Archived:**` metadata line at the top to include the new sweep file path.
5. **Do NOT renumber.** Leave the existing task numbers as-is. Renumbering is the next phase's job.

After Step 5, the master tasklist has:
- Holes in numbering (e.g., Tasks 1, 2, 4, 5, 6, 8, 9, 10, 12, plus promoted tasks at the end keeping their newly-assigned numbers).
- That's fine. `/renumber-tasks` will clean it up.

---

## Step 6 — Return

Return a structured result to the caller:

```json
{
  "swept": 3,
  "swept_task_numbers": [3, 7, 11],
  "promoted": 2,
  "promoted_task_titles": ["Email digest: decide cron interval (daily vs weekly)", "..."],
  "sweep_file": "04_production_master_tasklist/_swept/08_Complete_Sweep_2026-05-23.md",
  "new_master_state": "<path to live master tasklist>"
}
```

---

## Hard rules

- **Verbatim is non-negotiable.** Detail blocks copied character-for-character. If a single space is added or removed in the copy, the sweep validator will FAIL.
- **Open sub-items are promoted, not deleted.** Every `[ ]` or `TODO` in a completed task becomes a new master task. If you're unsure whether something counts as an open item, promote it — false positives are cheap, missed promotions are expensive.
- **Sweep files are frozen.** This skill is the ONLY thing that writes sweep files, and only on first creation. Sweep files are NEVER edited after creation.
- **Do NOT renumber here.** This skill removes tasks and adds promotions; the renumbering pass is separate.
- **Idempotent on empty.** If there are zero completed tasks, this skill returns gracefully without creating an empty sweep file.
- **Do not modify task content.** No edits to detail blocks during sweep. Even fixing a typo is forbidden — file an Issues note instead and let the user decide.
