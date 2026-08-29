# Skill — `/plan-next-meeting`

**File:** `05_meeting_management/02_plan_next_meeting.md`
**Invoked by:** Operator says "plan my next meeting with X" / "I've got a call with Priya on Friday, help me prep" / `/plan-next-meeting <attendee> [date]`.
**Purpose:** Build a quick prep file in `3_future/` by pulling context from the people list, recent processed meetings, and the master tasklist.

---

## When to run

- Before any meeting where the operator wants a focused agenda + talking points.
- Even for small meetings — running this skill is the difference between walking in with "uh, where did we leave off?" and walking in with a 5-minute scan-friendly prep.

---

## Step 0 — Read the rules

Read `00_module_rules.md`. The prep file lives in `3_future/`, uses the `-prep.md` suffix, and follows the prep section of `_meeting_template.md`.

---

## Step 1 — Identify the attendee + date

Print:

```
Quick prep. Two things:

  1. Who are you meeting with?  (one name or several, comma-separated)
  2. When?                      (date in YYYY-MM-DD, or "TBD")
```

Wait for the operator's answers.

If the attendee isn't in `_people_list.md`, say so:
```
[NAME] isn't in the people list yet. Add them first?
  [Y] add now via /people-list-update     /  [skip] plan without their profile context
```

---

## Step 2 — Gather context

Read in this order (in parallel where possible):

1. **`_people_list.md`** — find the attendee's roster row + detail block. Pull role, channel preference, last touchpoint.
2. **`05_meeting_management/2_processed/`** — list all files where this attendee appears. Open the 3 most recent. Extract:
   - Decisions from the last meeting (still live? superseded?)
   - Open questions from the last meeting (not yet resolved → candidate agenda items)
   - Action items where this attendee is owner OR operator-with-blocker
3. **`04_production_master_tasklist/00_Master_Tasklist.md`** — find rows that mention this attendee (in detail blocks). Note status (🟡 in-flight, 🔴 not-started, 🟠 waiting, ✅ complete).

Hold all of this in working memory but don't print it yet — the operator doesn't need a context dump, they need a structured prep.

---

## Step 3 — Propose the prep file

Print a draft using the prep template:

```
Proposed prep for [DATE] meeting with [ATTENDEE]:

  GOAL (one sentence):
    [Auto-drafted from open questions + tasklist signals]

  AGENDA (3-5 bullets):
    1. [From open question in last processed meeting]
    2. [From in-flight tasklist row mentioning attendee]
    3. [From operator's role / standing topics]

  TALKING POINTS (what you want to say):
    · [Auto-drafted from operator's recent decisions you'd want to share]
    · [Auto-drafted from tasklist progress to communicate]

  THINGS TO ASK:
    · [Open question from last processed meeting]
    · [Tasklist row waiting on attendee]

  CONTEXT TO BRING:
    · Last meeting: 05_meeting_management/2_processed/YYYY-MM-DD-with-slug.md
    · Live tasklist rows: rows X, Y in 00_Master_Tasklist.md
    · People profile: _people_list.md#attendee-slug

  RISKS / AVOID:
    · [Optional — only fill if there's an obvious sensitive topic]

  [Y] save as-is     /  [edit SECTION] tweak a section     /  [add SECTION] add to a section
```

Loop until the operator approves.

---

## Step 4 — Write the file

Save to `05_meeting_management/3_future/YYYY-MM-DD-with-<slug>-prep.md` (or `TBD-with-<slug>-prep.md` if the date is unknown).

The file uses the prep section of `_meeting_template.md`:

```
# Prep — meeting with [ATTENDEE] on [DATE]

## Header
- Date: …
- Time: …
- Channel: …
- Topic: …

## Goal
[One sentence]

## Agenda
1. …
2. …

## Talking points
- …

## Things to ask
- …

## Context to bring
- Last meeting: …
- Live tasklist rows: …
- People profile: …

## Risks / avoid
[Optional]
```

---

## Step 5 — Print the receipt

```
🟢 prep file saved                                — 05_meeting_management/3_future/YYYY-MM-DD-with-slug-prep.md
🟢 context pulled                                 — N prior meetings, M tasklist rows
⚪ after the meeting                              — drop transcript/notes in 1_inbox/ and run /process-meeting
```

If the attendee wasn't in the people list and the operator skipped adding them:
```
🟠 attendee not in people list                    — prep written without their profile context
```

---

## Hard rules

- **Don't invent facts.** Every bullet in the prep file should be traceable to a real source (a prior meeting file, a tasklist row, a people-list entry). If you can't trace it, ask the operator to confirm before writing it.
- **Prep file is forward-looking.** Don't write meeting outcomes here. Outcomes go in `2_processed/` after the meeting happens.
- **The prep file is a working draft.** The operator should expect to edit it before walking into the meeting. Don't over-polish.
- **Always include the back-reference list under "Context to bring."** This is what makes the prep usable as a pre-meeting reading list.
