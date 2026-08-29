# 06 — File System Ethic

> The frame's naming and numbering conventions, codified. Read this on Day 1 — so that when you're about to drop a new file, you know where it goes, what it's named, and how it ages.
>
> Everything described here is enforced by the orchestrator and the skills. This file is the **why**; the skills are the **how**.

---

## TL;DR (the four rules)

1. **`NN_` prefixed folders carry frame infrastructure.** The number declares load-order and reading-order, not priority. Numbers are stable: once `04_production_master_tasklist/` exists, it stays at 04 forever.
2. **`_underscore_` prefixed files carry live, append-only state.** Anything starting with `_` is read on cold start, edited per session, and never renumbered. (`_session_log.md`, `_people_list.md`, `_settings_and_customizations.md`, `_swept/`.)
3. **Sequential numbers are write-once.** Once an `RN-007`, a `Session 14`, or a sweep-file `03_Complete_Sweep_2026-05-29.md` exists, its number is permanent. New entries get the next integer. Numbers are never re-used, never compacted.
4. **Artifacts have a home before they're created.** If you don't know where a new file goes, that's a signal to read this doc — not a signal to invent a top-level folder.

---

## The numbered-folder convention (frame infrastructure)

Folders with a `NN_` prefix are part of the frame's structural contract. The number is a load-order hint and a stable address — `02_session_skills/` will always be `02_session_skills/`, even if it moves in the conceptual hierarchy. Renaming a numbered folder is a frame-level decision, not a per-project one.

| Range | What lives here |
|-------|-----------------|
| `00_relay_frame/` | Frame documentation. Overview, specs, templates, the discovery chain, the F&B catalog, this file. **Read on cold start; reference material the rest of the time.** |
| `01_setup_skills/` | One-time intake skills. Run once per project at start. |
| `02_session_skills/` | Run every session. The session log, frame capacity, people list, log customization, frame doctor. |
| `03_tasklist_skills/` | Run when the tasklist needs maintenance. Refactor, sweep, reorder, renumber, fact-check. |
| `04_production_master_tasklist/` | The live tasklist. `00_Master_Tasklist.md` + `_swept/` archives. |
| `05_meeting_management/` | On-demand module: meeting input clearing-house. Three sub-folders (`1_inbox/` → `2_processed/` → `3_future/`). |
| `06_presentation/` | On-demand module: the published docs site. Markdown is upstream; `docs/` HTML is downstream. |
| `07_team_skills/` | On-demand module: buddy-system multi-agent patterns. |
| `99_project_skills/` | **Reserved slot for project-specific skills.** Starts empty by design. Numbered 99 so it's always at the end and the gap (08–98) is reserved for future modules without forcing 99 to move. |

### Numbering inside a folder

Files inside a numbered folder use the same `NN_` prefix, starting at `00_`. The `00_` file is conventionally the **rules-of-engagement** or **overview** for the folder — read it first when working in that module.

Examples:
- `03_tasklist_skills/00_tasklist_agent.md` — the rules.
- `05_meeting_management/00_module_rules.md` — the rules.
- `07_team_skills/00_team_motions_overview.md` — the rules.

Subsequent files (`01_…`, `02_…`, ...) carry the actual skills, also stable. A skill can be renamed, but its number stays.

### When to add a new numbered folder

Three tests must all pass:

1. **It's frame infrastructure**, not project content. (Project content goes in `99_project_skills/` or the project's own working files at the frame root.)
2. **It's a module — i.e., it ships a coherent set of skills + rules + state**, not a single file.
3. **It earns a slot in the discovery chain or as an on-demand module.** If neither, the addition probably belongs inside an existing module.

If only test 1 passes, the new thing probably belongs inside an existing numbered folder. If only tests 1 and 2 pass but it doesn't earn discovery-chain or on-demand status, it's premature — wait until use proves the need.

