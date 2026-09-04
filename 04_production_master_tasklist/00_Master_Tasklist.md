# Master Tasklist — In Practice with Jeremy & Turner (podcast)

*Started: 2026-08-29 · Last refactored: 2026-09-04*

**Active clusters:** Launch & distribution · Episode 2
**Handoff sequence:** _(none)_
**Archived:** _(none yet — sweeps land in `_swept/`)_

---

## Status key

| Status | Meaning |
|--------|---------|
| 🟡 | **In progress** — work is actively underway. |
| 🔴 | **Not started** — queued, no work done yet. |
| 🟠 | **Waiting on** — blocked on a person, decision, dependency, or external answer. Detail block names what (e.g., *waiting on Priya's review · waiting on legal sign-off · waiting on Snyk fix release*). |
| ✅ | **Complete** (transient) — done; swept to `_swept/` on next `/refactor-tasklist`. |
| ⚪ | **Parked** (optional) — deliberately set aside; not blocked, just deferred. |

> Same emoji appears in the summary table AND in the detail-block heading for the same task. Always. Reorder priority during `/refactor-tasklist`: 🟡 → 🔴 → 🟠 → ⚪ → ✅.

---

## Above the fold — Active tasks

| # | Status | Task |
|---|--------|------|
| 1 | 🟠 | **Spotify listing goes live** — synced via Substack; waiting on Spotify catalog indexing |
| 2 | 🟠 | **Apple Podcasts submission** — waiting on Apple's Podcasts Connect account-setup bug to clear |
| 3 | 🟠 | **Jeremy's billing confirmation** — published with "Jeremy Hodge and Turner Tomlinson"; waiting on his word |
| 4 | 🟡 | **Launch publicity** — tweet in X drafts; Substack bio/colors/links per Round 9 |
| 5 | 🔴 | **Episode 2 prep** — Main Thread pick + call sheet when date is known |
| 6 | ⚪ | **After-launch queue** — About page, welcome email, art polish, socials, custom domain |
| 7 | ✅ | **Episode 1 shipped end-to-end** — edit, art, Substack, published 2026-09-04 |

---

## Below the fold — Detail blocks

## Task 1 — Spotify listing goes live 🟠

**Waiting on:** Spotify catalog indexing (Spotify-side lag, typically minutes–hours, occasionally a day).

- Substack's built-in sync succeeded and returned the show link: `https://open.spotify.com/show/2P77kAG0gPvfKSfc9JG331` — currently 404 (verified server-side 2026-09-04).
- **Do NOT resubmit the RSS manually at Spotify for Podcasters** — creates a duplicate show (Substack's own docs warn this).
- Action: just re-check the link periodically. When it resolves, task complete.

---

## Task 2 — Apple Podcasts submission 🟠

**Waiting on:** Apple's Podcasts Connect first-time account setup, which errored ("an error occurred" on saving the account name, before the RSS step). Known Apple-side flakiness, widely reported.

- Retry playbook: different browser (Chrome↔Safari) · plain provider name with no punctuation (e.g. `Turner Tomlinson`) · check Apple ID has a payment method on file.
- Once the account saves: copy RSS feed URL from Substack → podcast settings, then podcastsconnect.apple.com → "Add a show with an RSS feed" → paste → submit. Review takes a few days; propagation is automatic afterward.
- Zero-cost to defer — the feed doesn't expire. Escalation if stuck: Apple's podcast support form (itunespartner.apple.com).

---

## Task 3 — Jeremy's billing confirmation 🟠

**Waiting on:** Jeremy's reply.

- Episode published 2026-09-04 with byline "Jeremy Hodge and Turner Tomlinson" (operator's call, made at the airport — moving forward superseded the wait-for-go plan).
- Open items for him: billing/name preference, optional photo, general reaction to the live episode.
- If he wants changes, the byline and podcast settings are editable post-publish without breaking the feed.

---

## Task 4 — Launch publicity 🟡

**In progress.**

- Tweet (meta angle: "cut, scored, and shipped by the same AI agent fleet") copied to X drafts 2026-09-03. Post with the live link `readlossy.substack.com/p/one-project-one-screen`, then pin it.
- Adopted per Round 9 annotations (2026-09-03): Twitter bio verbatim · accent color #D9220C (calmer LED red) · book = name in bio now, Amazon link waits for the personal website.
- Remaining: confirm bio/links/accent are actually applied on both profiles; post the tweet; pin it.

---

## Task 5 — Episode 2 prep 🔴

**Not started.** Date TBD (Jeremy traveling until ~Sept 12; operator on vacation now; cadence "every two weeks" with a wobble).

- Main Thread candidates banked in Round 8 (`10_app/round8_review.html`): Permanent Draft · Normal Accidents · Client visibility as product · How this podcast got made.
- Cold-open candidate: "Did the steals work?" — Jeremy's big red button, Turner's insights command + Go.
- When a date is known: spin the Ep 2 call sheet (news window auto-scoped, callbacks pre-loaded).

---

## Task 6 — After-launch queue ⚪

**Parked** — deliberately deferred to post-trip. Nothing decays.

- About page + one-liner for readlossy
- Welcome email for new subscribers
- Cover art polish (optional designer pass)
- Socials beyond X (LinkedIn cross-post plan — LinkedIn already attached to bio per Round 9)
- Custom domain question
- Personal website revival (becomes the hub; The Shooter Act Amazon link lands there)

---

## Task 7 — Episode 1 shipped end-to-end ✅

**Complete 2026-09-04.** Full trail in `_session_log.md` Session 1 and the pane's Ep 01 card. Riverside edit rev 26, final export exactly 100:00, published at `readlossy.substack.com/p/one-project-one-screen`. Swept on next `/refactor-tasklist`.
