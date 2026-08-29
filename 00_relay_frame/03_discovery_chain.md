# 03 — Discovery Chain

Every agent, every session, follows the same read-order. This file describes that order so the chain stays stable as the frame evolves.

---

## The chain

```
1. CLAUDE.md
        ↓
2. _session_log.md
        ↓
3. 04_production_master_tasklist/00_Master_Tasklist.md
        ↓
4. _people_list.md                   (if present — before email/meeting/who-to-ask work)
        ↓
5. _settings_and_customizations.md   (if present — operator's frame customizations)
        ↓
6. (on demand) skills under 0X_*_skills/  and  99_project_skills/
```

That's it. Six layers.

---

## Why this order

1. **`CLAUDE.md` first.** It's the entry point. It tells the agent what mode the frame is in (clean vs. in-use) and where everything else lives. It's also the only place that's read **unconditionally** on cold start.

2. **`_session_log.md` second.** Continuity beats discovery. If a session happened yesterday, the agent should know what it was about before it opens any other file. Reading this second means the agent's interpretation of the tasklist is already context-aware.

3. **`00_Master_Tasklist.md` third.** Now the agent knows the history (from the log) and reads the active state. This order means the agent never starts a session thinking the tasklist is the *only* source of truth — the log primes them to expect threads that may not yet be reflected in tasks.

4. **`_people_list.md` fourth.** Read after the master tasklist, before any skill invocation. The orchestrator pulls this file whenever the upcoming work is plausibly social: drafting an email, prepping for a meeting, deciding who to consult. Reading it here keeps that lookup cheap — the file is already in context when the operator asks.

5. **`_settings_and_customizations.md` fifth.** Read after the people list, before any skill invocation. The orchestrator pulls this file to pick up the operator's accumulated customizations — toggles, defaults, hidden/shown sections, custom prelude tables. Without this read, the agent re-does customizations the operator already requested. The file is optional (starts empty); skip silently if absent.

6. **Skills on demand.** Skills are read only when invoked. The CLAUDE.md skills table is the index — the actual files are not pulled into context until they're called. This keeps the cold-start small.

---

## What an agent does NOT read on cold start

- `_swept/NN_Complete_Sweep_*.md` — frozen history. Open only when explicitly referenced.
- Skill bodies — only the index table in CLAUDE.md.
- Anything in `00_relay_frame/` beyond what CLAUDE.md links to. The frame docs are reference material, not boot files.
- **`05_meeting_management/` contents** — the module is **loaded on demand only**. Reading every processed meeting on every session would blow the capacity budget. The module is engaged when the operator invokes a meeting skill (`/process-meeting`, `/plan-next-meeting`, `/draft-meeting-request`, `/draft-email`) or pastes content that obviously came from a meeting. CLAUDE.md Section 3.6 covers the engagement rules.
- **`06_presentation/` contents and `docs/` HTML** — the module is **loaded on demand only**. The published site is the "front of house" — the agent does not pre-load HTML on cold start. The module is engaged when the operator says "update the landing page", "the F&B accordion is stale", "move the now dot", "add a milestone", or "regenerate the docs site". CLAUDE.md Section 3.7 covers the engagement rules. The `docs/` HTML is downstream of the Markdown sources — never read it as a source of truth.

---

## When the chain breaks

If any of the chain files is missing, the orchestrator must:

| Missing file | Behavior |
|--------------|----------|
| `CLAUDE.md` | This is the frame's identity file. If absent, you are not in the Relay Frame. Stop. |
| `_session_log.md` | Treat as a clean frame. Run intake. |
| `00_Master_Tasklist.md` | Recreate from template at `04_production_master_tasklist/00_Master_Tasklist.md` (see the seeded version). |
| `_people_list.md` | Skip the people-list read silently — feature is optional. The orchestrator will offer to seed it during the next email/meeting prompt. |
| `05_meeting_management/` | Skip silently — the module is on-demand only. If a meeting skill is invoked and the module is missing, surface the missing folder and refuse to improvise. |
| `06_presentation/` | Skip silently — the module is on-demand only. If a presentation skill is invoked and the module is missing, surface the missing folder and refuse to improvise. |
| `docs/` | Skip silently — there's no published site yet. If a presentation skill is invoked and `docs/` is missing, the skill recreates the missing files from `06_presentation/_templates/`. |
| A specific skill | Surface the missing file by name. Do NOT improvise the skill's behavior from memory. Skills are the source of truth. |

---

## Discovery chain for the user (not just the agent)

A new team member opening the frame reads in this order to onboard:

1. `README.md` (in the root of `_Deliverable/`) — the handoff intro.
2. `CLAUDE.md` — what the agent reads when they load.
3. `00_relay_frame/00_overview.md` — what the frame *is*.
4. `00_relay_frame/02_session_log_template.md` — the format their work will land in.
5. `04_production_master_tasklist/00_Master_Tasklist.md` — where they'll be living day-to-day.

Skills come after that, lazily, when they encounter the thing the skill does.

---

## Stability promise

The chain in this file should not change between frame versions without a deliberate version bump (recorded in `CLAUDE.md`'s frame-version line). Skills and modules can be added, removed, renumbered — but the five-layer cold-start chain is a contract.

Modules that load on demand (like `05_meeting_management/` and `06_presentation/`) are explicitly NOT in the cold-start chain — they're engagement-gated. The cold-start chain stays small even as the frame grows.
