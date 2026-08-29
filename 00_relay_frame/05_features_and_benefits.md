# 05 — Features and Benefits of the Relay Frame

> A module-by-module catalog in operator-facing language. Each row is a feature on the left and the operator benefit on the right.
>
> "Operator" is anyone driving the frame — project owner, teammate, handoff stranger, or AI agent.

---

## What an operator actually notices

Nine wins users won't expect — the ones that make the frame feel different inside the first hour:

| Feature | Why the operator cares |
|---------|------------------------|
| **Fast first paint.** Intro card or last-session greeting prints in well under a second, with capacity computed in parallel. | No blank-screen wait. Oriented before they finish blinking. |
| **Verbatim memory.** Tasklist refactors are copy-paste / reorder / renumber only — content is never trimmed, reworded, or "cleaned up." | The *why* of every decision survives. Six weeks later you can read why a task was de-prioritised, not guess. |
| **"Next session starts with:" line.** Every session-log entry ends with a single sentence pointing to the next action. | Resuming a project after a gap takes under a minute. No "where was I?" tax. |
| **Citations everywhere.** Every fact that comes from a meeting carries `(learned in the meeting with NAME on YYYY-MM-DD — 05_meeting_management/2_processed/…)`. | "Where did this come from?" is always answerable. Track-back is free. |
| **Never auto-sends.** Email drafts, meeting requests — all produced for operator review. No MTA, no clipboard hijack. | Your name only goes out the door when *you* choose. Trust is preserved. |
| **Green-light receipt.** Session close prints a fixed-width row of 🟢 / ⚪ / 🟠 markers. Diagnostics live below the frame, never inside it. | One glance and you know the session succeeded. A green receipt is never a lie. |
| **People list grows itself.** Operator mentions a name → orchestrator offers a one-click add, confirms, fact-checks. | The social graph builds as you work. No separate "update contacts" chore. |
| **Frame Capacity meter.** One line: 🟢 / 🟠 / 🔴 + percent of the 170k usable budget, baked into the greeting. | Smoke detector for context overflow. When it goes 🟠, sweep the tasklist. |
| **Team motions on demand.** When something is non-trivial, the orchestrator proposes a team — `/buddy-build` (builder + critiquer), `/persona-fan-out` (10 personas + Borda cross-rank), `/research-team` (parallel researchers + convergence gate), `/validate` (post-hoc gate). The operator opts in; costs are shown before spawning. | Novice operators get expert-team horsepower without expert-team coordination. The buddy system fires by default for anything that ships onward — no solo agent shipping mediocre output. |

The rest of this doc is the module tour. Each module owns a folder (or root file) and ships with its own skills.

---

## Modules

| # | Module | Lives at |
|---|--------|----------|
| A | Top-level orchestrator (+ cold start) | `CLAUDE.md` |
| B | Session continuity | `_session_log.md` + `02_session_skills/00–02` |
| C | Master tasklist | `04_production_master_tasklist/` + `03_tasklist_skills/` |
| D | People list | `_people_list.md` + `02_session_skills/03_people_list_update.md` |
| E | Meeting management | `05_meeting_management/` |
| F | Intake | `01_setup_skills/` |
| G | Frame self-awareness | `00_relay_frame/` |
| H | Extensibility + operator-respect | `99_project_skills/` + woven throughout |
| I | Team motions (buddy-system multi-agent) | `07_team_skills/` |

---

## Module A — Top-level orchestrator (cold start lives here)

**What it is:** A single Markdown file at the frame root (`CLAUDE.md`) that auto-loads on every session. Contains the cold-start checklist, model preference, skills index, hard rules, and pointers.

