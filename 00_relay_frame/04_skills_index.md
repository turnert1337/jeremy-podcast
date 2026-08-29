# 04 — Skills Index

Every skill that runs inside the Relay Frame. Two sections: frame-shipped (always available) and project-specific (added per project).

When a new skill is added, this index gets updated and the matching row in `CLAUDE.md` gets a pointer.

---

## Frame-shipped skills

### `01_setup_skills/` — Setup & intake

| # | Skill name | File | One-line purpose |
|---|------------|------|------------------|
| 00 | `/intro-card` | `01_setup_skills/00_intro_card.md` | ASCII welcome card + first-prompt for a clean frame |
| 01 | `/intake-router` | `01_setup_skills/01_intake_router.md` | Routes user to greenfield or import-existing interview |
| 02 | `/intake-new` | `01_setup_skills/02_intake_new_project.md` | Greenfield project interview |
| 03 | `/intake-existing` | `01_setup_skills/03_intake_existing_project.md` | Interview + import + plumb existing files |
| 04 | `/git-init` | `01_setup_skills/04_git_init.md` | Initialize local git and (optionally) save credentials |

### `02_session_skills/` — Session log + Frame Capacity + Frame Doctor + People List + Settings

| # | Skill name | File | One-line purpose |
|---|------------|------|------------------|
| 00 | `/session-log` | `02_session_skills/00_session_log_protocol.md` | End-of-session log entry with parallel fact-check + receipt |
| 01 | `/session-log-factcheck` | `02_session_skills/01_session_log_factcheck.md` | Validator wave called by `/session-log` |
| 02 | `/frame-capacity` | `02_session_skills/02_frame_capacity_render.md` | Renders the Frame Capacity Meter |
| 03 | `/people-list-update` | `02_session_skills/03_people_list_update.md` | Adds / updates entries in `_people_list.md`, fact-checked |
| 04 | `/log-customization` | `02_session_skills/04_log_customization.md` | Auto-fired on "from now on / always / never / by default" signals — edits the relevant frame file(s), then appends a dated entry to `_settings_and_customizations.md` |
| 05 | `/frame-doctor` | `02_session_skills/05_frame_doctor.md` | Cold-start preflight (parallel to `/frame-capacity`): 8-check health report — required files present, skill paths resolve, shim layer intact. Report-only. |

### `03_tasklist_skills/` — Tasklist maintenance

| # | Skill name | File | One-line purpose |
|---|------------|------|------------------|
| 00 | (reference) | `03_tasklist_skills/00_tasklist_agent.md` | Rules of engagement — NOT a skill, read first |
| 01 | `/refactor-tasklist` | `03_tasklist_skills/01_refactor_tasklist.md` | Coordinator: sweep → reorder → renumber → fact-check |
| 02 | `/sweep-tasks` | `03_tasklist_skills/02_sweep_tasks.md` | Move completed tasks to dated archive verbatim |
| 03 | `/reorder-tasks` | `03_tasklist_skills/03_reorder_tasks.md` | Reorder remaining tasks by status group + user priority |
| 04 | `/renumber-tasks` | `03_tasklist_skills/04_renumber_tasks.md` | Dedicated pass: ensure summary and detail numbers match 1:1 |
| 05 | `/tasklist-factcheck` | `03_tasklist_skills/05_tasklist_factcheck.md` | 3-validator parallel wave for sweep/reorder/renumber |

### `05_meeting_management/` — Meeting management module

| # | Skill name | File | One-line purpose |
|---|------------|------|------------------|
| 00 | (reference) | `05_meeting_management/00_module_rules.md` | Citation discipline + naming + propagation — read first |
| 01 | `/process-meeting` | `05_meeting_management/01_process_meeting.md` | Take raw transcript / Teams link; produce canonical processed file + propagate citations |
| 02 | `/plan-next-meeting` | `05_meeting_management/02_plan_next_meeting.md` | Build prep file in `3_future/` from people-list + recent meetings + tasklist |
| 03 | `/draft-meeting-request` | `05_meeting_management/03_draft_meeting_request.md` | Draft cold-intro / warm-reconnect email asking for a meeting (operator sends manually) |
| 04 | `/draft-email` | `05_meeting_management/04_draft_email.md` | Draft any email — reply, forward, status, fresh outbound (operator sends manually) |

