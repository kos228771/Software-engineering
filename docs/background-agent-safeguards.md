# Hypothetical background-agent safeguards

No paid background agent was used. This describes a safe hypothetical task for the remaining R2 input-validation candidate.

## Task and isolation

- **Task:** review whether `checkAvailability` should reject non-finite or out-of-range values from non-UI callers; if the owner approves, add the smallest validation and regression tests.
- **Isolation:** create a short-lived branch/worktree from the reviewed `main` commit, named `agent/r2-finite-time-validation`. Do not work on the shared `main` checkout.
- **Allowed files:** `src/lib/checker.ts`, `src/lib/checker.test.ts`, `src/lib/timeUtils.ts`, and `docs/risk-register.md` only.
- **Allowed commands:** `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, plus read-only `git status`, `git diff`, and source inspection.
- **Time limit:** 30 minutes. Stop and report blockers instead of broadening scope.

## Prohibited operations

- No secrets, real personal/booking data, backend, login, booking creation, production deployment, destructive filesystem/database commands, or public dev server.
- No dependency or lockfile changes, network calls, credential access, or changes outside the allowed files.
- Do not commit, merge, or deploy. Do not decide policy for malformed inputs without the project owner's approval.

## Required artifacts

Return a concise change summary, complete diff, test/typecheck/lint/build logs with exit codes, risk-register update with residual risk, and a list of checks not run. Claims must match captured output.

## Human gate and failure handling

The owner reviews the diff and logs before any merge. Deployment is outside this prototype's scope. If the task fails or the time limit expires, keep the branch/worktree isolated, report the last successful check and remaining diff, and let the owner decide whether to continue or discard it. Never merge partial work. Restore the original `main` by leaving it untouched; any cleanup of the isolated branch/worktree is performed only after the owner reviews the artifacts.
