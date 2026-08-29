# Meeting Management Module

The frame's universal clearing-house for everything meeting-shaped: notes, transcripts, agendas, follow-ups, and the citations that tie meeting decisions back to the rest of the project.

---

## Why it exists

Meetings are where most projects accumulate facts: someone said something, a decision was made, an action item landed on a person. If those facts only live in a meeting transcript, they rot — nobody reads them again. If they get hand-copied into the tasklist or people list with no source, they lose their *why*.

This module solves both problems:

1. **Every meeting gets a single canonical processed file.** One file per meeting, named by date + attendees.
2. **Every fact that leaves a meeting carries a citation.** When a tasklist row, a people-list touchpoint, or a session-log decision originates in a meeting, it carries a back-reference of the form `(learned in the meeting with NAME on YYYY-MM-DD — 05_meeting_management/2_processed/YYYY-MM-DD-with-name.md)`.

Track-back becomes free. Project-related memory becomes external.

---

## The three-folder pattern

```
05_meeting_management/
├── 1_inbox/      ← raw input lands here (transcripts, links, scribbles)
├── 2_processed/  ← one canonical Markdown file per meeting
└── 3_future/     ← agendas and prep notes for meetings that haven't happened yet
```

Numbered `1/2/3` so the folders sort in workflow order: input → processed → next.

Each folder has its own `README.md` explaining what belongs there.

---

## The four module skills

| Skill | File | What it does |
|-------|------|--------------|
| `/process-meeting` | `01_process_meeting.md` | Takes a pasted transcript OR a Teams link, writes a canonical file in `2_processed/`, propagates citations into tasklist and people list. |
| `/plan-next-meeting` | `02_plan_next_meeting.md` | Builds a quick agenda + prep notes for an upcoming meeting; saves to `3_future/`. |
| `/draft-meeting-request` | `03_draft_meeting_request.md` | Drafts a cold-intro email asking for a meeting — who/what/where/why/when, with calendar ask. Operator reviews; never auto-sends. |
| `/draft-email` | `04_draft_email.md` | Drafts any email for operator review. Pulls context from people list + recent processed meetings. Never auto-sends. |

> **Read first:** `00_module_rules.md` — the citation discipline + naming conventions + hard rules that govern every skill above.

---

## Where this module fits in the frame

- **Mechanic 6** in `00_relay_frame/00_overview.md` (added in MVP draft 2).
- Cited from `CLAUDE.md` Section 3.6.
- Indexed in `00_relay_frame/04_skills_index.md`.
- Read by the discovery chain only when the operator invokes a meeting skill — the module does NOT auto-load on every session (would blow the capacity budget).

---

## Expansion notes

The three-folder + citation pattern is general. The same shape could later host other tracked sources (emails, customer interviews, support tickets, lab notebook entries). Treat this module as the reference implementation for "track an external stream of facts and cite back to it." See `00_relay_frame/05_features_and_benefits.md` for the meta-feature description.
