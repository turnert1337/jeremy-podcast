# Skill — `/validate`

**File:** `07_team_skills/05_validate.md`
**Invoked by:** the operator (`/validate`, "validate this", "sanity-check this", "is this ready to ship"); `/team` when the goal shape is VALIDATE; `/buddy-build` Step 5 as the optional validator pass.
**Purpose:** The cheapest team motion that earns its keep. A single fresh sub-agent receives only the goal + the deliverable (never the build process) and returns `pass / fix / fail` with evidence. The buddy system's minimum viable quality gate.

Rules of engagement: `07_team_skills/00_team_motions_overview.md`. Read it first.

---

## When to invoke

Reach for `/validate` whenever something has been built and you want a clean-eyes verdict before shipping:

- A solo agent just produced a deliverable and you want a quality gate.
- The operator built something themselves and wants an independent check.
- A `/buddy-build` already ran and Step 5 fires the validator.
- An existing artifact (a tasklist, a doc, a session log entry, a PR) needs a sanity-check.

**Don't invoke when** the deliverable is trivial (one-line edit, mechanical rename) or genuinely doesn't ship onward (the validator is overhead for purely private notes).

This is the **cheapest motion in the module** — 1 sub-agent, post-hoc. Reach for it freely. If you're tempted to skip it because it feels like overhead, that's the moment to run it.

---

## Step 1 — Confirm the goal + the deliverable

Restate the goal in ≤2 sentences. Confirm the deliverable boundary (which file, which section, which artifact).

```
Validating against goal:
  "Refactor 01_refactor_tasklist.md into 3 smaller files (sweep / reorder /
   renumber callers). Every existing caller must still work without changes."

Deliverable boundary:
  - 03_tasklist_skills/01_refactor_tasklist.md (revised)
  - 03_tasklist_skills/02_sweep_tasks.md (new)
  - 03_tasklist_skills/03_reorder_tasks.md (new)
  - 03_tasklist_skills/04_renumber_tasks.md (new)
  - all existing references in CLAUDE.md + 04_skills_index.md

Spinning up validator. Clean context. Goal + deliverable only.
```

If the deliverable boundary is ambiguous ("which version do I check?"), ask. Otherwise proceed.

---

## Step 2 — Spawn the validator (1 sub-agent, fresh context)

The validator MUST receive only the goal + the deliverable. Not the build process, not the reasoning, not any prior critiques, not the operator's preferences for the answer. This is the whole point of the skill.

Validator prompt:

```
ROLE:        Independent validator. You judge a deliverable against a goal,
             with no knowledge of how it was built. You're the quality gate
             before it ships.
GOAL:        <operator's verbatim goal>
CONTEXT:     The deliverable (attached, verbatim). The original goal (above).
             Nothing else.
ISOLATION:   You do NOT receive the build process, the builder's reasoning,
             any prior critique, the operator's expressed preferences, or any
             other team's output. Goal + deliverable only. This is by design.
TASK:        Judge the deliverable: pass / fix / fail. Provide specific evidence
             for the verdict, pointing to exact lines / sections / behaviours.
DELIVERABLE: Markdown block —
               Verdict: <pass | fix | fail>
               Evidence:
                 - <specific bullet: where in the deliverable the judgement
                    came from. Cite line numbers or section headers when
                    possible.>
                 - …
               (if `fix`) Suggested fix: <one to three sentences naming what
                          specifically needs to change>
               (if `fail`) Likely root cause: <one sentence on why this is
                           off-target — often the goal itself needs reframing>
               Confidence: high | medium | low (why)
QUALITY BAR: A verdict without evidence is not a verdict. Every conclusion is
             tied to a specific observation in the deliverable. "Looks good"
             is not validation. "Section 4 covers the three new files but
             doesn't update the cross-reference in CLAUDE.md Section 2" is.
```

---

## Step 3 — Interpret the verdict

| Verdict | Meaning | Recommended next step |
|---------|---------|------------------------|
| `pass` | Deliverable meets the goal. | Ship. Print receipt. |
| `fix` | Specific gap identified. Mostly there. | Either return to builder (if `/validate` was called from `/buddy-build`) or surface to operator with the suggested fix. |
| `fail` | Off-target. Often the goal needs reframing. | Surface to operator: "validator failed — here's the evidence. Reframe the goal, accept partial, or rerun from a different angle." |

**Important:** `/validate` does NOT auto-fix. If the verdict is `fix`, the skill returns with the evidence and lets the caller decide whether to spin up another build pass. Validators judge; they don't build.

