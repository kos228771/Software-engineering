# Acceptance criteria

These criteria describe the behavior currently implemented and tested. They are evidence for preservation during changes, not a claim that the prototype creates bookings.

| ID | Acceptance criterion | Existing evidence |
|---|---|---|
| AC1 | Reject out-of-day times, a start that is not earlier than the end, and a start that is not strictly later than the supplied current time. | `src/lib/checker.ts`; four AC1 tests in `src/lib/checker.test.ts` |
| AC2 | Reject a duration longer than 120 minutes and accept a duration of exactly 120 minutes. | `src/lib/types.ts`; two AC2 tests |
| AC3 | Mark a room blocked for maintenance as unavailable. | `src/lib/checker.ts`; AC3 test |
| AC4 | Reject positive overlap with a booking for the same room, while allowing intervals that only touch at an endpoint. | `src/lib/checker.ts`; two AC4 tests |
| AC5 | Availability checking returns a decision without mutating the supplied bookings array. | `src/lib/checker.ts`; AC5 test |

## Baseline clarification to resolve

At baseline, the UI helper said the start must be “after” the current time, while the checker rejected only `start < currentMinutes`, so equality was accepted. On 2026-11-21 the project owner clarified that the product rule is strictly “after”; `src/lib/checker.ts` and an AC1 regression test now enforce it. The original mismatch remains documented in `docs/ai-risk-review.md` as a baseline finding.

`AGENTS.md` refers to preserving AC1-AC6, but the source and existing tests define only AC1-AC5. No sixth criterion was inferred here; clarify it with the project owner if it is needed.
