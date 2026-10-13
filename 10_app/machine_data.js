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
