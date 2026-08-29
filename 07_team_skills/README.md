# Team Motions Module

The frame's built-in way to spawn small, structured AI teams that build, critique, validate, brainstorm, or research as a group — instead of as one solo agent producing one solo answer.

---

## Why it exists

A single agent producing a single deliverable in a single pass is the cheapest motion available, and on simple tasks it's the right one. On anything non-trivial — *design this*, *research this*, *evaluate this*, *recommend a name*, *pick a layout*, *write the cold-start copy* — solo-agent output is reliably mediocre. It is plausible-sounding, internally consistent, and missing the cross-checks that catch the obvious mistakes.

The fix is not "ask the agent to think harder." The fix is **buddy systems** — small structured teams whose members do not share context until they're asked to merge. Every team has at least one of:

- a **critiquer** who reads the deliverable and tries to break it,
- an **independent validator** who never saw the building process and judges only the result against the goal,
- a **fan-out** of N producers who never see each other's work until cross-rank time,
- a **producer/consumer split** where the people who make are not the people who judge.

This module ships those motions as named skills so the operator (or the orchestrator on the operator's behalf) can fire them by name on any task. No setup. No team-coordination tax. Just a `/team` call.

---

## The six built-in patterns

| # | Pattern | Skill | When to reach for it |
|---|---------|-------|----------------------|
| 1 | **Buddy build** | `/buddy-build` | Default for any non-trivial build. Builder + critiquer (+ optional validator). |
| 2 | **Independent validator** | `/validate` | Post-build quality gate. Validator receives only the deliverable + the goal — never the builder's reasoning. |
| 3 | **Persona fan-out** | `/persona-fan-out` | When you want novel, diverse output. N personas produce independently, then cross-rank with Borda count. Includes a producer/consumer-split option. |
| 4 | **Research team** | `/research-team` | When the answer is "go find out." N parallel researchers, independent, converge through a quality gate (e.g. 3 agree on the same finding). |
| 5 | **Adversarial seasoning** | (inside `/team`) | Red team vs blue team — one team builds toward the goal, the other attacks. Result is seasoned by the friction. |
| 6 | **Producer / consumer split** | (option inside `/persona-fan-out`) | Separate the personas who *make* from the personas who *judge*. Same fan-out shape, two distinct casts. |

The generic `/team` skill is the front door. Call it without thinking about which pattern you want — `/team` interviews the operator, infers the right pattern (or combination), and runs it. Power users can call `/buddy-build`, `/persona-fan-out`, `/research-team`, or `/validate` directly when they already know what they need.

---

## The buddy-system principle

> Anything that is delivered for a purpose almost always needs an independent validator.

This is the discipline the module enforces. A solo agent shipping a deliverable straight to the operator is the anti-pattern. Even a one-person task gets, at minimum, a critiquer pass before the operator sees the result. That pass is cheap (one extra sub-agent) and catches the kind of mistakes a builder cannot see in their own work.

---

## The four module skills

| Skill | File | What it does |
|-------|------|--------------|
| `/team` | `01_team.md` | The coordinator. Interviews the operator about goal shape (BUILD / BRAINSTORM / RESEARCH / VALIDATE / MIX), selects the right pattern(s), proposes the team composition, runs the team on approval. |
| `/persona-fan-out` | `02_persona_fan_out.md` | Spawns N personas (e.g. 10 graphic designers, 5 product managers, 7 senior infra engineers) who produce independently, then cross-rank each other with Borda count. Optional producer/consumer split. |
| `/buddy-build` | `03_buddy_build.md` | The default motion. Builder + critiquer + optional independent validator. Returns the final deliverable + a one-paragraph critique receipt. |
| `/research-team` | `04_research_team.md` | Spawns N parallel researchers on the same question. Convergence gate: 3+ independent agents must agree before the finding is reported. Disagreements are surfaced honestly. |
| `/validate` | `05_validate.md` | Post-hoc quality gate. Receives only the deliverable + the original goal. Returns pass / fix / fail with specific evidence. Never sees the build process. |

> **Read first:** `00_team_motions_overview.md` — the rules of engagement (sub-agent independence, quality gates, cost awareness, no nested teams without approval).

---

## Where this module fits in the frame

- **Mechanic 9** in `00_relay_frame/00_overview.md` (added in MVP draft 2 round 7). The pre-existing `99_project_skills/` slot shifts to mechanic 10; the Frame Capacity Meter becomes ambient #11.
- Cited from `CLAUDE.md` Section 3.9.
- Indexed in `00_relay_frame/04_skills_index.md`.
- Read by the discovery chain only when the operator invokes a team skill — the module does NOT auto-load on every session (the patterns catalog is referenced on demand only, not in cold-start memory).

---

## Example: the graphic-design persona fan-out

This is the worked example that shows up across the docs. The operator asks: *"redesign the anatomy diagram so it's easier to scan."*

`/team` infers BUILD with style/aesthetic axis → recommends `/persona-fan-out` with 10 graphic-designer personas (Vignelli, Rams, Bierut, Carson, Sagmeister, Lupton, Brody, Müller-Brockmann, Spiekermann, Greiman). Each persona produces a design independently. The personas then cross-rank with Borda count: each persona scores all 10 designs (including their own) 1–10. The total points pick the winner. Disagreements (high-variance rankings) are surfaced as a Diagnostics line.

The frame's own anatomy diagram was selected exactly this way — Vignelli's modular grid won Round 5's vote, 31 points to Rams' 30.

---

## Cost awareness (the cheapest team is no team)

Every team motion spawns multiple sub-agents. On infinite-tokens assumptions this is free; in reality each sub-agent costs context + latency + dollars. The patterns are listed in rough order of cost:

| Pattern | Typical sub-agent count | Use it when |
|---------|--------------------------|-------------|
| `/validate` | 1 (post-hoc) | After any solo build, before shipping to the operator. |
| `/buddy-build` | 2–3 (builder + critiquer + optional validator) | Default for non-trivial builds. |
| `/research-team` | 3–5 (parallel researchers + convergence gate) | When the answer is unknown and needs cross-checking. |
| `/persona-fan-out` | 5–10 (producers) + cross-rank pass | When novelty matters and you can afford the fan-out. |
| `/persona-fan-out` (with producer/consumer split) | 5–10 producers + 5–10 consumers | When industry-specific judgement matters (different cast for making vs judging). |
| Adversarial seasoning | 4–8 (red + blue teams) | When the deliverable will be stress-tested in the real world. |

`/team` always shows a one-line cost estimate before spawning. The operator can drop a pattern, reduce N, or proceed.

---

## Expansion notes

The patterns here are not the only possible team motions — they're the six that earn their cost across a wide range of tasks. New patterns (e.g. tournament-bracket pairwise compare, jury-of-experts weighted vote, devil's-advocate single-shot) can be added as numbered skills `06_*` and up. Add a row to the catalog in `00_team_motions_overview.md`, register the skill in `00_relay_frame/04_skills_index.md`, and link from `CLAUDE.md` Section 3.9.

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
