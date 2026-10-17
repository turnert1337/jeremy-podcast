# Comp Set & Craft Dissection — "The Vanishing Point"

Research pass for Turner's essay (thesis: natural language is the vanishing point software is converging toward; code becoming a symptom of inefficiency, like consciously thinking about breathing; "be allergic to code"). Audience: AI practitioners/engineers on HN/X/Substack. Goal: find and dissect 5–7 real, verified essays in the "English replaces code" lane, plus run down "the great reencode" attribution.

All seven pieces below were verified as real via live search and, where fetchable, read directly. URLs and dates are cited inline.

---

## 1. Andrej Karpathy — "Software 2.0"

- **Venue/date:** karpathy.medium.com, November 11, 2017. URL: https://karpathy.medium.com/software-2-0-a64152b37c35
- **Opens:** "I sometimes see people refer to neural networks as just 'another tool in your machine learning toolbox'..." — then pivots fast to the reframe.
- **Thesis, placement:** Near-immediate. The core line, dropped early: "Neural networks are not just another classifier, they represent the beginning of a fundamental shift in how we develop software. They are Software 2.0." Everything after is elaboration, not build-up.
- **Receipts:** The 1.0/2.0 split itself (explicit code vs. weights-as-program), the claim that "no human is involved in writing this code because there are a lot of weights," and real deployed examples (vision pipelines, ranking systems) where hand-written heuristics were being replaced wholesale by learned weights.
- **Named idea / did it stick:** "Software 2.0" — yes, demonstrably. It's cited unprompted across HN threads for years after (e.g. a 2026 HN comment: "When Karpathy wrote Software 2.0 I was super excited..." — news.ycombinator.com/item?id=45729137), spawned follow-on "Software 3.0" framing used by swyx/Latent Space, and shows up in vendor blog posts (MindStudio's "Software 1.0 vs 2.0 vs 3.0") as inherited vocabulary, not as attributed quotation — the strongest sign a coinage has become load-bearing infrastructure rather than a citation.
- **Length/structure:** Medium-length (~1,200–1,500 words), single clean arc: reframe → definition → where 2.0 already won → what tooling is missing. No subheads needed because the thesis is the whole essay.
- **Landing evidence:** Multiple separate HN threads over 2017–2025 (item IDs 15678587, 17282492, 17283743, 34881881), still being re-litigated nearly a decade later.
- **Lesson for Vanishing Point:** Karpathy doesn't argue for the reframe — he asserts it in one sentence and then spends the rest of the piece making the assertion feel obvious in retrospect. Turner's thesis sentence ("natural language is the vanishing point") should land with the same declarative confidence by paragraph 2–3, not be argued into existence.

## 2. Andrej Karpathy — "The hottest new programming language is English" (tweet)

- **Venue/date:** X, January 24, 2023. URL: https://x.com/karpathy/status/1617979122625712128
- **Form:** Single tweet, no essay — included here because it's the most-cited artifact in this entire lane and Turner's audience will reflexively compare any "English is the real interface" claim to it.
- **Reception:** 12.8M+ views; spawned its own "quote origin" investigation (quoteinvestigator.com, Oct 2024) treating it as a landmark utterance worth fact-checking like a proverb — a rare honor for a tweet.
- **Lesson:** This is the single biggest occupied-territory risk for Turner's piece. Any sentence that rhymes with "English becomes the programming language" will read as a Karpathy callback, intentional or not. The essay needs to either cite him directly and move past it fast, or stake out ground he explicitly didn't: Turner's angle isn't "English is the new syntax," it's "code becomes a symptom you no longer consciously perceive" — a claim about the *disappearance of visibility*, not the *choice of interface language*. That distinction has to be explicit early, or reviewers will tag the piece as derivative in the first comment.

## 3. Andrej Karpathy — "vibe coding" (tweet)

