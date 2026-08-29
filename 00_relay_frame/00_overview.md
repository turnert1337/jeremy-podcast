# 00 — The Relay Frame Overview

**Read this once when you first encounter the frame.** Then you can refer back when something feels unclear.

---

## What The Relay Frame is

A general-purpose project-management scaffold designed so that whoever is currently holding the project can pass the baton cleanly — meaning anyone (including a stranger, an AI agent, or your future self after six weeks off) can pick up the project folder, open it, and be productive within a single sitting.

It works for any long-form project: code, a book, a slide deck, a research effort, a podcast season — anything with a multi-session lifecycle and decisions that pile up over time.

The frame is **opinionated** about three things:

1. **Verbatim memory.** Tasks are never summarized. Completed work is swept to dated archive files, not deleted.
2. **Every session ends in a log.** The log is the bridge between sessions.
3. **Skills are the durable part.** When a norm matters, it becomes a Markdown file in `0X_*_skills/`. Prose runbooks decay; skills don't, because they're executable behavior.

---

## The ten mechanics

| # | Mechanic | What it does | Lives at |
|---|----------|--------------|----------|
| 1 | **Top-level orchestrator** | First file an agent reads. Routes to everything else. Declares Opus 4.6 model preference. | `CLAUDE.md` |
| 2 | **Setup / intake** | One-time interview that initialises the frame to a project. | `01_setup_skills/` |
| 3 | **Session log** | Append-only, dated, per-session entry. The continuity spine. | `_session_log.md` + `02_session_skills/00_session_log_protocol.md` + `02_session_skills/01_session_log_factcheck.md` |
| 4 | **Master tasklist + sweeps** | Above-the-fold dashboard, below-the-fold verbatim detail blocks, sweep-don't-delete. | `04_production_master_tasklist/` + `03_tasklist_skills/` |
| 5 | **People list** | Roster of everyone involved — names, roles, channels, dated touchpoints. Read before any email/meeting/who-to-ask work. Updated via fact-checked confirmations only. | `_people_list.md` + `02_session_skills/03_people_list_update.md` |
| 6 | **Meeting management** | Universal clearing-house for meeting input. Three folders (`1_inbox/`, `2_processed/`, `3_future/`), four skills (process / plan / draft-meeting-request / draft-email), strict citation discipline that propagates meeting facts into the tasklist + people list with back-references. | `05_meeting_management/` |
| 7 | **Presentation** | GitHub Pages site that fronts the frame. Landing page with F&B accordion, roadmap page with strobing "now" dot, 10-variant style explorer. Four skills regenerate the HTML — Markdown is upstream, HTML is downstream. Never auto-publishes. | `06_presentation/` + `docs/` |
| 8 | **Settings & customizations** | Above-the-fold settings table + append-only history of every "from now on" change the operator has made. Read on every cold start so customizations persist across sessions. Edits to infrastructure are paired with a dated history entry — edit-first, log-second. | `_settings_and_customizations.md` + `02_session_skills/04_log_customization.md` |
| 9 | **Team motions** | Buddy-system multi-agent patterns: builder + critiquer + optional independent validator (`/buddy-build`); N personas + Borda cross-rank with optional producer/consumer split (`/persona-fan-out`); N parallel researchers + convergence quality gate (`/research-team`); post-hoc quality gate with clean-context validator (`/validate`); adversarial seasoning (red team vs blue team, inside `/team`). The orchestrator proposes a team motion whenever a deliverable will ship onward. | `07_team_skills/` |
| 10 | **Project-specific skills** | Reserved slot for custom skills you add per project. | `99_project_skills/` |

An eleventh, ambient thing that runs across all of them:

| # | Ambient | What it does | Lives at |
|---|---------|--------------|----------|
| 11 | **Frame Capacity Meter** | One-line indicator of how much of the usable context budget the cold-start files are consuming. Renders inside the intro card on cold start and as the final line of the session-log receipt. | `00_relay_frame/01_frame_capacity_spec.md` + `02_session_skills/02_frame_capacity_render.md` |

### What the Frame Capacity Meter means (in plain English)

When you load this frame, your AI agent has to read several files just to know what's going on (this overview, the session log, the master tasklist, the orchestrator). All those files take up space in the agent's working memory (its "context window"). Once that space fills up, the agent gets forgetful and starts making mistakes.

The Frame Capacity Meter estimates how much of the budget (default: 170,000 tokens, roughly ~640 KB of plain Markdown) the cold-start reading consumes. Output looks like:

```
Frame Capacity · 🟢 · 62k / 170k usable (37%)
```

