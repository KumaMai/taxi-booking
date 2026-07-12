# Progressive Booking Step Contract Prototype

Status: draft for human review. This changes presentation and interaction only;
the existing booking schema and `POST /api/booking` payload remain the contract.

## Contract at a glance

```text
01 JOURNEY  ─────────────  02 CONTACT  ─────────────  03 REVIEW
Where/when/how            Who/how to reach them      Confirm and send
```

The stepper is visible on desktop and mobile. The current step uses Coral; completed
steps use Sea Glass and can be revisited. Future steps are quiet and non-clickable.

## Step 1 — Tell us about your journey

### User job

Give the driver enough route, timing, vehicle, and passenger information to
understand the transfer.

### Fields and order

1. `pickupType`: Airport, Hotel, or Other — segmented choice.
2. `pickupDetail`: flight number, hotel name, or pickup address; label changes with pickup type.
3. `pickupDate` and `pickupTime`: side-by-side on desktop, stacked on narrow mobile.
4. `dropoffLocation`: full destination or hotel name.
5. `mapsLink`: optional map link, hidden behind an “Add a map link” affordance on mobile.
6. `vehicleType`: editorial vehicle cards with capacity and luggage, one selected.
7. `adultPassengers` and `childPassengers`: compact number controls.

### Copy

- Heading: `Tell us about your journey`
- Support: `Start with the route and timing. We will confirm the details with you.`
- Primary action: `Continue to contact`
- Back action: not shown on the first step

### Validation

- Validate only Step 1 fields on Continue.
- Focus the first invalid field and keep the visitor on this step.
- Airport requires flight number; Hotel requires hotel name.
- Pickup date cannot be in the past; time must be a valid local time.

## Step 2 — Where can we reach you?

### User job

Give the business a reliable way to confirm the ride without exposing unnecessary information.

### Fields and order

1. `fullName`: traveler name.
2. `phoneCountry` + `phone`: country code and phone number.
3. `email`: optional backup contact.
4. `contactChannel`: WhatsApp, LINE, WeChat, or Email.
5. `contactInfo`: matching handle, number, or email.
6. `notes`: optional requests such as child seat or luggage.

### Copy

- Heading: `Where can we reach you?`
- Support: `We use these details to confirm your pickup. Your information stays private.`
- Primary action: `Review booking`
- Back action: `Back to journey`

### Validation

- Validate only Step 2 fields on Continue.
- If Contact Channel is Email, Contact Info must be a valid email.
- Keep values when navigating backward; never reset a completed step.
- The optional notes field remains capped and never becomes a hidden free-text dump.

## Step 3 — Check your transfer details

### User job

Catch mistakes before the request is sent and understand what will happen next.

### Layout

```text
┌ route card ──────────────┬ contact card ───────────────┐
│ Airport → Khao Lak       │ Jane Traveller              │
│ 12 Jan 2027 · 12:30      │ WhatsApp · +66 …            │
│ SUV · 2 adults           │ Email (if supplied)         │
└──────────────────────────┴────────────────────────────┘
pickup detail / map / notes appear only when supplied
```

### Copy

- Heading: `Check your transfer details`
- Support: `Everything look right? Send the request and we will confirm the ride.`
- Primary action: `Send booking request`
- Back actions: `Edit journey` and `Edit contact`
- Reassurance: `No deposit required · Pay after your trip`

### Submit behavior

- Disable the submit action while the request is in flight.
- On success, show the booking reference and a direct WhatsApp confirmation link.
- On validation/API failure, keep all entered values and show the error near the relevant area.
- On network failure, offer `Try again` without duplicating the request in the UI.

## Persistent summary

Desktop shows a sticky summary beside the step content. Mobile shows a compact
collapsed summary with an expand button. The summary never invents a fare because
the current API does not calculate one; it shows route, date/time, vehicle, and
passenger count only.

## Responsive and accessibility contract

- Mobile-first; no horizontal scrolling for cards or stepper.
- Step changes announce the new heading to screen readers and move focus to it.
- Stepper uses an ordered list with current/completed state, not decorative dots alone.
- Vehicle cards expose radio semantics and selected state.
- Every error is associated with its input and announced.
- Reduced motion removes route transitions but keeps state changes visible.

## Implementation boundary

Do not change the database schema, API field names, email payload, validation rules,
or booking success semantics in this ticket. Those belong to later implementation
work after the contract is approved.

