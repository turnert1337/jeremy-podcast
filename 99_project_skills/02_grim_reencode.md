# Skill — `/grim` (GRIM — The Great Re-encode Into Markdown)

**File:** `99_project_skills/02_grim_reencode.md`
**Invoked by:** the operator pasting a `GRIM — THE GREAT RE-ENCODE INTO MARKDOWN` export from a post's drafting view (the ⚙ button), or saying "run GRIM on <post>."
**Purpose:** port the operator's FINAL block-written draft into one clean, Substack-ready markdown file. GRIM is a re-encoder, not an editor.

> Name provenance: "the great re-encode" is the operator's own coinage (no public source exists — verified in `20_research/04_vanishing_point_comps.md`). If it ever appears in published writing, it is coined as his, never cited as borrowed.

---

## Preconditions

- The post's feedback round(s) are done and the operator has declared the draft **final**. GRIM on a non-final draft is fine for preview, but say so in the output filename (`_preview`).
- Input is the block export JSON: `{post, title, stage, target, words, blocks:[{label, words, text}]}`.

## The re-encode, exactly

1. **Verbatim prose.** The operator's words are not changed, "improved," tightened, or re-punctuated. Formatting only. If a sentence looks broken, flag it in the report — do not fix it silently. (One mechanical exception, standing: strip double spaces and normalize smart quotes.)
2. **Structure mapping:**
   - `Title` block → the markdown H1 (and the Substack title field, noted at top of file in an HTML comment).
   - `Intro paragraph` → body text directly under the title, no heading.
   - Every further block → its text; the block's label becomes an `##` heading ONLY if the label reads as a real section head (if the label is a working note like "bridge" or "receipt 2", omit the heading and flag the choice in the report).
3. **Pull-quotes:** if the operator marked lines (or the plan's pull-quotes appear verbatim in his text), wrap them as markdown blockquotes where they stand. Never promote unmarked text.
4. **Footer kit** (from `machine_data.js`): excerpt chapter deep link placed after the scene-opening section per the audience brief; full-episode link + subscribe close in the footer. Omit any link that isn't live yet and list it in the report as pending.
5. **Output:** `10_app/drafts/final/<postId>_<slug>.md`. Never overwrite a previous final — suffix `_v2`, `_v3`.
6. **Report back** (chat, short): file path, word count vs. target band, headings chosen/omitted, anything flagged, links pending. Then the Substack paste is the operator's move — GRIM never publishes.

## What GRIM is not

Not a copy-editor, not a fact-checker, not a feedback round (that's `01_substack_drafting_flow.md`), and not a publisher. If the input draft violates the audience checklist, GRIM still re-encodes faithfully and notes the concern in the report — the operator decides.
