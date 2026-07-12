---
title: Decide Content and Translation Ownership
type: wayfinder:grilling
status: closed
assignee: codex
depends_on:
  - Define Page Wireframes and Copy Hierarchy
---

## Question

Which content is managed in the database, which UI strings live in translation
resources, and how does the English/Thai toggle preserve the current route?

## Prototype

[Content and i18n Ownership Prototype](../content-and-i18n-ownership-prototype.md)

Drafted against the current Prisma bilingual fields and App Router structure.
Awaiting a decision on locale URL strategy before closing this ticket.

## Resolution

Approved by the user. Editorial/business content remains in the existing bilingual
Prisma fields; UI labels, actions, errors, metadata templates, and accessibility
copy belong in typed `src/i18n/en.ts` and `src/i18n/th.ts` resources. The locale
strategy is URL prefixes with English canonical: `/en/...` and `/th/...`, while
unprefixed legacy routes redirect compatibly and `/api/*` remains unchanged.

Resolved: 2026-07-11
