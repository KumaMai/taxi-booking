# Admin Workspace Hierarchy — Draft

Status: awaiting approval  
Related ticket: [05 — Define the Admin Workspace Hierarchy](tickets/05-admin-workspace-hierarchy.md)

This draft defines the daily operating model for the admin area. It keeps the branded travel identity, but treats the admin as a focused utility workspace: fast scanning, clear status, and safe edits over editorial imagery.

## 1. Daily operating job

The operator's first job is to turn new enquiries into confirmed rides. The workspace should therefore open on operational urgency, not content maintenance:

1. Review pending bookings.
2. Confirm, cancel, or contact the customer through WhatsApp.
3. Check today's and tomorrow's pickups.
4. Maintain route prices and public content when the queue is clear.

## 2. Recommended navigation

```text
Dashboard       Today's operations
Bookings        Confirm the next ride     (primary)
Prices          Keep routes accurate
Content
  Reviews       Curate guest trust
  FAQ           Keep answers current
Settings        Business details
```

`Attractions` remains a future content destination; there is currently no admin screen for it. The navigation should not imply an unfinished workflow until that editor exists.

## 3. Dashboard — “Today's operations”

The first screen should answer “what needs attention?” in that order:

- A prominent pending-bookings queue with reference, pickup date/time, route, vehicle, and one-click Confirm / WhatsApp actions.
- A “Today” pickup strip showing confirmed rides ordered by pickup time.
- Compact status counts: Pending, Confirmed, Today, Completed.
- A recent activity table below the urgent queue.

Cancelled bookings and historical totals remain available as secondary metrics, not the visual lead.

## 4. Bookings — “Confirm the next ride”

Default state: `Pending` filter, newest enquiry first. The page needs:

- Search by booking reference, name, phone, or destination.
- Date filter (today, tomorrow, custom range) and status filter.
- A dense desktop table that becomes stacked booking cards on small screens.
- A detail drawer/page with all submitted fields, customer contact actions, and an audit-friendly status control.
- Only valid transitions in the visible action row: `Pending → Confirmed → Completed`, with `Cancelled` available before completion.
- WhatsApp as a first-class action, preserving the current contact data.

Destructive actions should require a confirmation step and show a success/error message after the server response. Form values and filters should survive a detail view returning to the list.

## 5. Prices — “Keep routes accurate”

The zone/route hierarchy is the right information model. Improve its daily usability with:

- Zone filter and route search before the full route list.
- Clearly grouped Sedan / SUV / Van price columns.
- Inline editing for a single value, with explicit Save and unsaved-change feedback.
- Active/hidden control next to the route, with a clear explanation that hidden routes disappear from public pricing.
- A compact mobile route card rather than forcing a six-column table to scroll horizontally.

The existing server validation and route update actions remain the source of truth.

## 6. Content workspace

### Reviews — “Curate guest trust”

- Default to visible reviews, with a Visible/Hidden filter.
- Show rating, source, date, and privacy-safe author label (anonymous copy is valid).
- Make the primary action `Show` / `Hide`; do not expose personal data that is not already approved for publication.

### FAQ — “Keep answers current”

- Filter by category and active/inactive state.
- Edit English and Thai in a side-by-side layout on desktop; stack the fields on mobile.
- Preserve the existing category ordering and active toggle.
- Show unsaved changes and save result clearly; do not silently overwrite another edit.

## 7. Settings — “Business details”

Settings should be operational and deliberately narrow: phone, WhatsApp, LINE, email, Facebook, location, and other public contact values. It should include:

- A grouped form with field labels and examples.
- Validation for contact formats and required public values.
- Save feedback and a read-only “what customers see” preview.
- No secrets, passwords, or SMTP credentials in this public-settings editor.

Role differences (`ADMIN` versus `SUPER_ADMIN`) are present in the schema but are not currently defined in the UI. Keep the same action surface for now and make permissions a separate decision rather than silently inventing restrictions.

## 8. Utility-shell visual rules

- Use Deep Sea / Ink surfaces with Sand text areas for readability.
- Coral is the primary action color; Sea Glass communicates confirmed/success states; Gold highlights prices and route emphasis.
- Tables are dense but breathable: strong column labels, row hover, visible focus rings, and status badges.
- No hero photography, decorative cards, or long animation in admin.
- Keep the public Navbar language switch out of the admin task area; show the current locale and a compact account/sign-out control instead.
- On mobile, keep the primary action reachable, collapse secondary navigation, and turn tables into readable cards.

## Approval needed

Please approve this navigation and workflow hierarchy, or identify any change before the ticket is closed. The next implementation work should follow the approved order, starting with the pending-booking queue and responsive utility shell.
