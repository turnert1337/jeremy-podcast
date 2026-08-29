# Skill — `/update-roadmap`

**File:** `06_presentation/03_update_roadmap.md`
**Invoked by:**
- Operator: "update the roadmap" / "edit the timeline" / "/update-roadmap".
- `/add-milestone` calls this implicitly when an existing milestone needs editing rather than appending.

**Purpose:** Edit the phases / dots / "now" indicator on `_Deliverable/docs/roadmap.html`. Use this when an existing milestone's date / status / description changes, or when the strobing "now" dot moves.

If you're *adding* a brand-new milestone, use `/add-milestone` instead. This skill is for modifying ones that already exist.

---

## When to run

- A phase shipped (status changes from `in-progress` → `done`).
- A phase slipped (date changes).
- The "now" dot needs to move (a new phase has become current).
- A phase card's description / bullet list needs editing.
- The phase pill text or color group changes.

---

## Step 1 — Identify the milestone(s)

Read `_Deliverable/docs/roadmap.html`. Locate the two parts of the milestone:

| Part | Where |
|------|-------|
| Gantt dot (timeline) | `.gantt-track > .gantt-marker` with the matching `.above` label. |
| Phase card | `.phase-grid > .phase-card` with the matching `<h3>` title. |

Ask the operator which milestone, then echo both the current dot AND the current phase card. Never edit just one — they must stay in sync.

---

## Step 2 — Identify what changes

Common changes:

| Change | What to update |
|--------|---------------|
| Status changed | `.status-pill` class (done / in-progress / planned / future) + `.gantt-marker` class (done / now / future). |
| "Now" dot moves | Remove `now` class from previous marker; add `now` class to the new marker. Same for the phase card (`.phase-card.now` + `.now-badge`). |
| Date changed | `.gantt-marker .label` (short date) + `.phase-card .when` (longer date). |
| Position on rail | `.gantt-marker` `style="left: X%;"` — adjust the percentage to match the timeline position. |
| Title changed | `.gantt-marker .above` + `.phase-card h3`. |
| Description / bullets changed | `.phase-card p` + `.phase-card ul`. |

---

## Step 3 — Propose the change

Echo the BEFORE and AFTER for both parts:

```
Proposed roadmap edit — Phase 4 (Presentation):

BEFORE
  Dot:  class="gantt-marker now"   above="Phase 4"  label="May 25"  left=48%
  Card: status-pill in-progress    now badge: yes
        bullets: …

AFTER
  Dot:  class="gantt-marker done"  above="Phase 4"  label="May 25"  left=48%
  Card: status-pill done           now badge: removed
        bullets: same

(Also: "now" badge moves to Phase 5.)

  [Y] write changes
  [edit] adjust
  [skip] cancel
```

---

## Step 4 — Verify before writing

| Check | What |
|-------|------|
| Exactly one `.now` dot | After the change, exactly ONE `.gantt-marker.now` exists. |
| Exactly one `.now` phase card | After the change, exactly ONE `.phase-card.now` exists. |
| Dot position fits timeline | The `left: X%` value is between 0% and 100%. |
| Status pill class valid | One of `done` / `in-progress` / `planned` / `future`. |
| Strobing keyframes intact | The `@keyframes pulse` block + `.gantt-marker.now .dot { animation: pulse … }` are untouched. |
| Dot and phase card stay in sync | If the dot says "done", the phase card's `.status-pill` also says "done." |

If any check fails, abort and print the failure.

---

## Step 5 — Write + receipt

Write the updated dot + phase card. Print:

```
🟢 docs/roadmap.html: updated Phase N (status: done → done, "now" moved to Phase M)
```

---

## Hard rules

- **Exactly one "now" indicator.** The strobing dot is the visual signature; multiple "now"s break the metaphor.
- **Dot and card stay in sync.** They're two views of the same milestone. Always edit both.
- **Never invent dates.** If the operator says "phase 4 shipped today," use today's date from the system clock — don't approximate.
- **Never modify the strobing keyframes.** That's the NACBP signature — preserved verbatim per `00_module_rules.md` Rule 5.
- **Never auto-publish.** Write locally; the operator commits.
- **Always echo before writing.** Step 3 is mandatory.
- **The roadmap is a template by default.** If the operator hasn't customised it, prompt: "this roadmap shows placeholder phases — replace before sharing?" Don't make stakeholders read placeholder content thinking it's real.

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
