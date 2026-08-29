# Skill — `/draft-email`

**File:** `05_meeting_management/04_draft_email.md`
**Invoked by:** Operator says "draft an email to [PERSON] about [TOPIC]" / `/draft-email <person> <topic>` / "help me reply to this email" (operator pastes the source).
**Purpose:** Draft any email — follow-up, thank-you, status update, response, decision communication — for operator review. Pulls context from people list + recent processed meetings. Never auto-send.

---

## When to run

- Operator needs to write an email and wants it grounded in the project's actual recent history.
- Operator wants a reply to a received email and wants it informed by the people-list relationship and any recent decisions.
- Operator wants a status update / decision communication that needs to cite specific meetings or tasklist progress.

> Note: This is the **general email draft skill**. For a *meeting request* email specifically, use `/draft-meeting-request` — it has a tighter focus on the calendar ask.

---

## Step 0 — Read the rules

Read `00_module_rules.md`. "Never auto-send" applies. Citation discipline applies whenever the email references project facts (e.g. "as we discussed last Tuesday" should be backed by an actual processed meeting file in the operator's mental model, even if the citation itself doesn't go into the email body).

---

## Step 1 — Identify the shape

Print:

```
Quick triage. What kind of email?

  [a] Fresh outbound  — operator is initiating
  [b] Reply           — responding to something received
  [c] Forward + note  — passing something along with a comment
  [d] Status update   — recurring/scheduled update to a recipient or list
  [e] Other  ↳ describe
```

Branches drive the next steps:

| Shape | Next |
|-------|------|
| (a) Fresh | Step 2a |
| (b) Reply | Step 2b — operator pastes the source email |
| (c) Forward | Step 2c — operator pastes the source + says what to comment |
| (d) Status update | Step 2d |
| (e) Other | Step 2e — open-form questions |

---

## Step 2a — Fresh outbound

Ask:

1. **Recipient(s)** — names. If in people list, auto-fill context. If not, offer to add via `/people-list-update`.
2. **Goal** — one sentence: "what do you want this email to accomplish?"
3. **Key points** — bulleted list from the operator. Verbatim, not interpreted.
4. **Tone** — `formal · neutral · warm · direct · brief` (pick one + adjustments later).
5. **Length cap** — `short (under 100 words) · medium (100-250) · long (250+)`.

---

## Step 2b — Reply

```
Paste the email you're replying to (full thread, or just the most recent message).
I'll pull context from there + the people list + recent meetings.
```

After the operator pastes:

1. Identify sender + recipients. Cross-reference with `_people_list.md`.
2. Identify the ask / question being made of the operator.
3. Check if any recent files in `2_processed/` or rows in the tasklist relate to the topic. If so, note them as candidate citations.
4. Ask the operator: "what's your high-level response — [agree / disagree / partial / defer / need more info]?" Use this to shape the draft.

---

## Step 2c — Forward + note

```
Paste what you're forwarding, then tell me what you want to say in the forwarding 
note (e.g. "FYI", "for your review by Friday", "agree with point 3, pushing back 
on point 5").
```

Build a short forwarding cover note above the quoted content.

---

## Step 2d — Status update

Ask:

1. **Recipient(s)** — usually a stakeholder or list.
2. **Cadence** — "weekly update", "milestone update", "ad hoc".
3. **Coverage window** — "since last update" / "last 7 days" / "since YYYY-MM-DD".

Then scan in parallel:
- Tasklist rows touched in the window (use git log on `00_Master_Tasklist.md` or the session log entries).
- Decisions captured in `2_processed/` files within the window.
- Open questions still live.

Produce a structured update with 3-4 sections: `Progress · Decisions · Blockers / Open · Next`.

---

## Step 2e — Other

Open-form: ask the operator for recipient, goal, tone, length cap, and any verbatim points to include.

---

## Step 3 — Compose the draft

General structure:

