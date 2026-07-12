# Vehicle and Attraction Image Asset Inventory

Resolved from the current repository state on 2026-07-11.

## Available now

| Asset group | What exists | Production readiness |
|---|---|---|
| Vehicle photography | None in `public/` or `docs/Web_References/` | Missing |
| Attraction photography | None in `public/` or seed data | Missing |
| Airport/route photography | None | Missing |
| UI/reference screenshots | `docs/Web_References/*.png` | Reference only; no license metadata |
| Default SVGs | Next starter assets in `public/` | Not suitable for the brand |

The repository contains reference screenshots for Home, Booking, About, prices,
and attractions, but they are design references rather than reusable production
photographs. They should not be copied into the public site as content.

## Data readiness

- `Attraction.imageUrl` exists and is nullable, so attraction imagery can be added
  without a schema redesign.
- `Review.photoUrl` exists but anonymous reviews do not require customer photos.
- Vehicle types are currently static UI data in `VehicleCards.tsx` and
  `VehicleSelector.tsx`; there is no vehicle image field or vehicle content table.
- Seeded attractions have names/descriptions but no image URLs.

## Required first-pass slots

1. One route/airport image for the Home hero.
2. Three vehicle images: Sedan, SUV, Van.
3. Six attraction images matching the seeded destinations.
4. One fallback crop/texture for loading and missing-image states.

Prefer local optimized assets under `public/images/` for the first pass. Use
`next/image` with explicit dimensions and meaningful alt text. Remote image hosts
should not be added until their licensing and domain are approved.

## Missing decision

No license/source information exists in the repository. A follow-up ticket must
choose whether the first asset set comes from owner photography, licensed stock,
or generated imagery before implementation uses real files.

