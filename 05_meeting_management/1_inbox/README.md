# 1_inbox/ — raw meeting input

**What goes here:** anything that came out of a meeting but hasn't been processed yet. Drop it in; `/process-meeting` will read it and produce a canonical file in `2_processed/`.

## What "raw" means

- Pasted Teams / Zoom / Google Meet transcripts (`.txt`, `.vtt`, `.docx`, copy-pasted into a `.md`)
- Your own shorthand notes scribbled during the call
- A Teams meeting link (drop into a `.url` or `.md` file with the link) — `/process-meeting` will attempt to fetch the transcript
- Recording links + auto-generated summaries
- Email threads that ended in a meeting decision and need to be processed alongside

## Naming hint (optional)

If you remember, give the file a date + topic stub so you can scan the inbox:

```
2026-05-22-priya-editorial-feedback.md
2026-05-23-stakeholder-checkin.txt
2026-05-23-priya-link.url
```

If you don't remember — drop it with whatever name comes naturally. `/process-meeting` will ask for the missing fields (date, attendees, topic).

## Lifecycle

```
operator drops file → /process-meeting reads it → writes 2_processed/YYYY-MM-DD-…
                                                → propagates citations
                                                → asks: archive or delete inbox file?
```

Default behavior: after processing, `/process-meeting` *moves* the source file into `2_processed/_raw/` so the inbox stays clean but nothing is destroyed.

## Hard rules

- **No editing in this folder.** It's a drop zone, not a workspace. Edit in `2_processed/` after processing.
- **Don't manually create canonical files here.** Canonical files live in `2_processed/` only.
- **Don't process by hand.** Always invoke `/process-meeting` so citations get propagated and the people list stays in sync.