> Templates: `05_meeting_management/_meeting_template.md` (canonical processed-meeting structure).
> Folders: `1_inbox/` (raw drops), `2_processed/` + `_raw/` (canonical files + frozen audit), `3_future/` (prep notes).
> Loaded **on demand only** — not part of the cold-start discovery chain. See `03_discovery_chain.md`.

### `06_presentation/` — Presentation module (GitHub Pages docs site)

| # | Skill name | File | One-line purpose |
|---|------------|------|------------------|
| 00 | (reference) | `06_presentation/00_module_rules.md` | Upstream/downstream + never-auto-publish + accordion invariant + verbatim strobing dot — read first |
| 01 | `/update-landing` | `06_presentation/01_update_landing.md` | Regenerate static sections of `docs/index.html` (hero, value cards, quick-start, related strip, footer) |
| 02 | `/update-features` | `06_presentation/02_update_features.md` | Re-flow the F&B accordion in `docs/index.html` from `00_relay_frame/05_features_and_benefits.md` |
| 03 | `/update-roadmap` | `06_presentation/03_update_roadmap.md` | Edit existing phases / dots / "now" indicator on `docs/roadmap.html` |
| 04 | `/add-milestone` | `06_presentation/04_add_milestone.md` | Append a new milestone (past/now/future) on the roadmap timeline |

> Templates: `06_presentation/_templates/accordion_item.html`, `_templates/milestone_dot.html`, `_templates/phase_card.html`.
> Output target: `docs/index.html`, `docs/roadmap.html`, `docs/styles/index.html` (style explorer hub) + `docs/styles/01_*.html` through `10_*.html` (design persona variants).
> Loaded **on demand only** — not part of the cold-start discovery chain. See `03_discovery_chain.md`.

### `07_team_skills/` — Team motions module (buddy-system multi-agent patterns)

| # | Skill name | File | One-line purpose |
|---|------------|------|------------------|
| 00 | (reference) | `07_team_skills/00_team_motions_overview.md` | Rules of engagement: 6 patterns catalog, sub-agent independence, quality gates, cost awareness, no nested teams beyond depth 1 — read first |
| 01 | `/team` | `07_team_skills/01_team.md` | Front-door coordinator: interviews the operator, picks the lightest pattern that fits, runs it on approval. Adversarial seasoning (red/blue) lives here too |
| 02 | `/persona-fan-out` | `07_team_skills/02_persona_fan_out.md` | N personas produce independently → Borda cross-rank. Optional producer/consumer split. The graphic-designer fan-out is the canonical example |
| 03 | `/buddy-build` | `07_team_skills/03_buddy_build.md` | Default for non-trivial builds. Builder + critiquer + optional independent validator |
| 04 | `/research-team` | `07_team_skills/04_research_team.md` | N parallel researchers + convergence quality gate (≥3 of N agree). Replaces ad-hoc "free-reign research team" referenced in `CLAUDE.md` Section 5 |
| 05 | `/validate` | `07_team_skills/05_validate.md` | Cheapest gate. Post-hoc check by a fresh sub-agent who sees only goal + deliverable |

> Read first: `07_team_skills/00_team_motions_overview.md` (the rulebook) and `07_team_skills/README.md` (the friendly intro).
> Loaded **on demand only** — not part of the cold-start discovery chain. See `03_discovery_chain.md`.
> Six patterns shipped: buddy build, independent validator, persona fan-out (with optional producer/consumer split), research team, adversarial seasoning, producer/consumer split. New patterns (tournament-bracket pairwise, jury-of-experts, devil's-advocate single-shot) can be added as `06_*` and up.

---

## Project-specific skills (reserved slot)

`99_project_skills/` is **empty by design**. When you add a project skill, append a row here AND add it to the matching table in `CLAUDE.md`.

| Skill name | File | One-line purpose |
|------------|------|------------------|
| _(none yet)_ | _(add here)_ | _(add here)_ |

### How to add a project skill

1. Create a Markdown file at `99_project_skills/NN_your_skill.md` — numbered sequentially.
2. Use the same structure as a frame-shipped skill: top-of-file purpose, when-to-invoke, step-by-step protocol, hard rules, fact-check (if relevant).
3. Add a row here and in `CLAUDE.md` section 3.
4. If the skill needs to be called by another skill, link it explicitly from the caller — never rely on the orchestrator to "find" it by name.

---

## Naming collisions

If a project skill shares a name with a frame-shipped skill, the frame skill wins. The orchestrator routes by file location, not by user-facing name.

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
