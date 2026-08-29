# 01 — Frame Capacity Spec

The **Frame Capacity Meter** is a one-line indicator showing how much of the usable context budget the frame's cold-start files are consuming. It's a smoke detector, not a thermostat.

(Previously called the "Frame Health Bar" — renamed because what it measures is capacity, not health. The old name is preserved here for one cycle in case external docs still reference it.)

---

## When it renders

Only two places (per design — keep the signal rare so it's noticed):

1. **At session start.** First line of the agent's first response on a cold load.
2. **At the bottom of the session-log receipt.** Immediately above the `🟢 session log fact-checked and saved` line.

Nowhere else. No mid-session re-renders.

---

## The output format

One terminal row, no wrap:

```
Frame Capacity · 🟢 · 62k / 170k usable (37%)
```

Components:

- `Frame Capacity` — fixed label.
- `🟢` / `🟠` / `🔴` — the indicator (see thresholds below).
- `Xk / 170k usable` — current cold-start tokens / configured budget.
- `(Y%)` — convenience percentage.

If `🟠` or `🔴`, an explanation appears as the next indented line:

```
Frame Capacity · 🟠 · 144k / 170k usable (85%)
                └─ heaviest contributor: 04_production_master_tasklist/00_Master_Tasklist.md (47k).
                   Consider /refactor-tasklist to sweep completed entries.
```

---

## Thresholds

| % of budget | Indicator | Meaning |
|-------------|-----------|---------|
| `< 80%` | 🟢 | Healthy. No action needed. |
| `80% – 90%` | 🟠 | Last 20%. Sweep something, prune, or accept that quality may degrade soon. |
| `> 90%` | 🔴 | Over budget for the safe zone. Working memory will get spotty. Sweep or split now. |

---

## How tokens are estimated

The **factor** is a heuristic. The **arithmetic** is exact. Keep those two ideas separate — they tend to get conflated.

```
estimated_tokens = bytes_on_disk × 0.27
```

The factor `0.27` is a rough English-text-with-Markdown average. Code blocks tokenise slightly higher; prose slightly lower. Good enough for a smoke detector — but plan on ±20%.

The **calculation itself**, on the other hand, is not a vibe check. The render skill (`02_session_skills/02_frame_capacity_render.md`) is required to pipe the byte total through a real arithmetic step (`awk`, `bc`, or `python3 -c`) and surface the raw `bytes × 0.27 = tokens` chain on demand. The number the operator sees in the meter must be reproducible from the same byte total by hand. If the arithmetic step doesn't run, the meter prints `Frame Capacity · ⚠ · meter unavailable — arithmetic step did not run` rather than guessing.

---

## What counts as "cold-start tokens"

The files an agent reads at the start of every session, before any tools fire:

1. `CLAUDE.md` (always)
2. `_session_log.md` — but only the **last 5 entries** counted (older entries are assumed to be in `_session_log_archive/` or below the practical scroll-fold; if they're not, that's a sign to archive)
3. `04_production_master_tasklist/00_Master_Tasklist.md` (always)
4. `00_relay_frame/00_overview.md` (read once per session if the orchestrator references it)
5. `00_relay_frame/03_discovery_chain.md` (read once per session)
6. Every shipped skill file under `01_setup_skills/`, `02_session_skills/`, `03_tasklist_skills/` — counted **at index level only**, not full text. The skills are read on demand, not always.
7. Every project skill under `99_project_skills/` — same rule, index only.

**Not counted:**
- `_swept/NN_Complete_Sweep_*.md` — these are read only when explicitly referenced.
- Source code, assets, anything in subfolders the orchestrator doesn't touch on cold start.
- Files the user pulls in mid-session — those raise the *runtime* usage, not the cold-start cost.

---

## Configurable budget

The default usable budget is **170,000 tokens**. This assumes a 200k-token model context with ~30k held back for the user's prompt, tool outputs, and the agent's response buffer.

To change it, edit the line below in this file:

```yaml
usable_budget_tokens: 170000
```

The render skill reads this value at runtime.

---

## How the render skill uses this spec

The render skill at `02_session_skills/02_frame_capacity_render.md` does the following at runtime:

1. Read the `usable_budget_tokens` value above.
2. Walk the file list under "What counts as cold-start tokens" — using a **single `stat`-style batch call** for file sizes (never multiple file-content reads). The full body of cold-start files is already implicitly loaded; the meter only needs byte counts.
3. Sum bytes × 0.27 → estimate.
4. Map estimate / budget → 🟢 / 🟠 / 🔴.
5. If 🟠 or 🔴, identify the single heaviest contributor file by bytes for the explanation line.
6. Emit the one-line meter.

**Performance budget:** the render must complete in well under a second. If a render takes long enough to be noticeable, something is wrong — most likely the skill is doing file-content reads instead of stat-only size lookups. Fix the skill, not the budget.

---

## Limitations (be honest)

- Token estimation is approximate. ±20% is plausible. Don't use this as the only signal.
- The 170k usable budget is a heuristic specific to current frontier models. If you move to a smaller-context model, lower it.
- This bar does NOT account for runtime tool outputs that grow during the session. If you're spawning lots of sub-agents whose output you keep in context, the *real* used context can be higher than the bar suggests.