```
Subject: [SUBJECT LINE — match the email's actual purpose; no filler]

Hi [NAME / NAMES],

[OPENING — 1-2 sentences. Acknowledge the thread / occasion / context.]

[BODY — paragraphs or bullets, depending on length cap and content shape.
        If citing prior decisions/meetings: reference them by date or topic, 
        not by file path (e.g. "in our Tuesday call" — keep file paths in the 
        operator's notes, not the email).]

[ASK or CLOSE — one paragraph. What does the operator want the recipient to do, 
        if anything? Or what's the wrap?]

[SIGNATURE — operator's chosen sign-off.]
```

### Tone calibration

| Tone | Markers |
|------|---------|
| Formal | "Dear [Title] [Last name]", structured paragraphs, "Best regards" |
| Neutral | "Hi [Name]", balanced paragraphs, "Best" / "Thanks" |
| Warm | Personal hook, light contraction use, "Talk soon" / "Cheers" |
| Direct | Lead with the ask, minimal preamble, short paragraphs |
| Brief | One paragraph cap, no sub-clauses, no greeting beyond "[Name] —" |

### Length budgets

| Cap | Word target | Structure |
|-----|-------------|-----------|
| Short (<100) | 50-90 | 1 paragraph + sign-off |
| Medium (100-250) | 150-220 | 2-3 paragraphs |
| Long (250+) | 250-450 | 3-5 paragraphs OR paragraphs + a bulleted list |

---

## Step 4 — Echo the draft + invite review

Print:

```
DRAFT — review before sending. I will NOT send this.

────────────────────────────────────────────────
[Subject / body / signature]
────────────────────────────────────────────────

Word count: NN  ·  Tone: [tone]  ·  Cap: [short/medium/long]

  [Y] looks good, copy from the block             /  [edit SECTION] tweak a section
  [tone TONE] re-tone                             /  [shorter] cut ~30%
  [longer] add more context                       /  [cite N] add explicit citation to point N
  [strip-cites] remove all explicit references
```

Loop on edits until the operator approves.

---

## Step 5 — Optional citation injection

If the operator chose `[cite N]` for one or more points, append a parenthetical to each cited claim. Format varies by email purpose:

- For project-internal recipients (stakeholders who know the file structure): full path is OK.
  ```
  …as decided in our 2026-05-22 sync (see 05_meeting_management/2_processed/2026-05-22-with-priya.md).
  ```
- For external recipients: keep the citation human-readable; no file paths.
  ```
  …as we discussed on 2026-05-22.
  ```

Default to the human-readable form unless the operator explicitly asks for paths.

---

## Step 6 — Log the draft

Hold in working memory: "Drafted [shape] email to [recipient(s)] re: [topic]." The next `/session-log` invocation will list it under Completed.

If the email references specific processed meetings, the citation discipline pull-through happens at `/session-log` time, not here — the email itself doesn't propagate citations into other frame files because it's just a draft.

---

## Step 7 — Print the receipt

```
🟢 draft composed                                 — [shape] · [N words] · tone [tone]
🟢 review printed                                 — copy from the block above
⚪ not sent                                       — by design; you send manually
🟢 context pulled                                 — N processed meetings, M tasklist rows referenced
⚪ touchpoint will land in people list            — when you confirm you've sent (run /people-list-update)
```

---

## Hard rules

- **NEVER auto-send.** Same as `/draft-meeting-request`.
- **NEVER fabricate a meeting date or a decision in citations.** If the operator wants to cite something, it must be a real meeting/decision that exists in `2_processed/` or the tasklist. If you can't find it, ASK.
- **NEVER paste the full quoted email back unless the operator asks.** For replies, draft above the quote — the operator's email client will handle the quoted source.
- **Respect the length cap.** If the operator picks "short," don't blow past 100 words because the topic is interesting.
- **Don't add a CTA the operator didn't ask for.** If they want a thank-you note with no ask, don't sneak in "let me know if you'd like to chat further."
- **Honour tone re-tonings honestly.** If the operator says "more direct" twice, actually go more direct each time — don't just rearrange words.