---

## Step 4 — Print the validation receipt

### `pass` receipt:

```
Validation receipt · /validate
  Verdict:    pass
  Evidence:   3 specific observations confirmed (see below)
  Confidence: high
  Cost:       1 sub-agent call

Evidence:
  - Section 4 of revised 01_refactor_tasklist.md correctly references the 3
    new files in order.
  - Each new file (02/03/04) has a complete skill header (file path, invoked
    by, purpose).
  - CLAUDE.md Section 2.3 was updated to list all 4 files; the 4_skills_index.md
    table was updated with matching rows.
```

### `fix` receipt:

```
Validation receipt · /validate
  Verdict:    fix
  Evidence:   2 issues found (see below)
  Confidence: high
  Cost:       1 sub-agent call

Evidence:
  - 01_refactor_tasklist.md still references "sweep, reorder, renumber" inline
    in Step 3 — should be replaced with cross-references to the new files.
  - 04_renumber_tasks.md is missing the "Hard rules" section that all other
    skill files use as the closer.

Suggested fix:
  Update Step 3 in 01_refactor_tasklist.md to point to the new files. Append
  a "Hard rules" section to 04_renumber_tasks.md modeled on 03_reorder_tasks.md.
```

### `fail` receipt:

```
Validation receipt · /validate
  Verdict:    ⚠ fail
  Evidence:   See below; goal likely needs reframing
  Confidence: medium
  Cost:       1 sub-agent call

Evidence:
  - The 3 new files were created, but they are stubs (each <50 lines) rather
    than full skill protocols. The original 01_refactor_tasklist.md was 280
    lines; the 3 new files sum to 110 lines. Content was lost.

Likely root cause:
  The refactor was treated as a renaming-and-routing exercise, not as a content
  split. The original 280 lines need to be redistributed verbatim across the
  new files, with each file owning its full sub-protocol.

Operator decision:
  - Reframe goal as "redistribute verbatim, don't summarise" and re-run.
  - OR accept the stubs as v1 and plan a verbatim pass later.
```

Receipt is positive-signal-only above the line. Diagnostics live below.

---

## Step 5 — Return

If called from another skill (e.g., `/buddy-build` Step 5): return the structured verdict + evidence. The caller decides what to do with `fix` / `fail`.

If called by the operator directly: print the receipt in the chat. On `fix` or `fail`, surface the suggested-fix or root-cause line and wait for direction.

---

## Hard rules

1. **Validator isolation is the entire feature.** If the validator receives anything other than goal + deliverable, the skill has failed. Re-spawn with clean context.
2. **Evidence-bound verdicts only.** `pass` lists what works; `fix` / `fail` lists what's broken — both with specific pointers. No verdicts on vibes.
3. **`/validate` does not auto-fix.** Verdicts return to the caller; the caller decides whether to spin up a build pass.
4. **`fail` means the goal likely needs reframing.** A `fail` is not a "try harder" signal — it's a "this artifact and this goal don't match" signal. Surface to the operator.
5. **One sub-agent only.** `/validate` is the minimum-cost gate. If you want multiple validators, that's a different pattern (jury-of-experts) — propose adding it as a new skill, don't expand this one.
6. **Confidence level is required.** High / medium / low. A confident `pass` and a low-confidence `pass` are different signals to the operator.
7. **Receipt is positive-signal-only above the line.** Diagnostics live below.
8. **Don't compose `/validate` inside `/validate`.** That's just one sub-agent with extra steps. If you need a deeper check, use `/buddy-build` with the validator slot turned on, or adversarial seasoning.

---

## Failure modes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Validator just rubber-stamped the deliverable. | Validator received the builder's reasoning (isolation broke). | Re-spawn with goal + deliverable ONLY. Check the prompt construction. |
| Validator's evidence is generic ("looks good", "well-structured"). | Quality bar in the prompt wasn't enforced. | Re-spawn with explicit "every observation cites a specific line/section" instruction. |
| Validator says `fix` for a tiny issue that doesn't matter. | Quality bar was over-tuned. | Operator can override and ship; note in receipt that the fix was deemed non-blocking. |
| Validator says `pass` and the operator finds bugs ten minutes later. | The goal was under-specified, OR the deliverable was outside the validator's expertise. | Reframe the goal to include the missed bar, and either rerun `/validate` or escalate to `/buddy-build` with critiquer. |
| Operator keeps calling `/validate` after every solo build. | This is the right reflex. | No fix needed. The buddy-system principle is working. |

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
