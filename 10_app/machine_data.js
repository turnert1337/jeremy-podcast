/* The Podcast Machine — data registry.
   machine.html reads this. Post PLANS (hook/outline/crafting/quotes) are NOT
   duplicated here — the drafting view fetches them live from
   content_rounds/round3_content.json (single source of truth).
   Stages: idea → outlining → drafting → (published).
   RULE (operator, binding): Turner writes the posts himself. The pipeline ends
   at outline + plan + crafting direction; scaffolds in drafts/ are reference. */

window.MACHINE = {

  episodes: [
    {
      id: "ep1",
      title: "Ep 1 · One Project, One Screen",
      recorded: "2026-08-29",
      stage: "published",
      stages: ["recording","processing","final edit/review","published"],
      stageIndex: 3,
      runtime: "100:00",
      links: [
        { label: "▶ Listen (Substack)", href: "https://readlossy.substack.com/p/one-project-one-screen" },
        { label: "Spotify", href: "https://open.spotify.com/show/2P77kAG0gPvfKSfc9JG331" }
      ],
      posts: [],
      note: "Published 2026-09-04. Feedback banked: tighter intro (applied on ep 3's excerpt format)."
    },
    {
      id: "ep2",
      title: "Ep 2 · (untitled)",
      recorded: "2026-09-13",
      stage: "cancelled",
      stages: ["recording","processing","final edit/review","published"],
      stageIndex: -1,
      runtime: "~99 min (Jeremy's track only)",
      links: [],
      posts: [],
      ideaBank: ["ib1","ib2","ib3","ib4"],
      note: "Cancelled — Turner's track lost in upload (operator call 2026-10-13: \"lost to the abyss\"). Jeremy's surviving track seeded the idea bank below; those ideas are reusable, the episode is not."
    },
    {
      id: "ep3",
      title: "Ep 3 · The Cutting Room (chaptered excerpts)",
      recorded: "2026-10-10",
      stage: "final edit/review",
      stages: ["recording","processing","final edit/review","published"],
      stageIndex: 2,
      runtime: "20:46.8 · 3 chapters · River AI narrator",
      links: [
        { label: "Riverside studio (open edit: \"Ep3 Excerpts — The Cutting Room\", rev 16)", href: "https://riverside.com/dashboard/studios/turner-tomlinsons-studio/projects" },
        { label: "⚑ Guided walkthrough (the 4 remaining manual steps)", view: "walkthrough" },
        { label: "Build record", href: "reports/ep03_chaptered_episode.md" }
      ],
      posts: ["p1","p2","p3"],
      note: "Final edit/review. Cut + VO done (edit 6acc15f6bd2b7feb98c7f836, rev 16). Remaining: your drag-reorder, the 104ms ear-check, a listen-through — then the export call is yours. The walkthrough view guides all of it."
    }
  ],

  posts: [
    {
      id: "p1", title: "Fluency vs. Substance",
      stage: "outlining", source: "ep3",
      gate: "Writing plan drafted — lock it in the drafting view to advance.",
      planFrom: "round3", planId: "p1",
      scaffold: "drafts/ep03_post1_fluency-vs-substance.md",
      chapterLink: "episode timestamp 0:30 (Slop Bomb chapter) — becomes a real link at publish",
      research: null,
      targetWords: { target: 1900, band: [1600, 2200],
        rationale: "Your two comps run ~2,200 (Yuzheng) and ~2,900 (Robots Ate My Homework) words. The audience brief caps the band at 2,200 and warns that a tight 1,400 beats a padded 2,400. Land just under the cap: the slop-bomb scene and the two-page-rule mechanism earn the length, and a post about hollow fluency cannot afford a hollow paragraph." },
      similar: [
        { label: "The Article Sounded Right but Had No Ground Under It — Yuzheng Sun",
          href: "https://yuzheng.substack.com/p/the-article-sounded-right-but-had",
          why: "First-person: the author catches their own AI-assisted piece being structurally fluent and hollow — your thesis, but from the writer's seat instead of the meeting room. Good for calibrating how the confession register reads." },
        { label: "The post-AI internet needs a different kind of literacy — Robots Ate My Homework",
          href: "https://robotsatemyhomework.substack.com/p/post-ai-internet-literacy",
          why: "The professor's-eye version: 'perfectly vapid' essays and six markers for spotting emptiness. Useful as a foil — yours is the manager's version, and your mechanism (the two-page rule, read-it-word-for-word) is what this one lacks." }
      ],
      summary: "Decision engine → coaching agents → no free lunches; the 27-page slop-bomb scene stays the cold open. Title is the operator's own."
    },
    {
      id: "p2", title: "My Agent Made a Smart Call I Never Approved",
      stage: "outlining", source: "ep3",
      gate: "Writing plan drafted — s4 research attached below. Lock to advance.",
      planFrom: "round3", planId: "p2",
      scaffold: "drafts/ep03_post2_agent-decision-i-never-approved.md",
      chapterLink: "episode timestamp 14:37 (Rate Limit chapter; ~6:51 if you do the reorder) — real link at publish",
      research: "../20_research/03_opus_two_more_things.md",
      targetWords: { target: 1600, band: [1400, 1900],
        rationale: "The comps run long — ~3,300 (Alan Paris) and ~2,100 (Dr. Rockmore) — but both argue from the news. Your round-3 brief calls this the leanest, most technical post of the three, and your receipt is first-person. Lean plus receipts beats their length; past 1,900 you're diluting the one thing they can't match." },
      similar: [
        { label: "The AI Didn't Go Rogue. Authority Failed. — Alan Paris",
          href: "https://alanparis.substack.com/p/the-ai-didnt-go-rogue-authority-failed",
          why: "Makes the same reframe you're making — not disobedience, mis-scoped authority — off the recent OpenAI/Anthropic incidents. Watch how he keeps the incident subordinate to the governance claim; that's the structure your post wants." },
        { label: "The Permission Problem — Dr. Rockmore",
          href: "https://drrockmore.substack.com/p/the-permission-problem",
          why: "The permission/verification gap as its own subject. Your edge over both of these: a first-person receipt (the 5-hour limit gone in one hour) that neither has — they argue from the news, you argue from your own logs." }
      ],
      summary: "The token-burn story is the receipt, not the subject. Thesis: agents make locally smart, globally expensive calls; you can't delegate what you can't verify. Title is mine, not yours — flag from the drafts README: approve or rename."
    },
    {
      id: "p3", title: "My 150 Apple Notes Became a Compost Heap",
      stage: "outlining", source: "ep3",
      gate: "Writing plan drafted — lock it in the drafting view to advance.",
      planFrom: "round3", planId: "p3",
      scaffold: "drafts/ep03_post3_apple-notes-compost-heap.md",
      chapterLink: "episode timestamp 7:02 (Apple Notes chapter; ~14:3x after reorder) — real link at publish",
      research: null,
      targetWords: { target: 1400, band: [1200, 1700],
        rationale: "This genre runs short: ~680 (Andresen) and ~1,050 (The Creative Lifestyle). Yours earns more length because it ships a working machine — the riff engine, the simulated beta readers — but past ~1,700 it stops being a personal essay and starts being documentation." },
      similar: [
        { label: "The Writer's Compost Heap — Katya Andresen",
          href: "https://katyaandresen.substack.com/p/the-writers-compost-heap",
          why: "The closest metaphor match on the platform: unused writing as compost, decomposition → recomposition as the creative cycle. Check what your riff engine adds that her hand-worked version can't do — that delta is your post." },
        { label: "Don't Let The Notes App Become a Digital Graveyard — The Creative Lifestyle",
          href: "https://thecreativelifestyle.substack.com/p/dont-let-the-notes-app-become-a-digital",
          why: "Your exact problem statement (notes app as graveyard of good ideas) without your solution. Yours is this post plus a working machine — the 150 #CH notes, the riff engine, the simulated beta readers." }
      ],
      summary: "The #CH notes, the riff engine, the nine-sentence framework; Carbon Chicken plug placeholder you'll tune."
    },

    {
      id: "p4", title: "The Vanishing Point",
      stage: "outlining", source: "standalone",
      gate: "Outline staged from the comps research with the three DCC rulings folded in. One blocking decision before lock: the attribution gate on \"the great reencode\" (see crafting direction).",
      planInline: {
        size_words: "1,100–1,500",
        hook: "Sutton discipline, zero runway: the thesis is the first sentence. 'Visible code is becoming a diagnostic symptom — like consciously noticing your own breathing — and natural language is the vanishing point software is converging toward.' No wind-up, no 'in the age of AI.' The essay then spends its whole length making that sentence feel obvious in retrospect, which is exactly how Software 2.0 and The Bitter Lesson both worked.",
        outline: [
          "Thesis as sentence one (the Sutton move). Then one paragraph of what it claims and doesn't claim: this is about perceptibility, not interface choice.",
          "Handle Karpathy the Mollick way, immediately: cite 'the hottest new programming language is English' (2023) and vibe coding (2025) openly, credit them, then state the labeled increment — they argue about where the interface sits; this argues about what remains visible. Different axis. One paragraph, then move.",
          "Receipt 1 (parallel form, Koomen's singular-anchor rule): a specific fleet moment where the symptom fired — you had to consciously open raw code, what triggered it, what it cost in time and attention. Named project, dated.",
          "Receipt 2: the before/after — a task that used to mean reading code and now doesn't (the tmux terminal work or a session-log skill), with a commit reference. Checkable, Mollick-style.",
          "Receipt 3, the bitter turn: the abstraction leak — code became visible again unexpectedly. This is the essay's own Bitter Lesson moment; it keeps the thesis earned instead of triumphalist. Each receipt shorter than the last.",
          "The Brunelleschi analogy does its interpretive work here, once: perspective didn't eliminate depth, it organized it toward a point you stop looking at. One historical analogy carrying the essay is the proven Koomen structure — but it must interpret the receipts, not decorate the thesis.",
          "Close on why the lesson is uncomfortable (Sutton's closing move): engineers' identity lives in the code the way AI researchers' lived in their heuristics."
        ],
        pull_quotes: [
          "Visible code is a diagnostic symptom, not a feature.",
          "The first time you notice your own breathing, something is usually wrong.",
          "Perspective didn't eliminate depth; it organized it toward a point you stop looking at."
        ],
        crafting: "ATTRIBUTION GATE (blocking, decide before lock): 'the great reencode' has NO findable public source — multiple search passes, nothing on HN, X, Substack, or press. Never publish it as a borrowed citation. Your three options: drop the phrase · tell me where you heard it so it can be verified and credited · coin it as explicitly your own. Recommended: coin it — you already named the GRIM machinery with it, which strongly suggests it was yours all along, and a clean coinage is worth more than a vague citation (see comp evidence: a six-word tweet outcoined a thousand essays). Other crafting: strict parallel receipts, each with one named, dated anchor — never 'code these days'; the differentiation sentence (perceptibility vs. interface) must appear before the first receipt or HN tags it derivative in the first comment; cover image from your actual screen, not stock.",
        why: "The lane is genuinely occupied — Karpathy owns both adjacent phrases, with years of unprompted citation. But the comp dissection found the open ground: nobody in the set argues that visible code is itself a symptom of an unfinished system. Karpathy, Koomen, Yegge, and Mollick all argue about interface or beneficiaries; the physicality/perceptibility axis is unclaimed. That's the post.",
        alt_titles: ["The Vanishing Point", "Be Allergic to Code", "Code as Symptom"]
      },
      scaffold: null,
      chapterLink: null,
      research: "../20_research/04_vanishing_point_comps.md",
      targetWords: { target: 1300, band: [1100, 1500],
        rationale: "The structure model is Sutton's Bitter Lesson (~1,100 words: thesis as first sentence, parallel receipts, zero padding) and the lane-owner comp, Software 2.0, runs ~1,200–1,500. The comp set's closing verdict: length didn't determine landing, discipline did. Three receipts, each shorter than the last, leaves no room to pad." },
      similar: [
        { label: "The Bitter Lesson — Richard Sutton",
          href: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html",
          why: "The structure model to steal outright: thesis as the opening sentence, parallel receipts on an identical beat, a closing turn on why the lesson is hard to accept. ~1,100 words, treated as scripture for six years." },
        { label: "AI Horseless Carriages — Pete Koomen",
          href: "https://koomen.dev/essays/horseless-carriages/",
          why: "The closest structural comp (864 points, 478 comments on HN): one historical analogy carrying the essay, one singular concrete villain. Your Brunelleschi is his horseless carriage — the analogy must interpret the receipts, not decorate the thesis." },
        { label: "Software 2.0 — Andrej Karpathy",
          href: "https://karpathy.medium.com/software-2-0-a64152b37c35",
          why: "The lane owner. He doesn't argue the reframe — he asserts it in one sentence and spends the rest making it feel obvious in retrospect. Your thesis sentence needs the same declarative confidence." },
        { label: "\"The hottest new programming language is English\" — Karpathy (tweet, 2023)",
          href: "https://x.com/karpathy/status/1617979122625712128",
          why: "The single biggest occupied-territory risk: 12.8M views, fact-checked like a proverb. Cite it openly and move past it fast — your claim is about the disappearance of visibility, not the choice of interface language." },
        { label: "Vibe coding — Karpathy (tweet, 2025)",
          href: "https://en.wikipedia.org/wiki/Vibe_coding",
          why: "'Forget that the code even exists' is the closest existing phrase to 'be allergic to code.' Distinction to sharpen: vibe coding is a workflow attitude; yours is an architectural prediction about where code sits in the stack. Also the reminder: a six-word tweet outcoined a thousand essays." },
        { label: "Revenge of the Junior Developer — Steve Yegge",
          href: "https://frontendmasters.com/blog/revenge-of-the-junior-developer/",
          why: "The maximalist pole (~4,500 words, six-wave taxonomy, voice buying trust before argument). Your 1,100–1,500 target is a deliberate rejection of this mode — which means every sentence carries weight Yegge spends paragraphs earning." },
        { label: "Speaking Things Into Existence — Ethan Mollick",
          href: "https://www.oneusefulthing.org/p/speaking-things-into-existence",
          why: "The template for handling Karpathy: open by citing him, add one clearly-labeled increment (vibeworking) instead of pretending the lane is empty. Your increment is the physical/perceptual symptom framing — the one axis the whole comp set leaves unclaimed." }
      ],
      summary: "Natural language as the vanishing point software converges toward; visible code as a diagnostic symptom (the breathing analogy). Differentiated from Karpathy on the perceptibility axis — the one claim the comp set leaves unclaimed. Full dissection: 20_research/04."
    },

    /* ---- idea bank: ep2 orphans (Jeremy's surviving track). Reusable ideas,
            not pending posts. Escalate any of them by saying so. ---- */
    { id: "ib1", title: "Don't hire a clone of yourself (the management layer)", stage: "idea", source: "ep2",
      summary: "Jeremy's 1.3M-word audit → \"to mimic yourself is to mimic your flaws\" → the ideal-manager layer; totem/pull-cord/dreidel autonomy scale; the 60%-useless-meetings audit." },
    { id: "ib2", title: "The overnight shift (coach loop)", stage: "idea", source: "ep2",
      summary: "Workers stall; a coach agent loops every 10 minutes overnight; agent-filed issues need acceptance criteria; your harness is your taste and taste compounds." },
    { id: "ib3", title: "Your client already asked WebMD", stage: "idea", source: "ep2",
      summary: "Chatbot perception floor; owners test what CSRs should; practitioner-as-physician; show-don't-ask." },
    { id: "ib4", title: "Ship 8 of 10 / the detox story", stage: "idea", source: "ep2",
      summary: "Perfectionism vs the friend who ships; 1% compounding; prioritization/leverage/compounding trifecta; \"I unplugged for 10 days and the fleet published a podcast.\"" }
  ],

  quicklinks: {
    substack: [
      { label: "Publish desk", href: "https://readlossy.substack.com/publish" },
      { label: "Posts dashboard", href: "https://readlossy.substack.com/publish/posts" },
      { label: "Stats", href: "https://readlossy.substack.com/publish/stats" },
      { label: "Settings (podcast + site)", href: "https://readlossy.substack.com/publish/settings" },
      { label: "The site, as readers see it", href: "https://readlossy.substack.com" }
    ],
    riverside: [
      { label: "Studio projects (recordings + edits)", href: "https://riverside.com/dashboard/studios/turner-tomlinsons-studio/projects" }
    ],
    jeremy: [],   /* nothing on file — never fabricated. Tell me his links (site, LinkedIn, Thrive) and I wire them here; same moment is the right one to finally add him to the people list. */
    northstars: [
      { label: "swyx — The Rise of the AI Engineer", href: "https://www.latent.space/p/ai-engineer",
        why: "An essay as a community-founding document: the opinion stake written as a claim others cite or argue with by name. Your \"taste compounds\" wants this treatment." },
      { label: "Simon Willison's weblog", href: "https://simonwillison.net",
        why: "Radical specificity and a strict content taxonomy — notes vs guides vs TILs. The receipts-first register your audience brief demands." },
      { label: "Lenny's Newsletter", href: "https://www.lennysnewsletter.com",
        why: "The repurposing loop done right: lead with the concrete win in two sentences, tactical 3–5 bullet spine mid-post, narrative wrapped around it." },
      { label: "The Pragmatic Engineer (Gergely Orosz)", href: "https://blog.pragmaticengineer.com",
        why: "Years of free groundwork, strongest material kept free, organic-only growth — the trajectory your Pocock adoptions are modeled on." }
    ],
    surfaces: [
      { label: "Review Deck (round 3)", href: "review_deck.html" },
      { label: "Content review", href: "content_review.html" },
      { label: "VO auditions", href: "vo_auditions.html" },
      { label: "Pocock study", href: "pocock_study.html" },
      { label: "Car view (claude.ai artifact)", href: "https://claude.ai/code/artifact/48b0b977-f764-4f57-9e74-93ff9bc81217" },
      { label: "Legacy console (rounds 1–10, ep1 era)", href: "index.html" }
    ]
  },

  rules: [
    "Turner writes the posts himself — agents outline, plan, and coach only.",
    "Full prose reasoning on every review surface; no bare verdicts.",
    "Nothing publishes or sends without his explicit say-so.",
    "Walmart-discretion filter on all public content.",
    "Cadence discipline: the one-extra-post-a-week rule (adopted, load-bearing)."
  ]
};
