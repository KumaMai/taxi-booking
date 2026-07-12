# Repository review — 2026-07-12

## Scope and verification

Reviewed the public pages, booking flow, Admin server actions, Prisma schema/migrations, SQL/query patterns, email path, and CI configuration using the `scrutinize`, `webapp-testing`, `review-sql`, and `postgres-pro` workflows.

Verification completed (latest run):

- `pnpm test`: 14/14 passed
- `pnpm typecheck`: passed
- `pnpm lint`: passed
- `pnpm build`: passed
- Docker PostgreSQL health endpoint: HTTP 200
- Browser checks for EN/TH public routes and Booking flow: passed

## Current status at a glance

### Done

- Phase 0–3 foundations and all seven public content pages.
- Phase 4 booking wizard, Zod validation, persistence, email notification, honeypot, map-URL validation, and rate limiting.
- Admin login, dashboard, bookings status workflow, prices, reviews, FAQ, and settings CRUD.
- `ADMIN` vs `SUPER_ADMIN` authorization boundaries for destructive/configuration mutations.
- Notification delivery state, three-attempt background retry, and Admin visibility for pending/failed notifications.
- PostgreSQL query indexes and migrations for booking, route, review, FAQ, and attraction access paths.
- Server-side pagination for Admin bookings, public reviews, and Audit Logs.
- Optional Upstash Redis distributed rate limiting with local development fallback.
- Shared navigation/common locale dictionary, English default, Thai toggle, and locale unit tests.
- Playwright smoke workflow in CI and corrected EN/TH browser checks.
- Admin Editorial visual cleanup for settings, bookings, FAQ, prices, reviews, and sidebar.
- Audit log schema, instrumentation for Admin mutations, and Super Admin Audit Logs page.
- Deployment checklist and repository review documentation.

### Not done / remaining

- Production deployment to VPS, Nginx, SSL, backups, and GitHub Actions deployment secrets.
- Production SMTP and Upstash credentials/configuration; local fallback is not a production substitute.
- Production alerting for repeated notification failures (Admin retry action is now available to `SUPER_ADMIN`).
- Full locale ownership migration: several page/database strings still use inline or fallback copy; metadata is not fully localized per locale route.
- Complete SEO package: canonical URLs, sitemap/robots, hreflang strategy, and structured data validation.
- Broader end-to-end coverage for Admin mutations, notification failure/retry paths, and real SMTP integration.
- Product features not yet implemented: booking timeline, driver assignment/fleet management, calendar view, dynamic pricing, analytics, exports, customer reference lookup, and payment/deposit support.
- Operational safeguards still needed before launch: retention/redaction policy for audit metadata, alerting for repeated notification failures, and scheduled database backup restore drills.

## Findings by priority

### Resolved high-priority findings

1. Notification delivery now persists status/attempt/error timestamps and retries up to three times.
2. Common booking/admin query paths now have explicit composite indexes.
3. Configuration/content mutations now require `SUPER_ADMIN`; routine booking status changes require `ADMIN`.

### Partially resolved medium-priority findings

4. Reviews and Admin bookings now use server-side pagination.
5. Upstash distributed limiting is available when production credentials are configured; local fallback remains process-local.
6. Navigation/common copy is centralized, but full page/database locale ownership is still incomplete.
7. Playwright smoke checks now run in CI; deeper Admin and failure-path coverage remains.

### Remaining low-priority findings

8. Some Admin screens still use the older palette and contain legacy encoding/English copy.
9. `reviewTextTh` is nullable; missing translations currently fall back to a generic Thai placeholder.

## Recommended next sequence

1. Production readiness: configure secrets, deploy VPS/Nginx/SSL, backups, and rollback checks.
2. Add an authenticated Admin notification retry action plus failure alerting.
3. Finish locale/SEO ownership and validate every public route in EN/TH.
4. Expand Playwright coverage to Admin workflows and notification failure states.
5. Add operational retention/redaction and backup restore drills.
6. Prioritize product features based on business demand (timeline, driver/fleet, calendar, pricing, analytics, exports, payments).

## Feature opportunities still open

Booking timeline, driver assignment, calendar view, dynamic route pricing, analytics, CSV/PDF export, customer reference lookup, payment/deposit support, SEO structured data, and fleet management.

## Verdict

Fix-then-ship: the core application and Admin workflows are verified; production deployment, full localization/SEO, operational safeguards, and deeper failure-path tests remain before launch.

## Progress since review

- Added Booking notification status, attempt count, last error, sent timestamp, and three-attempt retry handling.
- Added indexes for booking status/date, price routes, reviews, FAQs, and attractions.
- Applied migrations `20260712082604_add_booking_notification_status` and `20260712082720_add_query_indexes` locally.
- Added `requireSuperAdmin()` and restricted settings, prices, FAQ, and review mutations to `SUPER_ADMIN`.
- Added server-side pagination to Admin bookings and public reviews.
- Added optional Upstash Redis distributed rate limiting with a local fallback for development.
- Added a shared `src/lib/i18n.ts` dictionary for navigation/common copy and locale completeness tests.
- Added Playwright browser smoke tests to CI, including database seed, production server startup, and EN/TH Booking checks.
- Refreshed the Admin settings surface and corrected the bookings page heading contrast to match the Editorial utility palette.
- Corrected FAQ, Prices, and Reviews Admin headings so they remain readable on the Editorial light shell.
- Updated FAQ and Prices form controls to use the Editorial light input treatment with readable contrast and focus states.
- Added `audit_logs` with indexed actor/entity lookups and instrumented Admin booking, settings, price, FAQ, and review mutations.
- Added the Super Admin `/admin/audit-logs` page with server-side pagination and a navigation entry.
- Added notification observability to the Admin dashboard and bookings table, exposing pending/failed delivery counts and per-booking notification status.
- Added a `SUPER_ADMIN`-only Admin notification retry action with success/failure audit events and safe revalidation.
- Added canonical metadata, Open Graph defaults, `sitemap.xml`, `robots.txt`, and TaxiService JSON-LD for public pages.
- Added locale-aware `generateMetadata()` for all public routes, with EN/TH titles, descriptions, canonical paths, and Open Graph locale values.
- Added CI Playwright coverage for Admin login, bookings notification visibility, and the Super Admin Audit Logs page.
- Verified the Admin browser flow locally against the Docker-backed production server; local non-Super Admin accounts intentionally skip the Super Admin-only Audit Logs assertion, while CI seeds and asserts a `SUPER_ADMIN` account.
- Added production environment validation, CI runtime smoke checks, and documented backup/rollback verification steps.
- Researched current managed deployment alternatives and recorded a Railway-first launch recommendation in `docs/deployment-options-2026-07-12.md`; VPS remains the long-term control/cost option.
- Diagnosed Railway build failure: GitHub snapshot was older than the local workspace and lacked `packages: ["."]` in `pnpm-workspace.yaml`; added a staging guide warning to commit/push before deploying.
- Fixed clean-builder Prisma generation by changing the repository `build` script to run `prisma generate` before `next build`.
