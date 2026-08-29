# Skill — `/draft-meeting-request`

**File:** `05_meeting_management/03_draft_meeting_request.md`
**Invoked by:** Operator says "draft an intro email to [PERSON] asking for a meeting" / `/draft-meeting-request <person>`.
**Purpose:** Draft a cold-intro (or warm-reconnect) email that asks for a meeting. Operator reviews + sends manually. Never auto-send.

---

## When to run

- The operator needs to reach out to someone new and request a call.
- The operator needs to re-engage a lapsed contact (last touchpoint > N months ago).
- The operator needs to invite multiple people to a planning meeting.

---

## Step 0 — Read the rules

Read `00_module_rules.md`. The "never auto-send" rule applies absolutely. The output of this skill is a copyable draft, never a sent message.

---

## Step 1 — Gather inputs

Ask the operator one at a time:

### Q1 — Recipient
```
Who's this going to? (name; if already in the people list, I'll auto-fill their context)
```

If the recipient is in `_people_list.md`, pull their role + channel preference + last touchpoint date. Note: if last touchpoint was > 90 days ago, plan to frame this as a "reconnect" rather than a cold intro.

If the recipient is NEW, offer to add them via `/people-list-update` first:
```
[NAME] isn't in the people list yet. Add them now? (helps me draft better context)
  [Y] add now     /  [skip] draft anyway
```

### Q2 — Reason for the meeting
```
One sentence: why do you want to meet with them? What do you want to walk out with?
```

### Q3 — Operator's identity
Pull from `_people_list.md` (the operator entry, if it exists) or ask:
```
How should I sign this? (name + role/affiliation)
```

### Q4 — Channel
```
What's the channel?
  [a] Email          [c] LinkedIn DM
  [b] Slack/Teams    [d] Other  ↳ specify
```

Different channels = different tone + length. Email defaults to formal-ish; Slack/Teams defaults to short + casual; LinkedIn falls between.

### Q5 — Logistics ask
```
What's the calendar ask?
  [a] "Are you open to a 30-min call?"
  [b] "Could we grab 15 min next week?"
  [c] "I'd love to set up a longer conversation — an hour, whenever works"
  [d] Custom  ↳ specify
```

### Q6 — Time window (optional)
```
Any time window? (e.g. "this or next week", "after Memorial Day", "no rush"). 
Type "open" if none.
```

---

## Step 2 — Compose the draft

Build the draft. Adjust tone by channel.

### Email template (default)

```
Subject: [SUBJECT LINE — short, specific, no "Quick question" / "Touching base" filler]

Hi [NAME],

[OPENING — one sentence. If cold: brief intro of who the operator is + how they heard 
of recipient. If warm-reconnect: acknowledge the gap + a one-line "what's prompted me 
to reach out now."]

[CONTEXT — 2-3 sentences. Why this meeting, why this recipient, what makes the timing 
right. Specific. Concrete. Mentions a recent thing the recipient did/said/wrote if 
known.]

[ASK — one sentence. The calendar ask + time window. Make it easy to say yes.]

[CLOSE — one short sentence. Thank-you OR a forward-looking note.]

[Operator name]
[Operator role / affiliation]
```

### Slack/Teams template

Shorter, no subject line, no formal signature:

```
Hi [NAME] — [one-sentence intro + reason]. [calendar ask]. [optional time window].

[operator name, if not obvious from handle]
```

### LinkedIn DM template

Tighter than email but with a hook:

```
Hi [NAME],

[Hook — what specifically caught the operator's attention about the recipient's work].

[One sentence on the operator + why this connection makes sense].

[Calendar ask].

[Operator name]
```

---

## Step 3 — Echo the draft + invite review

Print the draft in a code block exactly as it would be copy-pasted:

```
DRAFT — review before sending. I will NOT send this.

────────────────────────────────────────────────
[Subject / body / signature]
────────────────────────────────────────────────

  [Y] looks good, copy to clipboard*     /  [edit SECTION] tweak     /  [tone] adjust tone
  [shorter] cut by ~30%                  /  [longer] add more context

  * I can't actually touch your clipboard — you'll need to select + copy. But I'll 
    print the draft in a clean block so it's easy.
```

Loop on edits until the operator approves.

**Tone adjustments to support:**
- `more formal` — add titles, structure paragraphs, "Dear [Title] [Last name]"
- `more casual` — strip honorifics, shorten paragraphs, contractions
- `more direct` — cut hedging language ("I was wondering if maybe…" → "Could we…")
- `more warm` — add a personal hook, acknowledge their work specifically
- `more brief` — cut by ~30% per pass

---

## Step 4 — Optional: stage a prep file

After the operator approves the draft, ask:
```
Want me to also stage a /plan-next-meeting prep file for this — so when they 
say yes, you've already got an agenda ready?

  [Y] stage it     /  [N] not yet, I'll plan when the date's confirmed
```

If `Y`, invoke `/plan-next-meeting` with the attendee + `TBD` date.

---

## Step 5 — Log the draft (optional, lightweight)

`/draft-meeting-request` does NOT write a touchpoint to the people list — the touchpoint should only be written when the operator actually sends the email. Instead, hold a note in working memory so the next `/session-log` invocation can mention it under Completed:

```
- Drafted meeting-request email to [NAME] (not yet sent)
```

The session-log skill picks this up. No file is written by `/draft-meeting-request` outside the draft itself.

---

## Step 6 — Print the receipt

```
🟢 draft composed                                 — [channel] · [N words]
🟢 review printed                                 — copy from the block above
⚪ not sent                                       — by design; you send manually
🟢 prep file staged                               — 3_future/TBD-with-slug-prep.md  [if Step 4 was Y]
⚪ touchpoint will land in people list            — when you confirm you've sent (run /people-list-update)
```

---

## Hard rules

- **NEVER auto-send.** No matter what tooling is available. The draft is printed for the operator to copy out.
- **NEVER fabricate a recipient's interests / background.** If a "hook" line requires knowing something specific about the recipient and the operator hasn't said it, ASK. Don't invent a flattering bit.
- **NEVER copy a subject line from spam-template territory.** No "Quick question?" / "Touching base" / "Picking your brain." Generic subject lines kill cold outreach.
- **NEVER skip the operator-identity step.** A signed email goes from a named person, not "Anonymous Operator."
- **When tone is adjusted, the change must be visible in the diff.** Don't claim "more formal" while only swapping one word.
