# Skill — `/substack-drafting-flow`

**File:** `99_project_skills/01_substack_drafting_flow.md`
**Surface:** the Podcast Machine drafting view (`10_app/machine.html?view=post&id=<pN>`)
**Purpose:** the left-to-right process by which a Substack post moves from idea to published, with Turner as the writer and agents as planners/coaches. Any agent touching a post MUST follow this flow.

---

## The operator's binding rules (do not re-litigate)

1. **Turner writes the posts himself.** Agents produce plans, outlines, crafting direction, research, targets, and feedback. Agents NEVER write or rewrite his prose. Scaffolds in `10_app/drafts/` are reference artifacts only.
2. **Full prose reasoning on every review surface** — no bare verdicts, no shorthand.
3. **Nothing publishes without his explicit say-so.**
4. **Walmart-discretion filter** on all public content.

## The pipeline, left to right

```
idea → outlining (plan built, lock pending) → drafting (he writes in blocks)
     → feedback round(s) (agent, per block) → final decision (his)
     → GRIM (verbatim re-encode to markdown) → Substack paste → published
```

### Stage: idea
Lives in `10_app/machine_data.js` posts[] with `stage:"idea"`. Escalates ONLY when the operator says so. On escalation, the agent builds a full writing plan: hook, outline beats, pull-quotes, crafting direction, `why`, alt titles — grounded in `20_research/01_audience_response_brief.md` (the 12-point checklist is binding craft law) — plus items below.

### Stage: outlining (plan ready, lock pending)
Requirements before the operator can be asked to lock:
- **Similar-posts panel**: real, verified posts in the lane (`similar[]` in machine_data), each with an href and a one-line lesson. No invented URLs, ever — if a tweet/post can't be verified, link a stable secondary source and say so.
- **Comps-informed word target** (`targetWords: {target, band:[lo,hi], rationale}`): fetch the actual comps, estimate their lengths, reconcile with the audience brief's 1,400–2,200 band and the post's genre. The rationale is shown to the operator under the meter — write it in full prose.
- **Attribution gates**: any phrase the plan treats as borrowed must have a verified source. Unfindable → the plan carries an explicit gate (drop / ask the operator / coin as his own) and it BLOCKS the lock.
- The lock is the operator clicking/saying so — "lock the writing plan," never "approve my draft."

### Stage: drafting (his writing, in blocks)
The drafting view: **his writing panel on the LEFT** (labelled blocks — Title and Intro paragraph fixed, further sections added/removed with ＋/−), **plan + feedback on the RIGHT**, **word meter on top** (running count vs. the comps-informed target band).
- Blocks persist in localStorage: `machine.blocks.<postId>` = `[{label, text, fixed}]`. Stage: `machine.stage.<postId>`. Legacy notes (`machine.notes.<postId>`) auto-migrate into a block.
- localStorage is per-machine and fragile: when the operator exports (copy buttons), fold durable state back into `machine_data.js` / files promptly.

### The feedback round (agent work)
Trigger: operator pastes a `DRAFT FOR FEEDBACK ROUND` export (JSON: post, stage, target, words, blocks).
The agent:
1. Reads the blocks against the plan, the audience brief checklist, and the word target.
2. Writes **per-block recommendations** — each `{block: "<label>", recommendation: "<full prose: what to change, why it should work>"}` — into the post's `feedback: []` array in `machine_data.js`, so they render in the right pane next time the view opens.
3. May flag checklist violations (AI-cadence, snowclone titles, missing receipts, scene-less opens) and word-band position. May quote his sentences to discuss them; may NOT hand back rewritten prose as "the fix."
4. Multiple rounds are normal. The final decision on every word is the operator's.

### After the final decision → GRIM
See `99_project_skills/02_grim_reencode.md`. GRIM ports his final blocks verbatim into Substack-ready markdown. Then the publish checklist: cover image from the actual session, 2–3 pull-quotes marked, excerpt chapter deep link after the scene-opener, tags `Podcast`/`AI` conventions per the publication, and the episode↔post cross-links updated both ways (`machine_data.js` episodes[].posts and the episode show notes).

## Registry contract (machine_data.js)

Every post record: `id, title, stage, source, gate, planFrom|planInline, scaffold, chapterLink, research, targetWords, similar[], feedback[], summary`. Keep `summary` current as stages advance. Episodes list their spawned posts by id — maintain both directions.
