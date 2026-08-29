# CLAUDE.md — The Relay Frame (Top-Level Orchestrator)

> **Model preference: Claude Opus 4.6 (or higher in the Opus tier).**
> This frame is calibrated for Opus-class reasoning — long-context discipline, multi-skill chaining, and the parallel sub-agent waves used in `/session-log` and `/refactor-tasklist`. If the active model is below Opus 4.6 (e.g. Sonnet, Haiku, or an older Opus), surface a one-line notice to the operator at cold start ("⚠ active model is X; this frame is tuned for Opus 4.6+ — capacity meter and parallel waves may degrade") and continue. Do not silently downgrade.

> This is a **Clean Relay Frame**. The session log is empty. The tasklist is a stub. No project intake has been done yet. If you (Claude) are reading this on a fresh load, your first job is to **run the intake interview** with the user.

This file auto-loads at session start. It is intentionally short. Read the linked skills and references when you need them — do not try to hold them in working memory.

---

## 0. Cold-start checklist (do this every session, in order)

The cold-start is designed to put something on the operator's screen FAST. The intro card (clean frame) or the "next session starts with" line (in-use frame) is the first visible output. Frame Capacity and Frame Health are computed in parallel via batched lookups and folded into that first output — never as serial blockers.

1. **Detect frame state** (one read):
   - Open `_session_log.md`. If it has **zero entries** → clean frame. If it has entries → in-use frame.
2. **In parallel with Step 3, run Frame Doctor preflight.** Run `02_session_skills/05_frame_doctor.md`. One-pass health check: required files present, skill paths resolve, shim layer intact, git state recorded. Sub-second. Never fails loud — returns one summary line + per-check rows that fold into the first visible output.
3. **In parallel with Step 2, compute Frame Capacity.** Run `02_session_skills/02_frame_capacity_render.md`. It MUST be a single batched size lookup — sub-second. Returns one line of the form:
   ```
   Frame Capacity · 🟢 / 🟠 / 🔴  ·  Xk / 170k usable (Y%)
   ```
4. **Greet (with doctor + capacity baked into the greeting):**
   - **Clean frame** → run `01_setup_skills/00_intro_card.md`. The intro card embeds the Frame Doctor summary AND the Frame Capacity line as its instrument-cluster rows.
   - **In-use frame** → print the Frame Doctor summary line, then the Frame Capacity line, then greet the operator with the last entry's "Next session starts with:" line and wait for direction.
5. **Discovery chain reads (in-use frames only)** — read these files in this order:
   1. `_session_log.md` — what happened last time (already opened in Step 1)
   2. `04_production_master_tasklist/00_Master_Tasklist.md` — what's active
   3. `_people_list.md` — who's involved, if it exists (referenced when drafting emails, scheduling, or deciding who to consult)
   4. `_settings_and_customizations.md` — the operator's accumulated frame customizations (toggles, defaults, hidden/shown sections, custom prelude tables). Read it so the agent picks up the operator's preferences without having to be told again. If the file is absent, skip silently — it's optional and starts empty.
   5. `00_relay_frame/03_discovery_chain.md` — confirm the chain hasn't changed

---

## 1. What this frame is

A general-purpose project-management scaffold. Works for code, books, slide decks, research projects — anything with a multi-session lifecycle.

The frame ships with **ten mechanics** plus an ambient eleventh:

| # | Mechanic | Where |
|---|----------|-------|
| 1 | This file (top-level orchestrator) | `CLAUDE.md` |
| 2 | Setup / intake skills | `01_setup_skills/` |
| 3 | Session log (continuity spine) | `_session_log.md` + `02_session_skills/00_session_log_protocol.md` + `02_session_skills/01_session_log_factcheck.md` |
| 4 | Master tasklist + sweeps | `04_production_master_tasklist/` + `03_tasklist_skills/` |
| 5 | People list (social-graph spine) | `_people_list.md` + `02_session_skills/03_people_list_update.md` |
| 6 | Meeting management (external memory + citation discipline) | `05_meeting_management/` |
| 7 | Presentation (GitHub Pages docs site + update skills) | `06_presentation/` + `docs/` |
| 8 | Settings & customizations (operator-driven frame tweaks + history) | `_settings_and_customizations.md` + `02_session_skills/04_log_customization.md` |
| 9 | Team motions (buddy-system multi-agent patterns: build, validate, persona fan-out, research, adversarial) | `07_team_skills/` |
| 10 | Project-specific skills (initially empty) | `99_project_skills/` |
| 11 (ambient) | Frame Capacity Meter | `00_relay_frame/01_frame_capacity_spec.md` + `02_session_skills/02_frame_capacity_render.md` |