| Feature | Operator benefit |
|---------|------------------|
| **One auto-loading file.** AI tools (Wibey, Claude Code, Cursor, Aider) all read `CLAUDE.md` first. | Never have to remember "where do I start." Whatever tool opens the frame produces a useful first response in seconds. |
| **Cold start with capacity baked in.** Intro card (clean frame) or "next session starts with" line (in-use). Capacity meter is folded into the first visible output, never a serial blocker. | Fast first paint AND a context-budget signal in the same glance. |
| **Opus 4.6 preference.** Top of `CLAUDE.md` declares the model tier. Below-tier models get a one-line "may degrade" notice; frame still operates. | Quality expectations set up front. Frame degrades gracefully on smaller models. |
| **Hard rules in one place.** Never summarise, never overwrite the session log, never auto-send email — listed in Section 4. | The agent can't drift. Safety-critical rules live where they're loaded every session. |

**Spec:** `CLAUDE.md`. **Cold-start skill:** `01_setup_skills/00_intro_card.md`.

---

## Module B — Session continuity

**What it is:** Append-only session log + fixed-width receipt + four-validator parallel fact-check.

| Feature | Operator benefit |
|---------|------------------|
| **Append-only log.** `_session_log.md` at frame root. New entries on top; old entries never edited. | After a gap, read the top entry and immediately know what happened, what was decided, what's next. |
| **"Next session starts with:" line + status snapshot.** Every entry ends with the next action AND a one-line-per-task summary of tasklist state at that moment. | Re-orienting takes under a minute. The log preserves a moving picture of the project. |
| **Green-light receipt + diagnostics outside the frame.** Status lines + instrument cluster print in a never-wrap fixed-width block. Validator failures appear *below* the receipt. | A green receipt is never a lie. Failures are visible without faking success. |
| **Four-validator parallel fact-check.** Before the receipt prints: template integrity, tasklist consistency, git correctness, people-list correctness — independent so they catch each other's blind spots. | The session log is auto-cross-checked against tasklist, people list, and git — no manual verification. |
| **`⚪` markers for unwired features.** Roadmap features (e.g. `/pickup`) appear with `⚪` and an annotation. | You see what's coming without the receipt pretending it's already there. |

**Skills:** `02_session_skills/00_session_log_protocol.md`, `01_session_log_factcheck.md`.

---

## Module C — Master tasklist

**What it is:** A single Markdown file (`04_production_master_tasklist/00_Master_Tasklist.md`) split into an above-the-fold summary table and below-the-fold verbatim detail blocks. Maintained by `/refactor-tasklist`.

| Feature | Operator benefit |
|---------|------------------|
| **Two-tier layout.** Top: scannable one-row-per-task table with 🟡 / 🔴 / 🟠 status emojis. Below: verbatim detail blocks per task. | Two readers, two reading speeds. Scanners get answers in seconds; deep-divers find full reasoning preserved verbatim. |
| **Verbatim discipline.** No summarisation, ever. Refactor = copy-paste, reorder, renumber. | The *why* of every decision survives indefinitely. Future operators (including you in six weeks) read the actual reasoning, not a sanitised version. |
| **Sweep-don't-delete.** `/sweep-tasks` moves completed tasks to a dated archive (`_swept/NN_Complete_Sweep_*.md`) verbatim. | Completed work is preserved forever. Mine archives for "how did I solve this last time?" |
| **Dedicated renumber + 3-validator fact-check.** `/renumber-tasks` runs as its own step. `/tasklist-factcheck` dispatches sweep / reorder / renumber validators in parallel. | The summary-vs-detail-number drift simply doesn't happen. Refactors produce green-or-red, not "looks fine." |
| **Citations from meetings.** Tasklist rows seeded by `/process-meeting` carry the back-reference. | "Where did this task come from?" is always answerable. |

**Skills:** `03_tasklist_skills/01–05`. **Rules first:** `03_tasklist_skills/00_tasklist_agent.md`.

---

## Module D — People list

**What it is:** `_people_list.md` at the frame root. Roster + dated touchpoints + detail blocks per person. Updates flow through `/people-list-update`.

