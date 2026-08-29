# Skill — `/frame-capacity`

**File:** `02_session_skills/02_frame_capacity_render.md`
**Invoked by:** the orchestrator at session start (parallel to printing the intro card); `/session-log` Step 3 sub-agent C; ad-hoc when the operator asks "frame capacity?"
**Purpose:** Compute the cold-start token estimate against the configured budget and emit the one-line Frame Capacity Meter — FAST (single batched size lookup, no file-content reads).

Spec reference: `00_relay_frame/01_frame_capacity_spec.md`. This skill IMPLEMENTS the spec — do not redefine math here.

---

## When to run

- Session start. Runs **in parallel** with the intro card render — the meter line lands underneath the card once both finish.
- Inline call from `/session-log` (Step 3 sub-agent C).
- On demand: operator asks "how's frame capacity?" / "frame capacity?" / "/frame-capacity".

---

## Performance + trust contract (read this first)

The meter must render in well under one second AND the number must be reproducible. Two failure modes to avoid:

1. **Reading file contents instead of file sizes** — kills the performance budget.
2. **Eyeballing the arithmetic in the agent's head** — produces a number the operator can't audit and can't trust. The meter is supposed to be a smoke detector; a smoke detector whose readout is "vibe-checked" is worse than no detector at all.

The correct approach is a single batched size lookup followed by deterministic arithmetic:

```bash
stat -f%z [list of files]    # macOS / BSD
stat -c%s [list of files]    # GNU
```

Or, equivalently, a single `wc -c [files]` call. ONE shell invocation. NOT one Read per file. NOT one stat per file. ONE batched call returning all sizes.

If you find yourself opening files with the Read tool to compute this meter, stop — you're doing it wrong. If you find yourself mentally computing `total_bytes × 0.27` and rounding to the nearest 1k, stop — pipe it through a real arithmetic step (the `wc -c | awk` one-liner in Step 2, or an explicit `python3 -c` / `bc` invocation). The meter prints a number the operator should be able to reproduce by hand from the same byte total — no mental math.

---

## Step 1 — Read the budget

Open `00_relay_frame/01_frame_capacity_spec.md`. Find the line:

```yaml
usable_budget_tokens: 170000
```

Use this value. If the line is missing, default to 170000 and note it in a Diagnostics line (but still emit the meter).

Note: this read happens once per session at cold start, so the spec file's content is already in the agent's context when this skill runs. No additional read needed.

---

## Step 2 — Compute the cold-start byte total

Build the file list (per the spec):

1. `CLAUDE.md` — full size
2. `_session_log.md` — only the last 5 entries' worth of content (cap at last 5; if file has fewer, use the whole file)
3. `04_production_master_tasklist/00_Master_Tasklist.md` — full size
4. `00_relay_frame/00_overview.md` — full size
5. `00_relay_frame/03_discovery_chain.md` — full size
6. `_people_list.md` — full size (if present; skip silently if not)
7. Each file under `01_setup_skills/`, `02_session_skills/`, `03_tasklist_skills/` — **100-byte placeholder per skill** (skills are read on demand)
8. Each file under `99_project_skills/` — same 100-byte placeholder

Get sizes via **one** batched call, then pipe the sum through arithmetic in the same shell — no mental math:

```bash
wc -c \
  "<frame_root>/CLAUDE.md" \
  "<frame_root>/_session_log.md" \
  "<frame_root>/_people_list.md" \
  "<frame_root>/04_production_master_tasklist/00_Master_Tasklist.md" \
  "<frame_root>/00_relay_frame/00_overview.md" \
  "<frame_root>/00_relay_frame/03_discovery_chain.md" \
  | awk '/total$/ {print $1}'
```

This returns the raw byte total as a single integer. Keep this number — the operator gets to see it (Step 4) so they can reproduce the calculation themselves.

For the session log, if it has more than 5 entries, you can either:
- Use the whole file size as a conservative overestimate (acceptable), OR
- Use a quick `grep`/`awk` to find the byte offset of the 5th `## ` heading and take that as the size (more accurate)

For the skills folders, count the files with one `find … | wc -l` per folder and multiply by 100. Don't read any skill body. Add the result to the byte total above.

Apply the heuristic via a real arithmetic step — `awk`, `bc`, or `python3 -c`. Do NOT do this calculation in the agent's head:

```bash
# example: bytes=237450, budget=170000
echo "$bytes" | awk -v b="$budget" '{
  tokens = int($1 * 0.27);
  k      = int((tokens + 500) / 1000);   # round to nearest 1k
  pct    = int((tokens * 100) / (b))     # integer percent
  printf "tokens=%d k=%d pct=%d\n", tokens, k, pct
}'
```

