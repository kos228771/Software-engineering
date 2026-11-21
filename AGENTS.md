# Project purpose and boundaries

Smart Campus Room Availability Checker is a fictional-data prototype. Preserve the acceptance criteria in `docs/acceptance-criteria.md`. No backend, login, or booking creation may be added. `AGENTS.md` in the baseline mentioned AC1-AC6, but only AC1-AC5 are defined; ask the project owner before inventing or changing an AC6.

Do not change the sample booking fixtures or use real personal, confidential, or credential data. Keep availability logic pure and keep user feedback clear and responsive.

# Repository map

- `src/App.tsx` owns page state and connects the UI.
- `src/components/` renders the timeline, room schedule, and availability result.
- `src/lib/checker.ts` contains availability rules; `types.ts`, `timeUtils.ts`, and `sampleData.ts` define supporting data and utilities.
- `src/lib/checker.test.ts` tests the core decision function.
- `docs/acceptance-criteria.md` is the criteria source of truth.

# Setup and allowed commands

Use Node.js and npm. For first-time setup, use `npm ci` from the repository root to install the exact lockfile versions. Allowed local checks are:

- `npm run test`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run dev` for local development only

Do not run a command outside this list unless the human owner approves it first. Do not expose the local dev server publicly.

# Prohibited actions and review gates

- Never read, copy, commit, or transmit secrets or real personal/booking data.
- Never deploy to production or run destructive filesystem, database, or infrastructure commands.
- Do not change `package.json` or `package-lock.json` without human review and approval.
- Do not modify fixture data, add backend integration, login, or real booking creation.
- Before completing a task, inspect the diff and report the exact files changed and checks actually run. A human must review and approve changes before merge or deployment.
- If a check cannot run, report that limitation; never claim an unexecuted check passed.
