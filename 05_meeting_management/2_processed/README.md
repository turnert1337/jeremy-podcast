# 2_processed/ — canonical meeting files

**What goes here:** one canonical Markdown file per meeting, produced by `/process-meeting` from the raw input in `1_inbox/`. Plus `_raw/` — a sub-folder that holds the original source files (transcripts, link captures) for auditability.

## File-naming convention

```
YYYY-MM-DD-with-<short-attendee-slug>.md
```

Examples:

```
2026-05-22-with-priya.md
2026-05-23-with-stakeholders.md           ← multi-attendee → use a topic slug
2026-05-24-with-marco-and-sam.md
```

Use kebab-case for the attendee slug. Match the slug to a name in `_people_list.md` whenever possible — this is what citations point to.

## File structure

Every processed file follows `_meeting_template.md`. The five canonical sections, in order:

1. **Header block** — date, time, attendees (each linked to people list), topic, channel (Teams / in person / phone / async).
2. **Decisions** — bulleted, each phrased as "we decided X because Y." Verbatim.
3. **Action items** — bulleted, each with owner + due date. These propagate to the master tasklist.
4. **Open questions** — anything left unresolved. These become future-meeting agenda seeds.
5. **Raw notes / transcript link** — pointer to `_raw/<original-file>` plus any verbatim quotes that matter.

## Citation discipline

Anything the meeting produced that lands ELSEWHERE in the frame carries a back-reference of the form:

```
… (learned in the meeting with Priya on 2026-05-22 — 05_meeting_management/2_processed/2026-05-22-with-priya.md)
```

This is the contract. If `/process-meeting` writes a tasklist row from an action item, it appends this citation. If it adds a people-list touchpoint, same. The citation is the trail that lets future operators (including the author six weeks from now) ask "where did this fact come from?" and get a direct answer.

## Lifecycle

- **Edit freely** after `/process-meeting` writes the first draft. You may add commentary, refine decisions, correct misheard names.
- **Never rewrite history.** If a decision later turns out to be wrong, add a "**Superseded YYYY-MM-DD:** see [next-meeting-file]" footer — don't delete the original.
- **The `_raw/` sub-folder is frozen.** Don't edit it. It's the audit trail.

## Hard rules

- **One file per meeting.** Recurring meetings get separate files per occurrence.
- **Always link attendees to people-list entries.** If an attendee isn't in the list, `/process-meeting` invokes `/people-list-update` first.
- **Every action item must have an owner.** If unknown, write `OWNER UNKNOWN` and ask the operator before propagating to the tasklist.
- **Don't summarize.** Decisions and action items stay verbatim. The processed file is shorter than the raw transcript, not because content was reworded but because chatter was dropped.
