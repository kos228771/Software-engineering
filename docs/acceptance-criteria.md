# Acceptance criteria - baseline

These criteria describe the behavior currently implemented and tested in the baseline. They are evidence for preservation during changes, not a claim that the prototype creates bookings.

| ID | Acceptance criterion | Existing evidence |
|---|---|---|
| AC1 | Reject out-of-day times, a start that is not earlier than the end, and a start earlier than the supplied current time. A start exactly equal to the supplied current time is currently accepted by the checker. | `src/lib/checker.ts`; three AC1 tests in `src/lib/checker.test.ts` |
| AC2 | Reject a duration longer than 120 minutes and accept a duration of exactly 120 minutes. | `src/lib/types.ts`; two AC2 tests |
| AC3 | Mark a room blocked for maintenance as unavailable. | `src/lib/checker.ts`; AC3 test |
| AC4 | Reject positive overlap with a booking for the same room, while allowing intervals that only touch at an endpoint. | `src/lib/checker.ts`; two AC4 tests |
| AC5 | Availability checking returns a decision without mutating the supplied bookings array. | `src/lib/checker.ts`; AC5 test |

## Baseline clarification to resolve

The UI helper in `src/App.tsx` says the start must be “after” the current time, while `src/lib/checker.ts` rejects only `start < currentMinutes`, so equality is accepted. The baseline test suite does not test that exact boundary. Decide whether the product rule is “at or after” or strictly “after” before changing the checker or UI copy.

`AGENTS.md` refers to preserving AC1-AC6, but the source and existing tests define only AC1-AC5. No sixth criterion was inferred here; clarify it with the project owner if it is needed.
