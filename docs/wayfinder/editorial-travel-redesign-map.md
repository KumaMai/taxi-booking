---
title: Editorial Travel Redesign — Time Taxi Khaolak
type: wayfinder:map
label: wayfinder:map
status: closed
tracker: local-markdown
---

## Destination

Produce a complete visual redesign specification for every public and admin page,
ready for implementation without changing the existing database, booking API, or
business logic.

## Notes

Domain: private airport transfers and travel in Southern Thailand.

Skills for every session: `frontend-design`, `wayfinder`, `nextjs-app-router-patterns`,
and `vercel-react-best-practices`.

Standing preferences: English first with a Thai toggle; mobile-first; documentary-
luxury tone with tropical adventure and friendly local service; protect customer
privacy; make the booking conversion path obvious.

## Decisions so far

- [Editorial Travel Style](decisions/editorial-travel-style.md) — Distinctive travel-magazine direction grounded in the Andaman route.
- [English-First Bilingual Experience](decisions/english-first-bilingual.md) — English is the default and Thai is switchable from the Navbar.
- [Vehicle and Attraction Imagery](decisions/vehicle-attraction-imagery.md) — Vehicles and destinations are the first visual content set and remain replaceable.
- [Progressive Booking Flow](decisions/progressive-booking-flow.md) — Booking is a three-step flow: trip, passenger/contact, review/submit.
- [Documentary-Luxury Voice](decisions/documentary-luxury-voice.md) — Warm, trustworthy, tropical, and locally friendly rather than resort-glossy.
- [Route-First Home Hero](decisions/route-first-home-hero.md) — Phuket Airport ↔ Khao Lak is the hero thesis with a primary booking CTA.
- [Price Teaser on Home](decisions/price-teaser-on-home.md) — Show starting prices and send visitors to the full route list.
- [Anonymous Review Format](decisions/anonymous-review-format.md) — Show quote, rating, source, and month/year without customer names.
- [Editorial Split Hero](decisions/editorial-split-hero.md) — Text/route narrative and vehicle/airport image share a responsive split layout.
- [Fraunces and DM Sans](decisions/fraunces-and-dm-sans.md) — Fraunces carries editorial display type; DM Sans handles utility and forms.
- [Coral Conversion Actions](decisions/coral-conversion-actions.md) — Coral is the primary CTA; gold is reserved for price and route highlights.
- [Conversion-First Navbar](decisions/conversion-first-navbar.md) — Prices, Travel, Reviews, About, Contact, language toggle, and a prominent Book button.
- [Branded Admin Utility Shell](decisions/branded-admin-utility-shell.md) — Admin shares brand tokens but prioritizes tables, filters, and actions.
- [Visual-Only First Pass](decisions/visual-only-first-pass.md) — Preserve database/API/booking logic while replacing the visual layer first.
- [Page Wireframes and Copy Hierarchy](tickets/01-page-wireframes-and-copy.md) — Approved section structure, copy hierarchy, CTA roles, and shared states for every public page.
- [Progressive Booking Step Contract](tickets/02-booking-step-contract.md) — Approved Journey, Contact, and Review steps with field ownership, validation, summary, and accessibility behavior.
- [Content and Translation Ownership](tickets/03-content-and-i18n-ownership.md) — Existing bilingual DB fields own editorial content; typed resources own UI copy; `/en` and `/th` preserve language in shareable URLs.
- [Vehicle and Attraction Image Inventory](tickets/04-image-asset-inventory.md) — No production photography is present; attraction slots are DB-ready and vehicle assets need a source decision.
- [Define the Admin Workspace Hierarchy](tickets/05-admin-workspace-hierarchy.md) — Approved bookings-first utility workspace with pending triage, responsive operational tables, and focused content/settings tools.
- [Define Responsive and Visual QA Acceptance](tickets/06-responsive-and-qa-contract.md) — Approved five-width responsive matrix, accessibility/reduced-motion checks, and screenshot-based definition of done.
- [Choose the Image Acquisition Source](tickets/07-image-acquisition-source.md) — Approved owner photography first, licensed stock fallback, generated imagery only for temporary placeholders, with a required license register.

## Not yet specified

The visual redesign map is fully specified. Asset delivery remains an implementation handoff governed by the image license register.

## Out of scope

- Backend/schema redesign during the first visual pass.
- Payment collection or deposit functionality.
- Customer accounts and self-service booking management.
- Replacing the current email/notification provider.
