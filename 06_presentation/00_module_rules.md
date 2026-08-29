# 00 — Presentation module rules (READ FIRST)

> **This is not a skill — it is the rulebook every presentation skill obeys.** Read this once. The skills below reference it.

The Presentation module owns the `_Deliverable/docs/` GitHub Pages site. It is the "front of house" for The Relay Frame. Reviewers, stakeholders, and future operators land on `index.html` first — long before they open any Markdown file.

The rules below exist because a front-of-house artefact only works if it's trusted to be current, consistent, and never lying.

---

## The seven rules

### Rule 1 — Copy lives upstream. HTML is downstream.

The canonical source for the F&B accordion content is `00_relay_frame/05_features_and_benefits.md`. The HTML in `docs/index.html` is generated from it.

If the F&B doc changes:

1. Run `/update-features`. It re-flows the accordion section from the source Markdown.
2. Never hand-edit the accordion HTML to "fix a typo" — fix the typo upstream and regenerate.

Same rule applies to the roadmap: copy lives in `_Deliverable/Relay-Frame-Roadmap.md` (when it exists) or in `docs/roadmap.html` itself when no upstream doc is present. If the upstream doc exists, it wins.

### Rule 2 — Never auto-publish.

Skills regenerate local HTML files. They do NOT push to git, they do NOT trigger a deploy, they do NOT open a pull request. The operator decides when the published version updates.

The skill's job ends with the local file written + a one-line receipt. The operator's job is `git add docs/ && git commit && git push`.

### Rule 3 — Visual language is shared.

All pages in `docs/` (and all variants in `docs/styles/`) declare the same Walmart Living Design color tokens in `:root`. The tokens are defined verbatim across files. When the palette changes, every file must change in lockstep — a skill (`/update-palette`, future) will do this; for now, search-and-replace and verify.

The canonical tokens:

```
--wm-spark-blue: #0071dc
--wm-true-blue:  #004f9a
--wm-bentonville:#041f41
--wm-spark-yellow:#ffc220
--wm-ink:        #1a1a1a
--wm-body:       #2a2a2a
--wm-muted:      #5a6472
--wm-line:       #e5e7eb
--wm-surface:    #ffffff
--wm-bg:         #f7f8fa
--wm-accent-soft:#eaf3fc
```

Style-variant files in `docs/styles/` are allowed to declare additional tokens for their persona (e.g. drop caps, glass blur, terminal green), but the base Walmart tokens still appear in every file at the top.

### Rule 4 — One-open-at-a-time accordion.

The F&B accordion on `index.html` enforces a single open item at a time. This is on purpose: it forces sequential reading. The skill that regenerates the accordion preserves this script verbatim:

```js
document.querySelectorAll('.acc-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.acc-header').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
```

Style variants may visualise the accordion differently, but the one-open-at-a-time behaviour is non-negotiable across all variants.

### Rule 5 — The strobing "now" dot is the NACBP pattern.

The roadmap's "now" indicator uses the NACBP keyframe verbatim:

```css
.gantt-marker.now .dot {
  background: var(--spark);
  box-shadow: 0 0 0 1.5px var(--spark), 0 0 6px 2px rgba(0,113,220,0.3);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 1.5px var(--spark), 0 0 6px 2px rgba(0,113,220,0.3);
  }
  50% {
    box-shadow: 0 0 0 2.5px var(--spark), 0 0 12px 4px rgba(0,113,220,0.45);
  }
}
```

This is the visual signature that ties The Relay Frame's roadmap to the wider Walmart documentation universe. Do not invent a custom strobe.

### Rule 6 — Self-contained files. No build chain.

Every page in `docs/` is a single HTML file with inline `<style>` and inline `<script>`. The only allowed external assets are:

- Google Fonts (for Inter, Playfair Display, IBM Plex Mono, etc.) — loaded via `<link>` in `<head>`.
- Inline SVG (for icons / wordmark sparkle). No external image references unless the asset is committed to `docs/assets/`.

No npm, no bundler, no transpiler, no React. The page must work when double-clicked from Finder.

### Rule 7 — No broken links.

Every skill that touches an HTML file verifies its cross-links before writing:

- All `href="…"` attributes pointing inside `docs/` must resolve to a file that exists.
- All `href="#…"` anchor links must point to an `id` that exists on the same page.
- All `href` attributes pointing to repo-relative Markdown (e.g. `../00_relay_frame/00_overview.md`) must resolve to a file that exists.

If a link can't be verified, the skill refuses to write and prints the offending href.

---

## The skills in this module

| Skill | File | Does |
|-------|------|------|
| `/update-landing` | `01_update_landing.md` | Regenerate `docs/index.html`'s static sections (hero, what-it-does cards, quick-start, related strip, footer). Does NOT touch the accordion (that's `/update-features`). |
| `/update-features` | `02_update_features.md` | Re-flow the F&B accordion in `docs/index.html` from `00_relay_frame/05_features_and_benefits.md`. |
| `/update-roadmap` | `03_update_roadmap.md` | Edit the phases / dots / NOW indicator on `docs/roadmap.html`. |
| `/add-milestone` | `04_add_milestone.md` | Append a new milestone (past/now/future) on the roadmap timeline + a matching phase card. |

> Style-variant files in `docs/styles/` are persona-specific. There is no "update-style-variant" skill. If a variant needs an update, edit it directly — the style explorer is for design exploration, not for canonical content.

---

## The style explorer hub

`docs/styles/index.html` is the entry point to the 10 design persona variants. It loads each variant in an in-page tab (iframe or `<details>` shell), so the operator can click through and compare without leaving the page.

The hub is read-only. It exists to help the operator pick a final visual direction. Once picked, the chosen variant's CSS can be back-ported to `docs/index.html` as a single update.

---

## Hard "do not"s

- **Do not edit `docs/index.html` by hand for accordion content.** Use `/update-features`.
- **Do not edit `docs/roadmap.html` by hand for milestone dots.** Use `/add-milestone` or `/update-roadmap`.
- **Do not commit a broken-link state.** Run the skill's pre-write verification.
- **Do not auto-publish.** Push to git only when the operator says so.
- **Do not duplicate copy.** The F&B Markdown is the source. The HTML accordion is downstream.
- **Do not mix persona styles.** A style variant is one persona, end-to-end. Don't combine glass cards with editorial drop caps.

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
