# Episode 3 — Chaptered Excerpt Episode: "The Cutting Room"

Riverside edit (final, draft): `6acc15f6bd2b7feb98c7f836`, revision 16. Recording: `d8755698-79c8-4779-9aaa-8dfe734d559c` (In-Practice, Episode 3). Draft only — no export, no publish.

**Status: FINAL for this round — cut structure and VO are both done.** History: an earlier pass (rev 11) guessed a voice (Matilda) and inserted all 4 VO clips before the operator's casting brief (warm/friendly/practical/efficient) and the AI-narrator-upfront disclosure ruling arrived. Those were pulled back out (rev 12, clean non-rippling `delete_clip`) rather than ship a guess. An audition page (`10_app/vo_auditions.html`) let the operator listen to 4 re-cast candidates and the real intro staged two ways; **he picked River** (`SAz9YHcvj6GT2YYXdXww`). The 4 finals were rendered in River, uploaded to Riverside's media library, and inserted via `insert_audio` with a 300ms fade-in each, taking the edit from rev 12 → rev 16. Verified by a full timeline read-back (below). Nothing left pending except his own optional manual chapter-order drag and a final human listen-through.

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

## VO scripts, as rendered (current, superseding the first pass)

Third-person narrator, no impersonation of either host. **Updated per the operator's second ruling**, which supersedes the original "light, one clause" instruction: the narrator identifies itself as an AI narrator up front, explains briefly, then gets straight into content. No re-disclosure in the chapter handoffs — the intro already established it.

**Intro** (16.30s, River — final):
> "Hi — this is an AI narrator. I'm introducing a curated set of excerpts from a longer conversation between Jeremy Hodge and Turner Tomlinson. Each chapter gets a deeper look in a Substack post of the same name, over at readlossy.substack.com. Here's the first one."

The previous intro text (quoted below, for the record — no longer used) read "...voiced here by a synthetic narrator..." as a single light clause rather than an upfront self-identification:
> ~~"This is 'In Practice with Jeremy and Turner' — three excerpts, pulled from a much longer conversation between Jeremy Hodge and Turner Tomlinson, voiced here by a synthetic narrator. Each chapter gets a deeper look in a Substack post of the same name, over at readlossy.substack.com. Here's the first one."~~

**Chapter 1 handoff — Slop Bomb** (10.68s, River):
> "Chapter one: 'How to Defuse a Twenty-Seven-Page Slop Bomb.' Turner gets handed a bloated AI report, and the two of them work out when fluency is actually substance."

**Chapter 2 handoff — Apple Notes** (11.23s, River) *(plays second; file is named `chapter3.mp3` because it was scripted against post-rank p3 — see mapping note below)*:
> "Chapter three: 'My 150 Apple Notes Became a Compost Heap.' Turner's notes app as raw material, a riff engine, and simulated beta readers for the novel he's rebuilding."

