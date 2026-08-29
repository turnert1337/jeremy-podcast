# Frame Settings & Customizations

> **What this is.** A single rolling list of every customization the operator has applied to this frame since cold start. The frame ships clean (no entries); each time you change how the frame behaves — show a different table on startup, change the receipt format, hide a section, add a hotkey, rename a label — a dated entry lands here. Read this on every cold start so the agent picks up where the operator left off.
>
> **The contract.** When the operator says something like *"show me this table on startup every time now,"* or *"stop printing the people-list line in the receipt,"* or *"the next-session line should always be in bold,"* the agent does two things:
> 1. Modifies the actual frame infrastructure (the relevant skill file, template, or orchestrator section) to enforce the new behavior, AND
> 2. Appends a one-line entry below with the date, time, what changed, and which file(s) were touched.
>
> The skill that adds entries here is `/log-customization` (`02_session_skills/04_log_customization.md`). It's invoked automatically when the agent detects a "from now on / every time / always / never" signal in the operator's request and confirms the inferred change with the operator before writing.
>
> **No summarization. Append-only.** Entries are never edited or deleted, even when the customization is later reverted (a revert is logged as its own entry). The point of this file is to be the durable history of *why this frame looks the way it does*. Sweep-don't-delete, same discipline as the master tasklist.

---

## Settings you may want to toggle (above-the-fold quick reference)

This block lists customization vectors the agent will surface to the operator on request. None of these are active by default — flip them by asking the agent.

| # | Setting | What flipping it does | Where the toggle lives |
|---|---------|----------------------|-----------------------|
| 1 | **Cold-start prelude table** | Show a custom table or block at the top of every cold-start greeting (e.g., "today's three priorities", "open PRs", "weekly stand-up notes"). | Edits `01_setup_skills/00_intro_card.md` (clean frame) or the cold-start greeting block in `CLAUDE.md` Section 0 (in-use frame). |
| 2 | **Receipt indicator set** | Add or drop `🟢` lines in the `/session-log` outro receipt (e.g., add a `🟢 calendar sync` line if you wire one up). | Edits `02_session_skills/00_session_log_protocol.md` Step 7. |
| 3 | **Frame Capacity thresholds** | Change the 🟢/🟠/🔴 cutoffs from the defaults (🟢 `< 80%` · 🟠 `80%–90%` · 🔴 `> 90%`). | Edits `00_relay_frame/01_frame_capacity_spec.md` + `02_session_skills/02_frame_capacity_render.md`. |
| 4 | **Auto-commit cadence** | Default is one commit per `/session-log`. Operator can change to per-task, per-day, or off entirely. | Edits `02_session_skills/00_session_log_protocol.md` Step 5 + `01_setup_skills/04_git_init.md` Step 7. |
| 5 | **Default branch** | What `git init` lands on (default: `main`). | Edits `01_setup_skills/04_git_init.md` Step 3. |
| 6 | **Tasklist status palette** | Default is `🟡 / 🔴 / 🟠 / ⚪ / ✅` for in-progress / not-started / waiting-on / parked / complete. The 🟠 row's detail block names what it's waiting on (e.g., *waiting on Priya · waiting on legal*). Operator can swap glyphs. | Edits `03_tasklist_skills/00_tasklist_agent.md` + the tasklist template. |
| 7 | **Discovery chain order** | Default is `_session_log → 00_Master_Tasklist → _people_list`. Operator can reorder. | Edits `00_relay_frame/03_discovery_chain.md` + `CLAUDE.md` Section 0 Step 4. |
| 8 | **Sweep filename pattern** | Default is `NN_Complete_Sweep_YYYY-MM-DD.md`. Operator can rename. | Edits `03_tasklist_skills/02_sweep_tasks.md`. |
| 9 | **People-list verbosity** | Default is one-line touchpoints. Operator can switch to full meeting summaries inline. | Edits `02_session_skills/03_people_list_update.md`. |
| 10 | **Style explorer default variant** | Default is `01_walmart_corporate.html`. Operator can set any of the 10 personas as the canonical render. | Edits `docs/styles/index.html` (which variant loads first). |

> **How to flip any of these.** Tell the agent in plain English: *"From now on, default the tasklist palette to 🟥/🟨/🟩."* The agent will ask one clarifying question if needed, edit the relevant file(s), then append an entry to the history list below. You don't need to remember which file lives where — the agent does.

> **You can add more settings.** This is not a closed list. Anything in the frame is customizable. The above are just common toggles; the moment you ask for something not listed, the agent will edit the right file AND add the toggle to this table.

---

## Customization history (append-only, newest at the top)

> Format per entry: `YYYY-MM-DD HH:MM · short description · files touched · invoked by`
>
> One line per change. If a change touches multiple files, list them on the same line separated by `·`. If a customization is reverted, log the revert as a new entry — never edit history.

<!-- The agent appends new entries below this line.
     Most-recent-first: prepend the new entry just below this comment.
     Never edit or remove existing entries. -->

_(No customizations recorded yet. This is a clean frame.)_

---

## Hard rules (read before editing this file)

1. **Append-only history.** New entries go at the top of the customization history list, below the comment marker. Never edit or delete an existing entry.
2. **Settings table is editable, history is not.** The above-the-fold settings table is a quick reference — when a new customization vector emerges, add a row here. But the history below stays immutable.
3. **Every customization that changes frame behavior MUST be logged here.** If the agent edits a skill file in response to a "from now on" request and forgets to log it, that's a bug — fact-check the next session's customization summary against `git diff` to catch it.
4. **Read on every cold start.** This file is part of the discovery chain. The agent picks up the operator's accumulated preferences from this file, not from memory.
5. **No fabrication.** The agent never adds a history entry for a change it didn't actually make. If a file edit failed, the history entry is not written.

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
