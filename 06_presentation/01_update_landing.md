# Skill — `/update-landing`

**File:** `06_presentation/01_update_landing.md`
**Invoked by:**
- Operator: "update the landing page" / "regenerate index.html" / "/update-landing".
- Other skills (rare): when a frame-version bump needs to propagate.

**Purpose:** Regenerate the *static* sections of `_Deliverable/docs/index.html` — the hero copy, the three "What it does" value cards, the quick-start strip, the related-cards strip, and the footer. Does NOT touch the F&B accordion — that's `/update-features`.

---

## When to run

- The hero headline or lede changes.
- The "What it does" cards need updating (e.g. a new top-level value prop).
- The quick-start steps change.
- The related-cards strip points to a new page or external link.
- The footer / frame version line needs bumping.

If only the accordion content changed → use `/update-features` instead.
If only the roadmap changed → use `/update-roadmap` instead.

---

## Step 1 — Identify what changed

Ask the operator one short question:

```
Which section needs updating?

  [hero]    headline, lede, eyebrow, CTA buttons
  [cards]   three "What it does" value cards
  [quick]   quick-start strip steps
  [related] related-cards strip (links to roadmap / styles / repo)
  [footer]  frame version line / footer copy
  [all]     full regenerate (rare — confirm twice)
```

Loop until the operator picks one or more sections. NEVER guess.

---

## Step 2 — Read the current state

Read `_Deliverable/docs/index.html`. Read the affected section verbatim — never assume what's there.

Locate the section by its anchor:

| Section | Anchor / class |
|---------|---------------|
| Hero | `<section class="hero">` |
| Cards | `<section id="what">` |
| Quick-start | `<section id="quick-start">` |
| Related | `<section id="related">` |
| Footer | `<footer>` |

---

## Step 3 — Propose the change

Echo the proposed new content back to the operator BEFORE writing. Use the exact HTML the skill will write — no summarisation, no "I'll add some copy here."

Example for the hero:

```
Proposed hero update:

<span class="hero-eyebrow">[NEW EYEBROW]</span>
<h1>[NEW HEADLINE]</h1>
<p class="lede">[NEW LEDE]</p>

  [Y] write it
  [edit] let me adjust
  [skip] cancel
```

Loop until the operator approves or skips.

---

## Step 4 — Verify before writing

Before writing, the skill checks:

| Check | What |
|-------|------|
| Color tokens intact | `:root { --wm-spark-blue: … }` block unchanged. |
| Wordmark intact | `.wordmark .spark` block + `@keyframes spark-pulse` unchanged. |
| Internal links resolve | Any `href="…html"` points to a file that exists in `docs/`. |
| Anchor links resolve | Any `href="#…"` points to an `id=` that exists on the page. |
| Frame version current | Footer's `.frame-version` text matches the operator's intended version. |

If any check fails, abort and print the failure. Do NOT write half a change.

---

## Step 5 — Write + receipt

Write the section. Then print:

```
🟢 docs/index.html: updated [section] (e.g. hero, footer)
```

If the operator picked multiple sections, one receipt line per section.

---

## Hard rules

- **Never touch the F&B accordion in this skill.** That's `/update-features`. The accordion is downstream of `05_features_and_benefits.md` and a different skill owns it.
- **Never auto-publish.** This skill writes to disk. It does NOT `git add`, `git commit`, or `git push`. The operator decides when the published version updates.
- **Never duplicate the wordmark CSS.** It's defined once at the top of `index.html`'s `<style>`. Style variants get their own copy in their own files.
- **Never write a broken-link state.** Step 4 is non-negotiable.
- **Always echo before writing.** Step 3 is mandatory.
- **Never invent copy.** If the operator says "update the lede" without giving the new lede, ASK for the exact words. Don't paraphrase from the upstream Markdown unless the operator explicitly says "pull from `05_features_and_benefits.md` intro."

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
