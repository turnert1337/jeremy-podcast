# Skill — `/intake-router`

**File:** `01_setup_skills/01_intake_router.md`
**Invoked by:** `/intro-card` after user confirms intake, OR directly by user via `/intake-router`.
**Purpose:** Decide which intake flow to run — greenfield or import-existing — and hand off.

---

## When to run

- Immediately after the user opts into intake from the intro card.
- OR when the user directly asks to run intake on a frame that has not yet been initialised.

---

## Step 1 — Ask the routing question

Print:

```
Two paths into the frame. Pick one:

  [1] Greenfield project
      ↳ Starting from scratch. No existing files. We'll
        scope it together and create the first tasks.

  [2] Import existing project
      ↳ You already have files (code, docs, drafts, decks).
        We'll interview you about what's there, then plumb
        it into the frame.

  [?] What's the difference, really?
```

Wait for the user's response.

---

## Step 2 — Route

| User response | Action |
|---------------|--------|
| `1` or "greenfield" or "new" | Invoke `/intake-new` (`02_intake_new_project.md`). |
| `2` or "import" or "existing" | Invoke `/intake-existing` (`03_intake_existing_project.md`). |
| `?` | Print the explainer (Step 3 below), then ask again. |
| Anything ambiguous | Ask one clarifying question, then route. |

---

## Step 3 — The explainer

Print:

```
The two intake flows differ in what they assume:

  Greenfield assumes the only thing you have is an idea.
  We'll talk through scope (what you're building, for whom,
  by when), then write the first session log and seed three
  starter tasks. ~5 minutes.

  Import-existing assumes you have files somewhere — maybe a
  folder of half-written chapters, a code repo, a deck plus
  research notes. We'll interview you about the structure,
  ask you to drop everything into an "intake" folder, then
  plumb it all into the frame. ~10–15 minutes.

If unsure: pick greenfield. You can import files later via
/intake-existing — it's idempotent.
```

Then re-ask the routing question.

---

## Step 4 — Pre-handoff sanity check (before invoking either intake)

Before calling the selected intake skill, confirm:

- `_session_log.md` is still empty (no entries appended since `/intro-card` ran). If it has entries, abort and tell the user: "Intake already started — pick up from the last session-log entry instead."
- `04_production_master_tasklist/00_Master_Tasklist.md` still has the stub state (no real tasks). If it has tasks, abort with the same message.

This prevents accidental double-intake.

---

## Hard rules

- This skill does not collect any project data itself. Its only job is routing.
- Do not invent a third path. If the user says "kind of both," default to import-existing — it can handle the case where there are partial files.
- Do not skip the explainer if the user asks for it. The cost is 60 seconds; the cost of confusion is the whole intake.
