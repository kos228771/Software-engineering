# Smart Campus Room Availability Checker

A small React and TypeScript prototype that shows fictional campus rooms and sample bookings, then checks whether a selected time slot is available. It does not create real bookings or connect to a backend.

## Repository map

- `src/main.tsx` mounts the React application and global styles.
- `src/App.tsx` owns selected room, time inputs, and the page layout.
- `src/components/DayTimeline.tsx` renders the visible day scale and current-time marker.
- `src/components/RoomSchedule.tsx` renders rooms, existing bookings, and the selected interval.
- `src/components/AvailabilityChecker.tsx` presents the decision and validation reasons.
- `src/lib/checker.ts` contains the pure availability decision logic.
- `src/lib/types.ts` defines room, booking, decision, and time-limit types.
- `src/lib/timeUtils.ts` converts and positions times.
- `src/lib/sampleData.ts` contains fictional room and booking fixtures.
- `src/lib/checker.test.ts` contains the Vitest regression tests.
- `AGENTS.md` documents project boundaries and engineering expectations.
- `package.json` defines the dev, test, typecheck, lint, and build scripts; `package-lock.json` pins dependency resolution.

## Setup and commands

Use Node.js with npm. From the project root:

```sh
npm ci
npm run dev
npm run test
npm run typecheck
npm run lint
npm run build
```

`npm run dev` starts Vite's local development server. The other commands run the existing tests, TypeScript check, ESLint, and production build.

## Acceptance criteria (baseline)

The detailed baseline criteria and evidence are in [`docs/acceptance-criteria.md`](docs/acceptance-criteria.md). Before changing behavior, resolve the noted mismatch between the current-time helper text and the exact boundary accepted by the checker.

## Scope and safety

Use only the fictional fixture data. This project is an availability checker prototype: do not add login, backend integration, or real booking creation without an explicit scope change.
