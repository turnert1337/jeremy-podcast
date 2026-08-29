# 00 — Team Motions Overview & Rules of Engagement

**Read this before invoking any team skill.** It governs `/team`, `/buddy-build`, `/persona-fan-out`, `/research-team`, and `/validate`. These rules exist so team motions produce reliably better output than solo agents — instead of producing more verbose mediocrity at higher cost.

---

## What a "team motion" is

A team motion is a structured pattern for spawning multiple sub-agents on a task, with explicit roles, deliberate context isolation, and a defined merge / judging step. It's the opposite of "ask the agent to think harder, but use more tokens."

The patterns ship here as named skills. Each pattern has:

1. **A goal shape** it suits (BUILD, BRAINSTORM, RESEARCH, VALIDATE, or a MIX).
2. **A cast** — who does what, and what context they receive.
3. **An isolation rule** — what context the sub-agents do NOT share.
4. **A merge step** — how the team's outputs become one result.
5. **A quality gate** — what makes the result shippable.

The buddy-system principle (every shipped deliverable has at least one independent reviewer) is the throughline. The six patterns are six implementations of that principle at different costs.

---

## 1. The six patterns (catalog)

### Pattern 1 — Buddy build (`/buddy-build`)

> **Builder + critiquer (+ optional independent validator).** The default motion for any non-trivial build.

