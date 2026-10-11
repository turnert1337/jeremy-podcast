# Episode 3 — Chaptered Excerpt Episode: "The Cutting Room"

Riverside edit (final, draft): `6acc15f6bd2b7feb98c7f836`, revision 11. Recording: `d8755698-79c8-4779-9aaa-8dfe734d559c` (In-Practice, Episode 3). Draft only — no export, no publish.

## Chapter order — IMPORTANT deviation from the post-rank plan

The operator's chapter-naming instruction implied post-rank order (p1 Slop Bomb → p2 Rate Limit → p3 Apple Notes). The final audio instead runs in **tape-chronological order**: Slop Bomb → Apple Notes → Rate Limit. This was a forced choice, not an oversight — see "What's blocked" below.

## Final chapter list, runtimes, and cumulative timestamps

All timestamps are on the final assembled episode's playable timeline (for Substack show-notes deep links).

| # | Chapter (= post title) | VO handoff starts | Content starts | Content ends | Content runtime |
|---|---|---|---|---|---|
| — | Episode intro | 0:00 | — | — | 0:20 (19.96s) |
| 1 | How to Defuse a Twenty-Seven-Page Slop Bomb | 0:20 | 0:30 | 6:51 | 6:20.5 |
| 2 | My 150 Apple Notes Became a Compost Heap | 6:51 | 7:02 | 14:25 | 7:23.3 |
| 3 | I Burned a Five-Hour Rate Limit in One Hour | 14:25 | 14:37 | 20:47 | 6:09.7 |

**Total episode runtime: 20:46.8** (1,246,819 ms).

Exact millisecond boundaries (playable axis):
- Intro VO: 0 – 19,958
- Ch.1 handoff VO: 19,958 – 30,225
- Ch.1 content (Slop Bomb, tape 9:56–17:03): 30,225 – 410,765
- Ch.2 handoff VO: 410,765 – 421,894
- Ch.2 content (Apple Notes, tape 23:12–30:35): 421,894 – 865,193
- Ch.3 handoff VO: 865,193 – 877,131
- Ch.3 content (Rate Limit, tape 38:13–44:23): 877,131 – 1,246,819

## VO scripts, as rendered

Third-person narrator, no impersonation of either host. Light AI self-disclosure placed in the second sentence of the intro per the operator's ruling (self-identify at the top, explain briefly, then get out of the way).

**Intro** (19.96s):
> "This is 'In Practice with Jeremy and Turner' — three excerpts, pulled from a much longer conversation between Jeremy Hodge and Turner Tomlinson, voiced here by a synthetic narrator. Each chapter gets a deeper look in a Substack post of the same name, over at readlossy.substack.com. Here's the first one."

**Chapter 1 handoff — Slop Bomb** (10.27s):
> "Chapter one: 'How to Defuse a Twenty-Seven-Page Slop Bomb.' Turner gets handed a bloated AI report, and the two of them work out when fluency is actually substance."

**Chapter 2 handoff — Apple Notes** (11.13s) *(plays second; file is named `chapter3.mp3` because it was scripted against post-rank p3 — see mapping note below)*:
> "Chapter three: 'My 150 Apple Notes Became a Compost Heap.' Turner's notes app as raw material, a riff engine, and simulated beta readers for the novel he's rebuilding."