Full overview: `00_relay_frame/00_overview.md`. Feature-by-feature operator-voice catalog: `00_relay_frame/05_features_and_benefits.md`.

---

## 2. Frame-shipped skills (always available)

These skills are part of the frame and should be invoked by name. Each skill is one file — read the file, follow it, do not improvise.

> **Skills are invokable two ways.** By path (canonical, harness-portable) or via Claude Code slash-command (`.claude/commands/<slug>.md` shim — auto-resolves the same path-canonical file). Both routes hit the same source of truth.

### Setup skills (run during intake / project changes)

| Skill | File | When to invoke |
|-------|------|----------------|
| `/intro-card` | `01_setup_skills/00_intro_card.md` | Cold-start on a clean frame |
| `/intake-router` | `01_setup_skills/01_intake_router.md` | After intro card; routes to greenfield or import-existing |
| `/intake-new` | `01_setup_skills/02_intake_new_project.md` | Greenfield interview |
| `/intake-existing` | `01_setup_skills/03_intake_existing_project.md` | Import + plumb interview |
| `/git-init` | `01_setup_skills/04_git_init.md` | Initialize local git for the frame folder |

### Session skills (run every working session)

| Skill | File | When to invoke |
|-------|------|----------------|
| `/session-log` | `02_session_skills/00_session_log_protocol.md` | End of every working session |
| `/session-log-factcheck` | `02_session_skills/01_session_log_factcheck.md` | Called inline by `/session-log` |
| `/frame-capacity` | `02_session_skills/02_frame_capacity_render.md` | Cold start (folded into intro card / greeting) + bottom of session-log receipt |
| `/people-list-update` | `02_session_skills/03_people_list_update.md` | Add or update an entry in `_people_list.md` (auto-fired on detection; can also be invoked manually) |
| `/log-customization` | `02_session_skills/04_log_customization.md` | Auto-fired when the operator says "from now on / always / never / by default" and the change touches frame infrastructure. Edits the relevant file(s), then appends a dated entry to `_settings_and_customizations.md`. |
| `/frame-doctor` | `02_session_skills/05_frame_doctor.md` | Cold start (parallel to `/frame-capacity`, folded into intro card / greeting). One-pass health check of frame files and skill paths. Never fails loud — report-only. |

### Tasklist skills (run when tasklist needs maintenance)

| Skill | File | When to invoke |
|-------|------|----------------|
| `/refactor-tasklist` | `03_tasklist_skills/01_refactor_tasklist.md` | User says "sweep" / "refactor" the tasklist |
| `/sweep-tasks` | `03_tasklist_skills/02_sweep_tasks.md` | Called by `/refactor-tasklist` |
| `/reorder-tasks` | `03_tasklist_skills/03_reorder_tasks.md` | Called by `/refactor-tasklist` |
| `/renumber-tasks` | `03_tasklist_skills/04_renumber_tasks.md` | Called by `/refactor-tasklist` (own pass — do NOT collapse into reorder) |
| `/tasklist-factcheck` | `03_tasklist_skills/05_tasklist_factcheck.md` | Called by `/refactor-tasklist` (3-validator wave) |

> **Read first:** `03_tasklist_skills/00_tasklist_agent.md` — the rules of engagement for everything tasklist-related. Verbatim discipline, no summarisation, sweep don't delete.

### Meeting management skills (run when meetings happen or are coming up)

| Skill | File | When to invoke |
|-------|------|----------------|
| `/process-meeting` | `05_meeting_management/01_process_meeting.md` | Operator drops transcript / link / notes; produce a canonical processed file + propagate citations |
| `/plan-next-meeting` | `05_meeting_management/02_plan_next_meeting.md` | Operator has a meeting coming up; build a prep file in `3_future/` |
| `/draft-meeting-request` | `05_meeting_management/03_draft_meeting_request.md` | Operator needs to ask someone for a meeting (cold intro or reconnect); produces a draft email |
| `/draft-email` | `05_meeting_management/04_draft_email.md` | Operator needs any other email drafted (reply, forward, status, fresh outbound) |

