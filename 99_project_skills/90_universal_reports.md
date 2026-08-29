# /report — Universal Reports (Command Center standard)

**Trigger language.** Run this skill when the operator says `/report <topic>`, "bake a report on <topic>", or otherwise asks for a report in chat. The deliverable is always a single annotatable HTML file conforming to the standard below.

This document is fully self-contained. An agent in any Command Center project frame can follow it with zero other context.

---

## THE STANDARD

### 1. Storage

- Reports live at **`10_app/reports/`** inside the project frame. Create the folder if it does not exist.
- Filename: **`YYYY-MM-DD_<slug>.html`** — bake date first, then a short lowercase hyphenated slug. Examples: `2026-07-20_kimi-k3-field-manual.html`, `2026-08-01_auth-refactor-options.html`. The date prefix is load-bearing: the Command Center app sorts the folder lexically and shows the newest report first.
- **Sidecar annotations** land beside the file as the report's **`.annotations.json`** sidecar — the app derives the name by replacing the report's `.html` extension with `.annotations.json` (e.g. `2026-07-20_kimi-k3-field-manual.annotations.json`). The sidecar is **written by the Dev Command Center app** when the operator locks a margin note in the report view. **Never hand-edit a sidecar. READ them** (see duty 6). Sidecars are `.json`, so they never appear in the report picker.

### 2. Style

- **One single self-contained HTML file.** All CSS and JS inline. No second file, ever.
- **House cream style:** background `#FBF7EF`, ink `#232A33`, serif display headers (Georgia / Iowan Old Style / serif stack for `h1`/`h2`), system sans for body if desired, generous margins, restrained accent colors.
- **NO external resources whatsoever.** No CDN links, no webfonts, no `fetch`/XHR, no external images, no `<script src>`, no `<link href>`. The report must render perfectly over `file://` with no network. This is a hard rule — a report that phones out is broken.

### 3. Annotatable rail

Every major section of the report is a `section.row` element carrying `data-sec` (a stable short id) and `data-title` (a human label), with the body content in a `.body` div and an **empty** `<aside class="ann"></aside>` margin rail beside it. A single script at the bottom of the page populates every rail with a textarea + **Lock** button and emits the locked set through the `CC_ANNOTATION::` console bridge, which the Command Center app persists to the sidecar. The exact copy-paste skeleton is in the "Copy-paste skeleton" section below — use it verbatim as your starting point; do not reinvent the bridge.

