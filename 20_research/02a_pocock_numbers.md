# Matt Pocock — Audience Numbers Over Time

Scope: dated audience-size data points only (no engagement/content analysis). Research method: Wayback Machine (web.archive.org) CDX API + direct snapshot fetch of archived YouTube channel pages (these are server-rendered JSON-in-HTML and reliably expose subscriber counts); web search for self-reported and press-reported figures where archival scraping failed. Confidence grades: **A** = archival/primary (verifiable byte-for-byte from an archived page), **B** = third-party tracker (live, current only), **C** = self-reported or press-reported with some date anchor, **D** = secondhand / weakly dated / inconsistent across sources.

## Narrative: growth phases

**Phase 1 — XState/early-TypeScript-tips era (pre-2022, undated).** Before Total TypeScript existed, Pocock's X/Twitter following was small (self-reported "4,000 followers"). A batch of 13–15 two-minute TypeScript tips queued up and posted in one day reportedly took him from 4,000 to 10,000 followers — a single viral mechanism, not organic drip growth. No reliable date could be attached to this anecdote; it predates the archival record we could recover (earliest Wayback snapshot of his X/Twitter profile is May 2022, and by then the profile is already a pure client-rendered SPA with no follower count in the static HTML, so it can't corroborate the figure).

**Phase 2 — Total TypeScript launch, Nov 2022–2023.** This is the best-evidenced phase. His email list went from roughly 3,500 subscribers to roughly 18,000 by the December 2022 pre-release launch (badass.dev case study), which generated $415K from ~1,281 learners. YouTube in parallel is the strongest archival signal: the channel went from 11.9K subscribers (Nov 24, 2022) to 76.8K (Sep 14, 2023) — essentially 6.5x in under a year, the steepest sustained YouTube growth phase in the whole record, driven by the Total TypeScript content push.

**Phase 3 — Steady-state TypeScript educator, 2024–early 2026.** YouTube growth decelerates sharply into a long linear-ish climb: 88.8K (Jan 2024) → 145K (Jan 2026), i.e., roughly +56K subscribers over 24 months, versus +65K in the single year before it. This reads as the expected plateau of a mature, single-topic (TypeScript) educational channel.

**Phase 4 — The AI pivot inflection, ~March 2026 onward.** This is the sharpest and best-documented discontinuity in the whole dataset. YouTube subscribers: 152K (Feb 11, 2026) → 169K (Mar 29) → 194K (May 2) → 252K (Jun 2) → 292K (Jul 9) → 335K (Aug 6) → 399K (Oct 5, 2026). That's roughly +247K subscribers (+163%) in about 8 months, versus +~133K in the prior 3+ years combined. This lines up with the public record of Pocock launching AI Hero (cohort course, enrollment opened May 17, 2026) and his `mattpocock/skills` GitHub repo going viral on GitHub Trending (one single-day gain of 5,551 stars on Apr 27, 2026, and later references to a "grill-me" skill pushing the repo past 9K then into the tens-of-thousands of stars) — a parallel audience-growth engine outside the platforms this brief was scoped to, but clearly the causal driver of the YouTube inflection. The newsletter also shows a new, separate list (AI Hero's own, distinct from the old Total TypeScript list) starting at "3,000+ Developers" as early as April 2025, nearly a year before the YouTube inflection — i.e., the AI-education audience was being seeded well before the viral moment hit.

**Discontinuities and their likely causes:**
- Nov–Dec 2023: YouTube subscriber count briefly rendered in French ("83,3 mille abonnés") in one snapshot — a crawler/locale artifact, not a real data point; treated as 83.3K for continuity.
- Mar–May 2026: the steepest YouTube slope in the dataset, overlapping the AI Hero cohort launch and the skills-repo viral spike.
- Sep 20, 2026: a one-snapshot dip from 382K to 379K — almost certainly Wayback Machine capturing a stale/cached YouTube count rather than real subscriber loss (video count stayed flat at 299 across all three nearby snapshots).
- Platform-page template changes on YouTube's side (the subscriber count's JSON key/casing changed at least three times across the archive window — `subscriberCountText` accessibility label → lowercase `"content":"XXk subscribers"` → a `metadataParts` array that, from mid-2026 onward, also lists *other* channels (a "Collaborators" modal) with their own subscriber counts. Several raw scrapes initially pulled the wrong channel's number (e.g., a collaborating channel "@aiDotEngineer" at 636K, or stale collaborator-card numbers in the 374–392K range) before the extraction was anchored to the paired "N videos" count that only appears next to Pocock's own header figure. This is flagged because any other researcher re-scraping this page naively will hit the same trap.

