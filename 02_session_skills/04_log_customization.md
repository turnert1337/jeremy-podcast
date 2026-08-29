# Skill — `/log-customization`

**File:** `02_session_skills/04_log_customization.md`
**Invoked by:** auto-detected on any "from now on / always / every time / never / stop showing / start showing / change the default of" signal from the operator; can also be invoked manually.
**Purpose:** Append a dated entry to `_settings_and_customizations.md` AFTER the agent has actually edited the relevant frame file(s) to enforce the new behavior. The history file is the durable record of *why this frame looks the way it does*.

---

## When to run

The agent invokes this skill **automatically** when:

- The operator's request contains a recurrence signal: *"from now on, every time, always, never, by default, going forward, in future sessions, stop showing me, start showing me, change the default of, in this frame let's …"*
- AND the request changes how the frame behaves on cold start, during a session, or in a receipt / output.

Examples of statements that should trigger this skill:

| Operator says | What the agent does first | Then logs |
|---------------|--------------------------|-----------|
| "From now on, show me the open PRs table on cold start." | Edits `01_setup_skills/00_intro_card.md` to call a PR-pull and render a table. | "Added open-PR table to intro card." |
| "Stop printing the git line in the receipt — I don't care." | Edits `02_session_skills/00_session_log_protocol.md` Step 7 to drop the git line. | "Dropped git line from /session-log receipt." |
| "Default the tasklist palette to 🟥/🟨/🟩 instead of 🔴/🟡/✅." | Edits `03_tasklist_skills/00_tasklist_agent.md` + the tasklist template. | "Swapped tasklist status glyphs (🟥/🟨/🟩)." |
| "I want the people list read FIRST in the discovery chain." | Edits `00_relay_frame/03_discovery_chain.md` + `CLAUDE.md` Section 0 Step 5. | "Moved _people_list.md to position 1 in discovery chain." |
| "Frame Capacity 🟠 threshold should be 80%, not 90%." | Edits `00_relay_frame/01_frame_capacity_spec.md` + `02_session_skills/02_frame_capacity_render.md`. | "Lowered Frame Capacity 🟠 threshold to 80%." |

The skill does NOT trigger on:

- One-off requests ("just for this session, …"). Those leave no durable trace.
- Read-only operations ("show me the tasklist", "what's in the people list"). No infrastructure change.
- Operations the agent declined to perform ("on second thought, never mind"). Nothing was edited.

---

## Step 1 — Detect the signal

Scan the operator's request for one of the recurrence phrases above. If you detect one, **before doing anything else**, echo back a short confirmation:

```
That sounds like a frame customization (a "from now on" change).
I'll do two things:

  1. Edit the relevant file(s) to make the new behavior stick.
  2. Append a dated entry to _settings_and_customizations.md so
     this frame remembers it on every future cold start.

The change I'm hearing is:
  → [one-line restatement of the change]

Files I'll touch:
  → [list of file paths]

Look right?  [Y] / [edit]
```

Loop until the operator approves. If the operator says no, do nothing and don't log anything.

---

## Step 2 — Make the actual change FIRST

Edit the file(s) you committed to in Step 1. Use the Edit tool, preserve formatting, follow normal Relay Frame discipline (no summarization, copy-paste only, no improvised rewrites).

If any edit fails or you discover the change isn't actually possible (the file doesn't exist, the structure can't accommodate it, etc.), STOP. Do NOT proceed to Step 3. Surface the failure to the operator and ask what to do instead.

**No history entry is written unless the edit actually succeeded.** This is non-negotiable — the customization history must reflect reality.

---

## Step 3 — Compose the history entry

Format:

```
YYYY-MM-DD HH:MM · <short description> · <file1> · <file2> · ... · op: <invocation>
```

Field rules:

