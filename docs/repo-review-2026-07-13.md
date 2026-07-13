# Repository review — 2026-07-13

## Scope

Reviewed the public booking flow end-to-end: shared public navigation, `/booking`, `POST /api/booking`, shared Zod validation, booking persistence, and post-persistence email notification.

## Findings and resolution

### High — mobile visitors could not change the visible locale

`Navbar` only rendered `LanguageToggle` in the desktop action area. At mobile widths, the menu contained navigation, social links, and the booking CTA but no EN/TH selector. The mobile menu now includes the same locale toggle, preserving the cookie-backed page refresh and accessible pressed state.

### Medium — the booking wizard could advance past invalid journey/contact input

The wizard validated only a subset of fields before advancing. Invalid passenger counts, vehicle values, map URLs, and email addresses could reach the review step, where their errors were not visible. Each step now validates every field in that step before it advances.

## Verification

- `node node_modules/typescript/bin/tsc --noEmit --incremental false` — passed.
- `node node_modules/eslint/bin/eslint.js .` — passed.
- `node node_modules/tsx/dist/cli.mjs --test src/**/*.test.ts` — passed: 14 tests.
- `node node_modules/prisma/build/index.js generate` — passed.
- `node node_modules/next/dist/bin/next build` — passed.
- The temporary local Next.js server became ready on `http://127.0.0.1:3000`.

Browser interaction coverage for `/` at mobile width and `/booking` was deliberately skipped: the configured Python environment does not have the `playwright` module. No synthetic booking was submitted, so no database record or email notification was generated.

## Environment notes

The `pnpm` executable failed before running scripts with `fetch failed`; direct project-local executables were used for verification. Sandboxed Node worker processes also returned `spawn EPERM`, while the same test and build commands completed successfully when allowed to run outside the sandbox.
