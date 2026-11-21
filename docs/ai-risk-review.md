# AI risk review - candidate findings

This is a read-only review of the baseline. No application source was changed for these observations. Status separates verified behavior from possible consequence; risk scores and mitigations belong in the risk register.

| ID | Category | Status | Candidate finding and evidence | Limit / follow-up |
|---|---|---|---|---|
| R1 | Correctness | Confirmed | `src/App.tsx:159` tells users start must be “after” current time, but `src/lib/checker.ts:31` rejects only `start < currentMinutes`. Thus equality is accepted. Existing `src/lib/checker.test.ts:27-30` tests an earlier start but not equality. A temporary Vitest reproduction confirmed `start === currentMinutes` returns `available`. | Product owner should choose “at or after” or “strictly after”; then align implementation, copy, and regression test. |
| R2 | Correctness | Confirmed at function boundary | `timeToMinutes` converts malformed non-empty strings to `NaN` (`src/lib/timeUtils.ts:2-5`). Comparisons with `NaN` are false, so `checkAvailability` can return `available` for a `NaN` start (`src/lib/checker.ts:26-61`). A temporary Vitest reproduction confirmed this outcome. | The current UI uses fixed `<select>` options (`src/App.tsx`), so ordinary user input does not appear to reach this path. Decide whether the exported checker must defend against invalid callers and add a permanent test if so. |
| R3 | Dependency | Confirmed unused in current source; consequence unverified | `@supabase/supabase-js` is a direct dependency (`package.json:15`); source search found no Supabase import or use. An unused SDK adds installed code and maintenance surface. | Verify it is not intentionally reserved for planned work before removing it; no vulnerability claim is made. |
| R4 | Maintainability / verification | Confirmed coverage gap | The only source test file is `src/lib/checker.test.ts`; it tests the pure checker but not React component interactions, rendering, or responsive layout. | Determine whether the assignment needs component/UI tests; current unit tests do not establish those behaviors. |
| R5 | Agent operations | Confirmed ambiguity | `AGENTS.md:5` says preserve AC1-AC6, while source comments and tests define only AC1-AC5. | Ask the project owner whether AC6 exists or remove the stale reference; an agent should not invent it. |
| R6 | Agent operations | Confirmed documentation gap | `AGENTS.md` prohibits backend, login, and booking creation, but does not specify safe commands, secret handling, production/deployment restrictions, dependency-change review, or a human approval gate. | Add explicit operating boundaries before delegating broader repository changes. |

## Evidence notes

- Existing baseline verification: 9 tests passed; TypeScript check, ESLint, and Vite production build exited 0.
- Edge-case reproduction used a temporary test file under `.scratch/`; both reproductions passed, and the temporary file was removed. This did not change the committed source or test suite.
- Static dependency search found “supabase” only in `package.json` (excluding the lockfile); usage absence does not by itself prove the dependency is accidental.
- No source change or mitigation is claimed in this review.
