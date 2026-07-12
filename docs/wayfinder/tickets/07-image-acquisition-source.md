---
title: Choose the Image Acquisition Source
type: wayfinder:grilling
status: closed
assignee: codex
depends_on:
  - Inventory Vehicle and Attraction Image Assets
---

## Question

Will the first production image set use owner-provided photography, licensed stock,
generated imagery, or a deliberate combination, and where will licensing/source
metadata be recorded?

## Resolution

Approved as a deliberate combination: owner-provided photography is preferred for vehicles, drivers (with consent), and local routes; licensed stock is the production fallback for the hero and attractions; generated imagery is restricted to temporary concept or loading placeholders and must not imply a real service photograph.

Every production image must be local under `public/images/` and recorded in the [image-license-register.md](../image-license-register.md) with filename, slot, source, original URL or consent reference, creator/provider, license, credit requirement, date, and editor. Unknown provenance or unclear commercial rights is not acceptable. `next/image`, explicit dimensions, meaningful alt text, focal-point crops, and a neutral fallback texture are required.

Decision record: [image-source-and-licensing.md](../image-source-and-licensing.md)