- **`YYYY-MM-DD HH:MM`** — local date/time the change was made. Use 24-hour. If the local clock is unavailable, use `YYYY-MM-DD ??:??`.
- **`short description`** — one phrase, present-tense, action-first. "Dropped git line from receipt." "Added open-PR table to intro card." Keep it under ~70 chars.
- **`files touched`** — one or more relative paths, separated by `·`. Use the path relative to `_Deliverable/` (e.g., `02_session_skills/00_session_log_protocol.md`).
- **`op:`** — either `op: operator-request` (the operator explicitly asked) or `op: agent-proposed` (the agent suggested it and the operator approved). Helps distinguish operator-driven from agent-driven changes when reading the history later.

Example:

```
2026-05-25 14:32 · Dropped git line from /session-log receipt · 02_session_skills/00_session_log_protocol.md · op: operator-request
```

---

## Step 4 — Prepend to the history list

Open `_settings_and_customizations.md`. Find the comment marker:

```html
<!-- The agent appends new entries below this line.
     Most-recent-first: prepend the new entry just below this comment.
     Never edit or remove existing entries. -->
```

Insert the new entry on the line directly below the marker. If the file still contains the seed text `_(No customizations recorded yet. This is a clean frame.)_`, delete that seed line as part of this same write. From the second entry onward, simply prepend above the existing top entry.

The resulting structure:

```markdown
<!-- The agent appends new entries below this line. ... -->

2026-05-25 14:32 · Dropped git line from /session-log receipt · 02_session_skills/00_session_log_protocol.md · op: operator-request

2026-05-25 11:08 · Added open-PR table to intro card · 01_setup_skills/00_intro_card.md · op: operator-request
```

Newest entries float to the top. The history grows downward.

---

## Step 5 — If the change introduces a NEW settings vector, add a row

Check the above-the-fold settings table in `_settings_and_customizations.md`. If the change you just made doesn't fit any existing row (e.g., the operator added a brand-new behavior the table didn't anticipate), append a new row:

| # | Setting | What flipping it does | Where the toggle lives |
|---|---------|----------------------|-----------------------|
| N | **New setting name** | One-line description. | `path/to/file.md` |

Where `N` is the next sequential number. This keeps the quick-reference table current.

If the change fits an existing row, skip this step.

---

## Step 6 — Print the receipt

This skill's receipt is intentionally tiny — it runs inline mid-session and shouldn't draw attention away from the operator's actual work:

```
🟢 customization logged · <short description>
   files: <comma-separated paths>
```

Two lines. No divider, no greeting. The operator's request continues from where it was.

---

## Step 7 — Final actions

- The file edit is done.
- The history entry is written.
- The settings table is updated if needed.
- The two-line receipt is printed.
- Resume whatever the operator was doing.

---

## Auto-detection (light)

If the operator says something that sounds like a customization but you're not sure, ask:

```
Quick check: should I treat that as a one-off (just for this
session) or a "from now on" change that I should bake into the
frame?

  [1] one-off · just this session
  [2] from now on · bake it in + log it
```

When in doubt, ask. Never edit infrastructure silently.

---

## Hard rules

- **Edit-first, log-second.** The history entry is written ONLY after the actual file edit succeeded. No optimistic logging.
- **No fabrication.** If the operator's request is ambiguous and the agent had to guess, that's a signal to ASK, not to log a guess. The history must reflect what really happened.
- **Append-only.** Never edit or delete an existing entry in the history list. Even reverts are logged as new entries.
- **Confirm before editing.** Step 1 always echoes the change back before Step 2 touches a file.
- **Refuse if scope balloons.** If a "from now on" request would touch >5 files, surface that and ask the operator to break it into smaller asks. Big customizations deserve discrete history entries.
- **Settings table stays curated.** Only add a row if the change introduces a genuinely new vector. Don't pollute the table with one-off rephrasings.
- **The settings doc is part of the discovery chain.** When you finish this skill, the agent is responsible for re-reading `_settings_and_customizations.md` on the next cold start — that's how customizations persist across sessions.
