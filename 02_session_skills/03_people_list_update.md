# Skill — `/people-list-update`

**File:** `02_session_skills/03_people_list_update.md`
**Invoked by:**
- The orchestrator automatically, when a new person or a new touchpoint is detected from session context (operator mention, meeting notes, email, calendar invite, etc.).
- The operator manually: "add Priya to the people list" / "/people-list-update".
- The intake skills (`/intake-new`, `/intake-existing`) when they pull names out of the operator's answers.

**Purpose:** Add a new person to `_people_list.md` (active roster + detail block) OR append a new touchpoint to an existing person — with operator confirmation and a fact-check wave that ensures nothing is fabricated.

---

## When to run

### Auto-detection triggers (orchestrator fires this skill)

Scan recent session context. Fire `/people-list-update` whenever ANY of these signals appear and the named person + role is NOT already a current entry in `_people_list.md`:

| Signal | Example |
|--------|---------|
| Operator names a new person + role/relationship | "I met with Priya from Legal today." |
| Meeting notes / agendas pasted in name attendees not in the list | "Attendees: Sam (Eng), Marco (Product)…" |
| Email thread pasted in shows a sender / recipient not in the list | "From: rachel@acme.com" |
| Operator says "we should ask X about Y" | "We'll wait for Marco's sign-off." |
| A decision references a person | "[name] approved the design." |

If the person IS already in the list, fire the skill in **update mode** instead (Step 4) to log a new touchpoint.

### Suppression

Do NOT fire this skill for:
- Generic role mentions with no name ("legal team", "the SRE on call").
- People named in passing with no clear involvement ("Reminds me of how Linus does it.").
- The operator themselves (the project owner is captured during intake).

When in doubt, ask the operator: "Should I add [Name] to the people list?" Don't write silently.

---

## Step 1 — Detect mode

Two modes:

- **New entry:** the person is not in `_people_list.md`.
- **Update entry:** the person already has a numbered block; we're appending a touchpoint and refreshing `Last touched`.

Read `_people_list.md`. Match by name (case-insensitive). If ambiguous (two people share a first name), ask the operator to disambiguate before proceeding.

---

## Step 2 — Assemble the proposed change

### For a new entry

Fill the template fields from session context. If a field can't be inferred, ask the operator one targeted question per field. Do not invent.

```
Proposed new person:

  Name              : [name]
  Role              : [role tag from the roster table]
  Org / team        : [if known]
  Channel           : [if known — email, Slack, phone, in-person]
  Why involved      : [one-sentence reason]
  First touched     : YYYY-MM-DD (today, unless operator says otherwise)
  Touchpoint        : YYYY-MM-DD — [what happened in the session that prompted this entry]
```

### For a touchpoint update

```
Proposed touchpoint for [Name] (entry #N):

  Date              : YYYY-MM-DD (today)
  Context           : [one-line: what happened, where, outcome]
  Citation          : [if from a processed meeting, the back-reference]

(Will also update "Last touched" to YYYY-MM-DD.)
```

#### Citation discipline (when the touchpoint comes from a processed meeting)

If `/people-list-update` is called by `/process-meeting`, the touchpoint MUST carry the meeting back-reference. Format:

```
- YYYY-MM-DD — Meeting (Teams). See 05_meeting_management/2_processed/YYYY-MM-DD-with-slug.md
```

For touchpoints from emails / Slack / phone calls (no processed-meeting file), use the human-readable form:

```
- YYYY-MM-DD — Email exchange re: <topic>.
- YYYY-MM-DD — Phone call about <topic>.
```

The fabrication-guard validator (Validator 3) explicitly checks: if the touchpoint claims a meeting, that meeting file must exist in `05_meeting_management/2_processed/`. If it doesn't, FAIL.

---

## Step 3 — Confirm with the operator

Echo the proposed change as one short block (see Step 2). Then:

```
  [Y] Looks right — add it
  [edit] Let me adjust
  [skip] Don't add this one
```

Loop until the operator approves or skips. NEVER write silently. NEVER guess values to "save time."

---

## Step 4 — Write the change

### For a new entry

1. Compute the next sequential number `N` (highest existing + 1).
2. Append a row to the **Active roster** table.
3. Append a numbered detail block at the bottom of the detail-blocks section, using the template from `_people_list.md`.

### For a touchpoint update

1. Append the new touchpoint line to the **bottom** of the existing person's "Touchpoints" list (never insert or reorder).
2. Update the person's `Last touched` field.
3. Update the `Last touched` cell in the active-roster table to match.

In both cases: do NOT modify any existing touchpoint. The touchpoint history is append-only — same discipline as the session log.

---

## Step 5 — Fact-check wave

Dispatch THREE validators in parallel. They run against the file *after* the write:

| Validator | Checks |
|-----------|--------|
| 1 — Roster ↔ detail consistency | Every row in the Active roster has a matching numbered detail block, and vice versa. Numbering is sequential, no gaps. |
| 2 — Touchpoint append discipline | For each updated person: the new touchpoint is the LAST line in the touchpoints list, and no prior touchpoint was modified or reordered. Dates are in YYYY-MM-DD. |
| 3 — Fabrication guard | Every field in the new/updated entry is traceable to a specific operator confirmation in the current session OR an existing entry in the file. Flag any field that appears to have been inferred without confirmation. **Additionally:** if a touchpoint claims a meeting, the referenced `05_meeting_management/2_processed/YYYY-MM-DD-with-slug.md` file MUST exist. Citation back-references are not allowed to point at non-existent files. |

Each returns PASS / FAIL with specifics.

---

## Step 6 — Return a one-line receipt

If called inline (from `/session-log` or auto-detected mid-session):

```
🟢 people list: +1 entry (Priya Kapoor · consult · Legal)
```

or

```
🟢 people list: touchpoint added to entry #3 (Marco Bianchi)
```

If called standalone, print the receipt as the agent's final line for that turn, then continue.

If ANY validator FAILed, print a Diagnostics block (same shape as `/session-log` Step 8) and DO NOT confirm the green line. Surface the issue and ask the operator how to proceed.

---

## Hard rules

- **Never fabricate.** If a field isn't clearly stated by the operator or already in the file, ASK. The fact-check validator explicitly looks for inferred values.
- **Always confirm before writing.** Step 3 is mandatory — even for "obvious" updates.
- **Append-only for touchpoints.** New touchpoints go at the BOTTOM of a person's list. Never edit history.
- **Match by name + role.** If two people might share a first name, disambiguate before writing.
- **Skill is idempotent.** Re-running it on the same input should produce the same single entry, not duplicates. Check before adding.
- **Auto-detection is opt-in per call.** The orchestrator suggests; the operator approves. Silence ≠ consent.
- **Citation discipline propagates from meetings.** When `/process-meeting` calls this skill, the touchpoint carries the meeting back-reference. The fabrication guard refuses citations that point at non-existent files. See `05_meeting_management/00_module_rules.md` Section 1.
