# Skill — `/intro-card`

**File:** `01_setup_skills/00_intro_card.md`
**Invoked by:** the top-level orchestrator at cold start, when `_session_log.md` has zero entries.
**Purpose:** Greet the operator with an ASCII card that doubles as an instrument cluster — frame name + version on the top half, Frame Capacity meter on the bottom half — then offer to start intake.

This skill runs **fast**. The whole point is that the operator sees something on screen immediately. Capacity is computed in parallel via a single `stat`/`wc -c` call (`/frame-capacity`) and folded into the card. If the meter isn't back yet, print the card anyway with a `…` placeholder and patch the meter line in as soon as the result arrives — never block the card on the meter.

---

## When to run

- On cold start.
- `_session_log.md` is empty (no `## YYYY-MM-DD -- Session N:` headings).
- Fires in parallel with `/frame-capacity` (the orchestrator dispatched them together — see `CLAUDE.md` Section 0).

If the session log is NOT empty, skip this skill. The orchestrator will print the capacity line on its own row and greet the operator with the "Next session starts with:" line from the most recent log entry.

---

## Step 1 — Render the intro card (with capacity baked in)

Print this card as a single block. The bottom strip is the instrument-cluster row — drop the Frame Capacity line from `/frame-capacity` directly into it:

```
╭──────────────────────────────────────────────────────────────╮
│                                                              │
│             ✦  CLEAN RELAY FRAME  ✦                          │
│                                                              │
│    A general-purpose project-management scaffold.            │
│    Works for code, books, slide decks, research —            │
│    anything with a multi-session lifecycle.                  │
│                                                              │
│    Frame version: MVP draft 1 · 2026-05-23                   │
│                                                              │
│    ──────────────────────────────────────────────────────    │
│    Frame Capacity · 🟢 · 38k / 170k usable (22%)             │
│    ──────────────────────────────────────────────────────    │
│                                                              │
╰──────────────────────────────────────────────────────────────╯
```

Notes on the capacity row:

- The full string from `/frame-capacity` slots in verbatim. If the indicator is 🟠 or 🔴, the explanation line that normally follows the meter is printed BELOW the card (not inside it) — the card stays one fixed shape.
- If `/frame-capacity` hasn't returned yet when the card is ready to print, print the card with `Frame Capacity · … · computing…` in the slot, then patch the real line in as soon as the result lands. Do NOT delay the card.
- If `/frame-capacity` errored, print `Frame Capacity · ⚪ · unavailable — see diagnostics` in the slot and add a Diagnostics line below the card.

---

## Step 2 — Offer intake

Immediately under the card, print:

```
The session log is empty. The tasklist is a stub. No project
is loaded yet.

Would you like to run the intake interview now?

  [Y] Yes — start the intake interview (recommended)
  [N] No  — I'll poke around first; remind me later
  [?] Tell me more before I decide
```

Wait for the operator's response.

---

## Step 3 — Route based on response

| Operator response | Action |
|-------------------|--------|
| `Y` or any "yes" variant | Invoke `/intake-router` (`01_setup_skills/01_intake_router.md`). |
| `N` or "later" | Tell the operator: "Cool. When you're ready, ask me to run intake — I'll pick up here." Stop. Do not auto-run anything. |
| `?` or any question | Print the short explainer (Step 4 below), then ask again. |
| Anything else | Treat as a free-form question. Answer briefly, then ask again. |

---

## Step 4 — The short explainer (if operator asks "tell me more")

Print:

```
The intake interview is a short conversation (5–10 minutes)
that does these things:

  1. Captures the project's scope, goal, and outcome.
  2. Detects whether you're starting fresh or importing files
     from an existing project.
  3. Writes the first session-log entry and seeds the
     master tasklist with your first 1–3 tasks.
  4. Seeds _people_list.md with the people you mention.
  5. (Optional) Initialises a local git repo for the frame.

You can re-run intake at any time. Nothing is destroyed if
you change your mind.

Ready?

  [Y] Yes  /  [N] Not yet
```

---

## Hard rules

- **Print fast.** The card must be on screen within the first second. Never block on the capacity meter — print with a placeholder and patch.
- **Do not skip the card.** It's part of the frame's identity — the operator should see it the first time they meet the frame.
- **Do not modify the card text on the fly.** If you need to change it, update this file.
- **Do not auto-run intake.** The operator must explicitly opt in. The "clean frame" experience matters more than convenience here.
- **Do not print this card if the session log already has entries.** That's the wrong context for a "clean frame" greeting.
- **Capacity explanation lives below the card, not inside it.** The card has a fixed shape. Diagnostics, 🟠/🔴 explanations, and routing prompts all land underneath.