**Chapter 3 handoff — Rate Limit** (11.94s) *(plays third; file is named `chapter2.mp3`)*:
> "Chapter two: 'I Burned a Five-Hour Rate Limit in One Hour.' A subagent bug burns through a rate limit -- the receipt for a bigger claim: you can't delegate what you can't verify." *(Reflects the operator's 2026-10-11 resolution of the t10 hold: the token burn is the receipt, the thesis is general.)*

Total VO script text: 818 bytes (4 final scripts) + 82 bytes (one shared audition line) = under 1,100 characters against the 10,000/month free-tier budget.

## Voice chosen

**Matilda** (`XrExE9yKIg1WjnnlVkGX`), ElevenLabs' warm, clear American female voice, model `eleven_multilingual_v2`.

Auditioned three candidates (River `SAz9YHcvj6GT2YYXdXww`, Matilda, George `JBFqnCBsd6RMkjVDRZzb`) on one shared line: *"This is an excerpt from a conversation between Jeremy Hodge and Turner Tomlinson."* All three rendered valid audio (confirmed via `file`/magic-byte checks — ID3v2.4, MPEG Layer III, 128kbps, 44.1kHz). Samples saved in `10_app/podcast_assets/ep03_vo/auditions/`.

Picked Matilda because both hosts are male — a female narrator voice creates an immediate, unmistakable contrast that reinforces the "this is not Jeremy or Turner" disclosure without the listener needing to parse any words. George (deep male) risked a split-second "is that Jeremy?" moment; River (neutral/calm) was serviceable but less distinctive. This is a judgment call based on ElevenLabs' published voice persona descriptions and the strategic fit, not an actual listen — I have no audio playback capability to verify tone/performance quality myself. The operator should spot-check the four rendered clips before this ships.

## Audio assets

`10_app/podcast_assets/ep03_vo/`:
- `intro.mp3` (19.96s), `chapter1.mp3` (10.27s, Slop Bomb), `chapter2.mp3` (11.94s, Rate Limit), `chapter3.mp3` (11.13s, Apple Notes)
- `auditions/river.mp3`, `auditions/matilda.mp3`, `auditions/george.mp3`

All uploaded to Riverside's media library (production `6a92dea22730f08b525443e1`):
- intro → `6acc1775c0c34ad4eb5cd2c3`
- chapter1 (Slop Bomb) → `6acc1776aa02c37a8336b9b4`
- chapter2 (Rate Limit) → `6acc1777098605c865ed87b5`
- chapter3 (Apple Notes) → `6acc1779c2b9f5651127a239`

Visual "reserve" scenes at each VO point reuse the existing generic `interlude_10s.mp4` (mediaId `6a99bc27bce4129d3e74e12c`, already in the library from a prior episode), stretched/trimmed to each VO's exact duration — same mechanism the Ep1 precedent used (a title-card/black-frame scene to grow the timeline and push dialogue later, with the VO layered on top as an audio overlay, fading in from silence over 300ms).

## Riverside edit state

- **Final deliverable edit:** `6acc15f6bd2b7feb98c7f836` ("Ep3 Excerpts — The Cutting Room (3 chapters)"), revision 11. Draft only, no export, no publish. Structure verified by reading the full timeline back: 4 synced cuts (head, two inter-excerpt gaps, tail) sum to exactly the expected removed duration; all 4 VO audio overlays and their paired reserve scenes land at the exact computed positions; fade-in keyframes (silent → full volume over 300ms) present on all 4 VO clips.
- **Abandoned scratch clone:** `6acc170e9762d63e7152a835` ("Ep3 Excerpts — reorder attempt (scratch)") — used only to test the post-rank reorder (see below), left mid-surgery (two tracks split at the two internal chapter boundaries, nothing moved or deleted yet). Not used further, safe to discard.
- **Original three standalone single-range edits** (`6aca53f8a995c7975123f90e`, `6aca542691802d333619d575`, `6aca54af2ef1c0a2fcbaf7b7`) are untouched, as instructed — kept as reference.

## What's blocked, and the manual fix

**Blocked: true post-rank chapter order (Slop Bomb → Rate Limit → Apple Notes).** Riverside's `reorder_timeline` and `create_edit_from_segments` tools are gated off for this account. The documented workaround for assembling multiple ranges from one source edit (clone + `cut_time_ranges` with the gaps as extra cuts) only keeps ranges in their original tape-chronological order — it does not reorder them.

I tested whether manual clip surgery (`split_clips_at_time` + `move_collapsed_clip_with_push`) could reorder the Apple Notes and Rate Limit segments anyway. It doesn't work safely: Riverside's synced cuts (the mechanism that hides the removed head/gap/tail regions) are keyed to **fixed absolute positions on the timeline**, not to the clip content that currently occupies them. Moving a clip to a new position does not move the cuts that were defined relative to its old position — so a naive reorder would leave stale cut regions misaligned, potentially hiding or exposing the wrong seconds of tape. There is no exposed tool to relocate a synced cut's range to follow a moved clip. I stopped before executing any move, to avoid corrupting the edit in a way I can't verify without being able to watch the rendered output.

**Manual fix (2 minutes in the Riverside web editor):** open edit `6acc15f6bd2b7feb98c7f836`, and drag the "Rate Limit" chapter block (currently third) to sit between "Slop Bomb" (first) and "Apple Notes" (currently second). The web UI's timeline supports arbitrary drag-reorder natively, even though that operation isn't exposed through the current MCP tool surface. After dragging, also swap the Ch.2/Ch.3 VO handoff clips to match (the Apple Notes handoff should move to third position, Rate Limit's handoff to second) — both VO clips already exist in the media library (ids above), so this is a reposition, not a re-render.

**Not blocked, needs a human regardless:** a listen-through of all four VO clips before anything ships, since I cannot play audio myself. Also worth a human ear on the two chapter-break "interlude" title cards stretched beyond their native 10s (the Apple Notes card to 11.13s, Rate Limit to 11.94s) — slight stretch, should be fine but unverified visually.

## Cross-link lattice (for the three Substack posts)

Each post should deep-link its reader to the *content start* of its own chapter (not the handoff VO) in the chronological-order episode:

- **p1 — "How to Defuse a Twenty-Seven-Page Slop Bomb"** → episode timestamp **0:30**
- **p3 — "My 150 Apple Notes Became a Compost Heap"** → episode timestamp **7:02**
- **p2 — "I Burned a Five-Hour Rate Limit in One Hour"** → episode timestamp **14:37**

Each post's footer also links the full episode; the episode's own show notes link all three posts, in chapter-playback order (Slop Bomb, Apple Notes, Rate Limit) to match what the listener actually hears — not post-rank order. If the manual reorder above is done before publishing, update these three timestamps and the show-notes post order to match post-rank (0:30 Slop Bomb unchanged, Rate Limit moves to ~6:51, Apple Notes moves to ~14:3x — recompute exact numbers after the drag).

## round3.js

`10_app/content_rounds/round3.js`'s `excerpts[]` array (previously three standalone-excerpt entries) is replaced with one chaptered-episode entry. See that file; `node --check` passes.