- **Venue/date:** X, February 2, 2025.
- **Opens/full text:** "There's a new kind of coding I call 'vibe coding,' where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good."
- **Named idea / did it stick:** Overwhelmingly yes — Collins Dictionary's 2025 Word of the Year, a term of art across YC, Sourcegraph, Simon Willison, and venture decks within months. "Forget that the code even exists" is the single closest existing phrase to Turner's "be allergic to code, force it into markdown and walk away" — worth knowing it's there so the essay can either nod to it explicitly or sharpen the distinction (vibe coding = a workflow/attitude toward prompting; Turner's claim = an architectural prediction about where code sits in the stack, more structural than behavioral).
- **Lesson:** A six-word tweet outcoined a thousand essays. The density-to-impact ratio here is the reminder that Turner doesn't need more words to coin a sticky term — he needs one sentence so tight it survives being screenshotted without context.

## 4. Steve Yegge — "Revenge of the Junior Developer"

- **Venue/date:** sourcegraph.com/blog, March 22, 2025 (per Yegge's own X post dated March 19, 2025 linking it: x.com/Steve_Yegge/status/1903503178479653119; HN discussion at news.ycombinator.com/item?id=43446695). Also mirrored at frontendmasters.com/blog/revenge-of-the-junior-developer/.
- **Opens:** "I've really gotta start being careful what I say these days. I've got so many people watching." — then a riff on mishearing his own digestive noise as "vibe code," deliberately deflating before the real argument starts.
- **Thesis, placement:** Mid-essay, after the comedic cold open: coding agents will restructure dev labor, and juniors — less anchored to old habits — adopt faster and win the transition, while senior holdouts lose ground.
- **Receipts:** A six-wave taxonomy (traditional 2022 → completions 2023 → chat 2024 → coding agents 2025H1 → agent clusters 2025H2 → agent fleets 2026), concrete cost figures ($10–12/hr per agent, $80–100/day recommended LLM spend per developer), a named anecdote about a tech director handed an anti-AI-adoption PDF.
- **Named idea:** "Agent clusters" / "agent fleets" — directional coinages, less sticky than Karpathy's but functioning as a working taxonomy cited in his own follow-up essay ("The Brute Squad").
- **Length/structure:** ~4,500+ words, six labeled parts, deliberately bombastic ("Exaggeration Central") — closer to a monologue than an essay.
- **Lesson:** Yegge gets away with huge length because he front-loads a joke that buys trust before the long taxonomy. Turner's target length (1,400–2,200 words) is a deliberate rejection of this mode — correct for his "practitioner receipts, not thinkpiece" platform goal, but it means every sentence has to carry weight Yegge spends paragraphs earning through voice alone.

## 5. Pete Koomen — "AI Horseless Carriages"

- **Venue/date:** koomen.dev/essays/horseless-carriages/, April 2025 (HN submission dated April 23, 2025 per thread; announced on X same window: x.com/koomen/status/1915083271911919900). HN: news.ycombinator.com/item?id=43773813 — **864 points, 478 comments**, a genuinely huge HN result for a single-author essay.
- **Opens:** "I noticed something interesting the other day: I enjoy using AI to build software more than I enjoy using most AI applications." — a personal, low-stakes observation, not a thesis statement.
- **Thesis, placement:** Stated immediately after the opening hook: AI products fail because they mimic pre-AI software patterns (a chatbot bolted onto an existing app) instead of being redesigned around what AI actually makes possible — specifically, exposing the system prompt to the user instead of hiding it.
- **Receipts:** A single concrete villain (Gmail's Gemini email-drafting feature, which can't sound like the user because the developer — not the user — owns the system prompt), live interactive demos contrasting system prompts, and the historical horseless-carriage analogy (early automobiles copying carriage design in 1803) as the essay's central structural device.
- **Named idea / did it stick:** "Horseless carriages" as applied to AI UX — strong uptake; spawned direct responses (Ned Batchelder's "Horseless intelligence," nedbatchelder.com/blog/202503/horseless_intelligence) and is still being extended in 2026 X threads (e.g. @aristotelis_eco riffing on the metaphor in 2026).
- **Length/structure:** ~3,500 words: problem (Gmail) → concept (system vs. user prompt) → historical analogy → prescriptive close. One analogy carries the whole essay.
- **Lesson:** This is the single closest comp to Turner's own structural move (Brunelleschi/perspective as the carrying analogy for "vanishing point"). Koomen's biggest craft decision was keeping the villain singular and concrete (one feature, one company) rather than gesturing at "AI products" broadly — it's why 478 commenters had something specific to argue with. Turner's breathing/code-as-symptom analogy needs an equally singular, concrete anchor case from his own fleet, not a general claim about "code these days."

## 6. Richard Sutton — "The Bitter Lesson"

- **Venue/date:** incompleteideas.net, March 13, 2019. URL: http://www.incompleteideas.net/IncIdeas/BitterLesson.html
- **Opens/thesis, same sentence:** "The biggest lesson that can be read from 70 years of AI research is that general methods that leverage computation are ultimately the most effective, and by a large margin." Thesis and opening line are identical — zero runway.
- **Receipts:** Chess (hand-coded heuristics lost to Deep Blue's brute-force search), Go (same pattern with AlphaGo/search+learning over human-encoded Go knowledge), speech recognition, and computer vision — four historical case studies, each following the identical beat: researchers encode human knowledge → a general compute-scaling method eventually beats it → the lesson is "bitter" because it devalues the researchers' own expertise.
- **Named idea / did it stick:** "The Bitter Lesson" — extremely strong uptake; treated as scripture at frontier labs (OpenAI reportedly had staff read/memorize it), hundreds of citations, multiple 2024–2026 response essays ("The Bittersweet Lesson," "The Bitter Lesson is Misunderstood," "The Less Bitter Lesson") still arguing with it six-plus years later.
- **Length/structure:** ~1,100 words. Shortest piece in this set by a wide margin. One thesis sentence, four parallel-structured historical examples, one closing reflection on why the lesson is psychologically hard to accept.
- **Lesson:** This is the structural model to steal outright. One declarative thesis sentence doing double duty as the opener, four receipts in strict parallel form (same beat, different domain, each one shorter than the last), then a short closing turn on *why the lesson is hard to accept* rather than a restatement. At ~1,100 words it's below Turner's floor, but the discipline — thesis-as-first-sentence, receipts in parallel, no padding — is exactly the muscle a 1,400–2,200 word essay needs.

## 7. Ethan Mollick — "Speaking Things Into Existence"

- **Venue/date:** oneusefulthing.org, March 11, 2025. URL: https://www.oneusefulthing.org/p/speaking-things-into-existence
- **Opens:** "Influential AI researcher Andrej Karpathy wrote two years ago that 'the hottest new programming language is English,'" — opens by explicitly citing Karpathy rather than trying to out-coin him.
- **Thesis, placement:** Built gradually rather than stated once — by paragraph two Mollick lands on "expertise remains essential, but its nature is redistributed: from implementation toward guidance, evaluation, and troubleshooting."
- **Receipts:** Concrete, timestamped demos — vibecoding a 3D firetruck game via Claude Code in ~4 minutes across four prompts; building an interactive course with the Manus agent; running decade-old crowdfunding research data through ChatGPT/o1-pro.
- **Named idea:** "Vibeworking" (graduated from Karpathy's "vibecoding") — a direct, credited extension rather than a new coinage claiming originality.
- **Length/structure:** ~2,000 words — right in Turner's target band. Five sections: intro → three graduated complexity levels (vibecoding → vibeworking-with-expertise → deep vibeworking) → conclusion.
- **Lesson:** Mollick's move — openly citing the term he's building on, then adding one clearly-labeled increment (vibeworking) rather than pretending the lane is empty — is the template for how Turner should handle the Karpathy occupation problem. Cite him, credit him, then add the one thing he doesn't have: the physical/perceptual symptom framing.

---

## "The great reencode" — attribution search (inconclusive)

Multiple search passes — exact phrase, "great re-encode," pairing with "software," "AI," "programming," and with likely original speakers (swyx, Latent Space, Hacker News threads) — returned **no verifiable source**. Nothing on Hacker News, X, Substack, or in the general press uses this exact phrase in the sense Turner means (code dissolving back into natural-language intent). The closest unrelated hits are a Medium post titled "The Great Coder Reset" (different phrase, different author, unverified relevance) and various literal video/audio re-encoding tools.

**Recommendation: do not cite "the great reencode" as an existing attributed term.** Either (a) drop the reference entirely, (b) ask Turner directly where he encountered it (a Discord, a podcast, a private conversation — none of which would surface in web search), or (c) treat it as original to Turner and coin it explicitly as his own in the essay rather than citing it as borrowed. Publishing an unverified attribution in a piece aimed at a practitioner audience that fact-checks sourcing (HN) is a real reputational risk — if someone asks "where's that from?" and the answer is "nowhere we can find," it undercuts the "bottom-up receipts, not thinkpieces" positioning this whole platform is built on.

---

## Closing synthesis

**Five craft moves shared across the landing pieces (Karpathy, Koomen, Sutton, Yegge, Mollick):**

1. **The thesis lands in the first one-to-three sentences, not after a wind-up.** Sutton's thesis *is* his opening sentence. Karpathy's Software 2.0 reframe lands within the first few lines. Koomen's thesis follows a one-sentence personal hook, not a preamble.
2. **One concrete, singular anchor carries the whole argument.** Koomen has Gmail's Gemini feature. Sutton has chess/Go/speech/vision as four parallel cases, not a general claim. Nobody argues in the abstract for more than a sentence before grounding in a specific, nameable thing.
3. **A short, portable phrase does the remembering for the reader.** "Software 2.0," "vibe coding," "horseless carriages," "the bitter lesson" — each is short enough to survive a screenshot and specific enough to be re-used unprompted (the actual evidence of "sticking," found in HN threads years later).
4. **Receipts are personal/practitioner-grade, not secondhand.** Koomen's own frustration with Gmail; Mollick's own timed demos; Yegge's own cost figures. None of these essays cite a think tank — they cite their own hands-on experience, which is exactly Turner's stated platform goal (bottom-up receipts over thinkpieces).
5. **Length is a choice, not a ceiling.** The shortest (Bitter Lesson, ~1,100 words) and longest (Yegge, ~4,500 words) both work because structure is tight — parallel receipts, clearly labeled sections. Length didn't determine landing; discipline did.

**Differentiation verdict:** The lane is genuinely occupied, and Karpathy owns the most dangerous overlapping territory — both "English is the new programming language" (2023) and "vibe coding" (2025) are the two phrases closest to Turner's thesis, and both are extremely well-cited, unprompted, years-deep infrastructure in this exact audience's vocabulary. Writing "natural language is where software is heading" without differentiating reads as a late, derivative echo.

Where Turner's piece is NOT yet differentiated: the "vanishing point" framing as a historical-progress analogy (Brunelleschi/perspective) is structurally similar to Koomen's horseless-carriage analogy — same move (one historical analogy carrying the essay), different source image. That's fine — it's a proven structure, not a stolen one — but it means the Brunelleschi analogy has to do real interpretive work, not just decorate the Karpathy-adjacent claim.

Where it IS differentiated, and should be pushed hardest: nobody in this comp set uses the **physicality/symptom framing** — code-on-screen as a sign of friction the way consciously noticing your own breathing is a sign something's off, not a feature. Karpathy, Koomen, Yegge, and Mollick all argue about *where the interface sits* (English vs. code) or *who benefits* (juniors, agent fleets, redistributed expertise). None of them argue that **visible code is itself a diagnostic symptom of an unfinished system** — that's a claim about a different axis (perceptibility, not interface), and it's the thing that would make a practitioner stop and re-read the sentence.

**Receipts Turner should pull from his own fleet to earn the "practitioner, not thinkpiece" claim** (per his stated platform goals):
1. A specific moment from Dev Command Center or a sibling project where he or his agent had to consciously open and read raw code to debug something — i.e., a concrete instance of the "symptom" firing, with what triggered it and what it cost in time/attention.
2. A specific before/after: a task that used to require looking at code and now doesn't (e.g., the tmux-backed terminal work, F-083, or a session-log/tasklist skill that fully abstracts implementation away) — ideally one with a timestamp or commit reference, matching Koomen's and Mollick's pattern of dated, personal, checkable demos rather than general claims.
3. One moment where the abstraction leaked — code became visible again unexpectedly — used as the essay's own "bitter lesson" turn (the thing that makes the thesis feel earned rather than triumphalist).
