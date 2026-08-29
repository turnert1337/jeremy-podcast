# 02 — Session Log Entry Template (canonical)

This is the **road-tested template** for every session-log entry. It is the source of truth — when the session-log skill writes an entry, it follows this format exactly.

---

## The template

```markdown
## YYYY-MM-DD -- Session N: [Title]
**Phase:** [active phase]
**Decisions:** [what was decided and why]
**Completed:** [bulleted list]
**Subs:** [number of sub-agents spawned this session, not counting the agent logging this entry]
**Pending:** [what's left]
**Next session starts with:** [specific first task]
**Status snapshot:** [one-line per active concept: name | stage | blocker if any]
**People-list delta:** [added N · touched M · skipped K — omit line if all zero]
**Git:** [committed (sha) "message" / pushed / blank if no git]

After logging, verify the master tasklist AND people list match reality.
```

---

## Section-by-section guide

### `## YYYY-MM-DD -- Session N: [Title]`

- Date in ISO format.
- Session number is **sequential, never reused**. If you skip a number, you skip it — don't backfill.
- Title is one short phrase capturing the session's headline. Aim for 4–8 words. Examples: `Intake interview + first tasks`, `Tasklist refactor + sweep`, `Email digest scoping`.

### `**Phase:**`

Where in the project lifecycle this session sat. Examples: `Intake`, `Build draft 1`, `Refinement`, `Handoff prep`. Free-form, but reuse phase names across sessions when the work is continuous.

### `**Decisions:**`

What got *decided*, not what got done. One sentence per decision, with the *why*. If no decisions were made, write `None — execution only`.

> Good: `Chose Notion over Confluence for the runbook because the team already pays for it.`
> Bad: `Talked about the runbook.`

### `**Completed:**`

Bulleted list. One bullet per discrete unit of completed work. Be specific — file names, function names, exact paths preferred. The next session reads this to know what *not* to redo.

### `**Subs:**`

Integer count of sub-agents spawned during the session. Excludes the agent that's writing this entry. This number is a load-tracking metric — if it's climbing every session, you're trending toward complexity that may want a refactor.

### `**Pending:**`

What's left **as of this entry**. Not a long-range backlog — that lives in the master tasklist. This is "the threads we touched this session that aren't yet wrapped up."

### `**Next session starts with:**`

ONE specific first task. The line you'd hand to your future self if you only got one sentence. The intent: a new session can open the log, read this line, and immediately know what to do.

> Good: `Open 04_production_master_tasklist/00_Master_Tasklist.md, expand Task 3 detail block with the email-digest scoping notes from this session, then run /refactor-tasklist.`
> Bad: `Continue working on email digest.`

### `**Status snapshot:**`

One line per active concept, format: `name | stage | blocker (or none)`. Concepts are the medium-grain threads in the project — not tasks, not phases. Keep to 3–7 lines. If you have more than 7 active concepts, you have a focus problem.

> Example:
> ```
> Email digest    | scoping     | none
> French i18n     | implementing| waiting on translator review
> Tasklist sweep  | overdue     | none — schedule for next session
> ```

### `**Git:**`

Auto-populated by the session-log skill:
- If git is initialized and a commit fired this session: `committed (a4f2e91) "session 8: intake interview"` and optionally `· pushed to origin/main`.
- If git is initialized but no commit fired: `committed — no changes`.
- If git is NOT initialized: leave blank (the field disappears from the receipt).

Never red, never scary — missing git is not a failure state.

### `**People-list delta:**`

Auto-populated by sub-agent D of `/session-log`. Counts how many new entries were added to `_people_list.md`, how many existing entries got a new touchpoint, and how many candidate signals were skipped (operator said no, or insufficient info).

If all three counts are zero, omit the line entirely — the session simply had no people-list activity.

### Tail line: `After logging, verify the master tasklist AND people list match reality.`

This is a permanent reminder. The skill that writes the entry also runs a fact-check pass that compares the session-log to the master tasklist and the people list. If something completed this session isn't reflected in either, the diagnostic block at the bottom of the receipt flags it.

---

## What a real entry looks like

```markdown
## 2026-05-24 -- Session 1: Intake interview + first tasks
**Phase:** Intake
**Decisions:** Going greenfield (no existing files to import). Project type: book. Tracking spine: chapter-level master tasklist.
**Completed:**
- Ran /intake-router → /intake-new
- Captured project scope (working title, target length, audience, deadline)
- Initialised git locally (no remote yet)
- Wrote first three master tasks (outline, scene list for ch1, first draft ch1)
- Seeded people list with 2 entries (Editor, Beta reader)
**Subs:** 0
**Pending:** Decide whether to track scenes in the master tasklist or in a separate scene-list file.
**Next session starts with:** Open 04_production_master_tasklist/00_Master_Tasklist.md, expand Task 1 (outline) with the working chapter list, then start drafting.
**Status snapshot:**
Outline       | not started | none
Scene list    | deferred    | tracking-location decision pending
Chapter 1     | not started | none
**People-list delta:** added 2 · touched 0 · skipped 0
**Git:** committed (e1d4a92) "session 1: intake complete"

After logging, verify the master tasklist AND people list match reality.
```

---

## Hard rules

1. **Append-only.** New entries go at the TOP of `_session_log.md`. Never edit a prior entry except to fix a typo (and document the typo fix in the next entry's Decisions section).
2. **Numbered sequentially.** Session 1, 2, 3, ... — never reuse a number.
3. **Every field present.** If a field is empty, write the placeholder explicitly (e.g., `**Subs:** 0` not just omitting the line).
4. **Truncate in the receipt, never in the file.** The session-log file holds full content. The receipt printed to the user is the abbreviated view.
5. **Verify with the master tasklist.** The skill that writes the entry MUST run the consistency check against the master tasklist before printing the green-light receipt.
