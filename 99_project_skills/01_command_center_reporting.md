# /command-center-reporting — how this project reports up

**This skill is the contract between any project and the Dev Command Center**
(`~/CommandCenter/Dev Command Center`). A copy ships with every scaffolded
project; the master lives in the Command Center. If they diverge, the Command
Center's copy wins — grab the latest from
`~/CommandCenter/Dev Command Center/99_project_skills/01_command_center_reporting.md`.

## Where projects live (the home)

`~/CommandCenter/` is the canonical home: every managed project is a sibling
folder there with its own git (main projects top-level; `_scrapbooks/`,
`_archive/`, `_templates/` for infrastructure). **No Desktop symlinks** — the
launcher `Dev Command Center.command` is the only front door. New projects
are stamped in the home by ＋ New Project. When adopting an existing folder:
`mv` it into the home and copy its Claude history dir
(`~/.claude/projects/<path-encoded>`, non-alphanumerics → `-`) to the new key
so `claude --continue` survives the move.

## The beacon: cc-status.json

Keep a `cc-status.json` at the project root:

```json
{
  "name": "Human-readable project name",
  "stage": "idea | active | review-ready | operational | paused | archived",
  "note": "one line on where things stand, for the project card",
  "url": "http://localhost:PORT or null",
  "launch": "how to start the app, or null",
  "app": "absolute path to a standalone .app bundle or executable, or omit",
  "updated": "2026-07-05T09:00:00Z"
}
```

`url` is what the Command Center loads in the project's center pane; `app`
(optional) lights a **Launch app ⇱** button on the project's card that opens
the standalone bundle in its own window. Declare either, both, or neither.

Rules for the Claude session working in this project:

1. **Update the beacon at every session end** (alongside `/session-log` if
   this is a Relay Frame project). Set `stage` honestly:
   - `active` 🟡 — mid-build, more sessions planned; needs the operator's
     attention soon.
   - `review-ready` 🔴 — the operator should open the app and run a
     dev-console review round NOW. Say what to review in `note`.
   - `operational` ✅ — live and running, healthy, no action needed.
   - `paused` 🟠 — parked deliberately; `note` says why and what resumes it.
   - `idea` ⚪ — a seed, not started.
   - `archived` 🏁 — done, reference only.

   The dashboard adds live badges on top of the stage automatically:
   ⏳ **baking** (a Claude session is actively working in the folder) and
   🖐 **your turn** (a session is open but idle, waiting on the operator).
   Projects never set those — they're detected. The full emoji language is
   config at `Dev Command Center/10_app/data/stages.json`.
2. **`note` is for the operator's dashboard card.** One line, present tense,
   no jargon: "Round 2 open — 9 features to review", "blocked on Alpaca keys".
3. Never invent `url`/`launch` — only list them if they work right now.

## The dev console ceremony (house norm — v1.1, canonical)

Apps in this house ship a **Dev panel**: a **bump-out column** on the right
edge (grid-paper, light theme). It is summoned by a **◂ DEV pull tab** in the
bottom-right corner (not a floating button) and it **squeezes the app aside
rather than covering it** — the operator reviews with a full view of the app.
Terminal + app + dev panel may all be up at once. Tabs: **Review / Features /
Manual**. Canonical implementation: `Dev Command Center/10_app/src/devpanel.js`
(supersedes the trading bot redux original — port changes back, don't fork).

**The feature registry.** Features get permanent codes (F-001…). The full
write-up on every card, in this order (the canonical preamble):

1. **Feature definition** — what it is and what it does.
2. **Benefit to the user** — how it benefits the operator and why it's here.
3. **How it's delivered** — how to see it.
4. **How to test it.**

**How features present in the Features menu (the sales framework — binding).**
Each feature row shows the **title** (feature name), and the next line is
structural: `[benefit] — by way of: [how it presents]`. The benefit LEADS and
the "by way of" bridge hands off to the presentation — the operator hears why
the thing exists before how it shows up. Write `benefit` and `how_to_see` so
the composed sentence reads naturally. Canonical example — title: *blinking
terminal light*; subtext: *"The operator can quickly know if the terminal is
running by way of signal in the peripheral vision, as an ambient indication
of activity and solid operation."* This is how features always describe
themselves in the menu; definition/test detail lives in the expanded card,
not the pitch line.

**The review card (binding UI rules):**

- **Notes autosave as drafts while typing.** Closing the panel, switching
  tabs, or navigating loses nothing, ever.
- **Verdict pills sit ABOVE the notes box**, all equal width, shortcut shown
  on the label: `🟢 Approve (a)` · `🟡 Notes (n)` · `🔴 Flag (f)` ·
  `🟣 Visualizer (v)` · `⏭ Skip (s)`. Clicking or hitting the shortcut
  **selects and saves** that verdict (pill highlights) — it does NOT advance.
- **Next (shift+enter)** advances; `s` skips without a verdict; **← / →**
  move through the round. No Back button — the number strip is the map.
- **Number strip**: reviewed items take their verdict's pastel color and fade
  slightly; what's left to review pops. Current item gets the ring.
- **Notes box is big** (≥180px) — room to write without hunting for
  overflow.
- Notes are required for 🟡 / 🔴 / 🟣.

**Rounds, versions, and history:**

- Reviews happen in **rounds** — one open at a time. Closing a round writes a
  flagged-first markdown report to the project's `30_review_rounds/`; that
  report **is the next build cycle's tasklist**. When a round closes, set the
  beacon to `active` (building against the report); when the build lands, set
  it back to `review-ready`.
- **Quick fix loop:** when the operator reviews something and the AI fixes it
  inside the same round, the item is **re-issued** — version bumps
  (v1.0 → v1.1 → …), verdict resets, and the prior review is archived.
- **Every finalized review is appended to the feature's permanent history.**
  Review cards show **"Previous reviews (N)" pre-collapsed below the card**,
  so in round 5 the operator can see at a glance what they've said about this
  feature before. New rounds seed each item's history from the feature record
  — the connections come for free.

## The Dev Workshop files (house norm — hierarchy contract, v1.2)

The Command Center opens every project in its own window with the Dev Workshop
panel on the right. **What that panel shows is scoped to the project**: it
reads three files from the project's frame root (the folder the terminal opens
— `framePath` in the registry when it differs from the project root):