**What could NOT be verified:**
- X/Twitter historical follower counts. Twitter/X profile pages have been pure client-rendered SPAs for the entire archival window available (earliest capture May 2022); no follower count is ever present in the static HTML, and Nitter mirrors / Social Blade / Trackalytics are either not archived for this handle or blocked live (403/Cloudflare). The only X numbers in this report are self-reported or search-engine-cache snapshots, all low confidence.
- Total TypeScript Discord member count — could not distinguish Pocock's own community server from the unrelated, much larger "official TypeScript Community" Discord server (49,745 members) that surfaces in searches for the same query.
- A clean "LinkedIn followers over time" series — only a single current-day figure (~73K) and a vague, undated "25K–37K at various past points" claim from search synthesis, not independently dated.
- Whether Bluesky has any real Pocock presence — the only hit is an unofficial third-party mirror/bot account with 32 followers, which is NOT Pocock's own account and is excluded from the CSV.

---

## YouTube — subscriber count (channel: youtube.com/@mattpocockuk)

All points below are Grade A: extracted directly from archived, server-rendered page JSON via the Wayback Machine (`web.archive.org/web/<timestamp>/https://www.youtube.com/@mattpocockuk`), cross-checked against the paired video count where the page template allowed it.

| Date | Subscribers | Source (Wayback snapshot) |
|---|---|---|
| 2022-11-24 | 11,900 | web.archive.org/web/20221124110018/https://www.youtube.com/@mattpocockuk |
| 2022-11-27 | 12,400 | web.archive.org/web/20221127000822/https://www.youtube.com/@mattpocockuk |
| 2023-02-04 | 34,400 | web.archive.org/web/20230204104152/https://www.youtube.com/@mattpocockuk |
| 2023-02-25 | 38,200 | web.archive.org/web/20230225161028/https://www.youtube.com/@mattpocockuk |
| 2023-03-29 | 44,100 | web.archive.org/web/20230329132047/https://www.youtube.com/@mattpocockuk |
| 2023-04-23 | 51,000 | web.archive.org/web/20230423002922/https://www.youtube.com/@mattpocockuk |
| 2023-06-30 | 56,700 | web.archive.org/web/20230630161622/https://www.youtube.com/@mattpocockuk |
| 2023-07-19 | 66,100 | web.archive.org/web/20230719103812/https://www.youtube.com/@mattpocockuk |
| 2023-08-08 | 70,200 | web.archive.org/web/20230808155509/https://www.youtube.com/@mattpocockuk |
| 2023-09-14 | 76,800 | web.archive.org/web/20230914084022/https://www.youtube.com/@mattpocockuk |
| 2023-12-05 | 83,300 | web.archive.org/web/20231205041246/https://www.youtube.com/@mattpocockuk (locale rendered as French "83,3 mille abonnés") |
| 2023-12-17 | 84,200 | web.archive.org/web/20231217092437/https://www.youtube.com/@mattpocockuk |
| 2024-01-23 | 88,800 | web.archive.org/web/20240123200021/https://www.youtube.com/@mattpocockuk |
| 2024-03-15 | 95,800 | web.archive.org/web/20240315104109/https://www.youtube.com/@mattpocockuk |
| 2024-05-01 | 98,000 | web.archive.org/web/20240501060906/https://www.youtube.com/@mattpocockuk |
| 2024-05-26 | 99,000 | web.archive.org/web/20240526162915/https://www.youtube.com/@mattpocockuk |
| 2024-07-09 | 102,000 | web.archive.org/web/20240709063916/https://www.youtube.com/@mattpocockuk |
| 2024-08-22 | 104,000 | web.archive.org/web/20240822121035/https://www.youtube.com/@mattpocockuk |
| 2024-09-18 | 105,000 | web.archive.org/web/20240918070701/https://www.youtube.com/@mattpocockuk |
| 2024-11-19 | 107,000 | web.archive.org/web/20241119135931/https://www.youtube.com/@mattpocockuk |
| 2024-12-27 | 109,000 | web.archive.org/web/20241227132557/https://www.youtube.com/@mattpocockuk |
| 2025-02-12 | 111,000 | web.archive.org/web/20250212203433/https://www.youtube.com/@mattpocockuk |
| 2025-05-16 | 118,000 | web.archive.org/web/20250516172955/https://www.youtube.com/@mattpocockuk |
| 2025-06-13 | 124,000 | web.archive.org/web/20250613184507/https://www.youtube.com/@mattpocockuk (anchored to "216 videos") |
| 2025-08-27 | 129,000 | web.archive.org/web/20250827002915/https://www.youtube.com/@mattpocockuk (anchored to "232 videos") |
| 2025-10-28 | 137,000 | web.archive.org/web/20251028020127/https://www.youtube.com/@mattpocockuk (anchored to "249 videos") |
| 2025-12-18 | 144,000 | web.archive.org/web/20251218035426/https://www.youtube.com/@mattpocockuk (anchored to "249 videos") |
| 2026-01-02 | 145,000 | web.archive.org/web/20260102132223/https://www.youtube.com/@mattpocockuk (anchored to "249 videos") |
| 2026-02-11 | 152,000 | web.archive.org/web/20260211173748/https://www.youtube.com/@mattpocockuk (anchored to "253 videos") |
| 2026-03-29 | 169,000 | web.archive.org/web/20260329000120/https://www.youtube.com/@mattpocockuk (anchored to "263 videos") |
| 2026-04-17 | 174,000 | web.archive.org/web/20260417170942/https://www.youtube.com/@mattpocockuk (anchored to "264 videos") |
| 2026-05-02 | 194,000 | web.archive.org/web/20260502073536/https://www.youtube.com/@mattpocockuk (anchored to "266 videos") |
| 2026-06-02 | 252,000 | web.archive.org/web/20260602091520/https://www.youtube.com/@mattpocockuk (anchored to "273 videos") |
| 2026-07-09 | 292,000 | web.archive.org/web/20260709064600/https://www.youtube.com/@mattpocockuk (anchored to "275 videos") |
| 2026-08-06 | 335,000 | web.archive.org/web/20260806194634/https://www.youtube.com/@mattpocockuk (anchored to "298 videos") |
| 2026-09-14 | 381,000 | web.archive.org/web/20260914024713/https://www.youtube.com/@mattpocockuk (anchored to "299 videos") |
| 2026-09-16 | 382,000 | web.archive.org/web/20260916114942/https://www.youtube.com/@mattpocockuk (anchored to "299 videos") |
| 2026-09-20 | 379,000 | web.archive.org/web/20260920152427/https://www.youtube.com/@mattpocockuk (anchored to "299 videos" — likely a stale-cache dip, not real) |
| 2026-09-24 | 390,000 | web.archive.org/web/20260924163914/https://www.youtube.com/@mattpocockuk (anchored to "299 videos") |
| 2026-09-27 | 392,000 | web.archive.org/web/20260927185250/https://www.youtube.com/@mattpocockuk (anchored to "299 videos") |
| 2026-10-05 | 399,000 | web.archive.org/web/20261005133612/https://www.youtube.com/@mattpocockuk (anchored to "301 videos") |

