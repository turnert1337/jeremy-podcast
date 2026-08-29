# Skill — `/persona-fan-out`

**File:** `07_team_skills/02_persona_fan_out.md`
**Invoked by:** the operator (`/persona-fan-out`, "fan this out", "round-table this with personas"); `/team` when the goal shape is BUILD or BRAINSTORM with a novelty / style / aesthetic axis.
**Purpose:** Spawn N personas as independent producers on the same task, then have the personas cross-rank each other's output with Borda count. Includes an optional producer/consumer split where the cast that judges is different from the cast that makes.

Rules of engagement: `07_team_skills/00_team_motions_overview.md`. Read it first.

---

## When to invoke

Reach for this skill when **novelty matters** and the operator can afford the fan-out:

- Design / redesign / layout / style / theme / aesthetics.
- Naming, taglines, headlines, brand voice.
- Brainstorms where 10 different angles is the point.
- Anything where 10 plausible directions exist and no single agent will produce all 10.

**Don't invoke when** the task has one right answer (use `/research-team`), one safe build path (use `/buddy-build`), or doesn't ship onward (skip the team motion entirely).

---

## Step 1 — Interview the operator

If invoked directly by the operator (without going through `/team`), conduct a short interview. The interview SHOULD include examples so the operator can calibrate.

```
Fan-out interview · /persona-fan-out

 1. What's the deliverable? (one line, the operator's verbatim goal)
 2. How many personas?
      [5]  light fan-out — quick, lower cost
      [10] default — the graphic-design redesign that picked Vignelli used 10
      [20] heavy — only when novelty really matters and budget allows
 3. Producer/consumer split?
      [N] no — same cast makes and judges (default)
      [Y] yes — different cast judges than makes
        (e.g. for marketing copy: copywriters make, target customers judge;
              for API docs: staff engineers make, junior devs judge;
              for magazine layouts: art directors make, newsstand browsers judge)
 4. Persona seed: do you have a cast in mind, or want me to propose one?
      [O] operator provides — you list the personas, I respect verbatim
      [P] propose — I suggest a cast based on the deliverable, you approve
      [M] mix — you list some, I fill the rest
```

**Worked examples to surface during the interview:**

- *Graphic-design persona fan-out (the canonical example):* 10 graphic-design personas (Vignelli, Rams, Bierut, Scher, Sagmeister, Lupton, Brody, Müller-Brockmann, Spiekermann, Greiman). Each produces an ASCII diagram in their distinct style. They cross-rank with Borda. Vignelli's modular grid won the frame's own anatomy redesign 31–30 over Rams.
- *Tagline fan-out (8 marketing personas):* David Ogilvy, Bill Bernbach, Mary Wells Lawrence, Lee Clow, Dan Wieden, John Hegarty, Cindy Gallop, Maurice Saatchi. Each writes 3 taglines. Cross-rank picks the top tagline (and the top three for fallback).
- *Architecture-decision fan-out (6 software-architect personas, producer/consumer split):* Producers — Martin Fowler, Sam Newman, Werner Vogels, Kelsey Hightower, Charity Majors, Camille Fournier. Consumers — 6 fresh sub-agents in the role of "junior engineer who has to maintain this in 3 years." Producers propose architectures; consumers rank for maintainability.

The interview is light — 60 seconds, four questions max. If the operator can't decide on (3) or (4), use defaults (N=10, no split, propose cast).

---

## Step 2 — Propose the cast

Echo the proposed cast back for approval. Format from `01_team.md` Step 3:

```
Proposed cast (10 graphic-design personas):

   1. Massimo Vignelli       — modular grid, restraint
   2. Dieter Rams            — Bauhaus rationality
   …
  10. April Greiman          — California new wave

Producer/consumer split: no
Judges: same cast, Borda cross-rank
Estimated sub-agent count: 10 producers + 1 aggregator (= 11)
Estimated cost band: medium

Run as-is?
 [Y] yes      [N] adjust personas      [C] cancel
```

For producer/consumer split, list both casts:

```
Producers (6 software-architect personas):
   1. Martin Fowler         — refactoring, evolutionary architecture
   …
   6. Camille Fournier      — engineering management, technical strategy

Consumers (6 "junior engineer in 3 years" personas, fresh sub-agents):
   1. Junior engineer · 3 years from now · debugging a production outage
   2. Junior engineer · 3 years from now · onboarding the codebase day 1
   …
   6. Junior engineer · 3 years from now · adding a new feature

Estimated sub-agent count: 6 producers + 6 consumers + 1 aggregator (= 13)
Estimated cost band: medium-high
```

