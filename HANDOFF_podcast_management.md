# HANDOFF — podcast/Substack management track

> Written 2026-10-13 by the Dev Command Center orchestrator session, which has
> been running this project's work so far. From here, the **podcast and
> Substack discussions move to the dedicated podcast-management session.**
> This file is the complete brief: read it first, then the files it points at.
> The operator should not have to re-explain any of this.

---

## 1. Where the project actually is

- **Episode 1** — published (readlossy.substack.com/p/one-project-one-screen), Spotify synced.
- **Episode 2** — recorded 2026-09-13, **Turner's track lost in upload. Operator's
  call 2026-10-13: "ok for now ep2 is lost to the abyss I'm afraid."** Stop
  pursuing recovery. Round 10's three Substack clusters (built from Jeremy's
  surviving track) are still unannotated and are now orphaned content — treat
  as a reusable idea bank, not a pending episode.
- **Episode 3** — recorded 2026-10-10, 79 minutes, both tracks clean. Fully
  processed this round:
  - Transcript + 31-segment topic map + Jeremy's independent Wispr topic list
    in `10_app/transcript_inbox/`.
  - 16 candidate topics → 9 right-sized → **3 recommended posts** (below).
  - **Chaptered excerpt episode cut and VO'd**: Riverside edit
    `6acc15f6bd2b7feb98c7f836` rev 16, 20:46.8, three chapters, ElevenLabs
    **River** narrator (AI self-identifies up front, per operator ruling).
  - State: **final edit / review.**

## 2. The operator's rules (binding — do not re-litigate)

1. **Turner writes the Substack posts himself.** The pipeline ends at outline +
   plan + crafting direction. Existing drafts in `10_app/drafts/` are
   **scaffolds/reference**, never the deliverable. The per-post gate is
   "lock the writing plan," never "approve my draft."
