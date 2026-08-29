# 00 — Meeting Management Module Rules

**Read this before invoking any meeting skill.** These rules govern `/process-meeting`, `/plan-next-meeting`, `/draft-meeting-request`, and `/draft-email`. They exist so the module produces consistent, citable output across every operator and every project.

---

## 1. Citation discipline (the most important rule)

Every fact that leaves this module and lands in **any other file** in the frame carries a back-reference. The canonical format:

```
… (learned in the meeting with NAME on YYYY-MM-DD — 05_meeting_management/2_processed/YYYY-MM-DD-with-slug.md)
```

Variants by source-count:

- One person: `(learned in the meeting with Priya on 2026-05-22 — 05_meeting_management/2_processed/2026-05-22-with-priya.md)`
- Two people: `(learned in the meeting with Priya and Marco on 2026-05-22 — …)`
- Three+: `(learned in the meeting with Priya et al. on 2026-05-22 — …)`
- Async / written-only: `(learned from Priya in async on 2026-05-22 — …)` — only if there's no live meeting; prefer the meeting variant.

**Where citations land:**

| Destination | Where the citation goes |
|---|---|
| Master tasklist row | Inside the detail block below the fold, at the end of the provenance line. |
| Master tasklist sub-item | Tucked at end of that sub-item's text. |
| People list touchpoint | The touchpoint entry itself becomes the citation — its date + the meeting file path. |
| Session log entry | Cited inline within Decisions or Completed, in parentheses. |
| Other processed-meeting files | Use the path-only form: `(see 05_meeting_management/2_processed/…)`. |

**Hard rule:** **No silent propagation.** If a meeting produces a fact and the operator wants it in the tasklist, the propagation must include the citation. Skills enforce this automatically; if a human edits the tasklist by hand and forgets, `/tasklist-factcheck` will eventually flag it.

---

## 2. Naming conventions

| Location | Pattern | Example |
|---|---|---|
| `2_processed/` | `YYYY-MM-DD-with-<slug>.md` | `2026-05-22-with-priya.md` |
| `2_processed/_raw/` | original filename, untouched | `priya-transcript.vtt` |
| `3_future/` | `YYYY-MM-DD-with-<slug>-prep.md` | `2026-05-30-with-priya-prep.md` |
| `3_future/` (date TBD) | `TBD-with-<slug>-prep.md` | `TBD-with-marco-prep.md` |
| `1_inbox/` | freeform (operator's choice) | anything |

Attendee slugs are **kebab-case**, match `_people_list.md` slugs whenever a person is in the list. Multi-attendee meetings either use one attendee's slug (the operator's primary counterpart) OR a topic slug (`with-stakeholders`, `with-design-review`).

---

## 3. People-list integration

The meeting module and the people-list module are **separate modules with a contract**, not the same module. The contract:

- Every attendee in a processed meeting MUST exist in `_people_list.md`.
- If an attendee is missing, the meeting skill invokes `/people-list-update` BEFORE writing the processed file.
- Every processed meeting writes a touchpoint to each attendee's people-list detail block. Format:
  ```
  - 2026-05-22 — Meeting (Teams). See 05_meeting_management/2_processed/2026-05-22-with-priya.md
  ```
- The people-list module owns the *roster + touchpoint history*. The meeting module owns the *content of the conversation*. Both can be read independently.

**Rationale:** keeping the modules separate means the operator can scan "who am I talking to?" without loading meeting content, and can scan "what did we decide?" without loading the whole social graph.

---

## 4. Tasklist integration

When `/process-meeting` finds action items, it proposes tasklist rows. The propagation rule:

- Each action item with a clear `OWNER` and `DUE DATE` becomes a candidate tasklist row.
- The skill ECHOES candidates to the operator BEFORE writing. Operator approves / edits / rejects per-row.
- Approved rows are appended to the master tasklist with status `🔴`. Each row's detail block includes:
  - The action item verbatim.
  - The owner.
  - The due date (if specified).
  - The citation back to the processed meeting.
  - A `**New 2026-MM-DD.**` provenance marker.

The tasklist module's own rules (`03_tasklist_skills/00_tasklist_agent.md`) still apply — verbatim discipline, no summarisation, sweep-don't-delete.

---

## 5. Session-log integration

When the operator runs `/session-log` at the end of a session that included meeting processing, the session log entry's Completed section gains a line per processed meeting:

```
- Processed meeting with Priya on 2026-05-22 → 05_meeting_management/2_processed/2026-05-22-with-priya.md
  - Seeded N tasklist rows
  - Added M people-list touchpoints
```

The `/session-log` skill auto-detects processed meetings by scanning for new files in `2_processed/` since the previous session, and includes the line without operator prompting. The `/session-log-factcheck` skill verifies the counts match.

---

## 6. Hard rules (non-negotiable)

- **Never auto-send an email.** `/draft-meeting-request` and `/draft-email` produce drafts only. The operator copies them out manually.
- **Never invent attendees.** If a transcript has unclear speaker labels (e.g. "Speaker 2: …"), ask the operator who that is. Do not guess.
- **Never lose the raw input.** Source files always end up in `2_processed/_raw/`, never deleted.
- **Never edit `_raw/`.** It's the audit trail. Edits go to the canonical file in `2_processed/`.
- **Never write a processed file without citations propagating downstream.** If propagation is impossible (e.g. the operator stops you mid-skill), the processed file stays in draft (with a `<!-- DRAFT — citations not propagated -->` HTML comment at the top) until propagation can complete.
- **Never summarize a meeting.** The processed file is shorter than the raw, but the difference is *chatter dropped*, not *content reworded*. Decisions and action items are verbatim.

---

## 7. Module expansion (the meta-feature)

The three-folder pattern + citation discipline generalises. Future modules that track an external stream of facts (emails, customer interviews, support tickets, lab notebook entries) can follow the same shape:

```
NN_<source>/
├── 1_inbox/
├── 2_processed/
│   └── _raw/
├── 3_future/
└── 00_module_rules.md
```

When you build a new source-tracking module, **copy this module as the starting point**. The citation format becomes `(learned in <kind> with NAME on YYYY-MM-DD — NN_<source>/2_processed/…)` — same structure, different `<kind>` ("interview", "email thread", "ticket", etc.). See `00_relay_frame/05_features_and_benefits.md` for the meta-feature description.
