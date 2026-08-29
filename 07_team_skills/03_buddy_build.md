# Skill — `/buddy-build`

**File:** `07_team_skills/03_buddy_build.md`
**Invoked by:** the operator (`/buddy-build`, "buddy this up", "build with a critiquer"); `/team` when the goal shape is BUILD without a strong novelty axis.
**Purpose:** The default team motion for any non-trivial build. Spawns a builder + a critiquer (+ an optional independent validator). Returns the final deliverable plus a one-paragraph critique receipt.

Rules of engagement: `07_team_skills/00_team_motions_overview.md`. Read it first.

---

## When to invoke

This is the **default** for non-trivial builds. Reach for it when:

- The deliverable is a build (code, doc, copy, table, plan, refactor).
- It will be shipped onward (to the operator's stakeholders, to production, to a presentation, to another part of the frame).
- There's no strong novelty axis (if there is, use `/persona-fan-out`).
- It's bigger than a one-line edit (if it isn't, run solo).

If the operator asks "should I run a team on this?" and there's no obvious novelty / research / validation angle, the answer is almost always `/buddy-build`.

---

## Step 1 — Confirm the goal in one line

Echo the goal back to the operator in ≤2 sentences. The first sentence restates what's being built; the second names the quality bar.

```
Goal I'm hearing: refactor 03_tasklist_skills/01_refactor_tasklist.md into
3 smaller files (sweep / reorder / renumber callers).
Quality bar: every existing caller still works without changes.

Spinning up /buddy-build · builder + critiquer + optional validator.
```

Don't ask follow-up questions unless the goal is genuinely ambiguous. `/buddy-build` is the low-overhead default — heavy interview defeats the point.

---

## Step 2 — Spawn the builder (1 sub-agent)

The builder produces a first-pass deliverable + a brief reasoning paragraph. The reasoning paragraph stays internal — the critiquer will NOT receive it (see Step 3 isolation rule).

Builder prompt:

```
ROLE:        Builder. You are the first-pass producer in a buddy-build motion.
             A critiquer will read your deliverable next (but NOT your reasoning)
             and try to break it.
GOAL:        <operator's verbatim goal>
CONTEXT:     <relevant files / prior work / constraints>
ISOLATION:   You're the first sub-agent. No prior team output.
TASK:        Produce a first-pass deliverable + a brief reasoning paragraph
             (≤5 sentences) explaining your key choices.
DELIVERABLE: Two parts —
               1. The deliverable itself (whatever the goal asks for).
               2. A `### Reasoning` paragraph below it (kept internal — critiquer
                  will not see this).
QUALITY BAR: <what makes the deliverable shippable — derived from the goal>
```

---

## Step 3 — Spawn the critiquer (1 sub-agent)

**Critical:** the critiquer receives only the **goal + deliverable**, NOT the builder's reasoning. The reasoning paragraph is stripped before spawn. This is the buddy-system contract: a critiquer who absorbs the builder's framing stops finding real problems.

Critiquer prompt:

```
ROLE:        Critiquer. You read the deliverable cold and try to break it.
             Your job is to find what the builder missed, not to validate
             that it's good.
GOAL:        <operator's verbatim goal>
CONTEXT:     The deliverable (attached). The builder's reasoning is deliberately
             withheld — you read this with fresh eyes.
ISOLATION:   You do NOT receive the builder's reasoning or any back-channel
             explanation. Goal + deliverable only.
TASK:        Produce a bullet list of concerns (3–7 bullets, specific) AND
             one alternative angle the builder may have missed.
DELIVERABLE: Two parts —
               1. `### Concerns` — bullet list, each bullet specific and
                  evidence-based.
               2. `### Alternative angle` — one paragraph proposing a different
                  approach the builder didn't consider.
QUALITY BAR: A concern is specific if you can point to the exact place in the
             deliverable where it goes wrong. "Could be better" is not a concern.
             "Line 47 silently drops the error case when the input is empty" is.
```

---

## Step 4 — Builder revises (same sub-agent)

The builder receives the critique and produces a revised deliverable. The builder is allowed to incorporate, rebut, or partially address each concern — but must respond to each one explicitly.

Revision prompt:

```
ROLE:        Builder (revision pass).
GOAL:        <unchanged>
CONTEXT:     Your original deliverable + reasoning (attached). The critiquer's
             bullet list of concerns + alternative angle (attached).
ISOLATION:   The critiquer doesn't see this pass. You're responding to them
             one-way.
TASK:        Produce a revised deliverable AND a `### Response to critique`
             section that addresses each concern (incorporated / rebutted / partial).
DELIVERABLE: Two parts —
               1. The revised deliverable.
               2. `### Response to critique` — one bullet per concern, format:
                    - **<concern verbatim>** — incorporated / rebutted / partial.
                      <one-line explanation>