How the bridge works (so you don't break it):

- Notes draft into `localStorage` under `cc_ann::<filename>` so they survive reloads even outside the app.
- Clicking **Lock in** marks the note locked and `console.log`s a single line: `CC_ANNOTATION::` + JSON `{ report, saved_at, annotations: [{ section, title, text, locked_at }] }`. Each emit carries the **full** locked set (idempotent overwrite).
- When the report is viewed inside the Command Center, the app listens for console messages starting with `CC_ANNOTATION::` and writes the payload to the `.annotations.json` sidecar beside the report. Outside the app the report still works — notes just stay in `localStorage`.

### 4. Receipt block

Every report **ENDS** with a receipt — an honest accounting of how it was made. Make it the final `section.row` (so it is annotatable too) with `data-sec="receipt"`. It must state:

- **Motion used** — solo / buddy-build / research-team / persona-fan-out (and composition, e.g. "research-team, 3 parallel researchers").
- **Convergence result** — did independent findings agree? Report disagreements honestly; never smooth them.
- **Sources consulted** — count + list (files read, URLs fetched, commands run).
- **Confidence + caveats** — what is verified vs vendor-claimed vs inferred; what would change the conclusion.
- **Approximate cost** — sub-agents spawned, rough token/dollar band, wall time if known.

Copy-paste receipt template (drop inside the receipt section's `.body`):

```html
<h2>Receipt</h2>
<table>
  <tr><th>Motion</th><td>research-team · 3 parallel researchers + convergence gate</td></tr>
  <tr><th>Convergence</th><td>3/3 agreed on findings A and B; researcher 2 dissented on C (noted inline §2)</td></tr>
  <tr><th>Sources</th><td>14 consulted — 6 files, 8 URLs (listed in §Sources above)</td></tr>
  <tr><th>Confidence</th><td>High on A/B (multiple independent sources); Medium on C (single vendor claim, flagged)</td></tr>
  <tr><th>Caveats</th><td>Benchmark X is vendor-reported; no independent replication as of the bake date</td></tr>
  <tr><th>Approx. cost</th><td>4 sub-agents · ~180k tokens · ~$2 band · ~9 min wall</td></tr>
</table>
```

If the report was made solo, say "solo — no independent validation" plainly. A missing or vague receipt is a defect.

### 5. Discovery

**There is no registration step.** The Dev Command Center app discovers reports by scanning the `10_app/reports/` folder for `.html` files and surfaces them behind the **📊** button on the project card (newest first, with a picker for the rest). Dropping a correctly named file in the folder IS publishing.

A frame that has its own native report mechanic (a report library, a canvas chip, an index page) may **also** surface reports its own way — but the file always lives in the standard location, `10_app/reports/`, so the universal 📊 path keeps working.

### 6. Agent duties — read the margin notes back

At session start, or whenever the operator asks, check `10_app/reports/` for `.annotations.json` sidecars:

- Read each sidecar. **Locked notes are follow-up requests from the operator.** Act on them if actionable, or surface them to the operator ("your note on §2 of the 07-20 report asks X — want me to…").
- Never hand-edit or delete a sidecar. If a note has been fully handled, say so in chat and let the operator clear it from the report view; the app will rewrite the sidecar on the next lock.
- Sidecar shape: `{ "report": "<file>.html", "saved_at": "<ISO>", "annotations": [{ "section", "title", "text", "locked_at" }] }`.

---

## Copy-paste skeleton

A complete minimal annotatable house-style report: two example sections + receipt + the bridge JS. Save as `10_app/reports/YYYY-MM-DD_<slug>.html`, replace placeholder copy, add sections by copying a `section.row` block and giving it a unique `data-sec`. The `<script>` block is the working bridge — keep it verbatim.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>REPORT TITLE · YYYY-MM-DD</title>
<style>
  :root {
    --paper: #FBF7EF; --ink: #232A33; --dim: #6b7280; --line: #e2dccd;
    --accent: #8a6d2f; --ok: #2f7d4f;
    --serif: Georgia, "Iowan Old Style", "Times New Roman", serif;
    --sans: -apple-system, "Helvetica Neue", Arial, sans-serif;
    --mono: ui-monospace, "SF Mono", Menlo, monospace;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--paper); color: var(--ink); font: 15px/1.7 var(--sans); padding: 56px 24px 72px; }
  .wrap { max-width: 1060px; margin: 0 auto; }
  header.hero { margin-bottom: 36px; }
  .rhead { font: 11px var(--mono); color: var(--dim); letter-spacing: .2em; text-transform: uppercase; margin-bottom: 12px; }
  h1 { font-family: var(--serif); font-size: 40px; line-height: 1.15; margin-bottom: 10px; }
  .rsub { color: var(--dim); max-width: 720px; }
  .annnote { font: 12px var(--mono); color: var(--dim); margin: 18px 0 26px; }

  section.row {
    display: grid; grid-template-columns: 1fr 240px;
    background: #fff; border: 1px solid var(--line); border-radius: 12px;
    margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 10px rgba(35,42,51,.05);
  }
  .body { padding: 30px 36px 32px; }
  h2 { font-family: var(--serif); font-size: 24px; margin-bottom: 12px; }
  h2 .secno { color: var(--accent); font-size: 15px; font-family: var(--mono); margin-right: 10px; }
  p, li { margin-bottom: 9px; }
  ul, ol { padding-left: 22px; }
  table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 13.5px; }
  th { font: 11px var(--mono); text-transform: uppercase; letter-spacing: .1em; color: var(--dim);
       text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--line); }
  td { padding: 7px 10px; border-bottom: 1px solid #f0ebdf; }
  code { font-family: var(--mono); font-size: 12.5px; background: #f4efe4; border-radius: 4px; padding: 1px 5px; }

  aside.ann { border-left: 1px dashed var(--line); background: #faf6ec; padding: 26px 18px; }
  aside.ann .lbl { font: 10.5px var(--mono); color: var(--dim); text-transform: uppercase; letter-spacing: .8px; margin-bottom: 8px; }
  aside.ann textarea {
    width: 100%; min-height: 110px; background: #fff; border: 1px solid var(--line); border-radius: 8px;
    color: var(--ink); font: 12px/1.55 var(--sans); padding: 9px 10px; resize: vertical; outline: none;
  }
  aside.ann textarea:focus { border-color: var(--accent); }
  aside.ann .bar { display: flex; align-items: center; gap: 8px; margin-top: 9px; }
  aside.ann button {
    background: #f0e7d2; color: var(--accent); border: 1px solid var(--accent);
    font: 11px var(--mono); padding: 5px 12px; border-radius: 6px; cursor: pointer;
  }
  aside.ann button:disabled { opacity: .35; cursor: default; }
  aside.ann .st { font: 10.5px var(--mono); color: var(--ok); }
  aside.ann .edit { font: 10.5px var(--mono); color: var(--dim); cursor: pointer; text-decoration: underline; }

  footer { margin-top: 30px; text-align: center; font: 11px var(--mono); color: var(--dim); line-height: 2; }
  @media (max-width: 900px) {
    section.row { grid-template-columns: 1fr; }
    aside.ann { border-left: none; border-top: 1px dashed var(--line); }
  }
</style>
</head>
<body>
<div class="wrap">

  <header class="hero">
    <div class="rhead">REPORT · YYYY-MM-DD · PROJECT NAME</div>
    <h1>Report Title Goes Here</h1>
    <p class="rsub">One- or two-sentence summary of what this report answers and the verdict up front.</p>
  </header>

  <div class="annnote">📝 Annotatable — every section takes a margin note. When viewed in the Command Center, locked notes write a sidecar JSON the agent reads next session.</div>

  <section class="row" id="s1" data-sec="s1" data-title="first section">
    <div class="body">
      <h2><span class="secno">§1</span>First section heading</h2>
      <p>Body content. Tables, lists, and code blocks welcome — everything inline, nothing external.</p>
    </div>
    <aside class="ann"></aside>
  </section>

  <section class="row" id="s2" data-sec="s2" data-title="second section">
    <div class="body">
      <h2><span class="secno">§2</span>Second section heading</h2>
      <p>More content. Copy this block for each additional section; keep <code>data-sec</code> unique and stable.</p>
    </div>
    <aside class="ann"></aside>
  </section>

  <section class="row" id="receipt" data-sec="receipt" data-title="receipt">
    <div class="body">
      <h2><span class="secno">§R</span>Receipt</h2>
      <table>
        <tr><th>Motion</th><td>solo / buddy-build / research-team / fan-out (+ composition)</td></tr>
        <tr><th>Convergence</th><td>agreement or honest disagreement across independent findings</td></tr>
        <tr><th>Sources</th><td>N consulted — list files / URLs / commands</td></tr>
        <tr><th>Confidence</th><td>what is verified vs claimed vs inferred</td></tr>
        <tr><th>Caveats</th><td>what would change the conclusion</td></tr>
        <tr><th>Approx. cost</th><td>sub-agents · token/dollar band · wall time</td></tr>
      </table>
    </div>
    <aside class="ann"></aside>
  </section>

  <footer>
    COMMAND CENTER REPORT · YYYY-MM-DD · annotations save to the .annotations.json sidecar when viewed in the Command Center
  </footer>
</div>

<script>
(function () {
  var REPORT = decodeURIComponent((location.pathname.split("/").pop() || "report.html"));
  var KEY = "cc_ann::" + REPORT;
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { state = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function emit() {
    var anns = [];
    Object.keys(state).forEach(function (sec) {
      var v = state[sec];
      if (v && v.locked && v.text && v.text.trim()) {
        anns.push({ section: sec, title: v.title || sec, text: v.text.trim(), locked_at: v.ts });
      }
    });
    console.log("CC_ANNOTATION::" + JSON.stringify({
      report: REPORT, saved_at: new Date().toISOString(), annotations: anns
    }));
  }
  document.querySelectorAll("section.row").forEach(function (row) {
    var sec = row.getAttribute("data-sec");
    var title = row.getAttribute("data-title") || sec;
    var aside = row.querySelector("aside.ann");
    if (!sec || !aside) return;
    var lbl = document.createElement("div"); lbl.className = "lbl"; lbl.textContent = "margin note · " + title;
    var ta = document.createElement("textarea"); ta.placeholder = "comment on this section…";
    var bar = document.createElement("div"); bar.className = "bar";
    var btn = document.createElement("button"); btn.textContent = "Lock in";
    var st = document.createElement("span"); st.className = "st";
    var ed = document.createElement("span"); ed.className = "edit"; ed.textContent = "edit"; ed.style.display = "none";
    bar.appendChild(btn); bar.appendChild(st); bar.appendChild(ed);
    aside.appendChild(lbl); aside.appendChild(ta); aside.appendChild(bar);
    function render() {
      var v = state[sec] || {};
      ta.value = v.text || "";
      var locked = !!v.locked;
      ta.readOnly = locked;
      btn.style.display = locked ? "none" : "";
      btn.disabled = !ta.value.trim();
      ed.style.display = locked ? "" : "none";
      st.textContent = locked ? "✓ locked " + (v.ts ? v.ts.slice(11, 16) : "") : "";
    }
    ta.addEventListener("input", function () {
      state[sec] = { text: ta.value, title: title, locked: false, ts: null };
      save(); btn.disabled = !ta.value.trim();
    });
    btn.addEventListener("click", function () {
      if (!ta.value.trim()) return;
      state[sec] = { text: ta.value, title: title, locked: true, ts: new Date().toISOString() };
      save(); render(); emit();
    });
    ed.addEventListener("click", function () {
      var v = state[sec] || {};
      state[sec] = { text: v.text || "", title: title, locked: false, ts: null };
      save(); render(); emit(); ta.focus();
    });
    render();
  });
})();
</script>
</body>
</html>
```

---

## Checklist before you call it done

1. File is at `10_app/reports/YYYY-MM-DD_<slug>.html` (date first).
2. Opens over `file://` with zero network requests — no CDN, no fetch, no external anything.
3. House cream palette (`#FBF7EF` / `#232A33`), serif display headers, generous margins.
4. Every major section is a `section.row` with unique `data-sec`, a `data-title`, and an empty `aside.ann`; the bridge script is present and unmodified.
5. The report ends with the receipt section — motion, convergence, sources (count + list), confidence + caveats, approximate cost. Honest, not decorative.
6. No registration performed; tell the operator the report is live behind the 📊 button (and via the frame's own report surface, if it has one).
7. If any `.annotations.json` sidecars exist in the folder, you read them and acted on or surfaced the locked notes.
