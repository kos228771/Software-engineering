# Release decision - reviewed prototype

## Decision: ACCEPTABLE FOR ASSIGNMENT DEMONSTRATION (FICTIONAL DATA ONLY)

This decision applies only to the fictional-data room availability prototype. It is not approval for a live booking system or production deployment.

## Evidence

- Current suite: 12/12 Vitest tests passed, including strict-after and invalid-number boundaries.
- TypeScript check, ESLint, and Vite production build exited 0 after the final code changes.
- AGENTS.md now limits work to local checks and requires human review before merge/deployment.
- No backend, login, or real booking creation exists in the reviewed scope.
- The project owner manually launched the app and supplied five UI evidence screenshots, stored in `docs/evidence/`.
- The Vite development configuration no longer excludes `lucide-react` from dependency optimization; the owner confirmed the app renders after restarting Vite with a forced dependency refresh.

## Remaining limits and owners

1. **Student/owner:** keep this version limited to fictional fixtures and the fixed time-selection UI. It does not create bookings or connect to a backend.
2. **Student/owner:** only AC1-AC5 are specified and tested. Confirm whether the old AC1-AC6 reference is stale if a sixth criterion is required by the instructor; none was invented.
3. **Student/owner:** decide whether the currently unused Supabase SDK is reserved for future work before removing it; no dependency change was made.
4. **Student/owner:** include `docs/evidence/` with the submission report; its five images are indexed in `docs/final-report.md`.

This decision covers an assignment demonstration only. No production deployment or real booking workflow is authorized.
