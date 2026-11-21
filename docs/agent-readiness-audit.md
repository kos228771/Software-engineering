# Agent-readiness audit - baseline

## Assessment

**Level 2 - Documented.** The project now has a repository map and reproducible commands. It is not yet Agent-ready because important operating boundaries and one acceptance criterion remain unresolved, and UI behavior has no automated coverage.

| Area | Evidence and assessment |
|---|---|
| Readable structure | Small source tree with `App`, reusable components, `lib` logic/types/fixtures, and one focused test file. |
| README accuracy | Added in this task. It describes the prototype, repository map, setup, and package scripts. |
| Reproducible setup | `package-lock.json` is present; `npm ci` is the documented clean install. Baseline dependencies were installed in an isolated copy from the lockfile. |
| Pinned dependencies | The npm lockfile records resolved versions. `package.json` uses semver ranges, as expected with the lockfile. |
| Tests / lint / types / build | Baseline: 9/9 Vitest tests passed; TypeScript check, ESLint, and Vite production build exited 0. Coverage is concentrated on `checkAvailability`; no UI test file exists. |
| Logging | No backend or production logging path is present in this fictional-data prototype. |
| Security safeguards | No `.env*` file or real booking data was found in the baseline. The app states that it creates/modifies no real bookings. Supabase is declared but unused in current source. |
| Agent instructions | `AGENTS.md` restricts backend, login, and booking creation, but lacks safe command lists, secret handling, production/destructive-operation prohibitions, dependency review, and a human approval gate. It also references undefined AC6. |

## Missing evidence before Level 3

- Resolve the AC6 reference.
- Complete `AGENTS.md` operating boundaries and review gates.
- Decide whether to add focused UI tests; current green checks do not exercise React interactions or responsive layout.
- Confirm whether the unused Supabase dependency is intentional.

The level reflects the current baseline documentation and checks; it does not claim the product is production-ready.
