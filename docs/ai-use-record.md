# AI-use record

## Tool and date

- **Assistant:** OpenAI Codex desktop assistant (GPT-6)
- **Date:** 2026-11-21
- **Project:** Smart Campus Room Availability Checker

## Context provided

The user supplied the course assignment PDF and local project paths. For the chosen Smart Campus project, the assistant inspected the source tree, `AGENTS.md`, package scripts and lockfile, existing Vitest tests, React components, and fictional room fixtures. No credentials, `.env` files, or real booking records were found in the baseline export.

## Prompt summaries and outputs used

- **Assignment planning:** summarize requirements and make a step-by-step plan. Output used to sequence baseline, project map, acceptance criteria, risk review, pattern decision, mitigation, readiness, release, and reflection work.
- **Project selection and baseline:** inspect Smart Campus and preserve its original state. Output used to save a 26-file source archive and SHA-256 manifest, create the first Git commit, and run baseline checks.
- **Repository map and criteria:** document structure and observable behavior. Output used in `README.md` and `docs/acceptance-criteria.md`.
- **Read-only risk review:** identify and check risk candidates. Output used in `docs/ai-risk-review.md` and `docs/risk-register.md`; two temporary Vitest reproductions confirmed the equal-current-time and NaN behaviors, and the temporary file was removed.
- **Pattern/readiness/release planning:** evaluate Strategy/Adapter, audit agent readiness, and define safeguards and a release decision. Output recorded in the corresponding files under `docs/`.
- **Mitigation:** align the current-time rule with the owner’s strict-after decision and clarify agent boundaries. Changes were reviewed and verified before commit.

## Useful and weak/unverified output

- **Useful:** the assistant compared the time-checking code with the UI wording, found that equality was accepted at baseline, and proposed an explicit boundary test. The user chose “strictly later”; the checker and test were updated.
- **Weak early assessment:** the assistant initially considered the user’s OOP project a possible candidate after inspecting its structure. The user ran its launch script and supplied output showing 174 compile errors; the project was rejected and Smart Campus was selected.
- **Unverified:** the Supabase package appears unused in current source, but future planned use is unknown. It was not removed.

## Changes and verification evidence

- Added README/map, acceptance criteria, pattern decision, AI risk review, risk register, readiness audit, background-agent safeguards, conditional release decision, AI reflection draft, and this record.
- Changed `src/lib/checker.ts` to reject starts at or before the current minute; added an AC1 equality regression test.
- Added finite-number and day-bound validation at the checker boundary, with regression tests for `NaN` and out-of-day times.
- Removed the Vite `optimizeDeps.exclude` entry for `lucide-react` after the owner reported a Firefox module-loading error; the owner restarted Vite with forced dependency refresh and confirmed the page rendered.
- Expanded `AGENTS.md` with allowed local checks, prohibited actions, and human review gates.
- Baseline: 9/9 tests passed; typecheck, lint, and production build exited 0.
- Current working copy: 12/12 tests passed; typecheck, lint, and production build exited 0. Vite emitted an outdated Browserslist database warning.
- Git commit metadata and branch were verified against the user-provided GitHub repository. The user explicitly approved using their email as commit metadata.
- The owner manually opened the local app and supplied five evidence screenshots. They are included in `docs/evidence/` and described in `docs/final-report.md`.