When a new numbered folder is justified, use the **next available number** in the 0X range (e.g., `08_…` if 07 is the last shipped module). Do not renumber existing folders to make room. The gap above `07_` and below `99_` is the **expansion buffer** — fill it from the bottom up, never compact it.

---

## The underscore-prefix convention (live state)

Files with a `_underscore_` prefix carry **live, append-only state**. They are:

- Read on every cold start (if they exist).
- Edited per session by the orchestrator and skills.
- Never renumbered or compacted.
- Owned by the project that's using the frame, not by the frame itself — meaning frame updates won't overwrite them.

| File / folder | Role |
|----------------|------|
| `_session_log.md` | Append-only session entries. Newest at top. Continuity spine. |
| `_people_list.md` | Roster of involved people + dated touchpoints. Append-only for touchpoints. Optional. |
| `_settings_and_customizations.md` | Above-the-fold settings table + append-only history of operator-driven changes. Optional. |
| `_swept/` (inside `04_production_master_tasklist/`) | Dated archive of completed tasks. Frozen — never edited. |
| `_meeting_template.md`, `_raw/` (inside `05_meeting_management/`) | Templates and frozen-source folders. The underscore signals "not a numbered skill — read on demand only." |
| `_templates/` (inside `06_presentation/`) | HTML fragment templates referenced by the presentation skills. |

**Rule of thumb:** if a numbered file describes a *behavior* the agent runs, an underscore file describes a *state* the agent reads and (sometimes) appends to. Numbered = verbs; underscore = nouns.

---

## Sequential numbering (the write-once contract)

Several artifacts inside the frame carry their own monotonically increasing sequence numbers, independent of folder numbering:

| Artifact | Sequence | Where |
|----------|----------|-------|
| Session entries | `Session 1`, `Session 2`, … | `_session_log.md` |
| Sweep archives | `01_Complete_Sweep_YYYY-MM-DD.md`, `02_…`, … | `04_production_master_tasklist/_swept/` |
| Master tasks | Tasks carry the next free integer | `04_production_master_tasklist/00_Master_Tasklist.md` |
| Customization history | Newest-first dated entries | `_settings_and_customizations.md` (below the fold) |
| Project notes (e.g., `RN-NNN`) | Project-specific sequences | wherever the project decides — but the contract is the same |

**The contract — every sequence in the frame follows these rules:**

