# Skill — `/team`

**File:** `07_team_skills/01_team.md`
**Invoked by:** the operator (`/team`, "spin up a team", "let's get a team on this"); the orchestrator on its own initiative when it detects a non-trivial deliverable that should not ship solo.
**Purpose:** Front-door team-motion coordinator. Interviews the operator about goal shape, proposes the lightest team pattern that fits, runs the pattern on approval, returns the team's result with a one-paragraph receipt.

Rules of engagement: `07_team_skills/00_team_motions_overview.md`. This skill IMPLEMENTS the patterns described there — do not redefine pattern internals here.

---

## When to invoke

- Operator says: `/team`, "get a team on this", "spin up a team", "fan out", "round-table this", "let's not do this solo".
- Operator describes a deliverable that is non-trivial AND will be shipped onward (to another person, to a presentation, to production). The orchestrator proposes `/team` instead of shipping solo.
- Operator asks for any of the goal shapes listed in Step 2 below — orchestrator proposes the matching pattern through `/team` rather than firing the pattern directly.

**Don't invoke when** the task is a direct factual question, mechanical edit, dictation, single-file summary, or yes/no clarification. See `00_team_motions_overview.md` Section 6.

---

## Step 1 — Read the goal back to the operator

Restate the operator's request in ≤2 sentences and ask one clarifying question. The clarifying question MUST surface the goal-shape uncertainty.

Example:

```
Goal I'm hearing: redesign the anatomy diagram so a stranger can scan it
in under 30 seconds.

Quick check before I propose a team —
 [1] BUILD       (produce a thing)
 [2] BRAINSTORM  (produce many things to pick from)
 [3] RESEARCH    (find out an answer that exists somewhere)
 [4] VALIDATE    (check an existing thing)
 [5] MIX         (more than one of the above)

I'm reading this as a 1 + 2 (build, with diverse options to pick from).
Confirm or adjust?
```