**Persona-quality test.** Each persona must be specific enough that "if a Bierut read a Vignelli's output, they could say 'yes, that's a Vignelli.'" If the personas are vague ("designer 1, designer 2, designer 3"), they collapse to a single voice and the fan-out wastes tokens. The skill MAY refuse to spawn with a Diagnostics line if persona distinctiveness is below a sanity threshold.

---

## Step 3 — Spawn producers (parallel, isolated)

Spawn N sub-agents simultaneously. Each producer prompt MUST follow the template in `00_team_motions_overview.md` Section 3:

```
ROLE:        You are <PERSONA NAME>. <2–3 lines of persona philosophy / signature moves>.
GOAL:        <operator's goal verbatim>
CONTEXT:     <relevant files / prior work / brand guidelines if applicable>
ISOLATION:   You do NOT receive the other N-1 personas' work. You will see it at cross-rank.
TASK:        Produce one deliverable in your distinct style.
DELIVERABLE: <format: ASCII block / paragraph / table / list of N items / etc.>
QUALITY BAR: The output is unmistakably <PERSONA NAME>. Another <PERSONA TYPE> reading it should be able to attribute the style.
```

**Critical:** all N producers spawn in parallel (one Agent tool call per producer in a single message). Do not serialize them. Serial spawning leaks each producer's work into the next prompt and destroys the fan-out.

Producers run independently. Collect outputs.

---

## Step 4 — Cross-rank with Borda count

### 4a · Same-cast judging (default)

Each producer becomes a judge in a second pass. Spawn N judging sub-agents in parallel, each receiving all N producer outputs (own clearly labelled `(your output)`). Each judge produces a ranking 1..N.

Judge prompt:

```
ROLE:        You are <PERSONA NAME>, now judging.
GOAL:        Rank these <N> deliverables 1..N (1 = best) on how well they meet the goal.
CONTEXT:     The original goal + all N deliverables (yours marked).
ISOLATION:   You see no judge other than yourself. You're not negotiating with the other personas.
TASK:        Rank 1..N. Brief one-line rationale per rank.
DELIVERABLE: Ordered list, 1..N, with one-line rationales.
QUALITY BAR: Rank from your persona's specific design lens, not generic taste.
```

### 4b · Producer/consumer split

Skip the judging by producers. Spawn the N consumer sub-agents instead. Each consumer ranks all N producer outputs from the consumer persona's lens.

Consumer prompt:

```
ROLE:        You are <CONSUMER PERSONA>. <2–3 lines of who you are, what you need from the deliverable>.
GOAL:        Rank these <N> deliverables 1..N on how well they serve YOU.
CONTEXT:     The original goal + all N deliverables (unattributed — producer names hidden).
ISOLATION:   You don't know who made each one. You judge the output, not the producer.
TASK:        Rank 1..N from your consumer lens.
DELIVERABLE: Ordered list, 1..N, with one-line rationales.
QUALITY BAR: Judge for usability / maintainability / accessibility / appeal — whatever your role optimises for.
```

**Why hide producer names from consumers:** prevents brand bias. The deliverable's own merit wins or loses on its own.

### 4c · Score with Borda

Each rank position is worth (N − rank + 1) points. So in a fan-out of 10:
- Rank 1 = 10 points
- Rank 2 = 9 points
- …
- Rank 10 = 1 point

Sum every judge's points-per-deliverable. The total points pick the winner.

Tiebreaker: if top two are within 2 points → declare a tie and surface both as `1st (tied)`. Operator picks.

Variance signal: if top 3 are within 5 points → flag `⚠ tight spread` in the receipt.

---

## Step 5 — Return result + per-persona view

The skill returns:

1. **The winning deliverable** — verbatim, embedded above the receipt.
2. **The full leaderboard** — all N producers ranked by Borda total, points listed.
3. **The per-judge view** (collapsible / appendix-style) — each judge's 1..N ranking + rationales. So the operator can spot-check: "did Rams agree with Vignelli on the win?"
4. **Disagreement diagnostics** — if there's a tight spread, surface it. If a particular judge ranked very differently from the rest, flag it.

Example output skeleton:

```
=== Winning deliverable ===

<verbatim winning ASCII / text / table>

=== Team receipt ===

Team receipt · /persona-fan-out (10 graphic-design personas, same-cast judging)
  Winner:    #1 Massimo Vignelli — 31 Borda points
  Runner-up: #2 Dieter Rams      — 30 Borda points
  3rd:       #3 Michael Bierut   — 24 Borda points
  Spread:    ⚠ tight (top 2 within 2 points)
  Cost:      10 producers + 10 judges + 1 aggregator = 21 calls
  Output:    above this receipt

=== Leaderboard (full) ===

  1.  Vignelli         31 pts
  2.  Rams             30 pts
  3.  Bierut           24 pts
  4.  Müller-Brockmann 22 pts
  5.  Lupton           20 pts
  6.  Scher            18 pts
  7.  Greiman          15 pts
  8.  Spiekermann      14 pts
  9.  Sagmeister       10 pts
 10.  Brody             6 pts

=== Per-judge rankings (collapsed) ===

  Judge: Vignelli  → 1.Rams 2.Vignelli 3.Müller-Brockmann …
  Judge: Rams      → 1.Vignelli 2.Rams 3.Müller-Brockmann …
  …
```

