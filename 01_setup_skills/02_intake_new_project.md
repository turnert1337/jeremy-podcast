# Skill — `/intake-new`

**File:** `01_setup_skills/02_intake_new_project.md`
**Invoked by:** `/intake-router` when user picks greenfield.
**Purpose:** Interview the user about a brand-new project. Capture scope, goal, outcome. Seed the first session log entry and the first 1–3 master tasks.

---

## When to run

- Greenfield projects only.
- The user has no existing files to import.
- `_session_log.md` is empty.

If files exist, route to `/intake-existing` instead.

---

## Step 1 — Set tone

Print:

```
Greenfield intake. About 5 minutes. I'll ask short questions
and write things down as we go. You can pause or skip any
question — we can always come back.

Ready?
```

Wait for confirmation.

---

## Step 2 — The interview (5 questions)

Ask these one at a time. Wait for an answer before proceeding to the next.

### Q1 — Project name (and short slug)

```
1. What should we call this project?

   I'll use your title in the session log and the README.
   I also need a short, lowercase slug for file references —
   I'll propose one based on your answer; you can tweak it.
```

Capture: `project_name` (full title), `project_slug` (kebab-case, ≤ 30 chars).

### Q2 — One-sentence pitch

```
2. In one sentence: what is this project, and why does it
   matter?

   (If it's hard to compress, just rough it out — we can
   refine it across sessions.)
```

Capture: `pitch`.

### Q3 — Audience / outcome

```
3. Who's it for, and what does "done" look like?

   Audience can be a person, a team, "future me," or
   "anyone curious." Done can be a deliverable (a published
   doc, a shipped feature) or a milestone ("can hand off to
   a successor without explaining anything").
```

Capture: `audience`, `outcome`.

### Q4 — Project type

```
4. What kind of project is this? Pick the closest match:

   [a] Code / engineering
   [b] Writing (book, longform article, doc set)
   [c] Media (slide deck, video, podcast, course)
   [d] Research (investigation, study, lit review)
   [e] Other  ↳ tell me in your own words

   This shapes which starter tasks I suggest. Not binding —
   you can mix and match.
```

Capture: `project_type` (a/b/c/d/e + free-form clarifier).

### Q5 — Timing

```
5. Loose sense of timing — pick one:

   [1] No deadline; I'll work on it when I work on it
   [2] Soft deadline (weeks or months out)
   [3] Hard deadline (specific date — what is it?)

   Doesn't have to be precise; it shapes how aggressive the
   tasklist starts.
```

Capture: `timing` (1/2/3 + optional date).

### Q6 — People (seeds the people list)

```
6. Who else is involved — even loosely? List anyone you'd
   plausibly email, loop in for review, or want me to
   remember when we're drafting messages later.

   For each person, a name + role/relationship is enough:

     Priya Kapoor       — Editor
     Sam Reyes          — Beta reader
     Marco Bianchi      — Stakeholder (Product)

   If it's just you for now, say "solo" and we'll add people
   as they show up.
```

Capture: `people[]` (each = `{name, role, optional_channel, optional_note}`). Allow `solo`.

---

## Step 3 — Confirm before writing

Echo everything back in a compact block:

```
Locked in:

  Project        : [project_name]   ([project_slug])
  Pitch          : [pitch]
  Audience       : [audience]
  Outcome        : [outcome]
  Type           : [project_type]
  Timing         : [timing]
  People         : [N entries — or "solo"]

Look right?  [Y] write it / [edit] let me fix something
```

If the user says edit, ask which field, update it, re-show, re-ask. Loop until they confirm.

---

## Step 4 — Offer git init

Print:

```
Optional: initialise a local git repo for this frame folder?
That lets the session-log skill auto-commit your work each
session.

  [Y] Yes, set up git    /  [N] Skip for now
```

If `Y`, invoke `/git-init` (`04_git_init.md`). If `N`, move on — the session-log skill will simply leave the git line blank in receipts.

---

## Step 5 — Seed starter tasks

Based on `project_type`, propose **3 starter tasks** (no more, no less). Examples:

**Code/engineering (a):**
1. Decide stack + scaffold repo skeleton
2. Write a "hello-world" path end-to-end
3. Identify the first real feature to build

**Writing (b):**
1. Write a one-page outline / chapter list
2. Draft the opening scene or section
3. Identify the first reader to share a draft with

**Media (c):**
1. Outline the narrative arc (3-5 beats)
2. Build slide / scene 1 as a template for the rest
3. Identify the rendering / export target

**Research (d):**
1. Define the question crisply (one sentence)
2. List the first 5 sources to read
3. Set up the note-taking system

**Other (e):** Ask the user to suggest 3 first tasks themselves.

Present the proposed tasks and ask:

```
Proposed starter tasks (you can edit or replace any):

  1. [task 1]
  2. [task 2]
  3. [task 3]

  [Y] looks good   /  [edit N] change task N   /  [add] add another
```

Loop until confirmed.

---

## Step 6 — Write everything

In this exact order:

1. **Master tasklist** (`04_production_master_tasklist/00_Master_Tasklist.md`):
   - Set the project header (name, started date, type).
   - Replace the stub task row(s) with the 3 confirmed starter tasks, status `🔴`.
   - Add matching detail blocks below the fold for each.

2. **Session log** (`_session_log.md`):
   - Write the first entry using the template at `00_relay_frame/02_session_log_template.md`.
   - Session number: 1.
   - Title: `Intake interview + first tasks`.
   - Decisions: list the choices (project type, timing, git Y/N).
   - Completed: ran intake, seeded tasklist with N tasks, (git init if applicable).
   - Pending: starter tasks themselves.
   - Next session starts with: a specific pointer to Task 1.
   - Status snapshot: one line per starter task.

3. **People list** (`_people_list.md`):
   - For each entry in `people[]`, invoke `/people-list-update` (`02_session_skills/03_people_list_update.md`) in "new entry" mode. The skill confirms and writes per its own protocol.
   - If `people` was `solo`, skip — the list stays as a stub.

4. **README.md** at frame root: prepend a single line under the title — `**Project:** [project_name]` — so the frame becomes self-identifying without overwriting the handoff content.

---

## Step 7 — Run the session-log fact-check

Invoke `/session-log-factcheck` to verify everything is consistent (master tasklist matches the entry, fields are all present, git line is correctly populated or blanked).

---

## Step 8 — Print the receipt

Print the session-log receipt EXACTLY as defined in `02_session_skills/00_session_log_protocol.md` Step 7, with TWO additional lines inserted into the close-out block between the `🟢 session log fact-checked and saved` line and the `⚪ /pickup …` line:

```
🟢 master tasklist seeded
🟢 people list seeded (N entries)        [omit line if user said "solo"]
```

The final close-out block reads:

```
🟢 session log fact-checked and saved
🟢 master tasklist seeded
🟢 people list seeded (N entries)
⚪ /pickup context module primed                     [roadmap — not yet wired]
```

Then a one-line welcome after the receipt:

```
Welcome to the frame. Open 04_production_master_tasklist/
00_Master_Tasklist.md when you're ready to start on Task 1.
```

---

## Hard rules

- Do not exceed 3 starter tasks. More than 3 creates the "too much to begin with" feeling that kills new projects.
- Do not write to disk until Step 6. The interview is reversible until then.
- If the user wants to abort mid-interview, tell them: "No problem — none of this has been saved. Run /intake-new whenever you're ready."
- The session-log entry is appended at the top of `_session_log.md`. Even for session 1, follow the append-to-top convention.
