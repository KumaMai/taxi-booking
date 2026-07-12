# Content and i18n Ownership Prototype

Status: draft for human review. This decides ownership and route behavior; it does
not implement translation yet.

## Recommended split

### Database-managed content

Keep editorial/business content in the database because admins may change it without
a deploy:

- `PriceZone`: `nameEn`, `nameTh`
- `PriceRoute`: `fromEn`, `fromTh`, `toEn`, `toTh`
- `FaqCategory`: `nameEn`, `nameTh`
- `Faq`: `questionEn`, `questionTh`, `answerEn`, `answerTh`
- `Attraction`: `nameEn`, `nameTh`, `descriptionEn`, `descriptionTh`, `imageUrl`
- `Setting`: operational contact values, not UI translations

The UI chooses the language field at render time. Admin edits remain in the same
record, so English and Thai versions cannot drift into separate content entries.

### Translation-resource content

Keep product/UI language in typed translation resources, for example:

```text
src/i18n/
  en.ts   # labels, navigation, actions, errors, empty/loading states
  th.ts
  types.ts
```

This includes Navbar labels, button copy, form labels, validation messages, trust
claims, metadata templates, and accessibility labels. These strings belong to the
interface and should not require an admin database edit.

### Special cases

- `Review.reviewText` stays as the submitted quote; do not machine-translate it.
- Review metadata can be localized (`Google Review` versus Thai equivalent) through UI resources.
- `Booking` data is operational and is never translated or duplicated by locale.
- `Setting` values are shared across languages unless a future business requirement explicitly needs localized values.

## Recommended locale strategy: URL prefixes

Use `/en` and `/th` route prefixes, with English as the canonical default:

```text
/            → redirect to /en
/en          → English Home
/th          → Thai Home
/en/booking  ↔ /th/booking
```

The toggle preserves the route by replacing only the locale segment. Benefits:

- Shareable language-specific URLs.
- Correct `<html lang>` and metadata per locale.
- Search engines can index both languages later.
- No client-only flash from localStorage or an opaque cookie.

Compatibility: keep redirects from current unprefixed routes during migration so
existing links do not break. API routes remain unprefixed (`/api/booking`).

## Alternatives and trade-offs

### Cookie-only toggle

Smallest routing change, but URLs are not shareable by language, server-rendered
pages need cookie-driven dynamic rendering, and SEO metadata is harder to make
deterministic.

### Query-string toggle (`?lang=th`)

Easy to prototype but noisy URLs and weaker canonical/SEO behavior; not recommended
for the travel site.

## Toggle behavior

- Show `EN / TH` in the Navbar.
- Preserve the current pathname and relevant search parameters.
- Set the document language and route metadata from the locale segment.
- If a translation is missing, fall back to English and log the missing key during development.
- Do not translate traveler-entered booking values.

## Decision needed

Approve URL prefixes (`/en`, `/th`) as the locale strategy, or choose the smaller
cookie-only toggle for the first visual pass.

