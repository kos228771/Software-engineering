# Risk register - baseline

Scores use likelihood (L) and impact (I) from 1 (low) to 3 (high); score = L × I. Statuses follow the evidence-based AI review. Scores are initial judgments and should be revisited after mitigations.

| ID | Category / status | Cause → event → consequence | Component / evidence | L | I | Score | Mitigation / owner | Verification plan | Residual risk |
|---|---|---|---|---:|---:|---:|---|---|---|
| R1 | Correctness / confirmed | UI says strictly after now while checker accepts equality → a user selects a slot starting at the displayed current time → app reports availability contrary to its stated rule. | `src/App.tsx:159`, `src/lib/checker.ts:31`, AC1 test; reproduced with `start === currentMinutes`. | 2 | 2 | 4 | Change checker boundary to strict `start > currentMinutes` and preserve matching UI copy. Owner: student. | Add a regression case where `start === currentMinutes`; run the full test suite and typecheck. | Minute-level behavior is correct, but static sample time remains user-controlled and not wall-clock time. |
| R2 | Correctness / confirmed at function boundary | Non-finite input is not rejected → malformed caller supplies `NaN` → checker returns `available`. | `src/lib/timeUtils.ts:2-5`, `src/lib/checker.ts:26-61`; temporary Vitest reproduction returned `available`. | 1 | 3 | 3 | Add finite/range validation if the checker is expected to accept untrusted callers. Owner: student. | Add tests for NaN and malformed time conversion; run test suite. | Current UI uses fixed select options, so normal interaction does not appear to expose this path. |
| R3 | Dependency / plausible, consequence unverified | Supabase SDK is declared but unused → dependency remains installed and maintained without a current use → extra package and review surface. | `package.json:15`; source search found no imports/usages. | 1 | 2 | 2 | Confirm it is not reserved for planned work; remove it only if owner approves. Owner: student. | Search source and inspect dependency tree after any removal; rerun install, tests, lint, typecheck, build. | Future integration may need a reviewed dependency addition. No vulnerability is asserted. |
| R4 | Maintainability / plausible | Tests exercise the pure checker only → React interactions or responsive rendering regress → user-visible behavior may fail despite green unit tests. | Only `src/lib/checker.test.ts` exists under `src`; no component/browser test file. | 2 | 2 | 4 | Add focused UI test coverage if time and tooling justify it. Owner: student. | Test room selection and rendered decision states in a browser/component harness. | Visual behavior across browsers/viewports may still need manual review. |
| R5 | Agent operations / confirmed | Agent instructions mention AC1-AC6 but only AC1-AC5 are defined in source/tests → agent may guess the missing rule → unintended behavior or unverifiable claims. | `AGENTS.md:5`; AC comments/tests in `src/lib/checker.ts` and `src/lib/checker.test.ts`. | 2 | 2 | 4 | Define AC6 or remove the stale reference after owner confirmation. Owner: student. | Check that instructions, criteria document, and tests use the same criterion list. | New criteria can still be missed unless reviewed when requirements change. |
| R6 | Agent operations / confirmed | Instructions omit safe commands, secret handling, production restrictions, dependency approval, and human review → an agent may take an unsafe or unreviewed action. | `AGENTS.md` has project constraints but no explicit safe/forbidden command or approval policy. | 2 | 3 | 6 | Expand `AGENTS.md` with allowed checks, prohibited secret/deploy/destructive actions, dependency review, and human approval gates. Owner: student. | Review the file against assignment requirements and confirm the instructions are visible to the chosen agent. | Human review remains necessary; written boundaries cannot prevent every mistaken tool action. |

## Top two selected at baseline

1. **R6 (score 6):** close missing agent-operation safeguards in `AGENTS.md`.
2. **R1 (score 4):** align the checker with the clarified rule: a slot must start strictly after current time. R4 and R5 also score 4, but R1 is selected because it is a reproduced behavior mismatch in a core acceptance criterion.

## Mitigation records

### R1 - strict current-time boundary

- **Change:** `src/lib/checker.ts` now rejects `start <= currentMinutes`; added an AC1 equality regression test in `src/lib/checker.test.ts`. The project owner selected “strictly later.”
- **Evidence:** full Vitest suite passed with 10/10 tests; typecheck, lint, and production build exited 0 after the change.
- **Residual risk:** the “current time” is still a user-adjustable simulation value rather than wall-clock time. Residual L1 × I1 = 1.

### R6 - agent operating boundaries

- **Change:** `AGENTS.md` now lists the allowed npm checks, limits the dev server to local use, forbids secrets/real data, production deployment, destructive commands, and unreviewed dependency changes, and requires human review before merge/deployment.
- **Evidence:** reviewed the updated instructions against the assignment requirements; the existing checks all pass. No backend or external service was used for this change.
- **Residual risk:** written instructions still require human review and cannot prevent every mistaken tool action. Residual L1 × I2 = 2.

R2-R5 remain candidates with their original scores pending a decision on scope and further verification. The two records above are the only mitigations claimed as implemented.