| Feature | Operator benefit |
|---------|------------------|
| **Roster + detail blocks.** Summary table up top, full detail blocks below. | Never repeat yourself about who's who. "Who's Priya again?" answers in one glance. |
| **Auto-detection with confirmation gate.** Operator mentions a new name → orchestrator proposes the entry → operator approves before write. | Social graph builds itself, but the operator stays in control. Misspelled names and hallucinations get caught before disk. |
| **Append-only touchpoints.** New touches at the bottom. Old touches never edited. | Real timeline. Re-engaging a contact after months: scan the history, see exactly what was last said. |
| **Citations from meetings.** Every processed meeting writes a touchpoint per attendee. | People list ↔ meeting module cross-reference. From a person, reach the meetings; from a meeting, reach the people. |
| **3-validator fact-check.** Roster-detail consistency, touchpoint append discipline, fabrication guard. | Self-policing. You don't audit the list; the validators do. |

**Skill:** `02_session_skills/03_people_list_update.md`. **Orchestrator section:** `CLAUDE.md` Section 3.5.

---

## Module E — Meeting management

**What it is:** `05_meeting_management/` — universal clearing-house for meeting-shaped input. Three folders (`1_inbox/`, `2_processed/`, `3_future/`), four skills, strict citation discipline.

| Feature | Operator benefit |
|---------|------------------|
| **Three-folder workflow.** Drop in inbox → process to canonical → plan for next. Numbered so folders sort in workflow order. | One mental model. No "where does this go?" |
| **Citation discipline (the meta-feature).** Every fact that leaves the module carries `(learned in the meeting with NAME on YYYY-MM-DD — 05_meeting_management/2_processed/…)`. | Project memory becomes traceable. Track-back is the whole point. |
| **`/process-meeting`.** Pasted transcript or Teams link → canonical file + auto-propagated citations into tasklist + people list, with operator approval. | One command turns meeting noise into structured, citable project memory. |
| **`/plan-next-meeting`.** Builds a prep file in `3_future/` from people list + recent processed meetings + tasklist rows mentioning the attendee. | Walking in prepped takes 30 seconds, not an hour. Agenda, talking points, open questions — pulled from your own history. |
| **`/draft-meeting-request` + `/draft-email`.** Drafts cold-intro / reconnect / reply / status / fresh outbound. Never auto-sends. | Email drafts that already know the project's recent history. Operator stays in control of every send. |
| **On-demand loading.** Module doesn't auto-load on cold start — engaged only when a meeting skill is invoked. | Capacity meter stays green. Project memory grows linearly without inflating cold-start cost. |
| **`_raw/` audit trail.** Original transcripts / link captures move to `2_processed/_raw/` after processing. Frozen. | Canonical = working record. Raw = unalterable audit. Verify against the source any time. |

**Module:** `05_meeting_management/`. **Rules first:** `00_module_rules.md`. **Orchestrator section:** `CLAUDE.md` Section 3.6.

---

## Module F — Intake

**What it is:** Two intake skills, routed by `/intake-router`. Greenfield is 6 questions / 5 minutes. Import-existing is a 10–15-minute interview with a staging folder + operator-approved placement plan.

| Feature | Operator benefit |
|---------|------------------|
| **Conversational intake.** Short questions, one at a time. | Productive in a single sitting. The intake is a chat, not paperwork. |
| **Import-existing with staging.** Files land in `_intake/` first; skill scans, proposes placement, writes only after approval. | Existing files are never silently moved. You see exactly where each file will land. |
| **Auto-seeds tasklist, people list, first session log.** All three populated during intake. | After 5–15 minutes you have a tasklist, a people list, a session log, optionally git — everything to start. No second-day onboarding. |
| **Optional git init.** `/git-init` runs as a final step. Frame works without git too. | Git is opt-in. Absence is a quiet downgrade, not a failure. |

**Skills:** `01_setup_skills/01–04`.

---

## Module G — Frame self-awareness

**What it is:** The features that let the frame describe itself.