View patterns: per-video view counts were visible in the same archived pages but are content-performance data, not audience-size data, so excluded per scope — flag this if a future pass wants them, the raw snapshots above all contain them.

## Newsletter(s) — Total TypeScript list + AI Hero list

These are two distinct lists (old TypeScript-only list vs. the newer AI Hero list), not a continuous series. Treat them as separate rows.

| Date | List | Subscribers | Grade | Source |
|---|---|---|---|---|
| ~early 2022 (undated) | Total TypeScript / personal list | ~3,500 | C | badass.dev case study, "Launch of a Developer Education Product" — https://badass.dev/launch-of-a-developer-education-product (describes this as his list size "already" before the TT pre-release push; no exact date given) |
| 2022-12 (pre-release launch) | Total TypeScript / personal list | ~18,000 | C | same badass.dev article |
| 2025-04-01 | AI Hero | 3,000+ ("Join 3,000+ Developers Becoming AI Engineers") | A | web.archive.org/web/20250401042749/https://www.aihero.dev/ |
| 2025-05-16 | AI Hero | 3,000+ (headline unchanged) | A | web.archive.org/web/20250516171023/https://www.aihero.dev/ |
| ~2026-10 (current, undated) | Combined / AI Hero (unclear which) | ~60,000 | D | web search synthesis, no single primary source with a date; could not independently confirm via archive — AI Hero homepage snapshots from mid-2025 onward no longer carry a static subscriber-count headline |

## X / Twitter — followers

