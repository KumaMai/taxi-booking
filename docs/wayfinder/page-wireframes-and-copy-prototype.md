# Page Wireframes and Copy Prototype

Status: draft for human review. This is the resolution candidate for
[Define Page Wireframes and Copy Hierarchy](tickets/01-page-wireframes-and-copy.md).

## Global content rules

- English is the source copy; Thai mirrors the same meaning and hierarchy.
- Every page has one primary action: **Book a transfer**.
- Secondary actions use **View prices**, **See routes**, or **Message us**.
- Use traveler language: "pickup", "drop-off", "flight number", and "vehicle".
- Do not publish customer names; reviews show quote, rating, source, and month/year.
- Keep the route ribbon visible on conversion pages, but do not decorate unrelated content.

## Global shell

```text
┌ logo / route identity ─ Prices ─ Travel ─ Reviews ─ About ─ Contact ─ TH/EN ┐
│                                                              [Book a transfer] │
└───────────────────────────────────────────────────────────────────────────────┘
```

The mobile shell keeps the logo, language toggle, and a compact Book action visible;
the remaining links live in a drawer.

## 1. Home — turn arrival intent into a confident enquiry

```text
┌ editorial split hero: route statement │ vehicle/airport image ┐
├ trust strip: pay after trip · 24/7 · English-speaking drivers ┤
├ three vehicle cards + starting prices ─────── [View prices] ──┤
├ route ribbon: Phuket Airport ↔ Khao Lak ──── [Book transfer] ─┤
├ anonymous review quotes: 3 cards ─────────── [All reviews] ──┤
├ attraction editorial rail ─────────────────── [Explore travel] ┤
└ quiet contact close ───────────────────────── [Message us] ───┘
```

Copy hierarchy:

1. Eyebrow: `PRIVATE TRANSFERS · SOUTHERN THAILAND`
2. Headline: `Arrive in Khao Lak without the rush.`
3. Support: `Private airport transfers from Phuket, with a driver who is ready when you land.`
4. Primary CTA: `Book your transfer`
5. Secondary CTA: `View prices`
6. Trust copy: `Pay after your trip · No deposit required`

## 2. Booking — complete the request without feeling overwhelmed

```text
┌ progress: 01 Trip ───── 02 Contact ───── 03 Review ┐
├ step content                             ┬ summary  ┤
│ short labels, examples, inline errors    │ route    │
│                                          │ vehicle  │
│ [Back]                         [Continue]│ help CTA │
└──────────────────────────────────────────┴──────────┘
```

Step copy:

- Step 1 title: `Tell us about your journey`
- Step 1 fields: pickup type/detail, date, time, drop-off, vehicle, passengers.
- Step 2 title: `Where can we reach you?`
- Step 2 fields: name, phone, email, preferred contact channel, contact detail, notes.
- Step 3 title: `Check your transfer details`
- Review CTA: `Send booking request`
- Confirmation: `Your request is on its way` + booking reference + `Message us on WhatsApp`.

## 3. Price List — answer “how much?” quickly

```text
┌ route heading + short context ─────────────── [Book transfer] ┐
├ search / zone filter / language-aware route labels ────────────┤
├ route rows: From · To · Sedan · SUV · Van ─────────────────────┤
└ reference-price note + WhatsApp close ─────── [Ask for a quote] ┘
```

Copy hierarchy:

- Headline: `Transfer prices, at a glance.`
- Support: `Reference rates in THB. Your final fare depends on the exact pickup and drop-off.`
- Table action: `Book this route`
- Empty filter state: `No routes match that search. Try a nearby destination or message us.`

## 4. Contact — make direct contact feel immediate

```text
┌ contact headline + availability ───────────────────────────────┐
├ WhatsApp (primary) │ LINE │ Phone │ Email ─────────────────────┤
├ location / service area note ──────────────────────────────────┤
└ compact CTA: `Tell us where you are going` ─ [Book a transfer] ┘
```

Copy hierarchy:

- Headline: `Questions before you travel?`
- Support: `Send your route and arrival time. We reply as soon as we can, 24/7.`
- Primary CTA: `Chat on WhatsApp`

## 5. Reviews — provide proof without exposing customer identity

```text
┌ review headline + aggregate trust line ────────────────────────┐
├ featured quote (large editorial type) ─────────────────────────┤
├ review grid: quote / stars / source / month-year ──────────────┤
└ conversion close ─────────────────────────── [Book with us] ──┘
```

Copy hierarchy:

- Headline: `A calmer way to arrive.`
- Support: `What travelers remember after the journey.`
- Card metadata: `★★★★★ · Google Review · May 2026`
- No-data state: `Reviews will appear here after they are approved.`

## 6. About — establish the human promise

```text
┌ portrait/vehicle image + “who we are” statement ──────────────┐
├ service principles: safe · clear · local · on time ────────────┤
├ service coverage / vehicle note ────────────────────────────────┤
└ CTA ───────────────────────────────────────── [Plan your trip] ┘
```

Copy hierarchy:

- Headline: `A local driver for the whole journey.`
- Support: `Time Taxi Khaolak connects airport arrivals, hotels, and the places worth taking the long way to.`
- CTA: `Plan your transfer`

## 7. FAQ — remove the final hesitation

```text
┌ question headline + WhatsApp fallback ─────────────────────────┐
├ category tabs ──────────────────────────────────────────────────┤
├ accordion: question → concise answer ───────────────────────────┤
└ unresolved question close ───────────────── [Ask on WhatsApp] ┘
```

Suggested category order: Booking, Pickup, Payment, Vehicles.

- Headline: `Good to know before you go.`
- Empty state: `We are adding answers for this category.`

## 8. Travel Recommendations — turn destinations into routes

```text
┌ destination headline + short local context ────────────────────┐
├ featured attraction image/story ────────────────────────────────┤
├ destination cards: image · name · why go · route CTA ───────────┤
└ CTA ───────────────────────────────────────── [Book a day trip] ┘
```

- Headline: `Places worth taking the long way to.`
- Support: `A few Southern Thailand stops our drivers know well.`
- Card CTA: `Plan this journey`

## Shared states

- Loading: preserve the editorial frame with a quiet Sand skeleton; do not flash a blank page.
- Error: name the failed area and offer a direct WhatsApp fallback.
- Empty: explain what the visitor can do next; never leave a silent blank grid.
- Reduced motion: remove route-line animation while keeping the route visible.

## Critique pass

- The route ribbon is the one bold signature; cards, shadows, and rounded corners stay restrained.
- Home and Booking share the same promise but have different jobs: inspire versus complete.
- Price List is intentionally dense; it gets search and table affordances instead of editorial decoration.
- Reviews remain useful without requiring names, photos, or personally identifying information.
- Every page ends with a next action, but only one action is visually dominant.