| Feature | Operator benefit |
|---------|------------------|
| **Frame Capacity Meter.** One line: 🟢 / 🟠 / 🔴 + percent of 170k usable. Single batched `stat`/`wc -c` call — sub-second. | Smoke detector for context overflow. When it goes 🟠, that's the cue to sweep. |
| **Frame Doctor preflight.** Runs at cold start in parallel with the capacity meter. One-pass 8-check health report: required files present, skill paths resolve, shim layer intact, git state recorded. Report-only — never fails loud. | A half-installed frame stops being a silent degradation. The operator sees the broken bits BEFORE the intro card, with a one-line "Suggested next" — click here to fix. |
| **Five-layer discovery chain.** `CLAUDE.md` → `_session_log.md` → tasklist → `_people_list.md` → skills (on demand). Documented in `03_discovery_chain.md`. | The frame behaves the same way every session, in every tool. No "how did Claude Code load it today?" mystery. |
| **Frame version line.** Every spec file ends with `The Relay Frame · MVP draft N · YYYY-MM-DD`. | Open the frame six months from now: you can tell whether it's the version you last worked with or an upstream update. |
| **Self-describing docs.** `00_overview.md` describes architecture; this file describes the operator experience. | Tour available without reading every skill file. |

**Specs:** `00_relay_frame/00_overview.md`, `01_frame_capacity_spec.md`, `03_discovery_chain.md`, this file.

---

## Module H — Extensibility + operator-respect

**What it is:** Two extensibility paths, plus the cross-cutting design principles that show up everywhere.

| Feature | Operator benefit |
|---------|------------------|
| **`99_project_skills/` slot.** Reserved directory, ships empty. Drop custom skills there; register in the skills index. Frame-skill-wins on collisions. | Frame is extensible without being modified. Upstream updates merge cleanly; your customisations are untouched. |
| **Module pattern as meta-feature.** The Meeting Management three-folder + citation shape generalises to other external streams (emails, customer interviews, support tickets, lab notebooks). Same shape, different `<kind>`. | The frame scales by composing copies of a proven module pattern. |
| **Graceful degradation.** Missing git → git receipt line disappears. Missing people list → discovery chain skips it. Missing skill file → orchestrator surfaces the name, refuses to improvise. | Frame works on incomplete setups. Absences are honest, not hallucinated. |
| **Roadmap honesty + never-fabricate.** `🟢` for things that actually happened, `⚪` for named-but-unwired features. Never invent a name, role, meeting fact, or git status — ASK or leave blank. | Receipts never lie. Whatever the frame prints, you can trust. |
| **Confirmation gates everywhere.** People-list updates, processed-meeting extractions, email drafts — all echo back before writing or sending. | Operator stays in control. The frame proposes; the operator approves. |

**Slot:** `99_project_skills/`. **Index:** `00_relay_frame/04_skills_index.md`. **Meta-pattern:** `05_meeting_management/00_module_rules.md` Section 7. **Principles:** woven into `CLAUDE.md` Section 4 + every skill's "Hard rules."

---

## Module I — Team motions (buddy-system multi-agent)

**What it is:** `07_team_skills/` — five skills shipping six patterns for spawning small, structured AI teams instead of solo agents. The principle is the buddy system: *anything delivered for a purpose almost always needs an independent validator.* When the operator asks for a non-trivial deliverable, the orchestrator proposes the lightest team motion that fits.