Could not be archivally verified at all — see "What could NOT be verified" above. All rows below are low-confidence.

| Date | Followers | Grade | Source |
|---|---|---|---|
| undated, pre-viral (likely 2021–2022) | ~4,000 | D | secondhand account of his "two-minute TypeScript tips" story, surfaced via web search; no primary tweet or date located |
| undated, post-viral (same event) | ~10,000 | D | same source/event |
| ~2026-10 (today, approximate) | ~287,400 | D | search-engine cache snippet of x.com/mattpocockuk; appeared twice independently, but other search passes in the same session returned 268,900 / 330,567 / 228,500 for the same handle with no dates attached — flagged as internally inconsistent, almost certainly different crawl-cache ages, none independently dateable |

## Other platforms (current snapshot only — not time series)

| Platform | Date | Value | Grade | Source |
|---|---|---|---|---|
| LinkedIn (mapocock) | ~2026-10 | ~73,000 followers | D | web search synthesis; same search also surfaced an unanchored "~25K–37K at various past points" claim that could not be independently dated — excluded from CSV |
| TikTok (@mattpocockuk) | ~2026-10 | ~13,700 followers | D | web search synthesis of tiktok.com/@mattpocockuk |
| Bluesky | — | NO official account found | — | only hit is an unofficial mirror/bot, @mattpocockuk-bot.eurosky.social, 32 followers — explicitly NOT Pocock's account, excluded from CSV |
| Discord (Total TypeScript) | — | COULD NOT VERIFY | — | searches only surface the unrelated official "TypeScript Community" Discord (49,745 members), not a Pocock-run server |

---

## Combined CSV (for charting)

