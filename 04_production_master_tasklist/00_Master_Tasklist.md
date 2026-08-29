# Master Tasklist — [Clean Relay Frame, awaiting intake]

*Started: — · Last refactored: —*

**Active clusters:** _(none yet — set during intake)_
**Handoff sequence:** _(none yet — set during intake)_
**Archived:** _(none yet — sweeps land in `_swept/`)_

---

## Status key

| Status | Meaning |
|--------|---------|
| 🟡 | **In progress** — work is actively underway. |
| 🔴 | **Not started** — queued, no work done yet. |
| 🟠 | **Waiting on** — blocked on a person, decision, dependency, or external answer. Detail block names what (e.g., *waiting on Priya's review · waiting on legal sign-off · waiting on Snyk fix release*). |
| ✅ | **Complete** (transient) — done; swept to `_swept/` on next `/refactor-tasklist`. |
| ⚪ | **Parked** (optional) — deliberately set aside; not blocked, just deferred. |

> Same emoji appears in the summary table AND in the detail-block heading for the same task. Always. Reorder priority during `/refactor-tasklist`: 🟡 → 🔴 → 🟠 → ⚪ → ✅.

---

> This is a **stub tasklist**. The frame is clean — no project intake has been done yet.
>
> When the user runs `/intake-new` or `/intake-existing`, this file gets seeded with the first 1–3 starter tasks. Until then, it exists only to mark the spot.
>
> Do **not** treat this file as a real tasklist. Do **not** start adding tasks manually before intake — the intake skill handles the initial seeding and sets the metadata above.

---

## Above the fold — Active tasks

| # | Status | Task |
|---|--------|------|
| 1 | 🔴 | **Complete intake interview** — run `/intake-new` or `/intake-existing` to initialise this project. |

---

## Below the fold — Detail blocks

## Task 1 — Complete intake interview 🔴

**New (clean frame, awaiting intake).** The frame is in its initial state. The user should run the intake interview before treating this tasklist as real.

**What to do:**
- If this is a brand-new project: run `/intake-new`.
- If you have existing files to import: run `/intake-existing`.
- If unsure which: run `/intake-router` and it'll guide you.

**Why this is Task 1:**
- The intake fills in the project header at the top of this file.
- It seeds 1–3 real starter tasks and removes this placeholder.
- It writes the first session-log entry.
- It (optionally) initialises local git.

After intake, this entire block is replaced with real tasks. The intake skill handles the cleanup.

---

> **Reminder for the orchestrator:** if a session starts with this stub still in place, treat the frame as clean and offer to run intake.