---

## Step 6 — Suggest a next step

If the spread is tight (top 2 within 2 points), suggest:

```
The top two were close. Want me to:
 [1] declare a tie and let you pick
 [2] run /validate on the winner before applying
 [3] run a second fan-out limited to those 2 + 3 new personas as tiebreakers
 [4] ship the Borda winner as-is
```

If the spread is wide, suggest applying the winner directly or running `/validate` as a final gate.

---

## Hard rules

1. **Producers spawn in parallel.** One Agent tool call per producer in a single message. No serial.
2. **Personas do not see each other's work during production.** Isolation is enforced at spawn time. Sharing context defeats the fan-out.
3. **Cross-rank is mandatory.** Don't ship "persona 1's output" as the team result. The Borda winner is the team result.
4. **Personas must be distinct enough to attribute.** A Bierut reading a Vignelli should be able to say "yes, that's a Vignelli." If the casting is vague, the skill SHOULD refuse to spawn with a Diagnostics line.
5. **Producer/consumer split: producer names hidden from consumer judges.** Otherwise brand bias contaminates the ranking.
6. **Per-judge rankings are surfaced (collapsibly).** The Borda winner is the team output, but the operator should be able to see how each persona voted without re-running anything.
7. **Tight spreads are surfaced.** Top 2 within 2 points → ⚠ flag. Top 3 within 5 points → ⚠ flag. Don't smooth them over.
8. **Cost band is shown BEFORE spawning.** Operator confirms 5+ sub-agent fan-outs explicitly.
9. **Same-cast Borda includes self-vote.** A persona ranking themselves #1 is allowed (and usually happens) — it cancels out across all N if everyone does it. Don't filter self-votes; Borda's symmetric design handles it.
10. **Receipt is positive-signal-only.** Wins above the line; tight spreads / failed isolations / refused spawns below.

---

## Example sub-agent prompts (canonical)

**Producer prompt (persona 1 of 10, graphic-design redesign):**
```
ROLE:        You are Massimo Vignelli. Modular grid. Two typefaces (Helvetica and a serif).
             Restraint over decoration. Believe the grid is the design.
GOAL:        Redesign the Relay Frame anatomy diagram so a stranger can read it
             in under 30 seconds.
CONTEXT:     Attached: current Relay-Frame-Anatomy.md (139 lines, verticalfully-closed
             boxes, busy). Your design philosophy summary.
ISOLATION:   You do NOT receive the other 9 personas' work. You will see them only at
             cross-rank.
TASK:        Produce one Vignelli-style ASCII diagram with a 2-line rationale.
DELIVERABLE: ASCII block ≤45 lines, ≤80 columns. Plus 2-line rationale below.
QUALITY BAR: A Bierut or a Rams reading it should be able to say "yes, that's a
             Vignelli" — modular grid, restraint, two-typeface discipline visible
             in the spacing.
```

**Same-cast judge prompt (Vignelli judging round, after all 10 produce):**
```
ROLE:        You are Massimo Vignelli, now judging.
GOAL:        Rank these 10 anatomy diagrams 1..10 (1 = best) on how well they let
             a stranger read the frame in under 30 seconds.
CONTEXT:     Attached: original goal + all 10 deliverables (yours labelled "(your work)").
ISOLATION:   You see only the deliverables. Not the other judges' rankings.
TASK:        Rank 1..10 from your design lens. One-line rationale per rank.
DELIVERABLE: Ordered list 1..10 with rationales.
QUALITY BAR: Rank from a Vignelli lens specifically — grid clarity, typographic
             discipline, restraint. Not generic taste.
```

**Consumer prompt (producer/consumer split, junior-engineer cast):**
```
ROLE:        You are a junior engineer. 3 years from now. You inherited this codebase
             and you're trying to fix a production outage at 2am. You have no context.
GOAL:        Rank these 6 architecture proposals 1..6 on how well they help YOU at 2am.
CONTEXT:     Attached: original goal + all 6 proposals (producers' names hidden).
ISOLATION:   You don't know who wrote each one. You judge the proposal, not the author.
TASK:        Rank 1..6 from a "I have to debug this at 2am" lens.
DELIVERABLE: Ordered list 1..6 with rationales.
QUALITY BAR: Rank for clarity, debuggability, learnable structure — not theoretical
             elegance.
```

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
