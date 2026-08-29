# The Relay Frame

> A general-purpose project-management scaffold designed so anyone can pick up a project folder and be productive within a single sitting.

**Version:** MVP draft 2 · 2026-05-25

---

## What is this?

The Relay Frame is a copy-out-able, GitHub-distributable scaffold that gives any long-term project a daily-driver toolkit. Works for code, books, slide decks, research, podcasts — anything with a multi-session lifecycle.

It ships with ten mechanics:

1. **Top-level orchestrator** (`CLAUDE.md`) — boots the frame, gates skill use. Declares Opus 4.6 as the preferred model tier.
2. **Setup / intake** (`01_setup_skills/`) — a one-time interview that initialises the frame to your project.
3. **Session log** (`_session_log.md` + `02_session_skills/`) — the continuity spine between sessions. Append-only, with a fact-checked receipt.
4. **Master tasklist + sweeps** (`04_production_master_tasklist/` + `03_tasklist_skills/`) — two-tier dashboard / receipts, with no-summarization discipline.
5. **People list** (`_people_list.md` + `02_session_skills/03_people_list_update.md`) — fact-checked roster of everyone involved in the project, with dated touchpoints. Auto-detected from session signals; consulted before any email/meeting/who-to-ask work.
6. **Meeting management** (`05_meeting_management/`) — universal clearing-house for meeting input. Three folders (`1_inbox/`, `2_processed/`, `3_future/`), four skills (process / plan / draft-meeting-request / draft-email), strict citation discipline so every fact that leaves a meeting and lands in the tasklist or people list carries a back-reference.
7. **Presentation** (`06_presentation/` + `docs/`) — GitHub Pages site that fronts the frame. Landing page with an F&B accordion (8 modules), a roadmap page with a strobing "now" dot, and a 10-variant style explorer. Four skills (`/update-landing`, `/update-features`, `/update-roadmap`, `/add-milestone`) regenerate the HTML — Markdown is upstream; HTML is downstream. Never auto-publishes.
8. **Settings & customizations** (`_settings_and_customizations.md` + `02_session_skills/04_log_customization.md`) — above-the-fold settings table + append-only history of every "from now on" change. Read on every cold start so the operator's preferences persist across sessions. Edits to infrastructure happen first; the history entry lands after.
9. **Team motions** (`07_team_skills/`) — buddy-system multi-agent patterns. Five skills (`/team`, `/buddy-build`, `/persona-fan-out`, `/research-team`, `/validate`) covering six patterns: buddy build, independent validator, persona fan-out (with Borda cross-rank + optional producer/consumer split), research team (with convergence quality gate), adversarial seasoning (red team vs blue team). The principle: anything delivered for a purpose almost always needs an independent validator. The orchestrator proposes a team motion whenever a deliverable will ship onward.
10. **Project-specific skills** (`99_project_skills/`) — empty by design; drop your custom skills here.

Plus an ambient eleventh:

11. **Frame Capacity Meter** — one-line indicator of how much context the cold-start files are consuming. 🟢 / 🟠 / 🔴. Embedded in the intro card on cold start (instrument-cluster row) and rendered as the final line of the session-log receipt at end of session.

---

## How to use it (the 5-minute version)

### If you're the team member receiving this frame

1. **Clone the repo** to your machine.
2. **Open it in Wibey / Claude Code / your AI coding tool of choice.** The orchestrator at `CLAUDE.md` auto-loads.
3. **The frame is clean** — `_session_log.md` is empty, `00_Master_Tasklist.md` is a stub, `_people_list.md` is a stub. The orchestrator prints an ASCII welcome card (with the Frame Capacity meter embedded as the bottom row) and offers to run the intake interview.
4. **Run intake** when you're ready. It takes 5–15 minutes depending on whether you're greenfield or importing existing files. The intake seeds the master tasklist AND the people list.
5. **Work normally.** Mention people as you go; the orchestrator detects new names and offers to add them to the people list with confirmation. When you wrap a session, say "log this session" and the `/session-log` skill writes an entry, fact-checks it in parallel, optionally commits to git, and prints a green-light receipt — including a positive-signal line if the people list grew this session.

That's it. Everything else is encoded as skills you call by name; the orchestrator routes for you.