| Feature | Operator benefit |
|---------|------------------|
| **Six patterns shipped, one front door.** Buddy build, independent validator, persona fan-out, research team, adversarial seasoning, producer/consumer split. `/team` is the coordinator — interviews the operator, picks the lightest pattern, runs it on approval. Power users can call the specific skills directly. | Novices get expert-team output without expert-team coordination. Power users skip the interview and call `/buddy-build` / `/persona-fan-out` / `/research-team` / `/validate` by name. |
| **`/buddy-build` as the default for builds.** Builder + critiquer + optional independent validator. Critiquer never sees the builder's reasoning; validator never sees the build process. | Solo-agent output is replaced by reviewed output. Most cost-effective quality gate on the menu — 2–3 sub-agents catches the obvious mistakes a builder can't see. |
| **`/persona-fan-out` with Borda cross-rank.** N personas (e.g. 10 graphic designers) produce in parallel, then cross-rank each other 1..N. Borda points pick the winner. Tight spreads surface as ⚠ flags. Optional producer/consumer split routes industry-specific judgement to the right cast. | Novel, diverse output. The frame's own anatomy diagram was selected this way — Vignelli's grid won 31–30 over Rams. Reach for it whenever novelty matters and the budget allows. |
| **`/research-team` with convergence quality gate.** N parallel researchers, independent, with web/files/doc tool access. Findings are merged only when ≥3 agree (≥k of N depending on team size). Disagreements surface as disagreements, not smoothed consensus. | When the answer is unknown, you get cross-checked truth instead of one researcher's first guess. Hallucinations get caught by the convergence gate. |
| **`/validate` as the cheapest gate.** Single sub-agent, clean context, sees only goal + deliverable. Verdict: pass / fix / fail with evidence. | The minimum-cost buddy-system move. Reach for it freely — after any solo build, after any operator-built artifact, after any handoff. |
| **Adversarial seasoning inside `/team`.** Blue team builds toward the goal; red team attacks the build; adjudicator returns ship / revise / abandon. No middle ground. | Production-grade output for things that will be stress-tested in the real world (security choices, customer-facing copy, executive recommendations). |
| **Cost band shown BEFORE spawning.** Every team motion echoes proposed composition + estimated sub-agent count + cost band, then waits for `[Y]/[N]` at ≥5 spawns. | No surprise bills. The operator opts in to every fan-out. |
| **Isolation is enforced at spawn time.** Sub-agent prompts restate ROLE, GOAL, CONTEXT, ISOLATION, TASK, DELIVERABLE, QUALITY BAR. Critiquers don't see builders' reasoning; producers don't see each other's work until cross-rank. | Convenience leaks defeat team motions. The frame enforces independence so the patterns actually deliver their value. |
| **Disagreements surface honestly.** Tight Borda spreads (top 2 within 2 points), missed convergence (no 3+ agree), unresolved red-team attacks — all appear in diagnostics. | The team's output is the team's actual output, not smoothed pleasantness. The operator sees real signal. |
| **On-demand loading.** Module doesn't auto-load on cold start — engaged only when a team skill is invoked. | Capacity meter stays green. The team patterns are read on demand, not always. |

**Module:** `07_team_skills/`. **Rules first:** `00_team_motions_overview.md`. **Orchestrator section:** `CLAUDE.md` Section 3.9.

---

## Cross-references

| Module | Spec | Skills |
|--------|------|--------|
| A — Orchestrator + cold start | `CLAUDE.md`, `00_relay_frame/00_overview.md` | `01_setup_skills/00_intro_card.md` |
| B — Session continuity | `00_relay_frame/02_session_log_template.md` | `02_session_skills/00, 01` |
| C — Master tasklist | `03_tasklist_skills/00_tasklist_agent.md` | `03_tasklist_skills/01–05` |
| D — People list | (stub at root) | `02_session_skills/03_people_list_update.md` |
| E — Meeting management | `05_meeting_management/00_module_rules.md`, `_meeting_template.md` | `05_meeting_management/01–04` |
| F — Intake | — | `01_setup_skills/01–04` |
| G — Self-awareness | `01_frame_capacity_spec.md`, `03_discovery_chain.md` | `02_session_skills/02_frame_capacity_render.md`, `02_session_skills/05_frame_doctor.md` |
| H — Extensibility + respect | `04_skills_index.md`, `99_project_skills/README.md` | woven |
| I — Team motions | `07_team_skills/00_team_motions_overview.md`, `07_team_skills/README.md` | `07_team_skills/01_team.md`, `02_persona_fan_out.md`, `03_buddy_build.md`, `04_research_team.md`, `05_validate.md` |

Roadmap (project root, outside `_Deliverable/`): `Relay-Frame-Roadmap.md`.

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