- **Numbers are permanent.** Once `Session 7` is written, that number belongs to that session forever. The session itself can be edited (typo fixes, addenda noted in the next entry's Decisions), but the number doesn't move.
- **No re-use.** If a session is deleted in error, its number is **retired**, not reassigned. The next session is `N+1` from the highest existing — even if there's a gap.
- **No re-numbering.** Sweep files do not get renumbered when a sweep is consolidated. Tasks do not get renumbered when sweeps happen — the `/renumber-tasks` skill (`03_tasklist_skills/04_renumber_tasks.md`) is the **only** thing that touches active task numbers, and even it operates within strict rules.
- **No compaction.** If your sweep folder has `01_…`, `02_…`, `04_…` (missing 03), you don't backfill or shift. The gap is honest — it tells you something. Renumbering hides history.
- **Append at the right end.** Session log: newest at top (Session 1 is at the bottom). Sweep folder: newest sweep gets the highest number. Customization history: newest at top. Notes files: newest at bottom (sequence reads top-to-bottom). The orientation per file is fixed; the *sequence* itself is monotonic regardless.

---

## Where do new artifacts go? (a decision tree)

When you're about to create a new file, walk this tree:

1. **Is it a skill the orchestrator runs?**
   - **Frame skill** (general-purpose) → goes in an existing numbered skills folder. Almost never warrants a new top-level folder.
   - **Project skill** (specific to *this* project) → goes in `99_project_skills/` as a numbered file. Add a row to the CLAUDE.md project-skills table at the same time.

2. **Is it live state the orchestrator reads on cold start?**
   - **Underscore-prefix file at the frame root.** Document it in the discovery chain (`00_relay_frame/03_discovery_chain.md`) so it's read in the right order.

3. **Is it frame documentation / a spec?**
   - Goes inside `00_relay_frame/` with the next available `NN_` prefix.

4. **Is it a working document *about* the frame but not part of it?**
   - Goes at the **project root**, OUTSIDE `_Deliverable/`. Examples: `Relay-Frame-Anatomy.md`, `Relay-Frame-Roadmap.md`, `Relay-Frame-Notes.md`. These are scratch space + evolving design documents — they're versioned with the project but live above the frame folder so a clone of the frame doesn't drag them along.

5. **Is it a project artifact (the actual work the frame is supporting)?**
   - Goes at the frame root or in a project-defined folder. The frame doesn't own this — the project does. Examples: a manuscript draft, a Python module, a research dataset.

6. **Is it transient — a one-off scratch file, a temporary working file?**
   - Goes at the project root with a clear prefix (`scratch_…`, `tmp_…`, `WIP_…`). Don't litter the frame folders with throwaway files. When it stops being needed, delete it; if it earned permanence, promote it (rename, place per rules 1–5).

---

## Naming conventions

Beyond folder placement, file names themselves follow a few patterns:

- **kebab-case for slugs** referenced in URLs, CLI shims, and `2_processed/` meeting file names: `process-meeting`, `2026-05-28-with-priya-on-onboarding.md`.
- **snake_case for skill file names**: `02_frame_capacity_render.md`, `03_people_list_update.md`. Matches the canonical-path convention.
- **TitleCase / PascalCase for top-level handoff docs at project root**: `Relay-Frame-Anatomy.md`, `Relay-Frame-Roadmap.md`, `README.md`. These are for human readers landing cold.
- **`_Deliverable/` is the only TitleCase-prefixed folder** in the frame, because it's the boundary between "the frame as a thing" and "the project root that hosts the frame." Treat it as the marker for "what gets handed off."
- **Underscore-prefix carries the live-state semantic** described above — never used for transient working files (those use `scratch_…` / `tmp_…` / `WIP_…` to avoid confusion).

---

## Anti-patterns (don't do these)

- **Renaming a numbered folder to "make space" for a new module.** The expansion buffer (08–98) exists so you never have to.
- **Re-using a retired sequence number.** Better to leave a gap than to break the "this number is forever this thing" contract.
- **Summarizing a swept file because the folder is getting long.** Sweep files are frozen verbatim. If the folder is getting long, that's a story the operator wants to see, not edit out.
- **Dropping a project-specific file at the frame root just because it's convenient.** Either it's frame-level (numbered or underscore) or it's project-level (above `_Deliverable/`). The frame root is curated.
- **Numbering a project-skill file from `00_` instead of giving it a name-prefixed convention.** Project skills inside `99_project_skills/` use names, not the `NN_` convention — that prefix is reserved for the frame's own structural files.
- **Editing a live-state file out of band (without going through its maintenance skill).** Every `_underscore_` file has a paired skill: `_session_log.md` ↔ `/session-log`, `_people_list.md` ↔ `/people-list-update`, `_settings_and_customizations.md` ↔ `/log-customization`. Side-channel edits break the fact-check waves.

---

## How this ethic ages

If a new module needs a number, take the next available 0X. If a new live-state file needs to ship, give it an underscore prefix and document it in the discovery chain. If a new artifact type needs a sequence, define the sequence's append-direction (top vs. bottom) and document it in the artifact's own header.

The ethic itself is intentionally short. It's a Day-1 read for new operators, and a tie-breaker reference when an edge case shows up.

---

## Sister documents

- `00_overview.md` — the architectural overview the file system supports.
- `03_discovery_chain.md` — the read-order chain the underscore-prefix files participate in.
- `04_skills_index.md` — the catalog of shipped vs. project skills.
- Project root `Relay-Frame-Anatomy.md` — the exploded view of where each module sits relative to the others.
