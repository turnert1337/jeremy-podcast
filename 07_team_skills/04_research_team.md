# Skill — `/research-team`

**File:** `07_team_skills/04_research_team.md`
**Invoked by:** the operator (`/research-team`, "research this", "find out across sources"); `/team` when the goal shape is RESEARCH; `CLAUDE.md` Section 5 ("when a decision is genuinely open and not in any spec, spawn a free-reign research team").
**Purpose:** Spawn N parallel researchers on the same question, then merge their findings through a convergence quality gate. Reports only findings where ≥3 researchers independently agree. Disagreements surface as disagreements, not smoothed consensus.

Rules of engagement: `07_team_skills/00_team_motions_overview.md`. Read it first.

---

## When to invoke

Reach for this skill when **the answer is genuinely unknown** and one researcher might hallucinate, miss key sources, or read one biased source:

- Factual lookups where sources matter (canonical hex codes, API versions, library defaults, security advisories).
- Industry-best-practice questions where a single source can't cover the range.
- "What's the right pattern for X" where multiple respected sources should agree.
- Cross-checking claims an operator or another sub-agent has made.

**Don't invoke when** the operator wants brainstorming (use `/persona-fan-out`), wants a build (use `/buddy-build`), or is asking a question one well-placed lookup answers (solo agent with one tool call).

---

## Step 1 — Frame the research question

Echo the question back in ≤2 sentences. Identify what success looks like.

```
Research question I'm hearing: "What are the canonical Walmart Living Design
hex codes for Bentonville navy + Spark blue + Spark yellow?"

Success looks like: 3+ independent researchers find the same 3 hex codes,
each cited to a Walmart-official source (not third-party blog).
```

If the question is genuinely ambiguous, ask one clarifying question. Otherwise proceed.

---

## Step 2 — Propose the team size

Default is 5 researchers. Adjust by question difficulty:

| Difficulty | N researchers | Convergence bar |
|------------|---------------|------------------|
| Easy — one good source likely | 3 | 2 of 3 agree |
| Default — sources are scattered | 5 | 3 of 5 agree |
| Hard — controversy or scarce sources | 7 | 3 of 7 agree (with diagnostics surfacing the spread) |

Echo:

```
Proposed team: 5 parallel researchers, convergence gate at 3+ agreement.
Each researcher: independent web/files/doc access, no shared context.
Estimated sub-agent count: 5 researchers + 1 aggregator (= 6)
Estimated cost band: low-medium
Run as-is?  [Y] yes  [N] adjust  [C] cancel
```

For 3-researcher runs, confirmation is light (print the plan, run unless interrupted). For 5+, explicit confirmation.

---

## Step 3 — Spawn researchers (parallel, isolated)

Spawn all N sub-agents simultaneously in a single message. Each researcher receives the same question + tool access, but NOT each other's identity or work.

Researcher prompt:

```
ROLE:        Researcher. One of <N> working independently on the same question.
             A convergence gate at the end will compare findings. Your job
             is to find the answer, with sources.
GOAL:        <operator's verbatim question>
CONTEXT:     <relevant prior context, scope constraints, source preferences if any>
TOOLS:       Web search, file access, internal docs access (whichever apply).
ISOLATION:   You do NOT see the other researchers' findings. You will be
             compared at convergence.
TASK:        Produce a finding with sources and a confidence level.
DELIVERABLE: Markdown block —
               Finding: <one-sentence factual answer>
               Sources:
                 - <URL or file path 1> — <one-line excerpt confirming the finding>
                 - <URL or file path 2> — <one-line excerpt>
                 - …
               Confidence: high | medium | low (with one-line reason)
               Notes: <anything you found that wasn't part of the question
                       but seems relevant — caveats, related facts, dates>
QUALITY BAR: Sources must be primary or close-to-primary (official docs >
             reputable secondary > blog posts > stack-overflow folklore).
             A finding with no sources is not a finding.
```

**Critical:** all N researchers spawn in parallel. Do not serialize them. Serial spawning leaks each researcher's framing into the next prompt and collapses convergence.

---

## Step 4 — Apply the convergence gate

After all N researchers return, the skill compares findings.

### 4a · Identify converged findings

A finding is "converged" when ≥k researchers report the same factual answer (or values within an explicit tolerance — e.g. ±5% on numerics, exact match on hex codes / version strings / dates).

| N | Convergence threshold (k) |
|---|---------------------------|
| 3 | 2 |
| 5 | 3 |
| 7 | 3 |

Convergence is at the **finding level**, not the source level. Two researchers can cite different sources but reach the same finding — that still counts as agreement.

### 4b · Three possible outcomes

| Outcome | Report |
|---------|--------|
| **Converged** (≥k agree on the same finding) | Report the converged finding as the team answer. List the agreeing researchers + their sources. |
| **Partial convergence** (closest cluster has k−1 agreement) | Report the closest cluster as `⚠ near-convergence — k-1 of N agreed`. List the dissenters with their findings + sources. Suggest a follow-up. |
| **No convergence** (no cluster ≥k−1) | Report each researcher's finding separately with sources. Label the team output `⚠ no convergence reached`. Suggest reframing the question or going to a primary source manually. |