Only dated, platform-attributable points are included (the two "undated" X points are included with approximate placeholder dates flagged in a comment row; LinkedIn/TikTok current-snapshot rows use today's date as an approximation and should be treated as single points, not series starts).

```csv
date,platform,metric,value,grade,source
2022-11-24,YouTube,subscribers,11900,A,web.archive.org/web/20221124110018/https://www.youtube.com/@mattpocockuk
2022-11-27,YouTube,subscribers,12400,A,web.archive.org/web/20221127000822/https://www.youtube.com/@mattpocockuk
2023-02-04,YouTube,subscribers,34400,A,web.archive.org/web/20230204104152/https://www.youtube.com/@mattpocockuk
2023-02-25,YouTube,subscribers,38200,A,web.archive.org/web/20230225161028/https://www.youtube.com/@mattpocockuk
2023-03-29,YouTube,subscribers,44100,A,web.archive.org/web/20230329132047/https://www.youtube.com/@mattpocockuk
2023-04-23,YouTube,subscribers,51000,A,web.archive.org/web/20230423002922/https://www.youtube.com/@mattpocockuk
2023-06-30,YouTube,subscribers,56700,A,web.archive.org/web/20230630161622/https://www.youtube.com/@mattpocockuk
2023-07-19,YouTube,subscribers,66100,A,web.archive.org/web/20230719103812/https://www.youtube.com/@mattpocockuk
2023-08-08,YouTube,subscribers,70200,A,web.archive.org/web/20230808155509/https://www.youtube.com/@mattpocockuk
2023-09-14,YouTube,subscribers,76800,A,web.archive.org/web/20230914084022/https://www.youtube.com/@mattpocockuk
2023-12-05,YouTube,subscribers,83300,A,web.archive.org/web/20231205041246/https://www.youtube.com/@mattpocockuk
2023-12-17,YouTube,subscribers,84200,A,web.archive.org/web/20231217092437/https://www.youtube.com/@mattpocockuk
2024-01-23,YouTube,subscribers,88800,A,web.archive.org/web/20240123200021/https://www.youtube.com/@mattpocockuk
2024-03-15,YouTube,subscribers,95800,A,web.archive.org/web/20240315104109/https://www.youtube.com/@mattpocockuk
2024-05-01,YouTube,subscribers,98000,A,web.archive.org/web/20240501060906/https://www.youtube.com/@mattpocockuk
2024-05-26,YouTube,subscribers,99000,A,web.archive.org/web/20240526162915/https://www.youtube.com/@mattpocockuk
2024-07-09,YouTube,subscribers,102000,A,web.archive.org/web/20240709063916/https://www.youtube.com/@mattpocockuk
2024-08-22,YouTube,subscribers,104000,A,web.archive.org/web/20240822121035/https://www.youtube.com/@mattpocockuk
2024-09-18,YouTube,subscribers,105000,A,web.archive.org/web/20240918070701/https://www.youtube.com/@mattpocockuk
2024-11-19,YouTube,subscribers,107000,A,web.archive.org/web/20241119135931/https://www.youtube.com/@mattpocockuk
2024-12-27,YouTube,subscribers,109000,A,web.archive.org/web/20241227132557/https://www.youtube.com/@mattpocockuk
2025-02-12,YouTube,subscribers,111000,A,web.archive.org/web/20250212203433/https://www.youtube.com/@mattpocockuk
2025-05-16,YouTube,subscribers,118000,A,web.archive.org/web/20250516172955/https://www.youtube.com/@mattpocockuk
2025-06-13,YouTube,subscribers,124000,A,web.archive.org/web/20250613184507/https://www.youtube.com/@mattpocockuk
2025-08-27,YouTube,subscribers,129000,A,web.archive.org/web/20250827002915/https://www.youtube.com/@mattpocockuk
2025-10-28,YouTube,subscribers,137000,A,web.archive.org/web/20251028020127/https://www.youtube.com/@mattpocockuk
2025-12-18,YouTube,subscribers,144000,A,web.archive.org/web/20251218035426/https://www.youtube.com/@mattpocockuk
2026-01-02,YouTube,subscribers,145000,A,web.archive.org/web/20260102132223/https://www.youtube.com/@mattpocockuk
2026-02-11,YouTube,subscribers,152000,A,web.archive.org/web/20260211173748/https://www.youtube.com/@mattpocockuk
2026-03-29,YouTube,subscribers,169000,A,web.archive.org/web/20260329000120/https://www.youtube.com/@mattpocockuk
2026-04-17,YouTube,subscribers,174000,A,web.archive.org/web/20260417170942/https://www.youtube.com/@mattpocockuk
2026-05-02,YouTube,subscribers,194000,A,web.archive.org/web/20260502073536/https://www.youtube.com/@mattpocockuk
2026-06-02,YouTube,subscribers,252000,A,web.archive.org/web/20260602091520/https://www.youtube.com/@mattpocockuk
2026-07-09,YouTube,subscribers,292000,A,web.archive.org/web/20260709064600/https://www.youtube.com/@mattpocockuk
2026-08-06,YouTube,subscribers,335000,A,web.archive.org/web/20260806194634/https://www.youtube.com/@mattpocockuk
2026-09-14,YouTube,subscribers,381000,A,web.archive.org/web/20260914024713/https://www.youtube.com/@mattpocockuk
2026-09-16,YouTube,subscribers,382000,A,web.archive.org/web/20260916114942/https://www.youtube.com/@mattpocockuk
2026-09-20,YouTube,subscribers,379000,A,web.archive.org/web/20260920152427/https://www.youtube.com/@mattpocockuk
2026-09-24,YouTube,subscribers,390000,A,web.archive.org/web/20260924163914/https://www.youtube.com/@mattpocockuk
2026-09-27,YouTube,subscribers,392000,A,web.archive.org/web/20260927185250/https://www.youtube.com/@mattpocockuk
2026-10-05,YouTube,subscribers,399000,A,web.archive.org/web/20261005133612/https://www.youtube.com/@mattpocockuk
2022-01-01,Newsletter-TotalTypeScript,subscribers,3500,C,https://badass.dev/launch-of-a-developer-education-product (undated approx; placeholder date)
2022-12-01,Newsletter-TotalTypeScript,subscribers,18000,C,https://badass.dev/launch-of-a-developer-education-product
2025-04-01,Newsletter-AIHero,subscribers,3000,A,web.archive.org/web/20250401042749/https://www.aihero.dev/
2025-05-16,Newsletter-AIHero,subscribers,3000,A,web.archive.org/web/20250516171023/https://www.aihero.dev/
2026-10-10,Newsletter-combined,subscribers,60000,D,web search synthesis - no primary source located
2021-06-01,X/Twitter,followers,4000,D,web search synthesis - undated anecdote; placeholder date
2021-07-01,X/Twitter,followers,10000,D,web search synthesis - undated anecdote; placeholder date
2026-10-10,X/Twitter,followers,287400,D,search-engine cache snippet; inconsistent across passes (268900/330567/228500 also seen, undated)
2026-10-10,LinkedIn,followers,73000,D,web search synthesis - current snapshot only
2026-10-10,TikTok,followers,13700,D,web search synthesis - current snapshot only
```
