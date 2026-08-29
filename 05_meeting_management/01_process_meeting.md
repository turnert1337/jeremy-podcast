# Skill — `/process-meeting`

**File:** `05_meeting_management/01_process_meeting.md`
**Invoked by:** Operator dropping a file in `1_inbox/` and saying "process it," OR directly with `/process-meeting <path-or-link>`.
**Purpose:** Take raw meeting input (pasted transcript, dropped file, or Teams link), write a canonical processed file, and propagate citations into the tasklist, people list, and session log.

---

## When to run

- A meeting just happened and the operator wants it captured.
- A new file has appeared in `1_inbox/`.
- The operator pastes a transcript directly into the chat ("here's the transcript, process it").
- The operator gives a Teams / Zoom / Meet recording link.

---

## Step 0 — Read the rules

Before doing anything, read `00_module_rules.md`. Citation discipline, naming conventions, and propagation rules are defined there — do not improvise.

---

## Step 1 — Identify the source

The operator's invocation falls into one of four shapes:

| Shape | Operator says / does | Skill action |
|-------|---------------------|--------------|
| **A** | `"process the inbox"` / no file specified | List `1_inbox/`. If 1 file: use it. If >1: print the list and ask which. |
| **B** | `"process 05_meeting_management/1_inbox/foo.txt"` | Use the specified file. |
| **C** | Pastes transcript text directly | Save it to `1_inbox/<YYYY-MM-DD>-pasted.md` first, then proceed. |
| **D** | Gives a Teams / Zoom / Meet link | Save the link to `1_inbox/<YYYY-MM-DD>-link.url` (one line: the URL). Attempt to fetch the transcript (see Step 1.1). |

### 1.1 — Fetching from a link

If the input is a recording / meeting link:

1. Try to access the link with whatever fetch tool is available (WebFetch for public links, or the operator's MS Graph integration if it's a Teams link they own).
2. If the fetch succeeds: write the fetched transcript to `1_inbox/<YYYY-MM-DD>-fetched.md`. Proceed.
3. If the fetch fails (auth required, link is internal-only, transcript not yet generated): tell the operator:
   ```
   Couldn't pull the transcript from that link — common reasons:
     · Teams transcript isn't generated yet (takes ~10 min after the meeting ends)
     · The link requires auth I don't have
     · The recording is set to "owner only"
   
   Options:
     [a] paste the transcript here as text
     [b] download the transcript and drop it in 1_inbox/
     [c] proceed with just operator notes (I'll ask you questions)
   ```
   Wait for the operator's choice.

---

## Step 2 — Read the raw source

Open the chosen file. For each:

- Note speaker labels (real names if available, "Speaker 1" / "Speaker 2" if not).
- Note timestamps if present.
- Identify the date, attendees, channel, and topic (header fields). Some will be obvious from the file; some will need to be asked.

---

## Step 3 — Confirm the header

Print a confirmation block:

```
I'll create a processed file with this header. Confirm or correct any field:

  Date     : YYYY-MM-DD
  Time     : HH:MM–HH:MM TZ      [or "unknown"]
  Channel  : Teams / Zoom / In person / …
  Topic    : [extracted from first 1-2 minutes of transcript]
  Attendees:
    · Priya Kapoor      [matched to people list]
    · Marco Bianchi     [matched to people list]
    · "Speaker 3"       [NOT MATCHED — who is this?]

Filename will be: 05_meeting_management/2_processed/YYYY-MM-DD-with-priya.md

  [Y] looks right     /  [edit FIELD] fix a field     /  [match N] tell me who Speaker N is
```

Loop until the operator confirms.

---

## Step 4 — Sync people list (BEFORE writing the processed file)

For every attendee:

- **If they're already in `_people_list.md`:** note their slug for the touchpoint write later.
- **If they're new:** invoke `/people-list-update` (`02_session_skills/03_people_list_update.md`) in "new entry" mode. The skill will confirm + write per its own protocol before returning here.

> Hard rule: no processed file gets written with an attendee who isn't in the people list. This is the contract between modules.

---

## Step 5 — Extract decisions, action items, open questions

Scan the transcript and extract content into three buckets, **verbatim**:

### Decisions
Lines that landed as a commitment. Re-phrase ONLY for clarity if the live phrasing is ambiguous; quote verbatim wherever possible. Use the format `"we decided X because Y."`

### Action items
Lines that landed as work for someone. Each must capture:
- **What** (the verb + object)
- **Who** (owner) — match to people list
- **When** (due date or "TBD")

If an action item has no clear owner, write `OWNER UNKNOWN` and flag it in Step 7.

### Open questions
Lines that came up but weren't resolved. These will seed the next prep file.

---

## Step 6 — Echo the extraction back to the operator

Before writing anything to disk, print:

```
Extraction draft (nothing written yet):

DECISIONS (3):
  · We decided to ship the v0 outline by 2026-06-15 because Priya's slot opens on the 16th.
  · We decided to drop chapter 7 because the through-line was redundant with chapter 4.
  · We decided to ask Marco about the cover art separately.

ACTION ITEMS (3):
  · Draft chapter 5 opening                                — Operator     · 2026-06-01
  · Send chapter 4 to Priya for review                     — Operator     · 2026-05-28
  · Send editorial calendar to operator                    — Priya        · 2026-05-30

OPEN QUESTIONS (2):
  · Whether chapter 6's POV change works.
  · Final cover-art direction — punted to designer meeting.

  [Y] write the file + propagate     /  [edit] let me tweak something     /  [cancel] discard
```

Loop on `edit` until the operator approves.

---

## Step 7 — Write the processed file

Create `05_meeting_management/2_processed/YYYY-MM-DD-with-<slug>.md` using `_meeting_template.md` as the structure. Fill in:

- Header (Step 3 values)
- Section 1 (decisions, verbatim from Step 6)
- Section 2 (action items as a table, with citation column or in detail blocks as appropriate)
- Section 3 (open questions)
- Section 4 (verbatim quotes that matter — pulled from the raw, not invented)
- Section 5 (propagation log — fill in as you propagate in Step 8)

Then move the source file from `1_inbox/` to `2_processed/_raw/`.

---

## Step 8 — Propagate citations

For each action item the operator confirmed:

### 8a — Master tasklist
Append a new row to `04_production_master_tasklist/00_Master_Tasklist.md` with:
- Status `🔴`
- Title = action item's WHAT
- Below-the-fold detail block containing:
  ```
  ### NN. [Action item title]
  
  **Owner:** [Owner]
  **Due:** [Date]
  **Provenance:** New 2026-MM-DD.
  
  [Verbatim action item text]
  
  (learned in the meeting with [Attendees] on YYYY-MM-DD — 05_meeting_management/2_processed/YYYY-MM-DD-with-slug.md)
  ```

### 8b — People list touchpoints
For each attendee, append a touchpoint to their detail block in `_people_list.md`:
```
- YYYY-MM-DD — Meeting (Teams). See 05_meeting_management/2_processed/YYYY-MM-DD-with-slug.md
```

This MUST be append-only — never edit prior touchpoints.

### 8c — Session log seeding
Stash a "to be added at next /session-log" marker. The session-log protocol skill auto-detects new files in `2_processed/` since the last entry, so no direct write is needed here. The line that will appear in the next session log:
```
- Processed meeting with [Attendees] on YYYY-MM-DD → 05_meeting_management/2_processed/YYYY-MM-DD-with-slug.md
  - Seeded N tasklist rows
  - Added M people-list touchpoints
```

### 8d — Update the propagation log inside the processed file
Fill in Section 5 of the processed file with what was actually propagated:
```
✅ Added attendees to _people_list.md             — [list with new/existing]
✅ Added touchpoints                              — [count per person]
✅ Seeded master tasklist                         — N new tasks (rows X, Y, Z)
⚪ Action items requiring follow-up meeting       — [open question stubs]
```

---

## Step 9 — Run the internal fact-check

Spawn three parallel validators (mirrors the tasklist + session-log fact-check waves):

| # | Validator | Verifies |
|---|-----------|----------|
| 1 | **Header validator** | Date, time, attendees, channel, topic — all populated; attendees all link to people-list entries. |
| 2 | **Propagation validator** | Tasklist row count matches confirmed-action-item count; people-list touchpoint count matches attendee count; raw file moved to `_raw/`. |
| 3 | **Citation validator** | Every propagated tasklist row + touchpoint contains the citation back-reference in the exact canonical format. |

If any validator fails, print the failure and STOP. Do not produce a green receipt over a red validator. The operator decides whether to fix and re-run, or accept the partial state.

---

## Step 10 — Print the receipt

```
🟢 meeting processed                              — 05_meeting_management/2_processed/YYYY-MM-DD-with-slug.md
🟢 master tasklist + N rows                       — rows X, Y, Z
🟢 people list + M touchpoints                    — [names]
🟢 raw source archived                            — _raw/<original-filename>
🟢 citations propagated                           — all N rows + M touchpoints carry back-references
⚪ pending session-log mention                    — will appear in next /session-log
```

If you fetched from a link, add a line:
```
🟢 transcript fetched                             — from Teams link
```

If anything was skipped or partial, use 🟠 instead of 🟢 and add a one-line reason.

---

## Hard rules

- **Citation discipline is non-negotiable.** No propagated row leaves this skill without a back-reference. See `00_module_rules.md` Section 1.
- **Never silently propagate.** Step 6 echo + operator approval is required before Step 8 writes anything.
- **Never delete the raw input.** It moves into `_raw/`, never disappears.
- **Never modify `2_processed/_raw/` files after creation.** Frozen audit trail.
- **Never auto-create a people-list entry.** Step 4 invokes `/people-list-update`, which has its own confirmation gate.
- **Stop on validator failure.** Don't paint green over red.
- **If a Teams link fetch fails, fall back gracefully.** Don't fabricate transcript content. Ask the operator for paste / drop / proceed-with-notes.