(Renamed from "Frame Health Bar" — the meter measures *capacity used*, not *health*. The old name is preserved in the spec file for one cycle.)

Indicator meaning:
- **🟢** `< 80%` — healthy.
- **🟠** `80%–90%` — last 20%, time to sweep something.
- **🔴** `> 90%` — over budget for the safe zone, working memory will get spotty.

It's a smoke detector, not a thermostat — full math + thresholds are in `01_frame_capacity_spec.md`.

---

## The discovery chain

Every session, every agent, follows the same read-order:

```
CLAUDE.md  →  _session_log.md  →  00_Master_Tasklist.md  →  _people_list.md  →  _settings_and_customizations.md  →  skills (as needed)
```

Full description: `03_discovery_chain.md`.

---

## Design principles (so you know why it's shaped this way)

1. **Two readers, two reading speeds.** Above-the-fold table answers "what's active right now"; below-the-fold detail block answers "why does it look like this." Same source of truth.
2. **No summarization, ever.** Summaries lose the *why*. Refactor = copy-paste, reorder, renumber. Nothing more.
3. **Sweep, don't delete.** Completed work is preserved verbatim in dated `NN_Complete_Sweep_*.md` files. Storage is cheap; rewriting history is expensive.
4. **Skills over prose.** When a norm needs to survive the author, encode it as a skill file, not as a README paragraph.
5. **Receipts beat assertions.** When something runs, it prints a short receipt showing what changed. Diagnostics go BELOW the receipt, so a clean run reads as green lights only.
6. **Graceful degradation.** Missing git? Show the field as blank, not red. The frame doesn't punish absence.

---

## What this frame is NOT

- Not a code framework. It contains no source code — only Markdown specs and skill files.
- Not a SaaS. There is no server, no telemetry, no account.
- Not opinionated about the work itself. Whether you're writing Python, a novel, or a Keynote deck, the frame is the same.
- Not a handoff doc. Handoff docs written *for* handoff die within a quarter. The frame is a daily-driver toolkit that *also happens* to make handoff cheap.

---

## Sister documents

- `01_frame_capacity_spec.md` — how the Frame Capacity Meter is computed.
- `02_session_log_template.md` — the canonical session-log entry template.
- `03_discovery_chain.md` — the read-order chain in detail.
- `04_skills_index.md` — full skills index (shipped + project-specific slot).
- `05_features_and_benefits.md` — feature-by-feature summary in operator-facing language.
- `06_file_system_ethic.md` — naming and numbering conventions: numbered-folder load order, underscore-prefix live state, sequential numbering as a write-once contract, and where new artifacts belong. **Read this on Day 1.**
- `../_settings_and_customizations.md` — the operator's accumulated frame customizations: above-the-fold settings table + append-only history of every "from now on" change.
- `../02_session_skills/04_log_customization.md` — the skill that writes the entries (edit-first, log-second).
- `../06_presentation/00_module_rules.md` — presentation module rules (upstream/downstream, never-auto-publish, accordion invariant, verbatim strobing dot).
- `../07_team_skills/00_team_motions_overview.md` — team motions module rules (buddy-system principle, six patterns catalog, sub-agent independence, quality gates, cost awareness, no nested teams beyond depth 1).
- `../../Relay-Frame-Anatomy.md` — ASCII "exploded view" of all modules and their pipes (sits at the project root, outside `_Deliverable/`, so it can be edited independently of the shipping frame).

---

## Glossary (terms you might see across the frame)

