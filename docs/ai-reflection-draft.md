<!-- Draft for student review. Reflection word count: 286. -->

# AI reflection (draft)

I used OpenAI Codex (GPT-6) on 21 November 2026 for Software Engineering Assignment 05. I gave it the local project path and asked it to inspect the structure, preserve a baseline, and review the instructions, tests, and availability logic. It saw source files, AGENTS.md, package.json, package-lock.json, existing tests, and fictional room data. No credentials or real booking records were shared.

A useful suggestion was to preserve the baseline and compare the current-time rule in the checker with the interface text. The baseline allowed a slot starting exactly at the current time even though the interface said “after.” I chose the strict-after rule; Codex changed the comparison and added a regression test. The reported suite went from 9 to 10 passing tests, and typecheck, lint, and production build passed. I reviewed the reported evidence before accepting that change.

A weak early AI assessment was that my OOP project might be a suitable assignment candidate after only a structural inspection. I ran its launch script and saw 174 compilation errors, so I rejected that project and switched to Smart Campus, which already had a test suite and lockfile. Another unverified AI finding was that the Supabase SDK appears unused. Since it could be reserved for future work, I left it in place.

The updated AGENTS.md helped by defining allowed checks, prohibited actions, and human review gates. I also found its AC6 reference was undefined and documented that gap rather than guessing. I launched the app locally and captured screenshots after Codex's browser tool could not open the local address. Next time I would clarify criteria earlier, add a UI interaction test, and inspect the interface visually before deciding release readiness. This reflection is a draft; I should edit it to match my own voice and confirm every statement before submission.
