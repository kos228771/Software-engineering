# Assignment 05 - Software Engineering Report

## Project and purpose

**Smart Campus Room Availability Checker** is a React and TypeScript prototype that helps a user check whether a fictional campus room is free for a selected time interval. It displays sample rooms and bookings and returns an available/unavailable result. It does not reserve rooms, use real booking records, authenticate users, or connect to a backend.

## Baseline and project structure

The baseline was preserved before implementation work. The application already separated page state (`src/App.tsx`), visual components (`src/components/`), and pure room/time decision logic (`src/lib/`). The existing Vitest suite covered the checker; the package lockfile and scripts made local checks reproducible. A baseline archive and SHA-256 manifest were created before the changes.

The project map and setup steps are in `README.md`. Requirements that can be verified from the source and tests are listed in `acceptance-criteria.md`.

## Acceptance criteria

The implemented criteria are:

1. Reject times outside the day, a start at or after the end, and a start that is not strictly later than the supplied current time.
2. Reject durations over 120 minutes and allow exactly 120 minutes.
3. Reject rooms marked as blocked for maintenance.
4. Reject positive overlap with an existing booking for the same room; allow intervals that only touch at an endpoint.
5. Return a decision without mutating the supplied bookings array.

The original `AGENTS.md` referred to AC1-AC6, but no AC6 was defined in the source or tests. This report does not invent a sixth criterion.

## Design and pattern decision

The checker remains a pure function, separate from its React presentation. Strategy was not added because the application has one availability policy and no interchangeable policies to select. Adapter was not added because there is no external booking API to translate. Adding either pattern would introduce indirection without addressing a current requirement. See `pattern-decision.md`.

## AI-assisted risk review and changes

A read-only review identified two correctness risks and several maintenance or agent-operation concerns. The risk register records each finding, impact, mitigation, verification, and residual risk.

- **Strict current-time boundary:** the baseline checker accepted a start equal to the displayed current time, although the UI said “after.” The project owner chose strictly later. The checker and regression test now enforce that decision.
- **Invalid numeric input:** `NaN` comparisons could allow an invalid time to appear available when the checker was called directly. The checker now rejects non-finite values and out-of-day values; regression tests cover both.
- **Agent safeguards:** `AGENTS.md` now lists allowed local checks, prohibits secrets, real data, production deployment, destructive actions, and unreviewed dependency changes, and requires human review at merge/deployment gates.
- **Development server:** Vite's exclusion of `lucide-react` was removed after the owner observed a Firefox module-loading error and confirmed the app rendered after restarting Vite with forced dependency refresh.

The unused Supabase SDK remains in the dependency manifest because its intended future use has not been confirmed. No unsupported vulnerability claim is made.

## Verification and visual review

The following checks were run against the final working copy:

- Vitest: **12/12 tests passed**.
- TypeScript: `npm run typecheck` exited successfully.
- ESLint: `npm run lint` exited successfully.
- Vite production build: `npm run build` exited successfully. Vite printed an outdated Browserslist database notice; the build completed.
- Manual UI review: the project owner ran the local Vite server, confirmed the page rendered, and supplied five screenshots, now stored in `evidence/` alongside this report:
  - `01-available-slot.png` shows an available 10:00-11:00 slot.
  - `02-booking-overlap.png` shows an existing booking causing an overlap rejection.
  - `03-start-at-current-time.png` shows a start equal to the displayed current time rejected.
  - `04-two-hour-boundary.png` shows the 120-minute maximum accepted.
  - `05-over-duration-rejected.png` shows a 570-minute request rejected.

## AI use and student review

Codex was used to inspect the code and project instructions, create the project map and criteria, identify and document risks, suggest targeted code changes, and run local checks. The project owner selected the strict-after rule, ran the local UI, and reviewed the result. `ai-use-record.md` describes the prompts, accepted changes, and unverified suggestions. `ai-reflection-draft.md` is a draft: the student should revise it in their own voice and confirm it accurately describes their decisions before submission.

## Scope and remaining limitations

This is an assignment prototype using fictional data, not a room-booking service. It has no backend, login, real booking creation, or automated React/browser tests. The UI uses a simulated current time. AC6 remains undefined, and the purpose of the unused Supabase dependency remains unconfirmed. The release decision applies only to an assignment demonstration with fictional data.
