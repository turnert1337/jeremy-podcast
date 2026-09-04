# Session Log — In Practice with Jeremy & Turner (podcast)

> This is the **session log**. Every working session ends with a new entry appended to the TOP of this file.
>
> **Template reference:** `00_relay_frame/02_session_log_template.md`
> **Skill that writes entries:** `02_session_skills/00_session_log_protocol.md`

---

<!-- Session entries below this line. Most recent at top. -->

## 2026-09-04 -- Session 1: Episode 1 shipped — edit, art, Substack, published
**Phase:** Launch
**Decisions:**
- Formal intake was bypassed — the project bootstrapped straight into production on 2026-08-29; this session retroactively seeds the master tasklist with real state (stub replaced).
- Publication: **Lossy** at readlossy.substack.com · show: **In Practice with Jeremy & Turner** · episode 1: **"One Project, One Screen"** · byline "Jeremy Hodge and Turner Tomlinson" (Jeremy first, per Round 1 call).
- **Published 2026-09-04 from the airport without waiting for Jeremy's explicit go** — operator's call; his billing preference stays an open thread (byline editable post-publish).
- Music architecture in Riverside: two-clip design (flat −21dB bed + separate −5dB closing sting) because the editing engine collapses volume keyframe curves to flat-level+fades.
- Tags `Podcast` + `AI` (research-backed; tags are archive shelving, categories drive discovery) · categories Technology / Business.
- Cover: LED-red "IN PRACTICE" design, 3000px PNG canonical (podcast settings), 1400px JPG on the episode.
- Round 9 publicity picks (operator-annotated): Twitter bio adopted verbatim ("Building with AI agents in practice, not in theory…") · accent color **#D9220C** (calmer LED red) · The Shooter Act = name in bio now, Amazon link waits for the personal website · launch tweet (meta angle) copied to X drafts.
- Spotify distribution via Substack's built-in sync only — never manual RSS (duplicate-show trap).
**Completed:**
- Full episode edit in Riverside (edit `6a930025d54b99094bd11944`, rev 26): cut plan over 380 synced cuts, intro VO scene, interlude, two-clip outro music, goodbye-seam rescue. Final export exactly 100:00, no watermark (`6a99d7b0c468a3bd723fa801`).
- Intro VO recorded/processed (`intro_V1.m4a`), music bed + closing sting placed, transcript scanned clean for the employer-mention guard.
- Cover art built in PIL (LED glow + autofit type), 15 variants explored, canonical chosen; assets in `10_app/podcast_assets/`.
- Substack end-to-end: publication + podcast created (categories, description, byline), show notes with chapters pasted, tags, episode cover — **episode published 2026-09-04**, live at readlossy.substack.com/p/one-project-one-screen (verified HTTP 200).
- Spotify sync fired (show `2P77kAG0gPvfKSfc9JG331` created, awaiting catalog indexing). Apple Podcasts Connect attempted — blocked by Apple's account-setup error before the RSS step.
- Control-console pane: nine review rounds shipped (`10_app/round1–9_review.html` + Ep 01 report, call sheet, launch guide); Round 9 = publicist round (bio, colors, links, book, Twitter, tweet drafts, Apple/Spotify path).
- Master tasklist seeded with real project state (7 tasks; stub retired).
**Subs:** 0
**Pending:** Spotify link still 404 (indexing) · Apple Podcasts Connect setup error (retry playbook in Task 2) · Jeremy's billing confirmation + reaction · tweet still in drafts (post + pin) · bio/accent application unconfirmed · phone audio pass never formally verdicted (episode is live regardless).
**Next session starts with:** Check `https://open.spotify.com/show/2P77kAG0gPvfKSfc9JG331` resolves; if yes close Task 1, then retry Apple Podcasts Connect (different browser, plain provider name) and submit the RSS URL from Substack podcast settings (Task 2).
**Status snapshot:**
Episode 1        | published — readlossy.substack.com/p/one-project-one-screen | none
Spotify listing  | synced, awaiting indexing | Spotify-side lag
Apple Podcasts   | blocked at account setup  | Apple-side bug
Publicity        | tweet drafted, bio adopted | operator applies from phone
Episode 2        | seeded (Round 8 ledger)   | date TBD — Jeremy out ~Sep 12
Frame pane       | 9 rounds live on :4010    | none
**People-list delta:** added 0 · touched 0 · skipped 1 (Jeremy Hodge — add proposed twice, operator confirmation still pending)
**Git:** committed (c5ee609) "session 1: launch day log + tasklist seeded" · pushed

After logging, verify the master tasklist AND people list match reality.
