# 06 — Presentation module

> **What this module is.** The plumbing that lets The Relay Frame present itself — to a teammate, an exec, a hiring manager, or just future-you — as a static GitHub Pages site at `_Deliverable/docs/`. The site is the "front of house"; the rest of the frame is "back of house."
>
> **Why it exists.** A handoff-ready scaffold has to *look* handoff-ready. Pointing a reviewer at a folder of Markdown loses them in the first thirty seconds. Pointing them at a hosted page that explains the frame in 60 seconds and offers a tour wins them.

---

## What ships in this module

| Path | Purpose |
|------|---------|
| `00_module_rules.md` | The discipline of the module: never auto-publish, copy is single-source-of-truth, no broken links allowed. **Read first.** |
| `01_update_landing.md` | Skill: regenerate `docs/index.html` from the canonical F&B doc + any module-table changes. |
| `02_update_features.md` | Skill: re-flow the F&B accordion in `docs/index.html` from `00_relay_frame/05_features_and_benefits.md`. |
| `03_update_roadmap.md` | Skill: edit the phases / dots / NOW indicator on `docs/roadmap.html`. |
| `04_add_milestone.md` | Skill: append a new milestone (past/now/future) on the roadmap timeline. |
| `_templates/` | The canonical HTML scaffolds the skills clone from (landing, roadmap, phase card, accordion item, milestone dot). |

---

## The `docs/` folder layout (the published site)

```
_Deliverable/docs/
├── index.html              ← landing page (this is the front door)
├── roadmap.html            ← phase tracker with a strobing "now" dot
├── styles/
│   ├── index.html          ← style explorer hub (loads variants in tabs)
│   ├── 01_walmart_corporate.html
│   ├── 02_editorial_magazine.html
│   ├── 03_terminal_developer.html
│   ├── 04_operator_console.html
│   ├── 05_swiss_minimalist.html
│   ├── 06_notion_docs.html
│   ├── 07_apple_marketing.html
│   ├── 08_vintage_engineering.html
│   ├── 09_glassmorphic_vercel.html
│   └── 10_print_newspaper.html
├── assets/                 ← reserved for images / icons (currently empty; logo is inline SVG)
└── README.md               ← short note for anyone who lands in /docs from GitHub
```

GitHub Pages serves automatically from `/docs` on the default branch when enabled in repo settings. No build step. No dependencies.

---

## Why a static site (and not a slide deck or PDF)

- **Living artefact.** The site updates as the frame updates. A reviewer always sees the current state.
- **Single source of truth.** The HTML is generated from `05_features_and_benefits.md`. If the F&B doc changes, `/update-features` re-flows the accordion. Copy never drifts out of sync.
- **Zero build chain.** Plain HTML / CSS / vanilla JS. No npm install, no bundler, no broken deploy pipeline.
- **Walmart-on-brand.** The visual language clones the NACBP project — same wordmark with animated spark, same Living Design palette, same Gantt-style milestone tracker. Looks like it belongs to the broader Walmart documentation universe.

---

## Visual language (cloned from NACBP)

Cloned faithfully from the NACBP doc site (`/Users/t0t0fck/Dev/NACBP/docs/`):

| Element | Source pattern | Where it lives |
|---------|---------------|----------------|
| Top bar | Bentonville navy + Spark-yellow underline + wordmark with animated 14px yellow dot | `index.html` `.topbar` / `.wordmark .spark` |
| Hero | Navy-to-true-blue gradient + Spark-yellow eyebrow pill + 38px white headline | `index.html` `.hero` |
| Value cards | White surface + 1px line + 6px soft shadow + accent-soft icon tile | `index.html` `.value-card` |
| Accordion | Bentonville/yellow tag chip on the left + monospace location label on the right + chevron that rotates 90° on open | `index.html` `.accordion` |
| Milestone tracker | Horizontal rail with positioned dots + strobing 14px Spark-blue dot for "now" (2s ease-in-out keyframes, verbatim) | `roadmap.html` `.gantt-marker.now .dot` |
| Phase card | Bentonville tag + status pill + title + when (monospace) + bullet list. NOW card has a 1px Spark-blue ring + pulsing "Now" badge | `roadmap.html` `.phase-card` |
| Related cards strip | Three-up grid of clickable cards with kicker / title / one-line description | `index.html` `.related-strip` |
| Footer | Bentonville bar + frame version in monospace | both pages |

**Color tokens** (declared as CSS variables in every file under `:root`):

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

**Typography.** Inter (or system sans). Monospace fallback for code / locations / version lines.

---

## How a user opens this

1. **Locally:** open `_Deliverable/docs/index.html` in a browser. No server needed.
2. **Hosted:** push the repo with the `_Deliverable/docs/` folder, enable GitHub Pages → "Deploy from a branch" → main → `/docs` (or `/_Deliverable/docs` if the deliverable is the whole repo). The site is live at `https://<user>.github.io/<repo>/`.
3. **In a presentation:** open `index.html` full-screen, tour the F&B accordion, then jump to `roadmap.html`. The strobing "now" dot sells where the project is right now.

---

## Hard rules (summary — full rules in `00_module_rules.md`)

- **Never auto-publish.** Skills regenerate the local HTML files. Pushing to git is the operator's call.
- **HTML is generated, never hand-edited in the wild.** If a skill exists for a change, use it. Hand-edits drift out of sync with the source doc.
- **Copy lives in `00_relay_frame/05_features_and_benefits.md`.** The HTML is downstream.
- **No broken links.** Skills verify every cross-link before writing.
- **Style variants are separate files in `docs/styles/`.** They don't replace `docs/index.html` — they're explored side-by-side through the style explorer hub.

---

## Frame version

```
The Relay Frame · MVP draft 2 · 2026-05-25
```