```
_dev_workshop/dev_features.json    the feature registry (this project's F-codes)
_dev_workshop/dev_rounds.json      review rounds — Command Center app OWNS this file
_dev_workshop/DEV_MANUAL.md        the operator's manual (Manual tab)
30_review_rounds/                  closed-round reports (flagged-first handoffs)
```

Only the top of the hierarchy is special: the Dev Command Center's own window
reads its own registry (`10_app/data/` + `10_app/docs/DEV_MANUAL.md`). Every
other project supplies its own workshop via the files above.

**Schemas.** `dev_features.json` is a JSON array; each feature object:
`code` (permanent — F-001, F-002, …, never reused or renumbered), `area`
(short lowercase grouping tag), `status` (`"unchecked"` until reviewed),
`name`, `definition`, `benefit`, `how_to_see`, `how_to_test`,
`status_notes` (`""`), `history` (`[]`). `DEV_MANUAL.md` conventions: H2/H3
headings phrased as questions, `{area:x}` tags render as area chips, bare
`F-0NN` codes auto-link into the registry. `dev_rounds.json` starts as `[]`
and is never hand-edited — the Command Center app writes rounds, verdicts,
versions, and history to it.

**Initialization is deliberate.** A project with no
`_dev_workshop/dev_features.json` is *uninitialized*: its Dev panel explains
that and offers the full install prompt for the operator to hand to that
project's Claude (send-to-terminal or copy). Don't scaffold the workshop
unprompted — the operator installs it if/when a project is worth reviewing
feature-by-feature.

**The project Claude's day-to-day contract** (bake this into the project's
CLAUDE.md when the workshop is installed):

1. Every feature you build or change gets its `dev_features.json` entry added
   or updated, plus a manual section.
2. When a build lands that the operator should review, set `cc-status.json`
   stage to `review-ready` with a note saying what to review.
3. Whenever a new report appears in `30_review_rounds/`, it is your next
   tasklist — flagged items first.
4. Never edit `dev_rounds.json`.

## The universal canvas (house norm)

Project UIs assume the operator arrives via a Command Center window:
persistent Claude terminal on the left (`claude --continue` in this folder —
so keep one thread per project, compact rather than abandon), the app on the
right, scratchpad (`_scratchpad.md`, `## headers` = sections) always
available. Don't fight this layout; design app UIs to live in the right pane.

## The quick-drop inbox (house norm)

The Command Center can drop notes/tasks into any project's `_cc_inbox.md`.
**Contract for the Claude session in this project:** if `_cc_inbox.md`
exists at pickup, process every item — tasks go onto the master tasklist
(with provenance "dropped from Command Center YYYY-MM-DD"), quick notes get
acted on or acknowledged — then delete the file. Never ignore it.

## The session ceremony (house norm)

Sessions end with the frame's session-log protocol (entry → fact-check →
commit → receipt). In Command Center windows the 💾 button automates the
trigger and then starts a **fresh thread** — don't fight it by resurrecting
old context; the log entry + discovery chain are the handoff.

## Adoption norms (the big move, 2026-07-05)

- Everything lives in `~/CommandCenter`: main projects top-level,
  `_scrapbooks/`, `_archive/`, `_templates/` for infrastructure. No Desktop
  symlinks — the launcher is the only front door.
- **Red Finder tag = a frame lives here.** The registry's `framePath` marks
  the canonical frame folder (what the terminal opens) when it differs from
  the project root (e.g. Book Writing Visualizer → `bwv/`).
- Moving a folder = also copy its `~/.claude/projects/<path-encoded>`
  history dir to the new key, or `claude --continue` forgets the thread.