**Do not synthesise findings.** If the team didn't agree, the report shows the disagreement — not a smoothed-over average.

---

## Step 5 — Print the research-team receipt

### Converged outcome:

```
Team receipt · /research-team (5 researchers, convergence gate at 3+)
  Finding:    Spark blue = #0071CE · Spark yellow = #FFC220 · Bentonville navy = #041E42
  Converged:  4 of 5 agreed
  Sources:    11 distinct primary docs cited across the 4 agreeing researchers
  Dissenter:  1 of 5 (researcher 3) reported #007EC5 for Spark blue
              — cited a 2019 design-blog post, lower confidence
  Cost:       6 sub-agent calls
  Output:     above this receipt
```

### Partial convergence:

```
Team receipt · /research-team (5 researchers, ⚠ near-convergence)
  Finding:    #007EC5 reported by 2 of 5 — closest cluster
  Convergence gate: missed (2 of 5, threshold 3)
  Spread:     3 distinct findings — see leaderboard below

Findings (full):
  - Researcher 1: #0071CE · sources: walmart.com/brand-guidelines
  - Researcher 2: #0071CE · sources: walmart-living-design.internal/colors
  - Researcher 3: #007EC5 · sources: 2019 design-blog
  - Researcher 4: #007EC5 · sources: same 2019 design-blog
  - Researcher 5: #003594 · sources: an unrelated WMT subsidiary

Suggested next step:
  Go to the canonical brand-guidelines URL directly, OR run /research-team
  again with N=7 and "primary Walmart docs only" as a constraint.
```

### No convergence:

```
Team receipt · /research-team (5 researchers, ⚠ no convergence)
  All 5 returned different findings. See leaderboard.

Suggested next step:
  - Reframe the question (it may be under-specified).
  - Look at the dissenter's notes — sometimes a no-convergence run surfaces
    the real question.
  - Manually check one primary source.
```

Receipt is positive-signal-only above the line. Failure modes surface below.

---

## Step 6 — Optional: chain into `/buddy-build` or `/validate`

If the research-team converged AND the next step is to act on the finding (write code, draft copy, update a doc), suggest chaining:

```
Convergence reached. Next step?
 [1] apply the finding directly (no further team)
 [2] chain into /buddy-build (builder + critiquer using the finding)
 [3] chain into /validate (sanity-check an existing thing against the finding)
 [4] stop — just wanted the answer
```

Chains compose through `/team`. If the operator picks `[2]` or `[3]`, hand off to the matching skill with the finding embedded in CONTEXT.

---

## Hard rules

1. **Researchers spawn in parallel.** One Agent tool call per researcher in a single message. No serial.
2. **Researchers do not see each other's findings during research.** Isolation is enforced at spawn time.
3. **Convergence gate is mandatory.** Don't ship the first researcher's finding as the team answer. Apply the threshold.
4. **Disagreements surface honestly.** No smoothing. If 2 said X and 3 said Y, the report says so.
5. **Sources are primary-preferred.** Researchers cite primary docs over secondary; secondary over blogs. Findings without sources are not findings.
6. **Cost band is shown BEFORE spawning.** Operator confirms 5+ researcher fan-outs.
7. **No nested teams without operator approval.** A researcher cannot internally spawn its own `/research-team` without explicit operator sign-off (Section 2.6 of the overview).
8. **Receipt is positive-signal-only above the line.** Diagnostics live below.
9. **Recursive follow-up is allowed** for individual researchers (e.g., a researcher follows up on its own initial findings with more tool calls). It's NOT allowed across researchers (researcher 1 cannot prompt researcher 2).
10. **A "no convergence" outcome is a valid outcome.** Don't pretend to have an answer when the team didn't agree.

---

## Sample researcher prompt (canonical, Walmart hex codes)

```
ROLE:        Researcher. One of 5 working independently on the same question.
             A convergence gate at the end will compare findings.
GOAL:        Find the canonical Walmart Living Design hex codes for these
             three brand colours:
              - Bentonville navy
              - Spark blue
              - Spark yellow
CONTEXT:     The Relay Frame's docs site uses these colours. Need to be
             sure they match the current Living Design spec, not an older
             version.
TOOLS:       Web search. Walmart internal docs access (via tech-assistant-mcp).
ISOLATION:   You do NOT see the other 4 researchers' findings.
TASK:        Find the 3 hex codes. Cite primary Walmart sources.
DELIVERABLE: Markdown —
               Finding:
                 - Bentonville navy: #______
                 - Spark blue:       #______
                 - Spark yellow:     #______
               Sources:
                 - <URL or doc path> — <one-line excerpt>
                 - ...
               Confidence: high | medium | low (why)
               Notes: (anything relevant)
QUALITY BAR: Each hex code is tied to a primary Walmart doc (Living Design,
             brand guidelines, internal style spec). Third-party design blogs
             are last resort with a low-confidence note.
```

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