If the goal is genuinely ambiguous (e.g. the operator's ask could be RESEARCH or BUILD depending on framing), ask the question and wait for the answer. Don't guess silently.

---

## Step 2 — Map goal shape to pattern

Use this table. Multiple goal shapes can combine — the right pattern is the lightest one that covers the shape.

| Goal shape | Suggested pattern | Notes |
|------------|-------------------|-------|
| BUILD (non-trivial, no novelty axis) | `/buddy-build` | Default. Builder + critiquer + optional validator. |
| BUILD with novelty / style / aesthetic axis | `/persona-fan-out` | 5–10 personas, cross-rank with Borda. |
| BRAINSTORM (want many options) | `/persona-fan-out` | Often without a winner — operator picks from the field. |
| RESEARCH (factual answer needed) | `/research-team` | 3–5 parallel researchers, convergence gate. |
| VALIDATE (existing artifact) | `/validate` | Single sub-agent, clean context. |
| BUILD + will be stress-tested | Adversarial seasoning | Blue/red teams + adjudicator. (Runs inside `/team`, no standalone skill file.) |
| MIX | Chain patterns explicitly | E.g. `/research-team` → `/buddy-build` → `/validate`. Operator approves the chain. |
| BUILD on consumer-judgement axis | `/persona-fan-out` with producer/consumer split | Different cast for making vs judging. |

If the goal touches multiple shapes (e.g. "research the right metaphor, then draft 10 taglines"), propose a chain and label each stage's pattern. The operator approves the chain as a whole.

---

## Step 3 — Propose composition + cost band

Echo the proposed team to the operator. Format:

```
Proposed team:

  Pattern: /persona-fan-out · 10 producers + Borda cross-rank

  Producers (graphic-design personas):
   1. Massimo Vignelli       — modular grid, restraint
   2. Dieter Rams            — Bauhaus rationality
   3. Michael Bierut         — editorial pragmatism
   4. Paula Scher            — bold typography, scale play
   5. Stefan Sagmeister      — emotional, hand-drawn touches
   6. Ellen Lupton           — type-as-system clarity
   7. Neville Brody          — magazine-art-director energy
   8. Josef Müller-Brockmann — Swiss grid purity
   9. Erik Spiekermann       — German type rationality
  10. April Greiman          — California new wave

  Judges: same 10 personas, Borda cross-rank.

  Estimated sub-agent count: 10 producers + 1 aggregator (= 11 calls)
  Estimated cost band: medium (10x fan-out)
  Estimated latency: 1–2 minutes (parallel)

  Run as-is?
   [Y] yes
   [N] adjust personas, count, or pattern
   [C] cancel — just do it solo
```

**Confirmation gates by sub-agent count:**

| Sub-agent count | Confirmation required? |
|------------------|------------------------|
| 1–2 (`/validate`, light `/buddy-build`) | No — runs on first call. |
| 3–4 (full `/buddy-build` + validator; small `/research-team`) | Light: print the plan, run unless operator interrupts. |
| ≥5 (`/persona-fan-out`, `/research-team` at full size, adversarial seasoning) | Yes — explicit `[Y]/[N]` required. |

Confirmation is the firewall against accidental fan-outs. Don't skip it.

---

## Step 4 — Run the pattern

Delegate execution to the matching skill:

- `/buddy-build` → see `03_buddy_build.md` Step 1+.
- `/persona-fan-out` → see `02_persona_fan_out.md` Step 1+.
- `/research-team` → see `04_research_team.md` Step 1+.
- `/validate` → see `05_validate.md` Step 1+.
- Adversarial seasoning → no separate file; the protocol below applies.

For chained patterns: run the chain in order, surfacing each stage's result before moving to the next. The operator can stop the chain after any stage.

### Adversarial seasoning protocol (lives in `/team` because it composes other patterns)

1. **Blue team builds.** Spawn 2–3 sub-agents with `ROLE: blue · make this work for the goal`. Merge into one working deliverable.
2. **Red team attacks.** Spawn 2–3 sub-agents with `ROLE: red · find every way this breaks`. Each red gets the goal + deliverable but NOT the blue team's reasoning. Returns attack list with evidence.
3. **Blue revises.** Original blue cast receives the attack list. Each attack gets a response: either incorporated into a hardened deliverable, or rebutted with a one-line reason.
4. **Adjudicator.** One fresh sub-agent receives goal + final hardened deliverable + attack-response log. Returns verdict: `ship` / `revise` / `abandon`. No middle ground.
5. **Receipt.** Report the verdict + the strongest attack (whether rebutted or incorporated). Surface unresolved attacks honestly.

---

## Step 5 — Print the team receipt

Single block, ≤8 lines, no wrap:

```
Team receipt · /persona-fan-out (10 graphic-design personas)
  Winner:    Massimo Vignelli — modular grid, 31 Borda points
  Runner-up: Dieter Rams      — Bauhaus rationality, 30 Borda points
  Spread:    ⚠ tight (top 2 within 2 points — alternates worth reviewing)
  Cost:      11 sub-agent calls, ~$0.45
  Output:    embedded above this receipt
```

For chains, print one block per stage:

```
Team receipt · chain (3 stages)

  Stage 1 · /research-team (5 researchers, convergence gate)
    Finding:   <one line>
    Converged: 4 of 5 agreed
    Cost:      5 sub-agent calls

  Stage 2 · /buddy-build (builder + critiquer + validator)
    Deliverable: <one line>
    Critique:    2 concerns raised, both addressed
    Validation:  pass
    Cost:        3 sub-agent calls

  Stage 3 · /validate (final gate)
    Verdict:     pass
    Cost:        1 sub-agent call
```

The receipt is positive-signal-only. Diagnostics (failures, missed convergence, tight spreads, unresolved attacks) appear BELOW the receipt, not inside it. Same discipline as `/session-log`.

---

## Step 6 — Return

If called from another skill: return the team's final deliverable + the receipt block as a structured response.

If called by the operator directly: print the deliverable + the receipt in the chat. Suggest a next step where obvious (e.g. "Want me to run `/validate` on the winner before we apply it?").

---

## Hard rules

1. **Always propose, never silently spawn.** Even on a small team, echo the proposed composition before running. The operator opts in.
2. **Respect the buddy-system principle.** Don't accept a "just do it solo" override on operator-facing deliverables without flagging the trade-off: `noted — running solo. Heads-up that this skips the quality gate; ship at your own discretion.`
3. **Confirmation gate at ≥5 sub-agents.** Non-negotiable. The whole point of `/team` is that fan-outs are explicit, not surprise.
4. **No nested teams beyond depth 1 without approval.** If the pattern you're about to run itself spawns teams (e.g. `/persona-fan-out` inside `/buddy-build`), surface that to the operator first.
5. **Isolation is enforced at spawn time.** Each sub-agent prompt restates ROLE, GOAL, CONTEXT, ISOLATION, TASK, DELIVERABLE, QUALITY BAR. See `00_team_motions_overview.md` Section 3.
6. **Disagreements are surfaced honestly.** Tight Borda spreads, missed convergence, unresolved red-team attacks — appear in diagnostics.
7. **Cost band is shown before spawning.** No surprise bills.
8. **Adversarial seasoning lives here.** The other patterns have dedicated skill files; adversarial is the composition pattern, so its protocol lives in `/team`.
9. **Receipt is positive-signal-only.** Wins above the line; failures below.

---

## Failure modes (and what to do)

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Persona fan-out outputs all sound the same. | Personas weren't distinct enough at spawn, or context leaked. | Reduce N (fewer, more-distinct personas) and re-spawn with stronger persona definitions. |
| Research team all agreed instantly. | Researchers shared too much context, or the question was trivially googlable. | Either accept the easy answer (note `quick converge`) or harden the question. |
| Buddy-build critiquer just praised the builder. | Critiquer prompt didn't enforce isolation — they saw builder's reasoning. | Re-spawn critiquer with goal + deliverable ONLY. |
| Adversarial seasoning verdict is `revise` indefinitely. | Blue and red are locked in a stalemate. | After 2 revision rounds without convergence, surface to operator: "the team can't agree — your call." |
| Operator says "this is too much overhead for a small task." | Team motion was over-spec'd for the task. | Drop to `/buddy-build` or `/validate` (or solo with a noted trade-off). Learn from the feedback. |

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