### First 60 seconds (human edition)

The frame is a Markdown scaffold — it does nothing until an AI agent reads it. If you've just opened it cold and nothing's happening, paste this into your AI tool to wake it up:

> Read CLAUDE.md and run the cold-start checklist. Treat this as a Clean Relay Frame.

The agent will then:
- Notice the session log is empty.
- Print the ASCII intro card (with the Frame Capacity meter embedded in the bottom row) and ask if you want to run intake.

The card prints fast — the capacity meter uses a single batched size lookup, not file-content reads, so the operator sees something on screen within the first second.

If your AI tool isn't on the supported list (Wibey, Claude Code, Cursor with CLAUDE.md support, etc.), you can still use the frame manually — every skill in `0X_*_skills/` is a Markdown file you can follow by hand. It's slower, but the structure works the same.

### Will I lose work if I customise the frame?

No. The frame ships as a clean starting point. Once you run intake, your project files, session log, and master tasklist are yours — nothing in the frame's update path overwrites them. If you fork the frame and we ship a newer version, you'll be the one merging changes (a `/update-frame` skill is on the roadmap to make this easier).

The only files the frame *expects* to own going forward are the skill files under `01_setup_skills/`, `02_session_skills/`, `03_tasklist_skills/`, and the `00_relay_frame/` docs. Anything you put in `99_project_skills/` is yours.

---

## Folder layout

