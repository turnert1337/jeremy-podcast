# People List

> The roster of everyone involved in this project. Lives at the frame root so the orchestrator can read it cheaply at cold start (see `00_relay_frame/03_discovery_chain.md`).
>
> **Read this file before** drafting any email, preparing for a meeting, or deciding who to consult on a question.
>
> **Updated via:** `/people-list-update` (`02_session_skills/03_people_list_update.md`). The orchestrator auto-detects new people from session signals and proposes entries — never invents them. Every update is fact-checked.

---

## How to read this file

Two sections, in order:

1. **Active roster** (above the fold) — people currently involved.
2. **Detail blocks** (below the fold) — full profile + dated touchpoint history per person, verbatim. Sweeps into `_people_archive/` once a person has been inactive for 6+ months.

Roles use these tags (extend as needed, but document any new tag in your project skill):

| Tag | Meaning |
|-----|---------|
| `owner` | The person who owns the project / outcome. |
| `lead` | A workstream lead. |
| `contributor` | Doing meaningful work on the project. |
| `reviewer` | Reviews / approves work but doesn't author. |
| `stakeholder` | Has an interest in the outcome; not in the work. |
| `consult` | SME the team taps on demand. |
| `vendor` | External party. |

`Channel` is the preferred way to contact the person — email, Slack handle, phone, in-person, etc. Multiple channels OK.

---

## Active roster

| # | Name | Role | Org / team | Channel | Last touched | Status |
|---|------|------|------------|---------|--------------|--------|
| _(none yet)_ | _(populated by `/people-list-update` during intake or as the project runs)_ | | | | | |

---

## Detail blocks

> One block per person in the active roster, numbered to match. Verbatim — do not summarise. Append new touchpoints to the bottom of each person's block; never edit existing touchpoints.

### Template (copy this when adding a new person)

```markdown
### N — [Name]

- **Role:** [owner / lead / contributor / reviewer / stakeholder / consult / vendor]
- **Org / team:** [department, team, company]
- **Channel:** [primary contact channel(s)]
- **Why they're involved:** [one sentence — what brought them in / what they own / why we'd loop them in]
- **First touched:** YYYY-MM-DD
- **Last touched:** YYYY-MM-DD

**Touchpoints (append-only, newest at bottom):**

- YYYY-MM-DD — [one-line context: what happened, where, outcome]
- YYYY-MM-DD — [next entry]
```

---

## Frame version

```
The Relay Frame · MVP draft 1 · 2026-05-23
```
