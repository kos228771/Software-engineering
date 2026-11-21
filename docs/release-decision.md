# Release decision - reviewed prototype

## Decision: CONDITIONAL

This decision applies only to the fictional-data room availability prototype reviewed at commit `f6a2c87`. It is not approval for a live booking system or production deployment.

## Evidence

- Current suite: 10/10 Vitest tests passed after the AC1 strict-after mitigation.
- TypeScript check, ESLint, and Vite production build exited 0.
- AGENTS.md now limits work to local checks and requires human review before merge/deployment.
- No backend, login, or real booking creation exists in the reviewed scope.

## Conditions and owners

1. **Student/owner:** keep this version limited to fictional fixtures and the fixed time-selection UI. Do not treat its decision function as safe for arbitrary external input until R2 finite-value validation is resolved.
2. **Student/owner:** confirm whether the AC1-AC6 reference in the original AGENTS.md was stale; only AC1-AC5 are currently defined and tested.
3. **Student/owner:** inspect the local UI at the target viewport and retain a screenshot for submission; the recorded verification so far is automated and does not establish visual or responsive behavior. A local server started, but the Windows computer-use tool stopped because browser URL policy enforcement is unsupported in this environment. The server was stopped afterward.
4. **Student/owner:** review the unused Supabase dependency before removing or retaining it; no change has been made.

Reassess after the conditions are closed or explicitly accepted. No deployment is authorized by this decision.