```
.
├── README.md                                  # you are here
├── CLAUDE.md                                  # top-level orchestrator
├── _session_log.md                            # append-only session log (starts empty)
├── _people_list.md                            # roster of involved people (starts as a stub)
├── _settings_and_customizations.md            # settings table + append-only history of "from now on" changes (starts clean)
│
├── 00_relay_frame/                         # FRAME DOCS — overview, specs, templates
│   ├── 00_overview.md                         #   what the frame is + the nine mechanics
│   ├── 01_frame_capacity_spec.md              #   how the Frame Capacity Meter works
│   ├── 02_session_log_template.md             #   canonical session-log entry template
│   ├── 03_discovery_chain.md                  #   the read-order chain
│   ├── 04_skills_index.md                     #   full skills index
│   ├── 05_features_and_benefits.md            #   feature → benefit catalog (operator voice)
│   └── 06_file_system_ethic.md                #   naming + numbering + where new artifacts go (Day-1 read)
│
├── 01_setup_skills/                           # FRAME-SHIPPED SETUP SKILLS
│   ├── 00_intro_card.md                       #   /intro-card
│   ├── 01_intake_router.md                    #   /intake-router
│   ├── 02_intake_new_project.md               #   /intake-new
│   ├── 03_intake_existing_project.md          #   /intake-existing
│   └── 04_git_init.md                         #   /git-init (branch tracking starts here)
│
├── 02_session_skills/                         # FRAME-SHIPPED SESSION SKILLS
│   ├── 00_session_log_protocol.md             #   /session-log
│   ├── 01_session_log_factcheck.md            #   /session-log-factcheck
│   ├── 02_frame_capacity_render.md            #   /frame-capacity
│   ├── 03_people_list_update.md               #   /people-list-update
│   ├── 04_log_customization.md                #   /log-customization (writes to _settings_and_customizations.md)
│   └── 05_frame_doctor.md                     #   /frame-doctor (cold-start preflight, parallel to /frame-capacity)
│
├── 03_tasklist_skills/                        # FRAME-SHIPPED TASKLIST SKILLS
│   ├── 00_tasklist_agent.md                   #   rules of engagement (read first)
│   ├── 01_refactor_tasklist.md                #   /refactor-tasklist
│   ├── 02_sweep_tasks.md                      #   /sweep-tasks
│   ├── 03_reorder_tasks.md                    #   /reorder-tasks
│   ├── 04_renumber_tasks.md                   #   /renumber-tasks
│   └── 05_tasklist_factcheck.md               #   /tasklist-factcheck
│
├── 04_production_master_tasklist/             # LIVE TASKLIST
│   ├── 00_Master_Tasklist.md                  #   active tasks (starts as a stub)
│   └── _swept/                                #   dated sweep files land here
│       └── .gitkeep
│
├── 05_meeting_management/                     # MEETING MANAGEMENT MODULE
│   ├── README.md                              #   module overview
│   ├── 00_module_rules.md                     #   citation discipline + naming + propagation
│   ├── _meeting_template.md                   #   canonical processed-meeting template
│   ├── 01_process_meeting.md                  #   /process-meeting
│   ├── 02_plan_next_meeting.md                #   /plan-next-meeting
│   ├── 03_draft_meeting_request.md            #   /draft-meeting-request
│   ├── 04_draft_email.md                      #   /draft-email
│   ├── 1_inbox/                               #   raw drop zone
│   ├── 2_processed/                           #   canonical Markdown per meeting
│   │   └── _raw/                              #   original source files (frozen)
│   └── 3_future/                              #   agendas + prep notes
│
├── 06_presentation/                           # PRESENTATION MODULE
│   ├── README.md                              #   module overview
│   ├── 00_module_rules.md                     #   copy upstream / never auto-publish / no broken links
│   ├── 01_update_landing.md                   #   /update-landing
│   ├── 02_update_features.md                  #   /update-features
│   ├── 03_update_roadmap.md                   #   /update-roadmap
│   ├── 04_add_milestone.md                    #   /add-milestone
│   └── _templates/                            #   accordion item + milestone dot + phase card
│
├── 07_team_skills/                            # TEAM MOTIONS MODULE (buddy-system multi-agent)
│   ├── README.md                              #   module overview + 6 patterns
│   ├── 00_team_motions_overview.md            #   rules of engagement (read first)
│   ├── 01_team.md                             #   /team — front-door coordinator
│   ├── 02_persona_fan_out.md                  #   /persona-fan-out — N personas + Borda cross-rank
│   ├── 03_buddy_build.md                      #   /buddy-build — builder + critiquer + validator
│   ├── 04_research_team.md                    #   /research-team — N researchers + convergence gate
│   └── 05_validate.md                         #   /validate — post-hoc quality gate
│
├── .claude/commands/                          # CLAUDE CODE SLASH-COMMAND SHIMS
│   └── <slug>.md                              #   thin routers to the path-canonical skill files (one per skill)
│
├── docs/                                      # GITHUB PAGES SITE (the front of house)
│   ├── README.md                              #   "don't hand-edit" note
│   ├── index.html                             #   landing + F&B accordion (8 modules)
│   ├── roadmap.html                           #   phase tracker + strobing "now" dot
│   ├── styles/                                #   10 design persona variants
│   │   ├── index.html                         #     style explorer hub (tabs/iframe)
│   │   ├── 01_walmart_corporate.html
│   │   ├── 02_editorial_magazine.html
│   │   ├── 03_terminal_developer.html
│   │   ├── 04_operator_console.html
│   │   ├── 05_swiss_minimalist.html
│   │   ├── 06_notion_docs.html
│   │   ├── 07_apple_marketing.html
│   │   ├── 08_vintage_engineering.html
│   │   ├── 09_glassmorphic_vercel.html
│   │   └── 10_print_newspaper.html
│   └── assets/                                #   reserved for images (logo is inline SVG)
│
└── 99_project_skills/                         # YOUR CUSTOM SKILLS (empty by design)
    └── README.md                              #   how to add a project skill
```

> An ASCII "anatomy" diagram of the frame (modules, connections, pipes) lives at the project root: `Relay-Frame-Anatomy.md` — outside `_Deliverable/` because it's a working document about the deliverable, not part of it.

---

## Reading order if you want to understand the design

