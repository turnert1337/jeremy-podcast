# Episode 3 — Excerpt Cut Sheets

Source recording: Riverside session `d8755698-79c8-4779-9aaa-8dfe734d559c` ("Turner", In-Practice Episode 3, 79 min, Turner + Jeremy, recorded 2026-10-10).
Project: In-Practice, Episode 3 (`6aca39501be2ff59070697bc`).

All three edits were created fresh from the recording (`editing_create_edit_from_recording`, type `MANUAL`). Each is a standalone single-range extraction — everything outside the kept range was cut with `cut_time_ranges` via `resolve_transcript_selection(intent: "keep")`, so boundaries land on verified word-level seams, not on the coarse sentence-level timestamps in the seed file. All three are drafts only: no export, no publish, no music, no scene inserts beyond the VO slot noted below. The Episode 1 edit (`6a930025d54b99094bd11944`) was read-only referenced for the intro-VO pattern and was never modified.

A note on the seed file: `round3_content.json`'s `excerpt_seeds` and the content-round report's "closes on..." quotes were sentence-level approximations. Two of the three closing quotes didn't actually land where the seed described once checked against word-level data (Excerpt A's seed quote was off by a few words; Excerpt B's seed-quoted closing line, "There's just no reason to," actually occurs *before* the seed's start timestamp, not after it — almost certainly a mismatched citation in the AI-generated round report). Both ranges below were re-derived from the real transcript rather than trusting those quotes.

---

## Excerpt A — "How to Defuse a Twenty-Seven-Page Slop Bomb"

**Riverside edit:** `6aca53f8a995c7975123f90e`, revision `2`

**Range (1 continuous range):**
- **9:56.59 wall-clock origin → ~10:43 to ~17:03 effective** (playable 643,331 ms – 1,023,871 ms on the source timeline)
- First words: *"I wanna be allergic almost to understanding some of these details because it's a rabbit hole that like I just add no value."* (Turner)
- Last words: *"...They're avoiding conflict, right? Everyone avoids conflict."* (Turner) — cut right before the dangling "so" that trails into the next topic (Google Ads story), so there's no orphaned filler tail.
- **Total runtime: 6:20.5** (380,540 ms)

**Why this boundary:** Starts on a clean new-sentence seam — Turner pivots mid-paragraph into the "allergic to understanding" line, which is a genuine sentence start even though it's mid-span in the sentence-level transcript. Runs through the full decision-engine → deck-guy analogy → slop-bomb → disclosure arc (both the "fifty to a hundred words" and "uncle Claude" beats land inside the range). Ends cleanly on "Everyone avoids conflict" — the natural rhetorical button on the disclosure thread, right before Jeremy pivots into the unrelated Google Ads story.

**VO script (Turner records later):**
> "Jeremy and I got into this during a much longer conversation about AI at work. I wrote up the full argument — two-page rule included — in a Substack post with this same title."

~34 words, roughly 11 seconds at a natural pace.

---

## Excerpt B — "I Burned a Five-Hour Rate Limit in One Hour"

**Riverside edit:** `6aca542691802d333619d575`, revision `2`

**Range (1 continuous range):**
- Playable 2,293,801 ms – 2,663,489 ms (≈38:13.8 – ≈44:23.5 on the original tape)
- First words: *"We're seeing the the harnesses are always changing or the the agents are always changing, or the models are changing what they feel is important."* (Jeremy)
- Last words: *"...the way I'm gonna do this is remember the skill is in my agent and D file and you know, and sort of let it do that grunt work, but I'm also kinda trusting it."* (Turner) — cut immediately before Jeremy's "Yeah," so there's no hanging acknowledgment tail.
- **Total runtime: 6:09.7** (369,688 ms)

**Why this boundary:** Opens on Jeremy's framing line about harnesses/agents/models always changing, which sets up the Gastown shutdown, the "two more things" Opus quirk, and the subagent-reuse token bug (the "700,000 tokens" / "five hour window in like an hour" / "loading that heavy payload again" beats all land inside). The seed's described closing quote ("There's just no reason to") turned out to actually sit *before* the seed's own start timestamp on the real tape — a citation error upstream — so the real closing beat was re-selected from the content that's actually there: the thread runs forward through the caching/auto-compact tangent and resolves on Turner's "it's not micromanaging if you do it once to coach" framing, closing on his "I'm also kinda trusting it" line, which is a strong, deliberate button rather than a trailing filler.

