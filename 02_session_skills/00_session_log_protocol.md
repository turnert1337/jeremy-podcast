# Skill — `/session-log`

**File:** `02_session_skills/00_session_log_protocol.md`
**Invoked by:** the user at the end of a working session ("log this session," "log it," "/session-log," "end of session").
**Purpose:** Write a new entry to `_session_log.md` using the canonical template, fact-check it in parallel, commit (if git is set up), and print the receipt with `🟢` close-out lines.

---

## When to run

- End of a working session.
- The user signals: "log this," "/session-log," "end of session," "wrap it up," etc.

This skill does the writing, fact-checking, and receipt in one orchestrated flow.

---

## Step 1 — Collect what to log

Read the session context (the conversation that just happened) and assemble the fields from the template at `00_relay_frame/02_session_log_template.md`:

- `YYYY-MM-DD` (today)
- `Session N` (next sequential number — read `_session_log.md`, find highest existing, add 1)
- `Title` (one short phrase; if unclear, propose 3 options and ask user to pick)
- `Phase`
- `Decisions` (what got decided and why — empty placeholder "None — execution only" if nothing)
- `Completed` (bulleted list of discrete units of completed work)
- `Subs` (integer count of sub-agents spawned this session, excluding this logging agent)
- `Pending` (threads touched this session that aren't wrapped)
- `Next session starts with` (one specific first task)
- `Status snapshot` (3–7 lines, format: `name | stage | blocker`)

If the agent is unsure of any field, ASK the user. Do not invent.

---

## Step 2 — Confirm fields with the user (only if ambiguity)

If any field was inferred rather than directly stated by the user, echo back a short confirmation block:

```
Quick check before I write the entry:

  Title           : [proposed]
  Decisions       : [proposed — one line per decision]
  Next session    : [proposed]

Look right?  [Y] / [edit]
```

Loop until the user approves.

---

## Step 3 — Run parallel preflight (build phase)

Fan out FOUR sub-agents in parallel — these are *prep* agents, not validators yet:

| Sub-agent | Task |
|-----------|------|
| A — Tasklist scanner | Open `04_production_master_tasklist/00_Master_Tasklist.md`. Identify any task whose status changed this session (e.g., `🔴` → `🟡`, `🟡` → `✅`). Return: changed-tasks list. |
| B — Git scanner | Detect git presence. If git is initialized: run `git status` + collect a draft commit message based on changed files + run `git branch --show-current` (fallback: `git symbolic-ref --short HEAD`) to capture the current branch name. If not initialized: return "no git." |
| C — Frame Capacity computer | Invoke `02_session_skills/02_frame_capacity_render.md`. Return the one-line meter string. |
| D — People-list scanner | Scan the session's transcript for unconfirmed people signals (new names, new touchpoints). For each candidate, propose a `/people-list-update` invocation and confirm with the operator before writing. Work happens silently — the receipt does NOT surface a people-list line. Return: `{added: N, touched: M, skipped: K}` for the diagnostics block (if any validator fails); otherwise nothing visible to the operator. |

Wait for all four to return.

---

## Step 4 — Write the entry

Prepend the new entry to the TOP of `_session_log.md`, following the template exactly. Use the data from Steps 1–3.

The `**Git:**` line takes one of three forms depending on sub-agent B's result. Sub-agent B also returns the current branch name (from `git branch --show-current`), which is always included when git is present:

| Sub-agent B result | Git line |
|--------------------|----------|
| Git OK, commit will succeed | `committed (<short_sha>) on branch <name> — "<draft message>"` (sha filled in at Step 5) |
| Git OK, no changes to commit | `no changes — branch <name>` |
| No git | (omit the line entirely from the receipt; the file still has the placeholder for editing later) |

If the master tasklist was changed this session AND the changes aren't already reflected in the tasklist file, also update the tasklist (status emoji, last-refactored date if applicable). The log entry should reflect reality after this step.

---

## Step 5 — Commit (only if sub-agent B said git is OK)

Run:

```bash
git -C "<frame_root>" add -A
git -C "<frame_root>" commit -m "<draft message>"
```

If the commit succeeds, grab the short SHA and substitute it into the `**Git:**` line of the new session-log entry. If a remote is configured, also push:

```bash
git -C "<frame_root>" push
```

Update the `**Git:**` line to add `· pushed` if push succeeded.

If commit or push fails: capture the error verbatim for the Diagnostics block (Step 8); leave the `**Git:**` line as `commit failed — see diagnostics`.

---

## Step 6 — Run the fact-check wave

Invoke `/session-log-factcheck` (`01_session_log_factcheck.md`). It runs FOUR parallel validators:

| Validator | Checks |
|-----------|--------|
| 1 — Template integrity | Every required template field is present. Numbering is sequential. Append-to-top happened. |
| 2 — Tasklist consistency | Every "Completed" bullet correlates with a task status change in `00_Master_Tasklist.md`. Any tasklist change matches the log entry. The Status snapshot in the log entry matches the current state of the tasklist file (this is what backs the `🟢 tasklist context saved` receipt line). |
| 3 — Git correctness | The `**Git:**` line matches the actual git state (commit SHA exists, branch name matches, push succeeded if claimed). |
| 4 — People-list correctness (silent) | If sub-agent D wrote any changes: confirm each new person / touchpoint is reflected in `_people_list.md` with operator confirmation traceable from this session. Confirm the counts in sub-agent D's return match the file delta. **This validator does NOT print to the receipt** — it only surfaces if it FAILs (then the diagnostics block prints). A passing validator 4 is invisible. |

Each validator returns PASS / FAIL with specifics. Collect results.

---

## Step 7 — Print the receipt (two-phase: shell first, then flip greens)

This is the user-visible output. It renders in TWO phases so the operator sees the receipt shell almost immediately and watches each line flip from ⚪ to 🟢 as the underlying work confirms — instead of staring at a blank chat while the parallel waves finish.

### Phase A — Print the shell with placeholders (immediately, before Step 6 fact-check returns)

As soon as the entry has been written to disk (end of Step 4 / Step 5), print the shell with every status line in the **placeholder** state. The shell is identical to the final receipt except the indicators are `⚪` and the Frame Capacity line carries a `computing…` token until sub-agent C returns:

```
─────────────────────────────────────────────────────────────
SESSION LOG — Session NN — YYYY-MM-DD — [Title]
─────────────────────────────────────────────────────────────
Phase ............. [phase, truncated to ~50 chars]…
Decisions ......... [first decision, truncated]…
Completed ......... [N items: first item truncated]…
Subs .............. [count]
Pending ........... [first item truncated]…
Next session ...... [task, truncated]…
Status snapshot ... [N concepts]
─────────────────────────────────────────────────────────────
⚪ tasklist context saved          (verifying…)
⚪ session log updated              (fact-checking…)
⚪ git committed · branch: <name>   (committing…)

Frame Capacity · ⚪ · computing…
─────────────────────────────────────────────────────────────
```

The body lines (Phase, Decisions, Completed, Subs, Pending, Next session, Status snapshot) are filled in from Step 1 data — they print final on Phase A. Only the four status lines are placeholders.

### Phase B — Flip placeholders to greens as each result returns

Replace each `⚪ … (…)` line with its final `🟢 …` form the moment its underlying check passes. The expected flip order in a healthy run:

1. `🟢 git committed · branch: <name>` — flips when Step 5 returns (or `🟢 no changes — branch <name>`; omit the line entirely if no git).
2. `Frame Capacity · 🟢/🟠/🔴 · Xk / 170k usable (Y%)` — flips when sub-agent C returns from `/frame-capacity`.
3. `🟢 tasklist context saved` — flips when validator 2 (Tasklist consistency) returns PASS.
4. `🟢 session log updated` — flips when validator 1 (Template integrity) returns PASS.

(The order is whichever returns first — the four flips are independent. The list above is the typical race outcome on a clean run; don't enforce a sequence.)

If a validator FAILS, the corresponding line flips to its final `🟢` form **only if the failure is non-blocking for that indicator** (e.g., validator 4 failing is people-list-only; it surfaces in Diagnostics, doesn't degrade the receipt). Any indicator whose underlying check actually failed stays `⚪` and the failure is described in the Diagnostics block under Step 8 — the receipt itself stays visually clean.

### Final shape (after all flips land)

```
─────────────────────────────────────────────────────────────
SESSION LOG — Session NN — YYYY-MM-DD — [Title]
─────────────────────────────────────────────────────────────
Phase ............. [phase, truncated to ~50 chars]…
Decisions ......... [first decision, truncated]…
Completed ......... [N items: first item truncated]…
Subs .............. [count]
Pending ........... [first item truncated]…
Next session ...... [task, truncated]…
Status snapshot ... [N concepts]
─────────────────────────────────────────────────────────────
🟢 tasklist context saved
🟢 session log updated
🟢 git committed · branch: <name>

Frame Capacity · 🟢 · 87k / 170k usable (51%)
─────────────────────────────────────────────────────────────
```

### Receipt truncation rules

- Each visible line MUST fit in one terminal row (assume 80 columns). Truncate any field longer than ~55 chars with `…`.
- The label column above the receipt divider is fixed-width and dot-leadered (matches the example above).
- Section dividers are 61 hyphens.
- The three `🟢` status lines, the blank gap, and the Frame Capacity line sit between the two lower dividers. **The Frame Capacity line is always the FINAL line before the closing divider.**

### Receipt structure (the new shape)

Three status lines, a visual gap (blank line), then Frame Capacity as the closer:

1. `🟢 tasklist context saved` — the session-log entry's Status snapshot reflects the current state of `00_Master_Tasklist.md`, and any in-session tasklist edits are saved to file.
2. `🟢 session log updated` — file written + fact-check passed.
3. `🟢 git committed · branch: <name>` — branch comes from sub-agent B (Step 3). If no changes were committed, this reads `🟢 no changes — branch <name>`. If no git is configured, **omit the entire line** (no red, no diagnostic — the receipt still reads clean).
4. **Blank line** — the visual gap. This is intentional emphasis; do not collapse it.
5. `Frame Capacity · 🟢/🟠/🔴 · Xk / 170k usable (Y%)` — from sub-agent C. Always the final line before the closing divider. **The line is ONE labelled line. The label `Frame Capacity` is required. The indicator (🟢/🟠/🔴) sits INSIDE the line between two `·` separators — never as a standalone green dot above or below the line.**

### Lines that were REMOVED (do not add them back)

- ~~`🟢 people list updated (+N / Δ touched M)`~~ — the people-list work happens silently. Sub-agent D's counts are NOT printed in the receipt. They flow into the Diagnostics block ONLY if validator 4 fails. A successful people-list update produces no receipt line.
- ~~`⚪ /pickup context module primed [roadmap]`~~ — the roadmap placeholder is gone. The `tasklist context saved` line above is the real, shipped behavior; no aspirational ⚪ placeholders.

### Indicator rules

- The **session log updated** line is `🟢` once the file is written and the fact-check passes.
- The **git** line is `🟢` once Step 5 succeeds (or returns "no changes"). If no git is configured, omit the line. Never red.
- The **tasklist context saved** line is `🟢` once the session-log entry's Status snapshot has been written and any tasklist file changes from this session are saved.
- The **Frame Capacity** line carries its own indicator (`🟢/🟠/🔴`) per the spec in `00_relay_frame/01_frame_capacity_spec.md`. It's a separate axis from the close-out greens — capacity can be 🔴 even when the session closed cleanly.
- Never use red on a clean close-out. If something failed, surface it in the Diagnostics block (Step 8) — keep the receipt visually green.

---

## Step 8 — Diagnostics block (only if any validator FAILed or git failed)

If ANY of Step 6's validators returned FAIL, or if Step 5's git commit/push failed, print a Diagnostics block **below** the receipt:

```
─────────────────────────────────────────────────────────────
DIAGNOSTICS — issues caught during fact-check
─────────────────────────────────────────────────────────────
[validator name] [PASS/FAIL]
  └─ [specific finding, one line]

[validator name] [PASS/FAIL]
  └─ [specific finding]
─────────────────────────────────────────────────────────────
```

The Diagnostics block sits OUTSIDE the receipt frame, on purpose, so a clean run looks visually green.

If everything passed, omit the Diagnostics block entirely. The user should see only the receipt.

---

## Step 9 — Final actions

- The session log file is saved.
- The receipt has been printed.
- Diagnostics (if any) have been printed.
- The agent stops talking. Do not add a closing flourish — the receipt IS the close.

---

## Hard rules

- **Append-only.** The new entry goes at the TOP of `_session_log.md`. Never edit existing entries except for typo fixes (and disclose those in the next entry's Decisions).
- **Sequential numbering, never reused.** Session 1, 2, 3, ... Find the highest existing number, add 1.
- **Every template field present.** If a field is empty, write the explicit placeholder (e.g., `**Subs:** 0`).
- **Parallel where possible.** Steps 3 sub-agents A, B, C, D run in parallel; Step 6 validators run in parallel. The user should see a fast turnaround.
- **No red indicators.** All close-out lines are `🟢`. Missing git is not a failure state.
- **Receipt is exactly three status lines + gap + Frame Capacity.** Do not add receipt lines for people-list updates, tasklist refactors, or roadmap placeholders. The receipt is `🟢 tasklist context saved` / `🟢 session log updated` / `🟢 git committed · branch: <name>` / blank / `Frame Capacity · ...`. Period.
- **Frame Capacity is always the FINAL line** before the closing divider. The blank line above it is intentional — don't collapse it.
- **The Frame Capacity line is ONE labelled line — never bracketed by green dots.** The correct shape is `Frame Capacity · 🟢/🟠/🔴 · Xk / 170k usable (Y%)`. Do NOT emit a standalone `🟢` line above or below it. Do NOT print it as a bare `🟢 Xk / 170k …` without the `Frame Capacity` label. The label and the in-line indicator are both required; the receipt must never produce a green dot on either side of the capacity row.
- **Two-phase render is mandatory.** Print Phase A (shell with `⚪` placeholders + body lines filled in) the instant the entry hits disk — do NOT wait for the validator wave to finish before showing the operator anything. Then flip each `⚪ … (…)` line to its final `🟢` form as the underlying check returns. The operator should never see a blank chat while the parallel waves run. If your harness can't actually re-render in place, emit the Phase A shell, then emit a *single updated copy* of the receipt when all flips land — never trickle individual lines as separate messages outside the receipt frame.
- **Placeholder shape is fixed.** Placeholder lines are `⚪ <label>          (<verb>ing…)` — same column layout as the final greens, with a short verb describing what's pending in parens. The Frame Capacity placeholder is `Frame Capacity · ⚪ · computing…`. Don't invent new placeholder forms.
- **People-list work is silent.** Sub-agent D and validator 4 do their job inline (confirming with the operator while the session is running). The receipt never prints a people-list count. A failed validator 4 surfaces only in the Diagnostics block.
- **Diagnostics outside the frame.** Clean runs read as three green lines + capacity. Issues are surfaced honestly but quarantined visually.
- **Branch is always shown when git is present.** Never collapse to just "committed" — the operator wants to know what branch the work landed on. If git is not configured, omit the entire git line.