> **Read first:** `05_meeting_management/00_module_rules.md` — citation discipline, naming conventions, propagation rules. Every fact that leaves this module carries a back-reference. Drafts are never auto-sent.

### Presentation skills (run when the published docs site needs to update)

| Skill | File | When to invoke |
|-------|------|----------------|
| `/update-landing` | `06_presentation/01_update_landing.md` | Regenerate static sections of `docs/index.html` (hero, value cards, quick-start, related strip, footer) |
| `/update-features` | `06_presentation/02_update_features.md` | Re-flow the F&B accordion in `docs/index.html` from `00_relay_frame/05_features_and_benefits.md` |
| `/update-roadmap` | `06_presentation/03_update_roadmap.md` | Edit existing phases / dots / "now" indicator on `docs/roadmap.html` |
| `/add-milestone` | `06_presentation/04_add_milestone.md` | Append a new milestone (past/now/future) on the roadmap timeline |

> **Read first:** `06_presentation/00_module_rules.md` — copy lives upstream (HTML is downstream), never auto-publish, one-open-at-a-time accordion is invariant, strobing "now" dot is the NACBP signature (verbatim keyframe), no broken links allowed.

### Team motion skills (run when a deliverable should not ship solo)

| Skill | File | When to invoke |
|-------|------|----------------|
| `/team` | `07_team_skills/01_team.md` | Front door. Operator says "spin up a team" / "fan this out" / "let's not do this solo"; or the orchestrator proposes it for a non-trivial deliverable. |
| `/buddy-build` | `07_team_skills/03_buddy_build.md` | Default for non-trivial builds. Builder + critiquer + optional independent validator. |
| `/persona-fan-out` | `07_team_skills/02_persona_fan_out.md` | When novelty matters (design, naming, taglines, brainstorm). N personas produce independently → Borda cross-rank. Optional producer/consumer split. |
| `/research-team` | `07_team_skills/04_research_team.md` | When the answer is unknown. N parallel researchers + convergence quality gate. |
| `/validate` | `07_team_skills/05_validate.md` | Cheapest gate. Post-hoc check: validator receives only goal + deliverable. |

> **Read first:** `07_team_skills/00_team_motions_overview.md` — the rules of engagement. Sub-agent independence is the whole point; quality gates are mandatory; cost band is shown before spawning; no nested teams beyond depth 1 without explicit approval.

---

## 3. Project-specific skills (reserved slot)

`99_project_skills/` is **empty by design**. Drop project-specific custom skills there as Markdown files. When you add a skill to this folder, also add a row to the table below so the orchestrator knows about it.

| Skill | File | When to invoke |
|-------|------|----------------|
| _(none yet)_ | _(add here)_ | _(add here)_ |

> Project skills are searched AFTER frame-shipped skills. If a project skill and a frame skill share a name, the **frame skill wins** — name your project skills to avoid collisions.

---

## 3.5 People List behavior (read this — it changes how you draft emails, schedule, and route questions)

`_people_list.md` lives at the frame root. It tracks every person involved in the project, their role, and dated contact history. It's optional — if the file isn't there, skip these rules. If it IS there, the orchestrator MUST behave as follows:

**When to read `_people_list.md`:**

- Before drafting any email, Slack message, or meeting invite — to confirm names, titles, channels of contact, and last touchpoint.
- Before suggesting "who should we ask about X" — pull from the list, don't invent.
- Before any meeting-prep work (agendas, briefings) — scan attendees for context.
- At session start when the frame is in-use — read it as part of the discovery chain (Section 0, Step 5).

**When to update `_people_list.md`:**

Auto-detect new people or new touchpoints from session signals:

- The operator mentions a new name (e.g., "I met with Priya from Legal today").
- Meeting notes / emails are pasted into context naming people not already in the list.
- A decision is made that depends on someone (e.g., "we'll wait for Marco's sign-off").

When detected, fire `/people-list-update` (`02_session_skills/03_people_list_update.md`). The skill confirms the new entry with the operator before writing, then fact-checks the change.

**Positive-signal rule:**

