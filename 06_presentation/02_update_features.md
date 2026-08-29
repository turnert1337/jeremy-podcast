# Skill — `/update-features`

**File:** `06_presentation/02_update_features.md`
**Invoked by:**
- Operator: "regenerate the features page" / "the F&B doc changed, sync the site" / "/update-features".
- `/refactor-tasklist` does NOT call this.
- Auto-fire on detection (light): when the operator saves `00_relay_frame/05_features_and_benefits.md`, propose `/update-features` (but never fire silently).

**Purpose:** Re-flow the F&B accordion in `_Deliverable/docs/index.html` from the canonical Markdown at `00_relay_frame/05_features_and_benefits.md`. This is the only skill allowed to write the accordion's HTML.

---

## When to run

- A module section in `05_features_and_benefits.md` was rewritten / added / removed.
- A module's feature/benefit table got a new row.
- A module's title / location / spec line changed.
- The "Operator wins" intro table needs to refresh the value cards above the accordion (light propagation — confirm with operator).

If the hero / quick-start / related strip changed → use `/update-landing` instead.

---

## Step 1 — Diff the source

Read both files:

- Source: `00_relay_frame/05_features_and_benefits.md`
- Target: `_Deliverable/docs/index.html` (the `<section id="fb">` block)

Identify what's different at the module level:

| Diff type | Action |
|-----------|--------|
| Module added | Insert new `.acc-item` block in HTML at the right position. |
| Module removed | Remove the matching `.acc-item` block. |
| Module title changed | Update the `.acc-header .title` text. |
| Module location changed | Update the `.acc-header .loc` text. |
| Feature/benefit row added | Insert new `<tr>` in the module's `.acc-body` table. |
| Row content changed | Update the matching `<td>` text. |
| Row removed | Remove the matching `<tr>`. |
| Spec line changed | Update the `.spec` text. |

---

## Step 2 — Propose the change

Echo a diff summary to the operator before writing:

```
Proposed accordion update (5 changes):

  Module B
    + new row: "Status snapshot." → "The session log preserves a moving picture …"
  Module E
    ~ updated row: "/process-meeting." (operator benefit reworded)
  Module H
    – removed row: "Roadmap honesty (deprecated)"

  [Y] write all changes
  [partial] approve one at a time
  [skip] cancel
```

The operator can approve all, approve per-change, or skip. NEVER silent.

---

## Step 3 — Verify before writing

Before writing, verify:

| Check | What |
|-------|------|
| Accordion JS intact | The one-open-at-a-time `<script>` block at the bottom of `index.html` is untouched. |
| `.acc-item` count matches source | Number of modules in HTML matches number of modules in Markdown. |
| Module letters sequential | A, B, C, … no gaps. |
| Tag chips match | The `<span class="tag">` letter on each accordion header matches its module letter. |
| All `<td>` cells closed | No malformed table HTML. |
| Internal links inside copy resolve | If the F&B text mentions a file path, it doesn't have to be a hyperlink, but if rendered as one it must resolve. |

If any check fails, abort and print the failure. Do NOT write a partial accordion.

---

## Step 4 — Write + receipt

Write the updated `<section id="fb">` block. Print:

```
🟢 docs/index.html: F&B accordion synced from 05_features_and_benefits.md
  · 8 modules · N rows added / M rows updated / P rows removed
```

---

## Step 5 — Cascade check

If the operator approved a major change (new module, removed module, renamed module), also surface:

```
ℹ Consider syncing related places:
  · CLAUDE.md §1 — mechanics table  (touches: orchestrator section)
  · 00_relay_frame/00_overview.md — overview mechanics table
  · 00_relay_frame/04_skills_index.md — skill rows for the module
  · docs/index.html — value cards (if the new module changes the "What it does" story)
```

This is a *prompt*, not a fire. The operator decides whether to update each.

---

## Hard rules

- **Markdown is the source of truth.** Never edit accordion HTML in `index.html` to "fix" something — fix the Markdown and regenerate.
- **The accordion JS is invariant.** Never modify the one-open-at-a-time script. If it ever needs changing, that's a hand edit, not this skill.
- **Verbatim discipline.** If a row in the source says "verbatim discipline," the HTML row says "verbatim discipline." No paraphrasing.
- **Never collapse a module.** Each module gets its own `.acc-item`. Do not merge two modules even if they're short.
- **Never auto-publish.** Write locally; the operator commits and pushes.
- **Always echo before writing.** Step 2 is mandatory.

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
