# Skill — `/intake-existing`

**File:** `01_setup_skills/03_intake_existing_project.md`
**Invoked by:** `/intake-router` when user picks import-existing, OR directly by the user when they want to import files into an existing frame.
**Purpose:** Interview the user about their existing files, guide them to drop everything into an `_intake/` folder, then plumb the files into the frame.

---

## When to run

- User has existing files (drafts, code, decks, notes) they want to bring into the frame.
- Either the frame is clean (first intake) OR the frame is already in use and the user wants to add a project / large batch of files.

---

## Step 1 — Set tone

Print:

```
Import-existing intake. About 10–15 minutes. Three phases:

  1. Interview — what do you have, where does it live?
  2. Stage    — you drop everything into a single _intake/
                folder I can read end-to-end.
  3. Plumb    — I scan, propose a placement plan, you
                approve, and I move files into the frame.

Nothing in the frame gets touched until Phase 3, and even
there I'll show you the move-plan before doing anything.

Ready?
```

Wait for confirmation.

---

## Step 2 — Interview (Phase 1)

Ask these one at a time:

### Q1 — Project identity

Same as `/intake-new` Q1 + Q2 (project name, slug, one-sentence pitch).

### Q2 — Inventory

```
What kinds of files are coming in? Pick all that apply:

  [ ] Source code
  [ ] Long-form writing (chapters, articles, posts)
  [ ] Notes, research, citations
  [ ] Slides / deck files
  [ ] Media (images, audio, video)
  [ ] Spreadsheets / data
  [ ] Other  ↳ describe

Roughly how many files total? (rough order of magnitude is
fine — "around 20", "around 200", "thousands")
```

Capture: `inventory_types[]`, `file_count_estimate`.

### Q3 — Current structure

```
Where do these files live right now, and how are they
organised?

  - One folder?              → describe its layout
  - Scattered across folders?→ list the folders
  - A repo (git or not)?     → repo path
  - A mix of the above?      → describe
```

Capture: `current_locations[]`.

### Q4 — What's truth, what's stale

```
Of all those files, which are still current ("truth") and
which are stale (drafts, dead branches, obsolete docs)?

  - Are there files you want to import as truth?
  - Files you want to import as historical reference?
  - Files you'd rather leave behind?

Rough categories are fine — we'll mark them as we plumb.
```

Capture: `truth_signals[]`, `archive_signals[]`, `leave_behind_signals[]`.

### Q5 — Active threads

```
What's actively being worked on right now? (As distinct
from "files that exist.")

This becomes the seed for your master tasklist.
List 1–5 active threads.
```

Capture: `active_threads[]` (1–5 items).

### Q6 — People (seeds the people list)

```
Who else is involved — even loosely? List anyone you'd
plausibly email, loop in for review, or want me to
remember when we're drafting messages later.

For each person, a name + role/relationship is enough:

  Priya Kapoor       — Editor
  Sam Reyes          — Beta reader
  Marco Bianchi      — Stakeholder (Product)

If meeting notes or emails are in the import, I can also
scan those for names you may have forgotten. Say "scan it"
and I'll propose entries from there.

If it's just you for now, say "solo" and we'll add people
as they show up.
```

Capture: `people[]` (each = `{name, role, optional_channel, optional_note}`). Allow `solo` or `scan it`. If `scan it`, queue the scan for Step 4.1 (Plumb).

### Q7 — Optional git

Same as `/intake-new` Step 4 — offer `/git-init`.

---

## Step 3 — Stage (Phase 2): the `_intake/` folder

Print:

```
Next: collect everything you want to import into ONE folder
named _intake/ at the root of this frame.

  [frame root]/_intake/
    ├── (drop all files and subfolders here)
    └── _intake_notes.md   (optional — your notes about what
                             goes where, what's stale, etc.)

Why one folder: it lets me read the whole import as one unit
and propose placements that respect any existing structure
inside it.

When you're done dropping files, type DONE.

(If the files are too large to copy easily, you can use
symlinks or just paste the absolute path of the source
folder and I'll read from there.)
```

Wait for the user to type `DONE` (or to paste an absolute path).

---

## Step 4 — Plumb (Phase 3): scan and propose

Once the user signals DONE:

### 4.1 Scan