1. **`README.md`** (this file).
2. **`CLAUDE.md`** — what the agent reads when they load.
3. **`00_relay_frame/00_overview.md`** — the nine mechanics, design principles, **and a glossary** for any jargon.
3a. **`00_relay_frame/06_file_system_ethic.md`** — the naming + numbering conventions (numbered folders, underscore-prefix live state, sequential numbering as a write-once contract, where new artifacts go). Day-1 read so you don't have to reverse-engineer the conventions from existing files.
4. **`docs/index.html`** — the visual front door. Open in a browser; tour the F&B accordion; then jump to `docs/roadmap.html`.
5. **`00_relay_frame/05_features_and_benefits.md`** — every feature in the frame, organised by module, with side-by-side feature/benefit tables (this is the source upstream of the HTML accordion).
6. **`03_tasklist_skills/00_tasklist_agent.md`** — the no-summarization, sweep-don't-delete rulebook. Read this before touching the master tasklist — it defines the data model.
7. **`05_meeting_management/00_module_rules.md`** — citation discipline, naming conventions, propagation rules. Read before processing your first meeting.
8. **`06_presentation/00_module_rules.md`** — the discipline around the published docs site. Read before changing anything in `docs/`.
9. **`07_team_skills/00_team_motions_overview.md`** — the buddy-system patterns + rules of engagement (sub-agent independence, quality gates, cost awareness, no nested teams). Read before invoking `/team`, `/buddy-build`, `/persona-fan-out`, `/research-team`, or `/validate`.
10. **`_settings_and_customizations.md`** — operator-driven customization history. Read to understand what "from now on" changes look like and how the orchestrator picks them up on cold start. Paired skill: `02_session_skills/04_log_customization.md`.
11. **`00_relay_frame/02_session_log_template.md`** — the format your work will land in at the end of each session.
12. **`00_relay_frame/03_discovery_chain.md`** — how every session boots.
13. **`00_relay_frame/01_frame_capacity_spec.md`** — what the Frame Capacity Meter means and how it's computed.
14. The skills themselves, lazily, when you encounter what they do.

---

## Design opinions baked in

- **Verbatim memory.** Tasks are never summarized. Completed work is swept to dated archive files, not deleted.
- **Every session ends in a log.** The log is the bridge between sessions. The receipt is green-lights-only on a clean run; diagnostics live below the frame.
- **Skills over prose.** When a norm matters enough to encode, it becomes a Markdown skill file. Prose runbooks decay; skills don't.
- **Two readers, two reading speeds.** Above-the-fold table for "what's active right now"; below-the-fold detail blocks for "why does it look like this." Same source of truth.
- **Graceful degradation.** Missing git? Show the field as blank, not red. Missing prerequisite? Surface honestly, don't punish.

---

## What's NOT in this frame (and why)

- **No source code.** This is a Markdown scaffold. No build step, no dependencies.
- **No telemetry.** Frame stats, if any, are local-only.
- **No `/handoff` skill (yet).** Named in the original pass-the-baton thesis; deferred to roadmap.
- **No `/pickup` context module (yet).** The session log captures "next session starts with:" — the read-side priming counterpart is on the roadmap.
- **No multi-pickup support (yet).** Roadmap.

See the project root's `Relay-Frame-Roadmap.md` (outside this folder) for the full deferred-feature list.

---

## Common friction (FAQ)

**Q. I replied "`/validate` is good, move forward" and the agent said "unknown command: /validate". What happened?**

The Claude Code harness dispatches anything that **starts a message with a slash** as a literal command. When the orchestrator asked "want me to run `/validate`?", and the operator echoed it back conversationally, the parser saw `/validate is good, move forward` and tried to dispatch `validate is good, move forward` as the command — which doesn't exist.

The frame's fix (CLAUDE.md Section 3.10) is two-sided:

- The orchestrator stops slash-prefixing skill names in question prompts. It writes "want me to run validate?" not "want me to run `/validate`?" so the natural echo doesn't trip the parser.
- The orchestrator treats mid-sentence `/skill-name` references as soft references (run the skill or propose it), never as failed dispatches.

If you still hit "unknown command" on a leading-slash command, it's a real typo or an unshipped skill — the agent will name the closest match.

---

## License & attribution

Free to use, fork, modify. Attribution appreciated:

> The Relay Frame, MVP draft 2, 2026-05-25

Built on top of mechanics first developed in the CA Casepack Detection project. The session-log template is road-tested across multiple internal projects. The tasklist refactor mechanics are cloned from the same project and hardened (the renumber pass is now a dedicated skill — see `03_tasklist_skills/04_renumber_tasks.md`).

---

## Questions / contributions

This is an MVP draft. Friction points, broken assumptions, and "this confused me" reports are all welcome.

🌀 Magic applied with [Wibey VS Code Extension](https://wibey.walmart.com/code) 🪄
