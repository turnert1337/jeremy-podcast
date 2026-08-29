# `docs/` — The Relay Frame published site

GitHub Pages serves this folder. Enable in repo settings → Pages → Source: "Deploy from a branch" → main → `/docs` (or `/_Deliverable/docs` if the deliverable is the whole repo).

## Files

| Path | Purpose |
|------|---------|
| `index.html` | **Intro page (1 of 2).** Hero (with one-line gloss of the Frame), resolution rail (How it Works → four frame files), "Why It Matters" (three-layer stack: framework / harness / model), "What's in it for you" (three-panel workweek exhibit), "Suggested Deployment" (terminal vs VS Code + Wibey). Links to `anatomy.html`. |
| `anatomy.html` | **Anatomy page (2 of 2).** The exploded view — big ASCII Frame anatomy diagram plus the four-module accordion deep-dive. Linked from `index.html` via "See the full anatomy". The COLD START band shows `/frame-doctor` running in parallel with `/frame-capacity` ahead of `/intro-card`. |

## Architecture

Two-page Pattern A design: each HTML file is self-contained (inline CSS, inline SVG logo, no shared assets). The pair `index.html` + `anatomy.html` is the front door.

## Don't hand-edit

`index.html` and `anatomy.html` are the new (2026-05-27) hand-authored intro-pager design — a one-off rebrand of the front door. Future copy updates should either continue the hand-authored pattern or be migrated back into the `/update-landing` skill.

The `06_presentation/` skills (`/update-landing`, `/update-features`) were built around an earlier accordion-based landing page. If you reintroduce that pattern, read `_Deliverable/06_presentation/00_module_rules.md` before changing anything.

## Frame version

`The Relay Frame · MVP draft 2 · 2026-05-27`