Read the contents of `_intake/` (or the source path the user provided). For each file/folder:
- Note path, size, type (extension), and a first-pass classification (truth / archive / leave-behind) based on the user's signals from Q4.
- Skim text-based files for content cues (headers, dates, version numbers).

### 4.2 Propose a placement plan

Print a table — one row per file (or per folder if files are clearly grouped):

```
Placement plan (nothing has been moved yet):

  File or folder              → Proposed destination
  --------------------------------------------------------
  chapter_drafts/             → assets/drafts/
  outline.md                  → assets/outline.md  (TRUTH)
  old_notes_2024/             → assets/_archive/old_notes_2024/
  todo.txt                    → seeds master tasklist (will
                                  parse into N tasks)
  scratch.md                  → leave in _intake/  (LEAVE)

Default conventions:
  - "truth" files → /assets/
  - stale-but-keep files → /assets/_archive/
  - active todo lists → seed master tasklist
  - leave-behinds → stay in _intake/  for your review

  [Y] Approve as-is
  [edit] Let me move things around
  [explain N] Why did you propose this for row N?
```

Loop until the user approves.

### 4.3 Execute moves

In a single batch:
- Create destination folders if missing.
- Move files per the plan.
- Do NOT delete the source files; *move* them (so `_intake/` empties out, but a leave-behind stays where it is).

### 4.4 Seed the master tasklist

For each item in `active_threads[]` (from Q5), add a row to the master tasklist with status `🔴` and a detail block below the fold containing:
- A pointer to any file path(s) that relate to this thread.
- A one-line description (echoed from the user).
- A `**New 2026-MM-DD.**` provenance marker.

### 4.5 Seed the people list

For each entry in `people[]` (from Q6), invoke `/people-list-update` (`02_session_skills/03_people_list_update.md`) in "new entry" mode.

If Q6 was `scan it`, additionally:
- Skim text-based files in `_intake/` for likely person mentions (email headers, attendee lists, signatures).
- For each candidate, propose a `/people-list-update` call. The operator confirms or rejects per-candidate; no silent additions.

If Q6 was `solo`, skip — leave `_people_list.md` as a stub.

### 4.6 Write the README + session log

- README: same as `/intake-new` Step 6 (4) — prepend the project line.
- Session log entry: same template, but **note in Completed** that files were imported, with the count from Step 4.1. Also note the people-list seed count in the `**People-list delta:**` field.

---

## Step 5 — Run the session-log fact-check

Invoke `/session-log-factcheck`. Specifically verify:
- Every file moved per the plan ended up at its destination.
- No files were silently dropped.
- The master tasklist's new task count matches `active_threads.length`.
- `_people_list.md` has exactly `people.length` new entries (plus any operator-approved scan additions).

---

## Step 6 — Print the receipt

Print the session-log receipt EXACTLY as defined in `02_session_skills/00_session_log_protocol.md` Step 7, with THREE additional lines inserted into the close-out block between the `🟢 session log fact-checked and saved` line and the `⚪ /pickup …` line:

```
🟢 N files imported and plumbed
🟢 master tasklist seeded with N active threads
🟢 people list seeded (N entries)            [omit if Q6 was "solo"]
```

The final close-out block reads:

```
🟢 session log fact-checked and saved
🟢 N files imported and plumbed
🟢 master tasklist seeded with N active threads
🟢 people list seeded (N entries)
⚪ /pickup context module primed                     [roadmap — not yet wired]
```

Then:

```
Welcome to the frame. Your _intake/ folder is now [empty / 
has X leave-behind files for your review]. Open
04_production_master_tasklist/00_Master_Tasklist.md to see
your active threads.
```

---

## Hard rules

- **Never touch anything outside the frame folder unless the user explicitly pasted an absolute path.** And even then, READ-only — moves happen *into* the frame, not within the source folder.
- **Show the placement plan before executing.** Even for trivial single-file imports.
- **Do not classify "truth vs. stale" without user signal.** If the user didn't say, ask. Don't guess.
- **`_intake/` is a working scratch area.** Leave-behind files stay there until the user clears them. Do not auto-delete.
- **One intake session = one batch.** If the user wants to import more files later, run `/intake-existing` again — it's idempotent.
