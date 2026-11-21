# Agent-readiness audit

## Assessment

**Level 2 - Documented.** The project now has a repository map, reproducible commands, and explicit operating boundaries. It is not yet Agent-ready because one acceptance-criteria reference remains unresolved and UI behavior has no automated coverage.

| Area | Evidence and assessment |
|---|---|
| Readable structure | Small source tree with `App`, reusable components, `lib` logic/types/fixtures, and one focused test file. |
| README accuracy | Added in this task. It describes the prototype, repository map, setup, and package scripts. |
| Reproducible setup | `package-lock.json` is present; `npm ci` is the documented clean install. Baseline dependencies were installed in an isolated copy from the lockfile. |
| Pinned dependencies | The npm lockfile records resolved versions. `package.json` uses semver ranges, as expected with the lockfile. |
| Tests / lint / types / build | Baseline: 9/9 Vitest tests passed; TypeScript check, ESLint, and Vite production build exited 0. Coverage is concentrated on `checkAvailability`; no UI test file exists. |
| Logging | No backend or production logging path is present in this fictional-data prototype. |
| Security safeguards | No `.env*` file or real booking data was found in the baseline. The app states that it creates/modifies no real bookings. Supabase is declared but unused in current source. |
| Agent instructions | `AGENTS.md` now lists allowed local commands, prohibits secrets/real data, production deployment, destructive commands, and unreviewed dependency changes, and requires human review before merge/deployment. It still references undefined AC6, which is flagged for owner clarification. |

## Missing evidence before Level 3

- Resolve the undefined AC6 reference.
- Decide whether to add focused UI tests; current green checks do not exercise React interactions or responsive layout.
- Confirm whether the unused Supabase dependency is intentional.

The level reflects the current baseline documentation and checks; it does not claim the product is production-ready.
