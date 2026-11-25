# AGENTS.md

Hugo blog. Remote: `git@github.com:JustusMzB/blog.git` — **public**.

## Branch policy — hard rule

Only `main` is ever pushed to `origin`.

- NEVER run `git push` while on any branch other than `main`.
- NEVER push another branch, all branches, or tags: no `git push origin <branch>`, no `--all`, no `--mirror`, no `git push origin HEAD:<branch>`, no tag pushes.
- Reconfigure before pushing if needed: `git config push.default simple`, and verify `git rev-parse --abbrev-ref HEAD` prints `main` and the remote is `origin`.
- Local branches (and their unpushed commits) are work-in-progress: drafts, `_private/`, `Claude outputs/`, generated artifacts — none of it screened for publishability.
- Need to share a branch? Export a patch or bundle (`git format-patch`, `git bundle`) outside the repo instead of pushing.
- "Fix the remote branch" or "sync this branch" is not authorization to push it. Only an explicit user request naming that branch authorizes it.

Rationale: anything pushed is public immediately, including history; deleting the branch afterward does not un-publish it.
