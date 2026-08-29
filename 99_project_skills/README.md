# 99 — Project-Specific Skills (Reserved Slot)

This folder is **empty by design**. It is the reserved slot for skills you write specifically for *this* project — skills that aren't shipped with every Relay Frame.

---

## When to add a skill here

When a project-specific norm becomes worth encoding as an executable protocol — not just a paragraph in `CLAUDE.md` or a note in the master tasklist.

Examples of project-specific skills you might add:

- `/dispatch-translators` — a workflow specific to a translation project
- `/render-deck` — a build step specific to a slide-deck project
- `/seed-test-data` — a helper specific to a code project's local-dev loop
- `/weekly-review` — a project-specific recurring ritual

If a skill could be useful across many projects, it might belong in `01_setup_skills/`, `02_session_skills/`, or `03_tasklist_skills/` instead — but that's a frame-level change. For now, stage it here, then promote when it proves out.

---

## How to add a skill

1. **Create the file:** `99_project_skills/NN_your_skill_name.md` (numbered sequentially: `01_`, `02_`, ...).
2. **Use the standard skill structure:**

   ```markdown
   # Skill — `/your-skill-name`

   **File:** `99_project_skills/NN_your_skill_name.md`
   **Invoked by:** [who/when]
   **Purpose:** [one sentence]

   ---

   ## When to run
   [conditions]

   ## Step 1 — ...
   ## Step 2 — ...
   ...

   ## Hard rules
   - ...
   - ...
   ```

3. **Register the skill in two places:**
   - `CLAUDE.md` section 3 (the "Project-specific skills" table)
   - `00_relay_frame/04_skills_index.md` (the project-specific skills table at the bottom)

4. **If the skill is called by another skill,** link to it explicitly from the caller. Do not rely on the orchestrator to "find" it by name alone.

---

## Naming collisions

If your project skill happens to share a name with a frame-shipped skill, the **frame skill wins** by file location. Name your project skills distinctly to avoid this — and if there's a frame-shipped skill that *almost* does what you want, consider extending it via a project skill that wraps it, rather than duplicating.

---

## Frame version

```
The Relay Frame · MVP draft 1 · 2026-05-23
```