**VO script:**
> "This clip comes from a longer talk Jeremy and I had about agents making decisions on their own. The full story is on Substack, same title as this episode."

~30 words, roughly 10 seconds at a natural pace.

---

## Excerpt C — "My 150 Apple Notes Became a Compost Heap"

**Riverside edit:** `6aca54af2ef1c0a2fcbaf7b7`, revision `2`

**Range (1 continuous range):**
- Playable 1,391,970 ms – 1,835,269 ms (≈23:12.0 – ≈30:35.3 on the original tape)
- First words: *"Amazing. Yeah, that's that's really cool. I was gonna ask you about your book."* (Jeremy)
- Last words: *"...one one voice, one development editor there, that's that's that's pretty wild for the cost there."* (Jeremy) — cut immediately before Turner's "And you know the the..." pivot into the unrelated Stephen King pantser/plotter tangent, so the excerpt doesn't drag into off-topic material.
- **Total runtime: 7:23.3** (443,299 ms) — runs a bit longer than the 6-minute seed target but stays inside the 5–9 minute band; trimming further would have meant cutting either the "nine sentences" framework explanation or Jeremy's ICP-simulation corroboration, both of which the post's outline explicitly calls for as "outside evidence."

**Why this boundary:** Starts on Jeremy's "Amazing... I was gonna ask you about your book" — the exact line that sets up the whole thread, matching the seed's intent. Runs through the compost heap, the riff engine, the Tesla/iPad/iPhone portability beat, the nine-sentences framework, and the simulated-beta-reader pitch, then extends slightly past the original topic boundary (29:16) to include Jeremy's full ICP-simulation corroboration — the post's named "outside evidence" beat — closing on his "pretty wild for the cost there" line, right before the conversation drifts into the Stephen King tangent.

**VO script:**
> "This excerpt is pulled from a longer conversation Jeremy and I had about rebuilding my novel with AI. I dig deeper into the compost heap and riff engine in a Substack post with this same title."

~34 words, roughly 11 seconds at a natural pace.

---

## VO insertion mechanics (for whoever places the recorded VO)

Checked Episode 1's edit (`6a930025d54b99094bd11944`, read-only) to confirm the actual prior pattern rather than guessing. Its head is built from two pieces, both at timeline position 0:

1. A **video scene** ("Intro") on its own recording track, inserted via `editing_insert_media_as_scene` — this is what pushes the rest of the episode's content later in time by the scene's duration. In Ep 1 this was a short pre-made intro clip.
2. A **narration audio clip** layered on an overlay audio track via `editing_insert_audio`, time-aligned to start at 0, with a volume keyframe that starts silent (`multiplier: 0`) and fades up (to `-13dB` in Ep 1) a fraction of a second in — i.e. a quick fade-in rather than a hard start.

For each of these three excerpts, once Turner has recorded the VO as an audio file:

1. Upload it: `media_create_media_upload` → PUT the audio bytes to the returned URL → `media_finalize_media_upload` → poll `media_get_media` until processed. This returns a media-library `assetId` and the clip's duration.
2. Insert a short title-card scene at time 0 of the excerpt edit via `editing_insert_media_as_scene`, sized to the VO's length (~10–13s per the scripts above) — this reserves the head and pushes the existing kept dialogue later without touching it.
3. Layer the VO itself with `editing_insert_audio({ editId, assetId: <uploaded VO media id>, startMs: 0, durationMs: <VO length>, fadeInMs: ~300 })`, passing the edit's current `expectedRevision` from a fresh `read_timeline_in_range` call so the insert doesn't collide with anything.
4. No cuts, music, or other scene changes needed beyond that — the rest of each edit is the verified dialogue range above, untouched.

None of this was executed — no audio exists yet to insert. This section is the handoff for whoever adds the VO after Turner records it.