QUALITY BAR: Every critique bullet has a response. Don't silently drop one.
             If you rebut, the rebuttal is specific (not "I disagree, looks
             fine to me").
```

---

## Step 5 — Optional independent validator (1 sub-agent, default ON)

By default, `/buddy-build` ends with a validator pass. Skip it only if the operator opts out, OR the deliverable is internal-only (won't ship to anyone, won't go to production).

The validator receives ONLY the goal + the revised deliverable. Not the critique log. Not the reasoning. Not the builder's response.

Validator prompt:

```
ROLE:        Independent validator. You judge the deliverable against the goal.
             You did not see the build process.
GOAL:        <operator's verbatim goal verbatim>
CONTEXT:     The final revised deliverable (attached). Nothing else.
ISOLATION:   You do NOT receive the builder's reasoning, the critiquer's concerns,
             or the response-to-critique log. Goal + deliverable only.
TASK:        Judge: pass / fix / fail. Provide evidence for the verdict.
DELIVERABLE: Format —
               Verdict: <pass | fix | fail>
               Evidence:
                 - <specific bullet pointing to where in the deliverable the
                    judgment came from>
                 - …
               (if fix or fail) Suggested next step: <one sentence>
QUALITY BAR: Verdict is evidence-bound. Don't issue `pass` without naming what
             works. Don't issue `fix`/`fail` without naming what's broken.
```

**Validator verdicts:**

| Verdict | Meaning | Next step |
|---------|---------|-----------|
| `pass` | Deliverable meets goal. Ship. | Print the deliverable + receipt. |
| `fix` | Mostly there; specific issue identified. | Return to builder for one more revision pass (Step 4 loop). Cap at 2 revision rounds. |
| `fail` | Off-target — likely the goal itself needs reframing. | Surface to operator: "validator failed — here's the evidence, your call on whether to reframe the goal or accept partial." |

---

## Step 6 — Print the buddy-build receipt

```
Team receipt · /buddy-build
  Builder:   first pass produced (3 design choices, 1 trade-off noted)
  Critiquer: 4 concerns raised — 3 incorporated, 1 rebutted
  Validator: pass — meets the "every existing caller still works" bar
  Cost:      3 sub-agent calls
  Output:    embedded above this receipt
```

For a `fix` loop:
```
Team receipt · /buddy-build (1 revision round)
  Builder:   first pass + 1 revision after validator `fix`
  Critiquer: 5 concerns raised (initial), 1 new concern after revision
  Validator: fix → pass after revision
  Cost:      4 sub-agent calls
  Output:    embedded above this receipt
```

For a `fail`:
```
Team receipt · /buddy-build (validator failed)
  Builder:   first pass + 1 revision attempt
  Critiquer: 3 concerns raised
  Validator: ⚠ fail — see evidence below; operator decision required
  Cost:      4 sub-agent calls

Validator evidence:
  - <bullet>
  - <bullet>
```

Receipt is positive-signal-only above the line; failures and revisions surface below.

---

## Hard rules

1. **Critiquer isolation is non-negotiable.** Builder's reasoning is stripped before critiquer spawn. Convenience leaks defeat the pattern.
2. **Validator isolation is non-negotiable.** Validator sees only goal + final deliverable. Not the critique log. Not the response. Not the reasoning.
3. **Every critique bullet gets a response.** Builder cannot silently drop a concern. Incorporated / rebutted / partial — but never ignored.
4. **Revision cap = 2 rounds.** If validator still says `fix` after 2 rounds, escalate to the operator. Don't loop forever.
5. **Validator default = ON.** Off only on operator opt-out OR internal-only deliverables.
6. **Receipt is positive-signal-only above the line.** Diagnostics live below.
7. **Don't run `/buddy-build` on trivial tasks.** A one-line edit doesn't need a team. The orchestrator should route trivial work to solo, not to this skill.
8. **Builder and critiquer are different conceptual roles, not necessarily different model calls.** In practice they're separate sub-agent spawns with isolated context — but the skill can use the same model behind both. The discipline is in the prompt isolation, not in the model choice.

---

## Failure modes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Critiquer just praised the builder. | Critiquer received the builder's reasoning (isolation broke). | Re-spawn critiquer with goal + deliverable ONLY. Check the prompt construction. |
| Builder rebutted every critique. | Critique was generic ("could be cleaner") rather than specific. | Re-spawn critiquer with stronger quality bar: every concern must point to a specific line/section. |
| Validator looped between `fix` and `pass` indefinitely. | Builder's revisions are oscillating between two trade-offs. | Cap at 2 revision rounds; escalate to operator. |
| Validator says `fail` and operator says "but it's fine." | Goal was under-specified, validator and operator interpreted differently. | Restate the goal more specifically and re-run, OR ship with operator override (note in receipt). |
| Operator says `/buddy-build` is overkill. | Task was actually trivial. | Drop to solo with a noted trade-off; learn from the feedback. |

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