| Slot | Cast | Receives | Produces |
|------|------|----------|----------|
| Builder | 1 sub-agent | Goal + relevant context | First-pass deliverable + brief reasoning |
| Critiquer | 1 sub-agent | Goal + deliverable (NOT the builder's reasoning) | Bullet list of concerns + 1 alternative angle |
| Builder (revise) | same sub-agent | Critique + own previous output | Revised deliverable + 1-paragraph response to critique |
| (optional) Independent validator | 1 sub-agent | Goal + revised deliverable only | pass / fix / fail with evidence |

**Cost band:** 2–3 sub-agents. **Use when:** anything non-trivial that one agent could ship solo if you didn't know better. Default for code changes, doc rewrites, copy tweaks, naming choices.

### Pattern 2 — Independent validator (`/validate`)

> **Post-hoc quality gate.** Validator never saw the build process; receives only goal + deliverable.

| Slot | Cast | Receives | Produces |
|------|------|----------|----------|
| Validator | 1 sub-agent (clean context) | Original goal verbatim + final deliverable verbatim | pass / fix / fail + evidence |

**Cost band:** 1 sub-agent. **Use when:** something has already been built (by a solo agent, by the operator, by the orchestrator) and needs an independent quality gate before shipping. Cheapest motion that adds real value.

### Pattern 3 — Persona fan-out (`/persona-fan-out`)

> **N personas produce in parallel, cross-rank with Borda count.** Includes optional producer/consumer split.

| Slot | Cast | Receives | Produces |
|------|------|----------|----------|
| Persona 1..N (producers) | N sub-agents | Goal + persona definition (NOT the other personas' work) | One deliverable each + 1-paragraph rationale |
| Persona 1..N (judges) | same N sub-agents OR a separate consumer cast | All N deliverables (own clearly labelled) + the goal | Per-persona ranking 1..N (Borda points) |
| Aggregator | the skill itself | All rankings | Borda-sum winner + variance / disagreement report |

**Producer/consumer split (optional):** A different cast of N personas judges than the cast that produced. Use when industry judgement differs from production craft (e.g. magazine art directors *make* layouts, magazine readers *judge* them).

**Cost band:** 5–10 producers + cross-rank pass. With split: doubles. **Use when:** novelty matters (naming, layout, taglines, design directions, branding) AND you can afford the fan-out.

### Pattern 4 — Research team (`/research-team`)

> **N parallel researchers, independent, with a convergence quality gate.**

| Slot | Cast | Receives | Produces |
|------|------|----------|----------|
| Researcher 1..N | N sub-agents | Same question, plus access to tools (web / files / docs) | Finding + sources + confidence |
| Convergence gate | the skill itself | All N findings | Reports only findings ≥3 agree on; flags disagreements separately |

**Cost band:** 3–5 sub-agents. **Use when:** the answer is genuinely unknown and one researcher might hallucinate or miss key sources. The convergence gate is what keeps it honest — disagreements show as disagreements, not as smoothed-over consensus.

### Pattern 5 — Adversarial seasoning (inside `/team`)

> **Red team vs blue team.** Blue builds toward the goal; red attacks the build. The deliverable is shaped by the friction.

| Slot | Cast | Receives | Produces |
|------|------|----------|----------|
| Blue (builders) | 2–3 sub-agents | Goal + "make this work" framing | Working deliverable |
| Red (attackers) | 2–3 sub-agents | Goal + deliverable + "find every way this breaks" framing | Attack list with evidence |
| Blue (revise) | same sub-agents | Attack list | Hardened deliverable + response to each attack |
| Adjudicator | 1 sub-agent (clean context) | Goal + final deliverable + attack-response log | ship / revise / abandon verdict |

**Cost band:** 4–8 sub-agents. **Use when:** the deliverable will be stress-tested in the real world (production code, customer-facing copy, security-sensitive choices, executive-facing recommendations).

### Pattern 6 — Producer / consumer split (option inside `/persona-fan-out`)

> **The personas who make are not the personas who judge.**

This isn't a standalone skill — it's a flag on `/persona-fan-out`. The producer cast is one set of personas; the consumer cast is a different set. Same fan-out shape; two distinct casts.

**Use when:** the deliverable will be consumed by a population whose judgement differs from the producer's craft. Examples:
- *Magazine cover layouts:* producers = art directors; consumers = newsstand browsers.
- *API documentation:* producers = staff engineers; consumers = junior devs onboarding.
- *Marketing copy:* producers = copywriters; consumers = the actual target customer segment.

---

## 2. Rules of engagement

### 2.1 Sub-agent independence is the whole point

> A team where every sub-agent shares full context is one sub-agent in N costumes.

When the pattern says a sub-agent must not see X, that means the orchestrator must not pass X. Specifically:

- **Buddy build:** critiquer does NOT receive the builder's reasoning — only goal + deliverable. Otherwise the critiquer absorbs the builder's framing and stops finding real problems.
- **Persona fan-out:** producers do NOT see each other's work until cross-rank time. The whole point of fan-out is independent novelty; shared context collapses it to consensus.
- **Research team:** researchers do NOT see each other's findings during research. They merge only at the convergence gate.
- **Adversarial seasoning:** red team receives only the goal + deliverable — not blue's reasoning. Red is attacking the work, not the people.
- **Independent validator:** validator NEVER sees the build process. Goal + deliverable only.

Sub-agent prompts should be self-contained — restate the goal, restate the role, restate the isolation. Don't rely on context leakage.

### 2.2 Quality gates before delivery (never ship solo output as final)

Every team motion ends in a merge or judging step. The orchestrator MUST NOT bypass this step to save tokens. If a pattern says "convergence gate: 3 agree," do not report the first finding the first researcher returns.

Specifically:
- `/buddy-build` — minimum gate is the critiquer pass. Optional validator is on for any operator-facing deliverable above a low-stakes threshold.
- `/research-team` — convergence gate (3+ agree) is mandatory. Solo findings get reported as "unconfirmed (1 source)" with a flag, not as the answer.
- `/persona-fan-out` — cross-rank is mandatory. Don't report "persona 1 said X" as the team output. Borda winner is the team output.
- `/validate` — IS the quality gate. Skip it only on operator-explicit request.

### 2.3 Operator confirms team composition before fan-out

Anything that spawns ≥5 sub-agents echoes the planned composition back to the operator before spawning. Format:

```
Proposed team (10 graphic-design personas, cross-rank with Borda):

  Producers:
  1. Massimo Vignelli        — modular grid, restraint
  2. Dieter Rams             — Bauhaus rationality
  3. Michael Bierut          — editorial pragmatism
  …
  10. April Greiman          — California new wave

  Estimated sub-agent count: 10 producers + 1 aggregator (= 11)
  Estimated cost band: medium (10x fan-out)

  Run as-is?
   [Y] yes      [N] adjust personas or count      [C] cancel
```

`/buddy-build` and `/validate` are cheap enough to skip the confirmation gate — they run on the first invocation. `/persona-fan-out`, `/research-team`, and adversarial seasoning always confirm.

### 2.4 Diagnostics surface disagreements honestly

If the team disagrees, the report says so. No averaging into pleasant-sounding consensus. Specifically:

- `/persona-fan-out` — if the Borda variance is high (top 2 within 3 points, or top 3 within 5), surface that as `⚠ tight spread — alternates are listed below`.
- `/research-team` — if the convergence gate isn't met (no 3+ agreement), report each researcher's finding separately with sources, and label the team output `⚠ no convergence reached`.
- `/buddy-build` — if the builder pushes back on the critiquer and the critiquer disagrees with the revision, surface both positions and let the operator decide.
- Adversarial seasoning — if the adjudicator's verdict is `revise` or `abandon`, that's the verdict. Don't soften it to `ship with caveats`.

### 2.5 Cost awareness (document the band before spawning)

Every team skill prints its expected cost band before spawning:

```
Team motion: /persona-fan-out · 10 producers + cross-rank
Cost band: medium (~11 sub-agents · ~$0.50 on Opus 4.6 at typical depth)
Proceed?  [Y] yes   [N] no   [A] adjust N
```

The dollar estimate is approximate — token use varies. The point is to set expectations, not to bill exactly.

### 2.6 No nested teams without explicit operator approval

> A team inside a team is the easiest way to spend $40 by accident.

If `/team` proposes a pattern that itself contains a team motion (e.g. running `/persona-fan-out` as the "builder" inside `/buddy-build`, or running `/buddy-build` inside each researcher in `/research-team`), the orchestrator MUST surface that to the operator BEFORE spawning. The operator approves the nesting depth explicitly.

Default nesting limit: 1 level. The outer pattern can spawn sub-agents; those sub-agents may NOT spawn further teams without operator approval.

### 2.7 Buddy-system is the default discipline

> Anything that is delivered for a purpose almost always needs an independent validator.

When in doubt, run `/buddy-build`. When something has already been built solo, run `/validate`. Solo-agent output that's about to be shipped to the operator without any team motion is the anti-pattern this module exists to prevent.

The orchestrator should *propose* a team motion (the lightest one that fits) whenever the operator asks for any of:

- "design / redesign / lay out / style / theme / aesthetics" → `/persona-fan-out` proposal.
- "write / draft / compose / name / tagline / headline" → `/buddy-build` proposal (with `/persona-fan-out` as an alternative if novelty matters).
- "research / find out / investigate / check / verify across sources" → `/research-team` proposal.
- "review / validate / check this / does this work / sanity-check" → `/validate` proposal.
- "build / refactor / implement / fix" (anything non-trivial) → `/buddy-build` proposal.

The operator can always decline. The proposal is the discipline; the consent is the operator's.

---

## 3. Sub-agent prompt template (the structural minimum)

Every sub-agent prompt MUST include these fields. Missing one of them is the most common reason team output collapses to mediocre.

```
ROLE:        <one sentence — what kind of agent you are in this team>
GOAL:        <verbatim restatement of the operator's actual goal>
CONTEXT:     <what you are given — files, prior outputs, persona traits, etc.>
ISOLATION:   <what you are NOT given, and why>
TASK:        <the specific thing this sub-agent must produce>
DELIVERABLE: <format expected — file, table, paragraph, ranking, etc.>
QUALITY BAR: <how this output will be judged>
```

Examples:

**Buddy build · builder slot:**
```
ROLE:        Builder. You produce a first-pass deliverable that the critiquer will try to break.
GOAL:        Redesign the anatomy diagram so a stranger can read it in under 30 seconds.
CONTEXT:     Current Relay-Frame-Anatomy.md (attached). Vignelli grid was the prior winner.
ISOLATION:   You do NOT receive the critiquer's prompt or any prior critiquer output.
TASK:        Produce a revised ASCII diagram.
DELIVERABLE: ASCII block, ≤45 lines, ≤80 columns wide.
QUALITY BAR: A stranger with no prior context can name the four bands and the read order within 30 seconds.
```

**Persona fan-out · producer slot (persona 1 of 10):**
```
ROLE:        You are Massimo Vignelli. Modular grid. Two typefaces. Restraint.
GOAL:        Redesign the anatomy diagram so a stranger can read it in under 30 seconds.
CONTEXT:     Current Relay-Frame-Anatomy.md (attached). Your design philosophy summary (attached).
ISOLATION:   You do NOT receive the other 9 personas' work. You will see it only at cross-rank.
TASK:        Produce one Vignelli-style ASCII diagram + a 2-line rationale.
DELIVERABLE: ASCII block + 2-line rationale.
QUALITY BAR: The output is unmistakably Vignelli (a Bierut or Rams reading it should be able to say "yes, that's a Vignelli").
```

**Research team · researcher slot (researcher 1 of 5):**
```
ROLE:        Researcher. One of 5 working independently on the same question.
GOAL:        Find the canonical Walmart Living Design palette hex codes for Bentonville navy + Spark blue + Spark yellow.
CONTEXT:     Web access. Internal docs access (if connected).
ISOLATION:   You do NOT receive other researchers' findings. You will be compared at convergence.
TASK:        Produce the 3 hex codes with sources.
DELIVERABLE: Markdown table — name | hex | source URL.
QUALITY BAR: Each source URL resolves to a Walmart official doc. No third-party blogs or design-blog interpretations.
```

---

## 4. The merge / judging contract

Every pattern's merge step is the most important part. The merge is where the team's outputs become one result the operator can use.

### 4.1 Borda count (for `/persona-fan-out`)

Each judge ranks all N producers 1..N (1 = best). Points = (N − rank + 1), so rank 1 = N points, rank N = 1 point. Sum across all judges. Highest total wins.

Tiebreaker: if top two are within 2 points, surface both as `1st (tied)` and let the operator pick.

Variance signal: if top 3 are within 5 points, flag `⚠ tight spread`.

### 4.2 Convergence (for `/research-team`)

A finding is "converged" when ≥3 independent researchers report the same factual answer (or values within an explicitly tight tolerance, e.g. ±5% on numeric values).

Below the convergence bar: report each researcher's finding separately with sources, do not synthesise.

### 4.3 Critique → revision → optional validation (for `/buddy-build`)

The critiquer produces a bullet list. The builder responds to each bullet — either incorporating it or explaining why not. The optional validator receives only the revised deliverable + goal, never the critique log.

If validator says `fix`, return to the builder for one more revision pass. If validator says `fail`, return to the operator with the validator's evidence (do NOT silently revise — the failure may indicate the goal needs to change).

### 4.4 Adjudication (for adversarial seasoning)

The adjudicator receives the goal, the final deliverable, and the attack-response log. Verdict is one of: `ship`, `revise`, `abandon`. No middle ground; no "ship with caveats."

---

## 5. Hard rules

1. **Sub-agent prompts are self-contained.** Every prompt restates ROLE, GOAL, CONTEXT, ISOLATION, TASK, DELIVERABLE, QUALITY BAR. No context leakage as a substitute.
2. **Isolation is enforced.** When a pattern says "the critiquer does not see the builder's reasoning," the orchestrator must not pass it. Convenience leaks defeat the pattern.
3. **Quality gates are mandatory.** Don't ship persona-fan-out output without the cross-rank. Don't ship research-team output without the convergence check. Don't ship buddy-build output without at least the critique pass.
4. **Operator confirms ≥5 sub-agent spawns.** Anything fan-out-sized echoes composition + cost band before spawning.
5. **No nested teams beyond depth 1 without explicit approval.** A team inside a team multiplies cost.
6. **Disagreements surface honestly.** Tight Borda spreads, missed convergence, blue-vs-red unresolved attacks — all appear in the diagnostics line.
7. **Don't summarise across personas.** When the team produces 10 different things, the report shows 10 different things (with the winner highlighted), not one smoothed-over blend.
8. **Cost band is shown before spawning.** No surprise bills.
9. **`/team` proposes, the operator approves.** The orchestrator never silently runs a team motion; the operator opts in.
10. **The cheapest team that fits is the right team.** Don't reach for `/persona-fan-out` when `/buddy-build` would do. Don't reach for `/buddy-build` when `/validate` on existing work would do.

---

## 6. When NOT to run a team motion

The buddy system is the default for *deliverables*. For some interactions a team is just overhead:

- **Direct factual questions** ("what time is it in Bentonville?") — solo agent, one pass.
- **Mechanical edits** ("rename this variable across the project") — solo agent.
- **Operator dictation** ("write down what I'm about to tell you") — solo agent transcribing.
- **Reading and summarising one specific file** — solo agent. (If summarising N files for a cross-source claim, consider `/research-team`.)
- **Yes/no clarifying questions** — solo agent.

The test: *does the deliverable get shipped onward to the operator (or to another consumer) as something they will rely on?* If yes, the buddy system applies. If no, solo agent is fine.

---

## 7. Examples by goal shape

| Operator says... | Suggested pattern | Why |
|------------------|-------------------|-----|
| "Redesign the anatomy diagram." | `/persona-fan-out` (10 graphic-design personas, cross-rank) | BUILD + style axis where novelty matters. |
| "Write a tagline for the frame." | `/persona-fan-out` (8 marketing personas) OR `/buddy-build` if short on tokens | BUILD + novelty matters. |
| "Refactor this skill into smaller files." | `/buddy-build` | BUILD, non-trivial, no novelty axis. |
| "Is this commit safe to ship?" | `/validate` | Post-hoc VALIDATE. |
| "What's the Walmart Spark blue hex?" | `/research-team` (3–5 researchers, convergence gate) | RESEARCH, factual, sources matter. |
| "Pick the best layout from these 3 mockups." | `/persona-fan-out` (judges only — 1 producer = the 3 attached mockups, N consumer judges) | Producer/consumer split: judging only. |
| "Will this naming convention survive on a 50-person team?" | Adversarial seasoning (blue: defend the naming; red: find pathological cases) | Stress test BUILD. |
| "I'm not sure if my session-log entry is well-structured." | `/validate` | Quality gate on an existing artifact. |
| "Brainstorm 20 metaphors for 'relay readiness'." | `/persona-fan-out` (10 writer personas) | BRAINSTORM + diverse output desired. |
| "Help me understand the discovery chain." | (no team — single agent explains) | Read-and-explain, not a deliverable. |

---

## 8. Cross-references

| Concept | File |
|---------|------|
| Module README | `07_team_skills/README.md` |
| `/team` skill | `07_team_skills/01_team.md` |
| `/persona-fan-out` skill | `07_team_skills/02_persona_fan_out.md` |
| `/buddy-build` skill | `07_team_skills/03_buddy_build.md` |
| `/research-team` skill | `07_team_skills/04_research_team.md` |
| `/validate` skill | `07_team_skills/05_validate.md` |
| Orchestrator section | `CLAUDE.md` Section 3.9 |
| Skills index | `00_relay_frame/04_skills_index.md` |
| F&B description (operator voice) | `00_relay_frame/05_features_and_benefits.md` (Module I — Team motions) |

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
