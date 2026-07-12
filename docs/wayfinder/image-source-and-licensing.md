# Image Source and Licensing Decision

Decision date: 2026-07-11  
Related ticket: [Choose the Image Acquisition Source](tickets/07-image-acquisition-source.md)

## Approved first-pass strategy

Use a deliberate combination:

1. **Owner-provided photography is preferred** for the actual Time Taxi vehicles, drivers (when consented), and local routes. It is the most authentic source and should replace placeholders whenever supplied.
2. **Licensed stock photography is the launch fallback** for the airport/route hero and the six attraction slots when owner photography is unavailable. Buy or download only from a source with a commercial web license that explicitly covers this use.
3. **Generated imagery is limited to temporary concept or loading placeholders.** It must not imply that a generated vehicle or destination is a real customer/service photograph.

This gives the redesign a shippable visual baseline without inventing claims about the fleet or local places, while leaving room to upgrade the imagery with owner material.

## Required source record

For every production file, record a row in `docs/wayfinder/image-license-register.md` before it is committed:

| Field | Required value |
| --- | --- |
| Asset filename | path under `public/images/` |
| Usage slot | hero, sedan, SUV, van, attraction slug, or fallback |
| Source | owner / stock provider / generated |
| Original URL or consent reference | URL, invoice, or owner consent note |
| Creator / provider | person or provider name |
| License | commercial terms, purchase ID, or consent scope |
| Credit requirement | credit text or `none` |
| Date obtained | ISO date |
| Editor | person who prepared the crop/optimization |

No image with an unknown source, unclear commercial rights, or copied reference-screenshot provenance may enter `public/images/`.

## Delivery rules

- Store optimized local files under `public/images/` with stable slugs.
- Keep the original source URL and license evidence outside the rendered UI; the register is the audit trail.
- Use `next/image`, explicit dimensions, meaningful alt text, and a documented focal point for crops.
- Keep a neutral local fallback texture for loading/missing-image states.
- Replacing stock with owner photography must not change the content model or page layout.

## Follow-up ownership

Before implementation starts, the project owner supplies owner photography or approves the selected stock provider and license records. The visual redesign can proceed with documented placeholders until that handoff is complete.