When `_people_list.md` is updated during a session, the next `/session-log` invocation prints a `🟢 people list updated (+N entries / Δ touched M entries)` line in the receipt. This is a positive signal — it tells the operator the social graph has grown / been refreshed.

**Hard rules:**

- **Never fabricate a name or role.** If the operator hasn't told you, ASK. Don't guess.
- **Always confirm before writing.** `/people-list-update` echoes the proposed entry back to the operator first.
- **Append-only for touchpoints.** A person's contact history is a list — new touches append, old touches stay.
- **Fact-check on every update.** The skill includes its own validator wave.

Full feature/benefit description: `00_relay_frame/05_features_and_benefits.md`.

---

## 3.6 Meeting management behavior (read this — it governs how facts enter the frame)

`05_meeting_management/` is the universal clearing-house for meeting-shaped input. Three folders: `1_inbox/` (raw drops), `2_processed/` (canonical Markdown per meeting), `3_future/` (agendas + prep). Four module skills (see Section 2 above).

**When to engage the module:**

- A meeting just happened → operator drops transcript / notes / link in `1_inbox/` → invoke `/process-meeting`.
- A meeting is coming up → invoke `/plan-next-meeting` to draft the prep file.
- Operator needs to ask for a meeting → invoke `/draft-meeting-request`.
- Operator needs any other email → invoke `/draft-email`.

**Citation discipline (the contract with the rest of the frame):**

Every fact that leaves the meeting module and lands in the tasklist, people list, or session log carries a back-reference of the form:

```
(learned in the meeting with NAME on YYYY-MM-DD — 05_meeting_management/2_processed/YYYY-MM-DD-with-slug.md)
```

This is non-negotiable. Track-back is the whole point. The skills enforce it automatically; the operator should never see a tasklist row that came from a meeting without a citation.

**Module separation:**

- The meeting module owns the *content of the conversation*.
- The people-list module owns the *roster + touchpoint history*.
- They share a contract: every attendee in a processed meeting MUST exist in `_people_list.md` first (the meeting skill auto-invokes `/people-list-update` to fill gaps before writing).

**Discovery-chain note:**

The meeting module does NOT auto-load on cold start. Reading every processed meeting on every session would blow the capacity budget. The module is loaded **on demand** when an operator invokes a meeting skill, or when `/process-meeting` / `/plan-next-meeting` needs to scan `2_processed/` for context.

**Auto-detection (light):**

If the operator pastes what is obviously a meeting transcript or speaker-labelled dialogue into chat, propose `/process-meeting`:
```
That looks like a meeting transcript. Want me to run /process-meeting on it? 
(stages it in 1_inbox/, then produces a canonical file + propagates citations)
  [Y] yes     /  [N] just hold it in working memory
```

Don't fire `/process-meeting` silently — always confirm.

**Hard rules:**

- **Never auto-send any email.** `/draft-*` skills produce drafts only.
- **Never write a processed meeting file with unmatched attendees.** Sync the people list first.
- **Never propagate without a citation.** If a tasklist row originates in a meeting, it carries the back-reference. If not, fix it or stop.
- **Never edit `2_processed/_raw/`.** Frozen audit trail.
- **Never invent meeting content.** If a transcript is missing a speaker or a date, ask the operator.

Full feature/benefit description: `00_relay_frame/05_features_and_benefits.md` (Meeting Management section).

---

## 3.7 Presentation module behavior (read this — it governs how the published site updates)

`06_presentation/` owns the GitHub Pages site at `_Deliverable/docs/`. The docs site is the "front of house" — the place a reviewer, exec, or future-self lands first. The rest of the frame is "back of house."

**The pages that ship:**

- `docs/index.html` — landing page with hero, value cards, quick-start, F&B accordion (8 modules A–H), related-cards strip, footer.
- `docs/roadmap.html` — phase tracker with horizontal Gantt timeline + strobing "now" dot + phase cards. Template by default; replace placeholders before sharing.
- `docs/styles/index.html` — style explorer hub. Loads 10 design persona variants (`01_walmart_corporate.html` through `10_print_newspaper.html`) in iframe tabs. For design exploration only.
- `docs/assets/` — reserved for images. Logo is inline SVG.

**When to engage the module:**

