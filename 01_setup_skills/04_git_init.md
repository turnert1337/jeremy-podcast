# Skill — `/git-init`

**File:** `01_setup_skills/04_git_init.md`
**Invoked by:** `/intake-new` Step 4 or `/intake-existing` Step 2 Q6, OR directly by the user.
**Purpose:** Initialise a local git repository for the frame folder. Optionally save remote credentials so the session-log skill can auto-push.

---

## When to run

- User has opted into git during intake, OR
- User asks to add git to an existing frame later.

Idempotent: if `.git/` already exists, this skill detects that and offers only the remote-setup step.

---

## Step 1 — Check prerequisites

Run silently:

```bash
git --version
```

Branch on result:

| Result | Action |
|--------|--------|
| Git is installed | Continue to Step 2. |
| Git is NOT installed | Tell the user: "Git isn't available on this machine. Install git from git-scm.com and rerun `/git-init`. For now, the frame works fine without it — the session-log skill will leave the git line blank." Stop. |

---

## Step 2 — Detect current state

Check whether the frame folder is already a git repo:

```bash
git -C "<frame_root>" rev-parse --is-inside-work-tree
```

| Result | Action |
|--------|--------|
| `true` (already a repo) | Skip to Step 4 (remote setup). |
| Error / `false` | Continue to Step 3 (init). |

---

## Step 3 — Initialise

Print:

```
Initialising a local git repo for this frame...
```

Run:

```bash
git -C "<frame_root>" init
git -C "<frame_root>" branch -M main
```

Write a sensible `.gitignore` to the frame root if it doesn't already exist:

```gitignore
# The Relay Frame — .gitignore
.DS_Store
*.swp
*.tmp
*~

# Optional: ignore the intake staging folder if user prefers
# _intake/
```

Stage and create the first commit:

```bash
git -C "<frame_root>" add .
git -C "<frame_root>" commit -m "frame init · The Relay Frame MVP draft 1"
```

Print:

```
🟢 local git initialised
   Branch: main
   First commit recorded.
```

---

## Step 4 — Offer remote setup

Print:

```
Would you like to connect a remote (GitHub / GitLab / other)?

  [Y] Yes — paste the remote URL when prompted
  [N] No  — keep it local-only

You can always add a remote later by running `/git-init`
again.
```

If `N`: Stop. Print `🟢 git ready (local only).`

If `Y`: continue to Step 5.

---

## Step 5 — Add remote

Print:

```
Paste the remote URL (e.g., git@github.com:you/your-repo.git
or https://github.com/you/your-repo.git):
```

Capture the URL. Run:

```bash
git -C "<frame_root>" remote add origin "<url>"
```

Try a push:

```bash
git -C "<frame_root>" push -u origin main
```

| Result | Action |
|--------|--------|
| Push succeeds | Print `🟢 git connected to origin · first push complete.` Done. |
| Auth failure | Print the actual error verbatim, then offer remediation steps (see Step 6). |
| Other error | Surface the error verbatim. Tell the user: "I don't want to guess at the fix — paste this error to the team or look it up, then rerun `/git-init`." |

---

## Step 6 — Auth remediation (only if Step 5 failed on auth)

Print:

```
Push failed on authentication. Common causes:

  - For HTTPS remotes: you may need a personal access token
    (PAT). GitHub: Settings → Developer Settings → PATs.
  - For SSH remotes: you may need to register your SSH key
    with the provider. Run `ssh-keygen -t ed25519` if you
    don't have a key, then add the public key to your
    provider's SSH settings.

The frame doesn't store credentials directly — it relies on
git's credential helper. To save credentials persistently:

  git config --global credential.helper osxkeychain   # macOS
  git config --global credential.helper manager       # Windows
  git config --global credential.helper store          # Linux (note: plaintext)

Run the helper config, then run `git push -u origin main`
manually to prime the credential cache. Then rerun
`/git-init` and the next push will succeed without
prompting.
```

---

## Step 7 — Wire the session-log skill (branch tracking starts here)

After git is set up (local or remote), the session-log skill at `02_session_skills/00_session_log_protocol.md` will auto-detect the repo and:
- Commit any changed frame files at the end of each session.
- Push if a remote is configured and the credential helper has been primed.
- **Track the current branch.** Each session-log entry records the branch the commit landed on (via `git branch --show-current`). The end-of-session receipt prints `🟢 git committed · branch: <name>` so the operator always knows which branch they're on. Branch tracking is part of the contract from this point forward — it does not need any per-session configuration.
- Populate the `**Git:**` field in the session-log entry accordingly.

No further setup needed. The first auto-commit happens at the end of the current session, and from session 1 onward the branch name appears in the receipt.

> **Why branch tracking matters:** the moment the user switches to a feature branch (`git checkout -b feat/new-thing`), the next session-log receipt will show `branch: feat/new-thing`. That's an at-a-glance reminder for the operator — there's no surprise about which branch the work landed on, and the session log itself preserves the branch history across sessions.

---

## Hard rules

- **Never run destructive git commands.** No `git reset --hard`, no `git push --force`, no `git rebase -i`. This skill is for setup only.
- **Never store credentials in frame files.** Credentials live in the git credential helper or in the user's keychain — never in the repo.
- **Never push silently if the remote is wrong.** If the remote URL looks malformed (no scheme, no hostname), ask the user to confirm before running `git remote add`.
- **Gracefully exit if git is missing.** No errors, no scary messages — just "install git and rerun." The frame is fully functional without git.
- **Never overwrite an existing `.gitignore`.** If one exists, leave it. (Optionally suggest adding the lines above as a separate ask.)
