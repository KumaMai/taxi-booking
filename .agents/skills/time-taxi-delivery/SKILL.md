---
name: time-taxi-delivery
description: Build, review, localize, test, and stage the Time Taxi Khao Lak Next.js booking site. Use for any change in this repository involving the editorial travel UI, Thai/English copy, booking/admin flows, Prisma/PostgreSQL, Docker, or Railway deployment and diagnosis.
---

# Time Taxi Delivery

Deliver changes to this repository as a tested vertical slice. Preserve the editorial travel design, English-first public experience with a Thai toggle, and staging safety.

## Start every task

1. Read `AGENTS.md`, then inspect `git status --short`; preserve unrelated changes.
2. Identify the affected route, component, API handler, and database path before editing.
3. Select supporting skills only when they add value:
   - `frontend-design` for visual/page work.
   - `scrutinize` for a review or an explicit `$scrutinize` request.
   - `debug-mantra` for any failure; recite its mantra before diagnosis.
   - `webapp-testing` for browser-based verification.
   - `prisma-cli`, `database-migration`, or `database-schema-design` for Prisma/data changes.
4. Keep credentials, connection strings, screenshots containing secrets, and customer data out of source control and reports.

## Product guardrails

- The public site is English by default. The navbar locale toggle must switch the complete visible page to Thai and remain accessible on desktop and mobile.
- Treat cars and attraction content as provisional. Use editable data/settings rather than presenting them as immutable facts.
- Keep the design intentional: dark navy, gold editorial accents, travel photography, generous whitespace, and clear conversion paths. Do not replace it with generic dashboard styling.
- Preserve the core offer: no deposit, pay after trip, 24/7 service, English-speaking drivers.
- Use anonymized review copy unless approved customer consent exists.
- Contact details are business content: retrieve them from settings or the approved source of truth; do not invent alternatives.

## Change workflow

### UI and localization

1. Find all rendering paths for the content: shared components, page components, form labels, validation errors, loading states, metadata, and database-backed data.
2. Extend the locale dictionary/type before rendering a new key. Do not leave fallback English in Thai cards, hero content, reviews, journey steps, or booking wizard states.
3. Test EN and TH in a browser at desktop and mobile widths. Search for both untranslated English and accidentally untranslated Thai after the switch.
4. Keep form values, route identifiers, and service names stable while translating display text.

### Booking, admin, and API work

1. Validate user input on client and server with the shared Zod schema.
2. Persist the booking before attempting notification. A notification failure must not turn a valid saved booking into a failed booking.
3. Bound SMTP/network timeouts; verify the response time with a request that exercises the notification path.
4. Keep admin routes authenticated and verify both the unauthenticated redirect and valid credential flow after an auth change.
5. Treat generated or test bookings as staging data and label them clearly in test notes.

### Prisma and data

1. Prisma 7 uses `prisma.config.ts` for `DATABASE_URL` and `PrismaPg` adapter instances in application and scripts.
2. Use migrations for schema changes; inspect constraints and existing data before applying a mutation.
3. Never run the full `prisma db seed` against Railway production/staging if it contains `deleteMany` calls. The production guard is intentional.
4. Use an idempotent, upsert-only bootstrap task for a first admin account or safe defaults. Keep destructive demo seeding development-only.
5. When production public pages are empty, use `pnpm run bootstrap:public-content` only after confirming it creates records solely for empty tables; never invoke the destructive development seed.
6. Verify database connectivity through the deployed health endpoint and a real read/write path, not configuration screenshots alone.

### Railway staging

Follow `references/railway-staging.md` before changing Railway configuration or responding to a build/runtime failure.

## Required verification

Run the narrowest relevant checks first, then the full gate for code changes:

```powershell
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

For staging, also run:

```powershell
pnpm check:production-env
pnpm smoke https://<railway-domain>
```

Use browser testing for changed public/admin flows. Record the URL, routes exercised, locale coverage, and any deliberately skipped external-email assertions in `docs/repo-review-YYYY-MM-DD.md` or the relevant deployment guide.
For database-backed public pages, assert representative records on `/price-list`, `/reviews`, `/qa`, and `/travel`; an HTTP 200 alone is insufficient.

## Review and completion

1. Use `scrutinize` to trace the actual code path when requested or before closing a risky cross-cutting change.
2. Report findings by severity: Critical, High, Medium, Low; fix in that order when authorized.
3. Do not claim a deploy is working solely because the build passes. Verify runtime database access, Auth.js secret configuration, the public site, booking API, and admin access.
4. Stage only files belonging to the task. Commit with a focused conventional message and push only when the user requested repository publication.

## References

- Read `references/railway-staging.md` for the known Railway failure modes, variables, and safe recovery sequence.
- Read `references/project-map.md` for the architecture, commands, page/test checklist, and design/i18n acceptance criteria.
