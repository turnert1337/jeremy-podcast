# Skill — `/frame-doctor`

**File:** `02_session_skills/05_frame_doctor.md`
**Invoked by:** the orchestrator at cold start (parallel to `/frame-capacity`, BEFORE the intro card / greeting); ad-hoc when the operator asks "frame health?" / "is the frame ok?"
**Purpose:** One-pass preflight health check at cold start. Surface a half-installed frame before it silently degrades. Report-only — the operator decides what to fix.

---

## When to run

- Cold start. Runs **in parallel** with `/frame-capacity` (Section 0, Step 2). The summary line folds into the intro card (clean frame) or above the greeting (in-use frame).
- Ad-hoc: operator asks "frame health?" / "/frame-doctor".

---

## Performance contract

Render in well under one second. Batch every check into one shell pass — `stat`/`ls`/`test -e` over the full list, NOT one tool call per check. If you find yourself opening files with Read to verify presence, stop — existence checks are `stat`/`test`, not reads.

---

## Step 1 — The eight checks

Each produces one `🟢` / `🟡` / `🔴`:

| # | Check | 🟢 | 🟡 | 🔴 |
|---|-------|----|----|----|
| 1 | `CLAUDE.md` present + readable | exists, non-empty | — | missing or empty |
| 2 | `_session_log.md` present | exists (empty OK) | — | missing |
| 3 | `04_production_master_tasklist/00_Master_Tasklist.md` present | exists | — | missing |
| 4 | `_people_list.md` present | exists | absent (optional) | — |
| 5 | `_settings_and_customizations.md` present | exists | absent (optional) | — |
| 6 | Every skill referenced in `CLAUDE.md` Section 2 exists at its claimed path | all resolve | N orphans (non-critical) | a critical skill orphan |
| 7 | Every `.claude/commands/<slug>.md` shim points at an existing canonical file | all resolve | N shim orphans (non-critical) | a critical shim orphan |
| 8 | `.git/` present | is a directory | absent (frame works without git) | — |

Critical for checks 6 + 7: the cold-start skills `/intro-card`, `/frame-capacity`, `/frame-doctor`, `/session-log`. Everything else is non-critical.

---

## Step 2 — Run the batched pass

One shell pass (or at most two: existence + path-resolution). Build the skill-path list from `CLAUDE.md` Section 2 once.

```bash
stat -f%z \
  "<frame_root>/CLAUDE.md" \
  "<frame_root>/_session_log.md" \
  "<frame_root>/_people_list.md" \
  "<frame_root>/_settings_and_customizations.md" \
  "<frame_root>/04_production_master_tasklist/00_Master_Tasklist.md" \
  2>&1

ls "<frame_root>/.claude/commands/"
test -d "<frame_root>/.git" && echo "git present" || echo "no git"
```

For checks 6 + 7, compare the path list extracted from `CLAUDE.md` Section 2 (and the shim filenames in `.claude/commands/`) against actual files on disk in a single `find`. Compute each indicator from the batched output.

---

## Step 3 — Emit the summary + per-check rows

Format (summary line, then 8 per-check rows):

```
Frame Health · 🟢 6 green / 🟡 2 yellow / 🔴 0 red
  🟢 CLAUDE.md present
  🟢 _session_log.md present
  🟢 master tasklist present
  🟡 _people_list.md absent (optional)
  🟢 _settings_and_customizations.md present
  🟢 all 26 skill paths resolve
  🟢 all 29 shims resolve to canonical files
  🟡 .git/ absent (frame works without git)
```

Truncate any path to fit one terminal row (~80 cols). For orphans, name them inline:

```
  🟡 2 skill orphans (non-critical) — 06_presentation/03_update_roadmap.md, 07_team_skills/05_validate.md
```

---

## Step 4 — Suggested next (only if any 🟡 or 🔴)

Append ONE line — the most useful action — when anything is non-green:

| Worst finding | Suggested next |
|---------------|----------------|
| 🔴 `CLAUDE.md` missing | The frame is incomplete — restore from backup or re-clone before continuing. |
| 🔴 master tasklist missing | Run `/intake-new` or `/intake-existing` to seed the tasklist. |
| 🔴 critical skill orphan | A named cold-start skill file is missing — restore from version control. |
| 🔴 critical shim orphan | A `.claude/commands/<slug>.md` shim points at a missing canonical file — restore or remove. |
| 🟡 `_people_list.md` absent | Optional — `/people-list-update` will create it on first add. |
| 🟡 `_settings_and_customizations.md` absent | Optional — will be created on the first `/log-customization`. |
| 🟡 non-critical skill orphan | Audit `CLAUDE.md` Section 2 — a row references a file that doesn't exist. |
| 🟡 non-critical shim orphan | Remove the shim or restore its canonical file. |
| 🟡 `.git/` absent | Run `/git-init` if you want version-controlled history. |

If all checks are 🟢, omit "Suggested next" entirely.

---

## Step 5 — Return

If called inline (cold-start orchestrator): return the summary + per-check rows + optional "Suggested next" as a single multi-line string. The caller embeds it above the Frame Capacity meter.

If called standalone (operator ad-hoc): print the full block as the agent's first output and continue with whatever the operator asked for.

---

## Hard rules

- **Never fail loud.** Report-only. The doctor describes; the operator decides. No exception thrown, no execution halted on a 🔴.
- **Sub-second render.** One batched pass — never per-check tool calls. Must be parallelizable with `/frame-capacity`.
- **Stat-only, never read.** Existence is `stat`/`test -e`. Reading file contents to check presence is a bug.
- **Critical vs non-critical orphans differ.** A missing `/session-log` is 🔴; a missing `/update-roadmap` is 🟡.
- **One "Suggested next," at most.** Pick the worst finding. Operators fix one thing at a time.
- **All-green stays loud through the per-check rows.** The 8 rows always print (for operator awareness), but "Suggested next" only appears when something is non-green.
- **Idempotent.** Doctor never edits files. Pure observation.
