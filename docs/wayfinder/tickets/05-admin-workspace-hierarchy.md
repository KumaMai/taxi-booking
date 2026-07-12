---
title: Define the Admin Workspace Hierarchy
type: wayfinder:grilling
status: closed
assignee: codex
depends_on: []
---

## Question

What is the minimum daily workflow for bookings, prices, reviews, FAQ, and settings,
and which actions deserve first-class placement in the branded utility shell?

## Prototype

See [admin-workspace-hierarchy-prototype.md](../admin-workspace-hierarchy-prototype.md).

The draft proposes a bookings-first utility workspace: Dashboard → Bookings → Prices → Content (Reviews, FAQ) → Settings, with pending-booking triage and today's pickups leading the dashboard. This ticket remains in progress pending approval.

## Resolution

Approved. The admin workspace is bookings-first and operational rather than editorial:

- Navigation order: Dashboard, Bookings, Prices, Content (Reviews and FAQ), Settings.
- Dashboard leads with pending-booking triage and today's confirmed pickups, followed by compact status counts and recent activity.
- Bookings defaults to Pending, supports search/date/status filters, responsive table-to-card behavior, detail view, valid status transitions, WhatsApp contact, and confirmation for destructive actions.
- Prices keeps the zone/route hierarchy with search/filtering, grouped Sedan/SUV/Van values, explicit save feedback, and active/hidden route state.
- Reviews prioritizes privacy-safe anonymous labels and visible/hidden moderation; FAQ supports category filtering and side-by-side English/Thai editing.
- Settings is limited to validated public business details and excludes secrets.
- The branded utility shell uses Deep Sea/Ink surfaces, Sand form areas, Coral actions, Sea Glass status, Gold price emphasis, visible focus states, and minimal motion.
- Role enum differences remain deferred until a separate permissions decision is required.

Prototype: [admin-workspace-hierarchy-prototype.md](../admin-workspace-hierarchy-prototype.md)