2. **Full reasoning on every review surface.** Recommendations must state what
   the change is specifically and why it should work, in prose, self-contained
   — no shorthand, no bare verdict labels. (His words, book-side but general:
   "reasoning needs to be fully human navigable as me the writer, from you the
   developmental editing coach.")
3. **Nothing publishes or sends without his explicit say-so.** Drafts stay drafts.
4. **Walmart-discretion filter** stands on all public content ("could this read
   as about my employer?"). The Dev Command Center frame itself stays
   outbound-donations-only and is never the shareable asset.
5. ElevenLabs key is in the macOS login keychain (service `elevenlabs_api_key`);
   never write it to disk or print it. ~6.9k of 10k monthly chars used.

## 3. What he just decided (Review Deck annotations, 2026-10-13)

Verbatim in `10_app/content_rounds/review_deck_annotations.js` (with the
pocock-key → recommendation mapping verified in its header comment). Summary:

- **Publish sequencing: ADOPT** — "so long as it makes sense." (Episode first,
  then one post per day, cross-linked; chapter deep-links in each post.)
- **Pocock adoptions: ADOPT** platform-role separation · free-forever essay
  archive · naming the pivot ("taste compounds" repeated deliberately) ·
  **cadence discipline (the one-extra-post-a-week rule — he treated this as
  load-bearing)**. **PARK** evergreen master-thread · controversy-as-content ·
  code-repo-as-content · cohort/live format.
- **Episode export (s8): "open up a page and you can guide me through this in
  riverside."** → He wants a **guided walkthrough page** for the remaining
  manual Riverside work, not instructions in chat. Remaining manual work:
  (a) swap chapters 2↔3 and their VO handoffs into post-rank order (reorder API
  is gated for this account; ~2 min drag in the web UI), (b) the Apple-Notes
  handoff clip overruns its window by 104ms — check by ear, trim if audible,
  (c) listen-through, (d) then the export call is his.
- **Post 2 research (s4):** he wants **research into the Opus "and two more
  things" behavior** — how it was executed, what people publicly said and
  observed — so he can connect it to what he writes about his conversation with
  Jeremy. This is a research task feeding his own drafting.
- **Episode 2 (s11):** written off, see above.

## 4. THE MAIN WORK ORDER — the podcast processing visualizer (his note s12)

Read his s12 note **verbatim** in the annotations file; it is the spec. Shape:

- **A main page for the "Jeremy/Turner Podcast machine"** — buttons to the
  things he needs to manage it: his Substack, Jeremy's links, Riverside, and
  entries into the two sub-flows below.
- **Podcast flow** — episodes advance through stages: recording → processing →
  final edit/review → published. Ep 1 = available with a link; **Ep 2 = cancelled,
  data lost**; Ep 3 = currently **final edit/review**. Each episode line shows
  **how many Substack posts it spawned**, with links into each post's internal
  record.
- **Substack desk** — all Substack posts, tracked **ideation → outlining →
  drafting**, and importantly **not all posts come from episodes**. Posts start
  as ideas and escalate when he says so. Quick links to the Substack account
  surfaces he needs, plus **north-star example posts linked somewhere so he can
  check his form**.
- **The drafting view** — one processing view per post: **your suggestion on the
  left, his annotation/editing box on the right**, where the actual editing
  happens. Format can evolve; this is the core working surface.
- Connections run both ways: episode ↔ spawned posts.

House conventions to follow: static pages under `10_app/`, served by
`serve.py` on :4010 (already running), localStorage persistence + a
copy-annotations export in the established pattern, cards on `index.html`
following the existing markup, and `cc-status.json` kept current.

## 5. The three Episode-3 posts (plans drafted, locks pending)

1. **"Fluency vs. Substance"** — the 27-page slop-bomb scene opening; decision
   engine → coaching agents → "no free lunches"; taste and management as the
   top skills. (His own title idea; his reframe.)
2. **"My Agent Made a Smart Call I Never Approved"** — the architect agent
   reusing context and burning a 5-hour rate limit in one hour. Thesis: agents
   make locally smart, globally expensive calls; you can't delegate what you
   can't verify. Entry two in a managing-agents series. **Needs the s4 research.**
3. **"My 150 Apple Notes Became a Compost Heap"** — the #CH notes, the riff
   engine, the nine-sentence framework; Carbon Chicken plug placeholder he'll tune.

Each has: outline beats, pull-quotes, excerpt-chapter deep link, word target
(1,400–2,200), crafting direction. See `10_app/content_rounds/round3.js`,
`10_app/reports/ep03_content_round.md`, and the scaffolds in `10_app/drafts/`.

## 6. File map

| What | Where |
|---|---|
| His Review Deck annotations (verbatim) | `10_app/content_rounds/review_deck_annotations.js` |
| His earlier round-3 annotations | `10_app/content_rounds/round3_annotations.js` |
| Round 3 data (topics/posts/excerpts) | `10_app/content_rounds/round3.js`, `round3_content.json` |
| Post scaffolds + README | `10_app/drafts/` |
| Episode build record | `10_app/reports/ep03_chaptered_episode.md` |
| Content-round analysis | `10_app/reports/ep03_content_round.md` |
| **Audience research (binding craft rules)** | `20_research/01_audience_response_brief.md` |
| Pocock platform study + its charts | `20_research/02a–02c_*.md`, `10_app/pocock_study.html` |
| Existing review surfaces | `10_app/review_deck.html`, `content_review.html`, `vo_auditions.html` |
| Transcript + topic map + Jeremy's list | `10_app/transcript_inbox/` |

## 7. Suggested first moves

1. Read this file + the two annotation files + the audience brief.
2. Confirm back to Turner what you understand the state to be (short), then
   build the **podcast processing visualizer** per §4 — that is what unblocks
   everything else he wants to do.
3. Stage the **Riverside guided walkthrough page** (s8) as part of or alongside it.
4. Kick off the **"two more things" research** (s4) so it's ready when he drafts post 2.
5. Then work the posts with him, one at a time, to locked writing plans.
