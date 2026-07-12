---
title: Inventory Vehicle and Attraction Image Assets
type: wayfinder:task
status: closed
assignee: codex
depends_on: []
---

## Question

Which vehicle and attraction images are available, licensed, sized, and ready for
the editorial layouts, and which gaps require new photography or generated assets?

## Resolution

The repository currently has no production vehicle, attraction, or airport photos.
`docs/Web_References/*.png` are reference screenshots only and carry no licensing
metadata. The nullable `Attraction.imageUrl` field is ready for destination assets,
but vehicle imagery still needs a content/source decision because vehicle types are
static UI data. The required first-pass slots and follow-up acquisition decision are
recorded in [Image Asset Inventory](../image-asset-inventory.md).

Resolved: 2026-07-11
