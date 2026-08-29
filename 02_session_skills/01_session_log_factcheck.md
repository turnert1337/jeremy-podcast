# Skill — `/session-log-factcheck`

**File:** `02_session_skills/01_session_log_factcheck.md`
**Invoked by:** `/session-log` Step 6 (or directly by a curious user wanting to validate a recent entry).
**Purpose:** Run a parallel wave of four independent validators against the most recent session-log entry. Return PASS/FAIL per validator with specifics.

---

## When to run

- Called by `/session-log` after the entry has been written and (optionally) committed.
- Can also be run standalone to validate an existing entry.

---

## Inputs

- The session-log entry just written (or the most recent entry if standalone).
- The current state of `04_production_master_tasklist/00_Master_Tasklist.md`.
- The current state of `_people_list.md` (if present), plus the people-list-update payload from `/session-log` Step 3 sub-agent D.
- The current git state (if applicable).

---

## Validator 1 — Template integrity

**Independent sub-agent.** Reads ONLY `_session_log.md` (top entry) and `00_relay_frame/02_session_log_template.md`.

Checks:

| Check | Pass condition |
|-------|----------------|
| 1.1 — Heading present | The entry starts with `## YYYY-MM-DD -- Session N: [Title]`. |
| 1.2 — All fields present | `Phase`, `Decisions`, `Completed`, `Subs`, `Pending`, `Next session starts with`, `Status snapshot` all appear, in order, with bolded labels. |
| 1.3 — Numbering sequential | `N` is exactly one greater than the previous entry's session number (or 1 if this is the first). |
| 1.4 — Appended to top | This entry is the FIRST entry in the file (above any older entries). |
| 1.5 — Date is today | Entry date matches the system date. |
| 1.6 — Subs is an integer | The Subs field is a number ≥ 0. |
| 1.7 — Status snapshot has 3–7 lines | Each line matches the `name | stage | blocker` shape. |

Return: a list of PASS/FAIL per check, with the offending line quoted if FAIL.

---

## Validator 2 — Tasklist consistency

**Independent sub-agent.** Reads `_session_log.md` (top entry) AND `04_production_master_tasklist/00_Master_Tasklist.md`.

Checks:

| Check | Pass condition |
|-------|----------------|
| 2.1 — Completed items match | Every bullet in `Completed` that mentions a Task # corresponds to a task whose status changed in the tasklist this session (e.g., now `🟡` or `✅`). |
| 2.2 — Status snapshot match | Every concept in `Status snapshot` either corresponds to an active task in the tasklist OR is explicitly a frame/process concept (not a task). Concepts marked as blocked correspond to tasklist entries marked `🟠`. |
| 2.3 — No phantom tasks | No bullet in `Completed` references a Task # that doesn't exist in the master tasklist OR a recent sweep file. |
| 2.4 — No silent task changes | If a task status changed in the tasklist this session, the log entry mentions it (either in Completed or Status snapshot). |

Return: PASS/FAIL per check with specifics.

---

## Validator 3 — Git correctness

**Independent sub-agent.** Reads ONLY the `**Git:**` line of the latest entry and runs `git` commands.

Branch on what the `**Git:**` line claims:

| Line claims | Check |
|-------------|-------|
| `committed (<sha>) "<msg>"` | `git log --oneline -1` matches `<sha>` and `<msg>`. |
| `committed (<sha>) "<msg>" · pushed` | Above PLUS the local main matches origin/main (no commits ahead). |
| `committed — no changes` | `git status --porcelain` is empty. |
| `commit failed — see diagnostics` | A specific error is captured for Diagnostics. |
| (line absent) | Git is not initialized; confirm with `git rev-parse` failing. |

Return: PASS/FAIL with the actual git state quoted if FAIL.

---

## Validator 4 — People-list correctness

**Independent sub-agent.** Reads `_people_list.md` and the people-list-update payload from `/session-log` Step 3 sub-agent D. Skips silently (returns PASS with note "no people-list activity") if sub-agent D returned `{added: 0, touched: 0, skipped: 0}` AND `_people_list.md` is unchanged.

Checks:

| Check | Pass condition |
|-------|----------------|
| 4.1 — Counts match | The `added` and `touched` counts in sub-agent D's payload match the actual file delta (new active-roster rows = `added`; existing rows with a refreshed `Last touched` = `touched`). |
| 4.2 — Roster ↔ detail consistency | Every row in the Active roster has a matching numbered detail block, and vice versa. Numbering is sequential, no gaps. |
| 4.3 — Touchpoint append discipline | Every newly added touchpoint is the LAST line in its person's "Touchpoints" list. No prior touchpoint was modified or reordered. Dates are in YYYY-MM-DD. |
| 4.4 — Confirmation trace | For each new entry / touchpoint written this session, an operator confirmation is traceable in the session transcript. Inferred values without confirmation = FAIL. |

Return: PASS/FAIL with specifics.

---

## Step — Run validators in parallel

The coordinator (this skill) dispatches all four validators simultaneously. Each is an independent sub-agent that does NOT see the others' work.

Wait for all four. Collect their results.

---

## Step — Return aggregated result

Return a single result block to the caller (`/session-log`):

```json
{
  "validator_1_template": "PASS" | { "FAIL": ["specific finding 1", "..."] },
  "validator_2_tasklist": "PASS" | { "FAIL": ["specific finding 1", "..."] },
  "validator_3_git":      "PASS" | { "FAIL": ["specific finding 1", "..."] },
  "validator_4_people":   "PASS" | { "FAIL": ["specific finding 1", "..."] }
}
```

If everything is PASS, the caller prints the receipt with all green lines and no Diagnostics block.

If any validator returned FAIL, the caller prints the Diagnostics block below the receipt, listing the failures verbatim.

---

## Hard rules

- **Four INDEPENDENT validators.** They must not share state or read each other's work mid-run. Independence is what makes the fact-check trustworthy.
- **No fixing during validation.** If a validator finds something wrong, it REPORTS it. The fix happens (or doesn't) outside this skill, via a follow-up edit or a new session.
- **Quote, don't paraphrase.** If a check fails, the validator's finding must quote the offending content from the file. Vague findings are not allowed.
- **Run in parallel.** This is part of the design — fact-check should be fast and visible. Sequential validators defeat the purpose.