- **AI agent / agent / orchestrator** — the AI coding assistant reading the frame. Could be Claude Code, Wibey, Cursor, Aider, or another tool that supports a top-level instruction file like `CLAUDE.md`.
- **Cold start** — the moment a fresh AI session loads the frame from disk. The Frame Capacity Meter measures this.
- **Operator** — whoever's working with the frame in a given session: the project owner, a teammate, a stranger picking it up after handoff, or an AI agent. We use "operator" rather than "user" to keep it neutral — the frame doesn't care who's driving.
- **Context window** — the agent's working memory. A finite number of tokens. When it fills up, the agent gets forgetful. The Frame Capacity Meter exists to warn before that happens.
- **Skill** — a Markdown file that encodes a repeatable workflow (a "command" the agent can call by name). Each skill is one file; the orchestrator routes by name.
- **Sub-agent** — a sub-task spawned by the main agent, often running in parallel. The "Subs:" count in the session-log entry tracks how many were spawned that session.
- **Sweep / refactor (tasklist)** — moving completed tasks from the live master tasklist into a dated archive file. Verbatim — no summarisation. See `03_tasklist_skills/00_tasklist_agent.md`.
- **Above the fold / below the fold** — the master tasklist is split into a summary table (active state, scannable) above and verbatim detail blocks (full history, searchable) below. The names borrow from newspaper layout, where "above the fold" was what readers saw without unfolding the paper.
- **Relay readiness** — the project's ability to be picked up by someone else (or your future self) without losing momentum. The whole frame exists to maximise this.
- **Frame Capacity** — see "What the Frame Capacity Meter means" above. A token-budget estimate, not a true measurement.
- **Citation discipline** — the rule that every fact that originates in a processed meeting and lands in another part of the frame (tasklist, people list, session log) carries a back-reference like `(learned in the meeting with NAME on YYYY-MM-DD — 05_meeting_management/2_processed/…)`. Defined in `05_meeting_management/00_module_rules.md`.
- **Processed meeting** — a canonical Markdown file in `05_meeting_management/2_processed/`, one per meeting, produced by `/process-meeting` from a raw transcript or link. Named `YYYY-MM-DD-with-slug.md`.
- **Module pattern** — the three-folder (`1_inbox/`, `2_processed/`, `3_future/`) + citation shape used by the Meeting Management module. Generalisable to any external fact stream (emails, interviews, support tickets, lab notes). See `05_meeting_management/00_module_rules.md` Section 7.
- **Presentation module / docs site** — `06_presentation/` owns the GitHub Pages site at `docs/`. The site has three surfaces: `docs/index.html` (landing + F&B accordion), `docs/roadmap.html` (phase tracker + strobing "now" dot), and `docs/styles/index.html` (style explorer with 10 design persona variants in iframe tabs). Markdown is upstream; HTML is downstream. The module never auto-publishes — `git push` is the operator's call. See `06_presentation/00_module_rules.md`.
- **Front of house / back of house** — newspaper-pressroom metaphor. `docs/` is "front of house" (what reviewers, execs, and future-self see first). The rest of `_Deliverable/` is "back of house" (the Markdown source files, skills, and persistent state the agent works with). The presentation module is the bridge — it regenerates the front of house from the back of house, never the other way round.
- **Strobing "now" dot** — the visual signature on the roadmap tracker. A small Spark-blue dot with an animated box-shadow pulse (2s ease-in-out keyframe, copied verbatim from the NACBP project) that marks the current phase. Never invent a custom strobe — the keyframe is invariant. See `06_presentation/00_module_rules.md`.
- **Settings & customizations** — the operator-driven tweak history. Lives at `_settings_and_customizations.md`. Two halves: above-the-fold settings table (common toggles like receipt indicators, capacity thresholds, default branch, tasklist palette) and below-the-fold append-only history (every "from now on / always / never" change, with files touched and a timestamp). The orchestrator reads it on every cold start and applies the most recent setting per vector (last-write-wins). The skill `/log-customization` writes the entries; edits to infrastructure happen FIRST, then the history entry is appended. The history is never edited or deleted — reverts are new entries.
- **Recurrence signal** — operator phrases the orchestrator listens for that imply a durable change to the frame: *"from now on, always, never, by default, every time, going forward, start showing me, stop showing me, change the default of, in future sessions."* When detected, the orchestrator confirms the inferred change, edits the relevant file(s), and logs the change to `_settings_and_customizations.md` via `/log-customization`.
- **Team motion / buddy system** — the discipline that any deliverable bound for an external consumer (operator, stakeholder, production, presentation) gets at least one independent reviewer before shipping. The frame ships six patterns in `07_team_skills/`: buddy build (builder + critiquer + optional validator), independent validator (post-hoc gate), persona fan-out (N producers + Borda cross-rank), research team (N parallel researchers + convergence gate), adversarial seasoning (red team vs blue team), and producer/consumer split (different cast judges than makes). Front door is `/team`; cheap default is `/buddy-build`; cheapest gate is `/validate`. Rules: `07_team_skills/00_team_motions_overview.md`.
- **Borda count** — the cross-rank scoring used by `/persona-fan-out`. Each judge ranks all N producers 1..N; rank 1 earns N points, rank N earns 1 point. Sum across judges; highest total wins. Symmetric (self-votes cancel out), low-bias, surfaces tight spreads honestly. Vignelli's grid won the frame's anatomy redesign 31–30 over Rams.
- **Convergence gate** — the quality bar used by `/research-team`. A finding is "converged" when ≥3 of N independent researchers report the same factual answer (or values within an explicit tolerance). Sub-convergence outcomes surface as ⚠ flags, not as smoothed averages.

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
