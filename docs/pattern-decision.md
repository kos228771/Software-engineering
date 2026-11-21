# Focused pattern decision

## Observed maintainability issue

The start-time rule is represented in both the checker and UI copy. `src/lib/checker.ts:31` rejects only `start < currentMinutes`, so a start exactly at the current time is allowed. `src/App.tsx:159` tells the user the start must be “after” the current time. This wording/logic drift is also identified as R1 in `ai-risk-review.md`.

## Pattern evaluation

- **Strategy:** not justified. The application currently has one availability policy and no alternate rulesets or selection point for interchangeable algorithms.
- **Adapter:** not justified. There is no external booking service or incompatible API to adapt; the data is local and fictional.

## Decision

Do not add a named design pattern or refactor the checker at baseline. First resolve whether the requirement is “at or after” or strictly “after.” Then make the smallest focused correction to the checker, message, and regression test as a risk mitigation. Existing separation already keeps availability logic in a pure function and presentation in React components; adding Strategy/Adapter would add indirection without solving the policy mismatch.

## Before/after

No source refactor was made for this decision. Baseline structure remains: `AvailabilityChecker` calls the pure `checkAvailability` function and renders its result. The behavior mismatch is retained as a documented baseline finding until the intended boundary is clarified.