The skill MUST surface `total_bytes`, `tokens` (exact int), `k` (rounded), and `pct` (integer percent) as named values so a human can audit the chain. Round to the nearest 1000 and express in `k`:

```
≈ 64k     (from 237,450 bytes × 0.27 = 64,111 tokens)
```

---

## Step 3 — Map to indicator

```
percent_used = estimated_tokens / usable_budget_tokens × 100
```

| Percent | Indicator |
|---------|-----------|
| `< 80%` | 🟢 |
| `80% – 90%` | 🟠 |
| `> 90%` | 🔴 |

---

## Step 4 — Emit the line

Format:

```
Frame Capacity · 🟢 · 62k / 170k usable (37%)
```

Spaces are aligned with `·` separators. No bold, no color codes — just the emoji and plain text.

**Auditable trailer (only when the operator asks "how was that computed?" or invokes `/frame-capacity` standalone, NOT on every cold-start render):**

```
              └─ 230,432 bytes × 0.27 = 62,217 tokens · budget 170,000 · 37%
```

This is the receipt for the math. Keep it off the cold-start meter so the line stays one-row; surface it on demand so the operator can spot-check the calculation.

**Hard-line rule: no mental math.** The numbers in the meter (`Xk` and `Y%`) MUST come from the `awk`/`bc`/`python3` arithmetic step in Step 2 — never from the agent computing them in its head and then dropping them into the template. If the arithmetic step didn't run, the meter MUST NOT print; fail open with a one-line diagnostic instead (`Frame Capacity · ⚠ · meter unavailable — arithmetic step did not run`).

---

## Step 5 — Add explanation line (only if 🟠 or 🔴)

Identify the SINGLE heaviest contributor file (by raw bytes). Format:

```
Frame Capacity · 🟠 · 144k / 170k usable (85%)
                └─ heaviest contributor: 04_production_master_tasklist/00_Master_Tasklist.md (47k).
                   Consider /refactor-tasklist to sweep completed entries.
```

Suggested next actions by heaviest contributor:

| Heaviest contributor | Suggested action |
|----------------------|------------------|
| Master tasklist | Run `/refactor-tasklist` to sweep completed entries. |
| Session log | Archive older entries — keep last 5 in `_session_log.md`, move the rest to `_session_log_archive/`. |
| People list | Archive contacts who haven't been touched in 6+ months to `_people_archive/`. |
| CLAUDE.md | The orchestrator may have grown — review and prune any project-specific tables that have outgrown their slot. |
| A skill file | Consider whether the skill is too long; split it into smaller focused skills. |
| A project skill | Same as above — the `99_project_skills/` slot is meant for many small files, not few big ones. |

---

## Step 6 — Return

If called inline (from `/session-log` Step 3 sub-agent C, or the cold-start intro card): return only the formatted meter string (line + optional explanation). The caller will embed it.

If called standalone (operator asks ad-hoc): print the meter (+ explanation if applicable) as the agent's first output and continue with whatever the operator asked for.

---

## Hard rules

- **Stat-only, never read.** Use one batched `wc -c` or `stat` call. Never use Read to compute size.
- **Real arithmetic, never mental math.** The byte total, token estimate, k-rounded value, and percentage all come from an explicit `awk` / `bc` / `python3 -c` step. The agent never computes `bytes × 0.27` in its head and types the answer into the template. If the arithmetic step fails, emit the `⚠ meter unavailable` line instead of guessing.
- **Render must be sub-second.** If it isn't, fix the skill — don't accept slow.
- **Only render at session start and in the session-log receipt.** Do not auto-render mid-session.
- **The 0.27 factor is approximate; the computation is exact.** Document that distinction honestly — the *heuristic* introduces uncertainty (±20%), but the arithmetic chain itself must be deterministic. Never claim precision the heuristic can't deliver; never claim the math was a guess when it should have been computed.
- **One heaviest contributor at a time.** When 🟠 or 🔴, name ONE file, not a list. Operators decide one fix at a time.
- **Skills are counted at index level, not full body.** The 100-byte placeholder is intentional — if a project skill is huge, that bloat shows up when the skill is *invoked*, not on cold start.
- **Never raise the budget silently.** If you think the budget is wrong, surface it as a Diagnostics line, but do not change the spec without the operator editing the file.
- **Auditability beats brevity.** When the operator asks `/frame-capacity` directly, append the `└─ N bytes × 0.27 = T tokens · budget B · P%` trailer so the chain can be checked. The cold-start meter stays a single line; the standalone invocation gets the receipt.
