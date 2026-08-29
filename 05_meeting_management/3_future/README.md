# 3_future/ — upcoming meeting prep

**What goes here:** agendas, talking-point lists, and prep notes for meetings that haven't happened yet. Created by `/plan-next-meeting`. After the meeting happens, the file gets *moved* (not copied) into `1_inbox/` so `/process-meeting` can fold the agenda back into the canonical processed file.

## File-naming convention

```
YYYY-MM-DD-with-<short-attendee-slug>-prep.md
```

The `-prep.md` suffix makes it easy to tell future files from processed ones at a glance. Examples:

```
2026-05-30-with-priya-prep.md
2026-06-02-with-stakeholders-prep.md
```

If the meeting date isn't set yet, use `TBD` in place of the date:

```
TBD-with-marco-prep.md
```

When the date firms up, rename the file. (`/plan-next-meeting` handles the rename if you ask it to.)

## File structure

Every prep file follows the prep section of `_meeting_template.md`:

1. **Header** — proposed/confirmed date, attendees, topic, channel.
2. **Goal** — one sentence: what does "this meeting went well" look like?
3. **Agenda** — bulleted; each item maps to a question or a decision needed.
4. **Talking points** — what the operator wants to say; bullet-form, written for the operator's voice.
5. **Things to ask** — open questions for the other side.
6. **Context to bring** — links to relevant tasklist rows, prior processed meetings, people-list entries. This is where citations are PULLED FROM rather than written to.
7. **Risks / things to avoid** — optional but useful for high-stakes meetings.

## Lifecycle

```
operator says "plan my next meeting with X" → /plan-next-meeting reads
  _people_list.md (for context on X),
  recent 2_processed/ files involving X (for prior decisions),
  master tasklist (for action items relevant to X)
→ proposes a draft prep file → operator refines → file saved to 3_future/

meeting happens

operator drops transcript/notes in 1_inbox/ → /process-meeting reads BOTH
  the new transcript AND the 3_future/ prep file (matched by date + attendee)
→ writes canonical 2_processed/ file → moves the prep file into 2_processed/_raw/
```

## Hard rules

- **Prep files are working drafts.** Edit them as often as you want before the meeting.
- **After the meeting, don't update the prep file.** The processed file is the canonical record. The prep file gets archived as-is into `_raw/`.
- **Don't write meeting outcomes here.** Outcomes belong in `2_processed/`. The prep folder is forward-looking only.
