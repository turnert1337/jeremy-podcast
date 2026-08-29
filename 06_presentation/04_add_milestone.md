# Skill — `/add-milestone`

**File:** `06_presentation/04_add_milestone.md`
**Invoked by:**
- Operator: "add a milestone for X" / "add a phase" / "/add-milestone".

**Purpose:** Append a new milestone — past, current, or future — to `_Deliverable/docs/roadmap.html`. This means inserting a new `.gantt-marker` dot on the timeline AND a matching `.phase-card` in the phase grid below.

For editing an existing milestone, use `/update-roadmap` instead.

---

## When to run

- A new phase / sprint / deliverable enters the roadmap.
- A retroactive milestone needs adding ("we shipped X last month but it's not on the timeline").
- The "now" dot moves and the previous "now" needs to become a "done" while the new "now" gets appended.

---

## Step 1 — Collect the milestone fields

Ask the operator the following questions. Don't combine them — one at a time:

1. **Title** (e.g. "Phase 5 — Beta hardening")
2. **Status** — one of: `done` / `in-progress` / `planned` / `future`. Default: `planned`.
3. **Short label** (for the dot, e.g. "Jun 2026" or "Sprint 12")
4. **Long when** (for the phase card, e.g. "Jun 2026" or "2026-06-15")
5. **One-paragraph description** (verbatim — no paraphrasing later)
6. **3–5 bullet sub-items** (the phase card's `<ul>`)
7. **Is this the new "now"?** — y/n. If yes, current "now" becomes `done`.
8. **Position on the timeline** — operator picks a percentage 0–100, OR the skill proposes one based on date proximity to other dots.

If the operator can't answer any of these, ASK — don't fabricate.

---

## Step 2 — Choose timeline position

If the operator gave a position, use it. Otherwise:

- Read existing `.gantt-marker` elements and their `left: X%` values.
- If the new milestone's date sits between two existing milestones, propose a position interpolated by date.
- Show the operator the proposed position before writing.

Hard floor: 5%. Hard ceiling: 95%. Don't crowd the edges.

If a new dot would overlap an existing one by less than 5%, propose a small offset (e.g. ±2%) and confirm.

---

## Step 3 — Echo the full new milestone

Echo BOTH parts (dot HTML + phase card HTML) before writing:

```
Proposed new milestone — Phase 8 (Module pattern cookbook):

DOT (on timeline)
  <div class="gantt-marker future" style="left: 90%;">
    <span class="above">Phase 8</span>
    <span class="dot"></span>
    <span class="label">Sep 2026</span>
  </div>

PHASE CARD (in grid)
  <div class="phase-card">
    <span class="phase-num">8</span>
    <span class="status-pill future">Future</span>
    <h3>Phase 8 — Module pattern cookbook</h3>
    <div class="when">Sep 2026</div>
    <p>Document the three-folder + citation pattern so teams can spin up new modules using the same shape.</p>
    <ul>
      <li>Worked-example: emails-as-module</li>
      <li>Worked-example: tickets-as-module</li>
      <li>Empty-module starter folder</li>
    </ul>
  </div>

(If this becomes the new "now": Phase 7 will be downgraded from "in-progress" to "done", and the "now" badge moves here.)

  [Y] write it
  [edit] adjust
  [skip] cancel
```

---

## Step 4 — Verify before writing

| Check | What |
|-------|------|
| Exactly one `.gantt-marker.now` | After insertion, exactly ONE dot has the `now` class. |
| Exactly one `.phase-card.now` | After insertion, exactly ONE card has the `now` class. |
| Sequential phase numbers | The `.phase-num` chip on the new card is the next integer after the last one. |
| Status pill class valid | One of `done` / `in-progress` / `planned` / `future`. |
| Position not overlapping | The new dot's `left: X%` is at least 4% away from every other dot. |
| Strobing keyframes intact | The `@keyframes pulse` block is untouched. |
| Phase grid still valid HTML | All `<div>`s closed, no malformed markup. |

If any check fails, abort and print the failure.

---

## Step 5 — Write + receipt

Write the new dot to `.gantt-track` (appended at the end is fine — visual order is controlled by `left: X%`, not document order). Write the new phase card to `.phase-grid` (append at the end).

If the operator confirmed this is the new "now", also downgrade the previous `.gantt-marker.now` to `done` and remove the `now-badge` from the previous `.phase-card.now`.

Print:

```
🟢 docs/roadmap.html: +1 milestone (Phase 8 — Module pattern cookbook, position 90%, status future)
   ("now" stayed on Phase 4)
```

or:

```
🟢 docs/roadmap.html: +1 milestone (Phase 5 — Beta hardening, position 62%, status in-progress)
   ("now" moved from Phase 4 → Phase 5; Phase 4 status: in-progress → done)
```

---

## Step 6 — Cascade prompt

If the operator added a `done` milestone retroactively, prompt:

```
ℹ Consider also:
  · session log — add an entry recording the milestone shipped
  · master tasklist — sweep any tasks that match this milestone
```

If the operator added a `future` milestone, prompt:

```
ℹ Consider also:
  · master tasklist — does this milestone need any new tasks to track it?
```

Prompt only. Don't fire — the operator decides.

---

## Hard rules

- **Sequential phase numbers.** No gaps. The `.phase-num` on the new card is `last + 1`.
- **Exactly one "now."** Adding a new "now" demotes the old one. Adding a non-"now" doesn't touch the existing "now."
- **Dot AND card together.** Never add a dot without a card, or vice versa.
- **Never crowd the edges.** Position is clamped to 5%–95%.
- **Verbatim description.** Whatever the operator types in Step 1 question 5 lands in the card's `<p>` exactly.
- **Never auto-publish.** Write locally; the operator commits.
- **Always echo before writing.** Step 3 is mandatory.

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