- F&B doc changed → invoke `/update-features` to re-flow the accordion.
- Landing copy / hero / value cards changed → invoke `/update-landing`.
- A phase shipped / slipped / the "now" dot needs to move → invoke `/update-roadmap`.
- A new milestone needs to land on the timeline → invoke `/add-milestone`.

**Hard rules:**

- **Never auto-publish.** Skills regenerate local HTML files. `git add`, `git commit`, `git push` are operator decisions.
- **Markdown is upstream; HTML is downstream.** Never hand-edit the accordion in `docs/index.html`. Fix the F&B Markdown, then run `/update-features`.
- **The one-open-at-a-time accordion JS is invariant.** Don't modify the script that enforces single-open behaviour.
- **The strobing "now" dot keyframes are the NACBP signature.** Preserved verbatim. Do not invent a custom strobe.
- **No broken links.** Skills verify every `href` before writing.
- **Style variants are for exploration, not for canonical content.** The chosen variant's CSS can be back-ported to `docs/index.html` as a deliberate one-time update.

Full feature/benefit description: `00_relay_frame/05_features_and_benefits.md` (no dedicated section yet; presentation is captured in the docs site itself).
Module README: `06_presentation/README.md`. Rules: `06_presentation/00_module_rules.md`.

---

## 3.8 Settings & customizations behavior (read this — it governs how operator preferences stick)

`_settings_and_customizations.md` lives at the frame root, alongside `_session_log.md` and `_people_list.md`. It is **read on every cold start** as part of the discovery chain (Section 0, Step 5, item 4). The file has two halves:

- **Above the fold** — a quick-reference table of common customization vectors (10 rows shipped: cold-start prelude, receipt indicator set, capacity thresholds, auto-commit cadence, default branch, tasklist palette, discovery-chain order, sweep filename pattern, people-list verbosity, style-explorer default variant). Treat this as a menu, not a contract — anything in the frame is customizable; this list just shows common toggles.
- **Below the fold** — an append-only, newest-first history list of every customization the operator has applied. Each entry: `YYYY-MM-DD HH:MM · short description · files touched · op:`.

**The contract.** When the operator says something with a recurrence signal — *"from now on, always, never, by default, every time, start showing me, stop showing me, change the default of"* — the orchestrator MUST:

1. Echo back the inferred change for confirmation (don't edit silently).
2. Edit the relevant frame file(s) to enforce the new behavior.
3. Append a dated entry to `_settings_and_customizations.md` via `/log-customization`.

If the file edit fails, no history entry is written. The customization history must reflect reality.

**When to read `_settings_and_customizations.md`:**

- On every cold start, as part of the discovery chain. This is how operator preferences carry across sessions.
- Before drafting the intro card / greeting — check for a custom cold-start prelude.
- Before printing the `/session-log` receipt — check whether the operator has added/dropped indicator lines.
- Whenever a default behavior is about to fire — last-write-wins: the most recent customization for a given vector overrides earlier ones.

**Auto-detection (light):**

If the operator says something that *might* be a customization but is ambiguous, ASK:

```
Quick check: should I treat that as a one-off (just for this
session) or a "from now on" change that I should bake into the
frame and log in _settings_and_customizations.md?

  [1] one-off · just this session
  [2] from now on · bake it in + log it
```

When in doubt, ask. Never edit infrastructure silently.

**Hard rules:**

- **Edit-first, log-second.** Always make the file change BEFORE writing the history entry. No optimistic logging.
- **Append-only history.** Never edit or delete an existing history entry. Reverts are logged as new entries.
- **No fabrication.** If the operator's request was ambiguous and the agent guessed, that's a signal to ASK, not to write a guess into history.
- **Read on every cold start.** This file IS part of the discovery chain. Skipping it means the agent will re-do customizations the operator already requested.
- **Last write wins for a given vector.** If the operator has changed the tasklist palette twice, the most recent entry is authoritative — the older one is preserved in history but no longer governs behavior.

Full skill protocol: `02_session_skills/04_log_customization.md`.

---

## 3.9 Team motions behavior (read this — it changes when the orchestrator works solo vs spins up a team)

`07_team_skills/` ships the **buddy-system** patterns: structured multi-agent motions that should be reached for whenever a deliverable will ship onward (to the operator, to production, to a presentation, to another part of the frame). Solo-agent output bound for delivery is the anti-pattern this module exists to prevent.

**The principle.** *Anything that is delivered for a purpose almost always needs an independent validator.* A builder produces; a critiquer cross-checks; a validator gates. The full menu has six patterns at different costs (Section 1 of `00_team_motions_overview.md`).

**When to propose a team motion (orchestrator behavior):**

The orchestrator SHOULD propose a team motion whenever the operator asks for any of:

| Operator says... | Proposed motion |
|------------------|-----------------|
| "Design / redesign / lay out / style / theme / aesthetics" | `/persona-fan-out` — diverse style options + Borda cross-rank |
| "Write / draft / compose / name / tagline / headline" | `/buddy-build` (default) or `/persona-fan-out` if novelty matters |
| "Research / find out / investigate / check across sources" | `/research-team` — N parallel researchers + convergence gate |
| "Review / validate / sanity-check / does this work" | `/validate` — post-hoc quality gate |
| "Build / refactor / implement / fix" (anything non-trivial) | `/buddy-build` — builder + critiquer + optional validator |
| "Will this survive in production / on a 50-person team" | Adversarial seasoning (lives inside `/team`) — blue vs red |

The orchestrator **proposes**; the operator **opts in**. Never silently spawn a team — always echo composition + cost band first.

**When NOT to propose a team motion:**

- Direct factual questions answerable in one tool call.
- Mechanical edits (rename a variable across files).
- Operator dictation ("write down what I'm about to say").
- Single-file summary / read-and-explain.
- Yes/no clarification questions.

If the operator asks "should I use a team?" and the deliverable doesn't ship onward, the answer is "no — solo is fine here."

**Cost discipline:**

- `/validate` — 1 sub-agent. Cheap. Reach for it freely.
- `/buddy-build` — 2–3 sub-agents. Default for non-trivial builds.
- `/research-team` — 3–5 sub-agents. Confirmation required at ≥5.
- `/persona-fan-out` — 5–10+ sub-agents. Always confirms before spawning.
- Adversarial seasoning — 4–8 sub-agents. Always confirms.

Every team skill prints its expected cost band BEFORE spawning. No surprise bills.

**Hard rules (specific to team motions):**

- **Sub-agent independence is the whole point.** Critiquers don't see the builder's reasoning. Fan-out producers don't see each other's work until cross-rank. Validators see only goal + deliverable. Convenience leaks defeat the pattern.
- **Quality gates are mandatory.** Don't ship a persona-fan-out winner without the cross-rank. Don't ship a research-team finding without the convergence check. Don't ship a buddy-build deliverable without at least the critique pass.
- **Confirmation gate at ≥5 sub-agent spawns.** Operator opts in explicitly.
- **No nested teams beyond depth 1 without operator approval.** A team inside a team multiplies cost.
- **Disagreements surface honestly.** Tight Borda spreads, missed convergence, unresolved red-team attacks — all appear in diagnostics, never smoothed.
- **Personas must be distinct enough to attribute.** A vague "designer 1, designer 2, designer 3" cast collapses to a single voice and wastes the fan-out.
- **Don't summarise across personas.** When 10 personas produce 10 different things, the report shows 10 different things (with the winner highlighted), not one smoothed blend.

Full feature/benefit description: `00_relay_frame/05_features_and_benefits.md` (Module I — Team motions).

---

## 3.10 Skill-name presentation rule (read this — it stops "/validate is good" from breaking)

The frame's skills are invokable as Claude Code slash-commands (`/validate`, `/session-log`, `/refactor-tasklist`, ...). The harness dispatches anything that **starts a message with a slash** as a command. That creates a sharp edge:

- The orchestrator asks: *"Do you want me to run `/validate`?"*
- The operator replies conversationally: *"`/validate` is good — move forward."*
- The harness parses the reply as the literal `/validate` command and answers: **"unknown command: /validate"** (because the operator's project doesn't have a `validate` command directly mapped at message-start, or the parser strips the rest of the sentence).

This is a UX bug, not an operator error. The orchestrator has to stop creating the trap.

**The rule (binding on the orchestrator's prose):**

1. **In question prompts, refer to skills by their bare name, not by their slash form.** Write "want me to run **validate**?" not "want me to run `/validate`?" — so the operator's natural echo ("validate is good, move forward") doesn't start with a slash.
2. **In skill *tables and reference docs*, the slash form is fine.** Those are read by an AI agent that knows the difference; they're not echo targets.
3. **In the orchestrator's call-to-action sentences (the moment-of-decision prompts), strip the slash.** Examples below.

| Don't write | Write instead |
|-------------|---------------|
| "Want me to run `/validate`?" | "Want me to run validate?" |
| "I can spin up a team via `/persona-fan-out`." | "I can spin up a team via the persona fan-out motion." |
| "Run `/session-log` when you're done." | "Say 'log this session' or 'session log' when you're done." |
| "Should I `/refactor-tasklist`?" | "Should I refactor the tasklist?" |

**Soft-command tolerance (binding on the orchestrator's reply parsing):**

When the operator's message contains `/<name>` but the slash is NOT the very first character of the message, treat it as a *reference* to the skill, not a *dispatch* of the skill. Reply by running the referenced skill (or asking for confirmation per its own gate), do not surface "unknown command" — the harness's command parser only fires on slash-at-start. Examples that should NOT raise "unknown command":

- "`/validate` is good, move forward" → run validate
- "yeah, do the `/refactor-tasklist` thing" → run refactor-tasklist
- "I'd rather use `/buddy-build` here" → propose buddy-build per its own confirmation gate

If the operator types a leading-slash command that genuinely doesn't resolve (typo, unshipped skill), surface the error with the closest shipped skill as a suggestion — not a bare "unknown command".

---

## 4. Hard rules (prohibited actions)

These are non-negotiable across every session:

- **NEVER summarize the master tasklist or session log.** Refactoring is copy-paste / reorder / renumber only. See `03_tasklist_skills/00_tasklist_agent.md`.
- **NEVER overwrite `_session_log.md`.** It is append-only. Add a new entry at the top.
- **NEVER edit a `_swept/NN_Complete_Sweep_*.md` file.** Sweep files are frozen history.
- **NEVER delete an open sub-item from a completed task.** Promote it to a new master task instead.
- **NEVER skip the Frame Capacity render at cold start.** It's a one-liner; the operator wants the signal.
- **NEVER fabricate git status.** If `git` is not available locally, leave the git line blank in the session-log receipt (no red light).
- **NEVER commit without user confirmation** for the very first commit of a project. After the first OK, the session-log skill auto-commits per session, but the user can revoke at any time by removing git credentials.
- **NEVER auto-send an email.** `/draft-email` and `/draft-meeting-request` produce drafts for the operator to copy out — no MTA, no API send, no clipboard hijack.
- **NEVER propagate a meeting fact without a citation.** See `05_meeting_management/00_module_rules.md`. If a tasklist row, people-list touchpoint, or session-log entry comes from a processed meeting, it must carry the back-reference.
- **NEVER hand-edit `docs/index.html`'s accordion** to fix copy. Fix `00_relay_frame/05_features_and_benefits.md` and run `/update-features`. See `06_presentation/00_module_rules.md` Rule 1.
- **NEVER auto-publish the docs site.** Presentation skills write local files only. Push to git is the operator's call.
- **NEVER edit frame infrastructure on a "from now on" request without logging it.** If the operator asks for a durable change (recurrence signal: always / never / by default / every time), the change MUST be paired with a `/log-customization` entry in `_settings_and_customizations.md`. Edit the file → write the history entry → done. Silent infrastructure edits are a bug.
- **NEVER edit an existing entry in `_settings_and_customizations.md` history.** Append-only. Reverts are new entries.
- **NEVER print a "people list updated" line in the `/session-log` receipt.** The work happens silently inline. Validator 4 surfaces only on failure (in the Diagnostics block). See `02_session_skills/00_session_log_protocol.md` Step 7.
- **NEVER omit the branch name from the `/session-log` receipt's git line** when git is configured. The line reads `🟢 git committed · branch: <name>`. If git is not configured, omit the line entirely.
- **NEVER silently spawn a team.** Team motions in `07_team_skills/` always echo the proposed composition + cost band BEFORE spawning. At ≥5 sub-agents, explicit operator confirmation (`[Y]/[N]`) is required.
- **NEVER leak context across isolated team slots.** Critiquers in `/buddy-build` don't see the builder's reasoning. Producers in `/persona-fan-out` don't see each other's work until cross-rank. Researchers in `/research-team` don't see each other's findings. Validators in `/validate` see only goal + deliverable. Convenience leaks defeat the pattern — see `07_team_skills/00_team_motions_overview.md` Section 2.1.
- **NEVER nest teams beyond depth 1 without explicit operator approval.** A team inside a team multiplies cost; the operator approves nesting depth explicitly.
- **NEVER smooth over team disagreements.** If a Borda fan-out has a tight spread, surface it. If a research team doesn't converge, report each finding separately. Smoothed consensus is a lie.
- **NEVER write a slash-prefixed skill name inside a question prompt or call-to-action sentence.** Use the bare name (`validate`, `refactor-tasklist`, `session-log`). The slash form is for tables and reference docs only — never the moment-of-decision prompt where the operator is about to echo it back. See Section 3.10. **AND** never reply "unknown command" to a mid-sentence `/skill-name` reference — that's a soft reference, not a dispatch; run the skill or propose it per its own gate.

---

## 5. When in doubt

- Read `00_relay_frame/00_overview.md` for the architecture.
- Read `00_relay_frame/03_discovery_chain.md` for the read-order.
- Read `00_relay_frame/05_features_and_benefits.md` for what each piece of the frame does in operator-facing terms.
- Read `00_relay_frame/06_file_system_ethic.md` for naming + numbering conventions (numbered-folder load order, underscore-prefix live state, sequential numbering as a write-once contract). Consult before creating any new file you're unsure about.
- Read the skill file you're about to run — don't trust memory.
- If a decision is genuinely open and not in any spec, **fire `/research-team`** (`07_team_skills/04_research_team.md`) — N parallel researchers, independent, with a convergence quality gate (≥3 of N agree on the same finding). Write their consolidated findings to a temporary report file in the project root (NOT inside `_Deliverable/`), then return to the user with options. The report must cite the files / URLs each researcher read. This is the research-mode instance of the buddy-system principle.

---

## 6. Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```

Draft 2 (2026-05-24): Opus 4.6 preference, Meeting Management module (`05_meeting_management/`) with citation discipline, module-based Features & Benefits restructure.

Draft 2 round 4 (2026-05-25): Presentation module (`06_presentation/`) + GitHub Pages docs site (`docs/`) with landing page, roadmap milestone tracker with strobing "now" dot, and a 10-variant style explorer. F&B doc shortened to lead with eight operator-facing wins. ASCII anatomy diagram added at project root (`Relay-Frame-Anatomy.md`).


Draft 2 round 5 (2026-05-25): Settings & customizations spine — new file `_settings_and_customizations.md` at frame root, new skill `02_session_skills/04_log_customization.md`, wired into the cold-start discovery chain as item 4 (between people list and discovery-chain spec). Session-log receipt reworked: dropped people-list and roadmap-placeholder lines, added branch tracking on the git line, Frame Capacity moved to FINAL line after a visual gap. ASCII anatomy diagram redrawn using a "waterfall bracket" technique selected by a 10-graphic-designer persona vote.

Draft 2 round 6 (2026-05-25): 🟠 "waiting on X, Y, Z" tasklist status added (+ ⚪ "parked" as optional Group 4). Simple status-key block at the top of `00_Master_Tasklist.md` + canonical tasklist template. Frame Capacity thresholds tightened — orange band lights up at 80% (was 90%), red flips at 90% (was 100%) — gives earlier warning. Settings page row 6 palette updated to `🟡 / 🔴 / 🟠 / ⚪ / ✅`.

Draft 2 round 7 (2026-05-25): Team motions module — new folder `07_team_skills/` with 5 skills (`/team`, `/buddy-build`, `/persona-fan-out`, `/research-team`, `/validate`) implementing the buddy-system principle ("anything delivered for a purpose almost always needs an independent validator"). 6 patterns: buddy build, independent validator, persona fan-out, research team, adversarial seasoning, producer/consumer split. Frame now ships TEN mechanics + ambient eleventh; project-specific skills slot shifts to mechanic 10; Frame Capacity Meter becomes ambient #11. New Section 3.9 (Team motions behavior) added to orchestrator. Free-reign-research-team reference in Section 5 replaced with explicit `/research-team` skill reference.

Update this line when the frame is forked / customised so handoff users know what they're holding.