**Chapter 3 handoff — Rate Limit** (11.83s, River) *(plays third; file is named `chapter2.mp3`)*:
> "Chapter two: 'I Burned a Five-Hour Rate Limit in One Hour.' A subagent bug burns through a rate limit -- the receipt for a bigger claim: you can't delegate what you can't verify." *(Reflects the operator's 2026-10-11 resolution of the t10 hold: the token burn is the receipt, the thesis is general.)*

Character spend, this round: 4 × 82-char comparison line + 2 × 265-char full intro = 858 chars. First pass (superseded, not reused): ~900 chars (intro 306 + 3 chapter scripts 512 + 1 audition line × 3 voices 246). Both rounds combined stay well inside the 10,000/month free tier, with ~8,200 remaining.

## Voice — FINAL: River (operator's pick, by ear)

**River** (`SAz9YHcvj6GT2YYXdXww`), ElevenLabs' relaxed/neutral/informative American voice, model `eleven_multilingual_v2`.

Timeline: the first pass picked Matilda without a listen. That pick was not carried forward — the audition page (`10_app/vo_auditions.html`, linked from `10_app/index.html` via the 🎙 VO Auditions card) reopened casting against a sharper brief (warm, friendly, practical, efficient) and staged a three-voice comparison (River / Matilda / George) on a shared line plus the real intro script staged for review. The operator listened and **picked River**, and approved the staging format. This is a real pick, not a guess — the whole reason the audition page existed.

(Earlier reasoning that favored Bella/Sarah as "strongest textual fit" was based on ElevenLabs' published persona copy, not an actual listen, and didn't anticipate the operator hearing River and preferring it directly — a good example of why the page, not the reasoning, is the real gate.)

## Audio assets

`10_app/podcast_assets/ep03_vo/`:
- `_intro.txt`, `_chapter1.txt`, `_chapter2.txt`, `_chapter3.txt` — scripts as rendered (intro has the AI-narrator-upfront disclosure; chapter handoffs unchanged throughout).
- `intro.mp3` (16.30s), `chapter1.mp3` (10.68s, Slop Bomb), `chapter2.mp3` (11.83s, Rate Limit), `chapter3.mp3` (11.23s, Apple Notes) — **FINAL, River voice.**
- `auditions/{river,bella,sarah,chris,matilda}.mp3` — Round 1 comparison line, candidates auditioned.
- `auditions/{bella,sarah}_intro.mp3` — Round 2 full intro staged for 2 candidates (operator ultimately picked River from Round 1 + the River/Matilda/George staged comparison, not from this pair).
- `_pending_pick/` — the superseded first pass's 4 guessed-voice (Matilda) renders, quarantined with a README. Not deleted, not in use, kept for the record.

New media uploaded to Riverside's media library (production `6a92dea22730f08b525443e1`) this round, River voice:
- intro → `6acd3f7ec2b9f5651127b1e2` (16.300s)
- chapter1/Slop Bomb handoff → `6acd3f7f1965267d8a226a4e` (10.684s)
- chapter2/Rate Limit handoff → `6acd3f817829066863757253` (11.833s)
- chapter3/Apple Notes handoff → `6acd3f82943ad6b6fdd3ecfd` (11.233s)

The 4 first-pass Matilda media assets (`6acc1775c0c34ad4eb5cd2c3`, `6acc1776aa02c37a8336b9b4`, `6acc1777098605c865ed87b5`, `6acc1779c2b9f5651127a239`) remain in the library but are no longer referenced on the timeline.

Character spend, this render: 265 (intro) + 165 (ch1) + 179 (ch2) + 168 (ch3) = 777 chars, one render each, no waste. Running total across all rounds this episode (auditions + finals, both passes): roughly 777 + 858 + ~900 ≈ 2,535 chars — well inside the 10,000/month free tier.

Visual "reserve" scenes at each VO point reuse the existing generic `interlude_10s.mp4` (mediaId `6a99bc27bce4129d3e74e12c`, already in the library from a prior episode), stretched/trimmed to each VO's exact duration — same mechanism the Ep1 precedent used (a title-card/black-frame scene to grow the timeline and push dialogue later, with the VO layered on top as an audio overlay, fading in from silence over 300ms).

## Riverside edit state

- **Final deliverable edit:** `6acc15f6bd2b7feb98c7f836` ("Ep3 Excerpts — The Cutting Room (3 chapters)"), **revision 16**. Draft only, no export, no publish. Verified by a full timeline read-back after insertion:
  - 4 synced cuts intact, unchanged throughout this whole process (head, two inter-excerpt gaps, tail).
  - 3 visual "reserve" scenes (Section track, uniqueId 11) unchanged, at their original positions/durations (30.225s, 11.129s, 11.938s) — not resized for the voice swap.
  - Overlays track (uniqueId 17) now holds the 4 **River** VO clips: `clipId 37` (intro, source trackTime 643,331ms, 16.300s), `clipId 40` (Slop Bomb handoff, trackTime 659,631ms, 10.684s, starts right where intro ends), `clipId 43` (Apple Notes handoff, trackTime 284,439ms, 11.233s), `clipId 46` (Rate Limit handoff, trackTime 467,031ms, 11.833s). Each has the standard fade-in keyframe pair (volume multiplier 0 at clip start → full at +0.3s).
  - Revision history this session: rev 11 (first-pass Matilda VO, guessed) → rev 12 (Matilda VO removed) → rev 13–16 (River's 4 clips inserted one at a time via `insert_audio`, each with `fadeInMs: 300`).
  - **Timing note:** the reserve windows were sized to Matilda's original (slower) pace and weren't resized for River's faster read. Net effect: slightly more silence before Slop Bomb and Rate Limit content (3.24s and 0.1s respectively — harmless), and a **104ms overlap** where the Apple Notes handoff VO's tail runs 104ms past its reserved window into the start of the Apple Notes dialogue. This is likely sub-perceptible but is flagged here for the record rather than glossed over; a human can trim it in the Riverside web editor if it's audible on playback.
  - **Total episode runtime is unchanged: 20:46.8 (1,246,819 ms)** — the reserve windows (which set the overall length) weren't touched, only the audio filling them changed.
- **Abandoned scratch clone:** `6acc170e9762d63e7152a835` ("Ep3 Excerpts — reorder attempt (scratch)") — used only to test the post-rank reorder (see below), left mid-surgery (two tracks split at the two internal chapter boundaries, nothing moved or deleted yet). Not used further, safe to discard.
- **Original three standalone single-range edits** (`6aca53f8a995c7975123f90e`, `6aca542691802d333619d575`, `6aca54af2ef1c0a2fcbaf7b7`) are untouched, as instructed — kept as reference.

## What's blocked, and the manual fix

**Blocked: true post-rank chapter order (Slop Bomb → Rate Limit → Apple Notes).** Riverside's `reorder_timeline` and `create_edit_from_segments` tools are gated off for this account. The documented workaround for assembling multiple ranges from one source edit (clone + `cut_time_ranges` with the gaps as extra cuts) only keeps ranges in their original tape-chronological order — it does not reorder them.

I tested whether manual clip surgery (`split_clips_at_time` + `move_collapsed_clip_with_push`) could reorder the Apple Notes and Rate Limit segments anyway. It doesn't work safely: Riverside's synced cuts (the mechanism that hides the removed head/gap/tail regions) are keyed to **fixed absolute positions on the timeline**, not to the clip content that currently occupies them. Moving a clip to a new position does not move the cuts that were defined relative to its old position — so a naive reorder would leave stale cut regions misaligned, potentially hiding or exposing the wrong seconds of tape. There is no exposed tool to relocate a synced cut's range to follow a moved clip. I stopped before executing any move, to avoid corrupting the edit in a way I can't verify without being able to watch the rendered output.

**Manual fix (2 minutes in the Riverside web editor):** open edit `6acc15f6bd2b7feb98c7f836`, and drag the "Rate Limit" chapter block (currently third) to sit between "Slop Bomb" (first) and "Apple Notes" (currently second). The web UI's timeline supports arbitrary drag-reorder natively, even though that operation isn't exposed through the current MCP tool surface. After dragging, also swap the Ch.2/Ch.3 VO handoff clips to match (the Apple Notes handoff should move to third position, Rate Limit's handoff to second) — both VO clips already exist in the media library (ids above), so this is a reposition, not a re-render.

**Not blocked, needs a human regardless:** a final listen-through of the assembled draft before export/publish, since I can't play audio myself — specifically the 104ms Apple Notes handoff overlap noted above, and the two chapter-break "interlude" title cards stretched beyond their native 10s (now 11.23s and 11.83s under River's timing) — should be fine but unverified visually.

## Cross-link lattice (for the three Substack posts)

Each post should deep-link its reader to the *content start* of its own chapter (not the handoff VO) in the chronological-order episode:

- **p1 — "How to Defuse a Twenty-Seven-Page Slop Bomb"** → episode timestamp **0:30**
- **p3 — "My 150 Apple Notes Became a Compost Heap"** → episode timestamp **7:02**
- **p2 — "I Burned a Five-Hour Rate Limit in One Hour"** → episode timestamp **14:37**

Each post's footer also links the full episode; the episode's own show notes link all three posts, in chapter-playback order (Slop Bomb, Apple Notes, Rate Limit) to match what the listener actually hears — not post-rank order. If the manual reorder above is done before publishing, update these three timestamps and the show-notes post order to match post-rank (0:30 Slop Bomb unchanged, Rate Limit moves to ~6:51, Apple Notes moves to ~14:3x — recompute exact numbers after the drag).

## round3.js

`10_app/content_rounds/round3.js`'s `excerpts[]` array (previously three standalone-excerpt entries) is replaced with one chaptered-episode entry. See that file; `node --check` passes.
