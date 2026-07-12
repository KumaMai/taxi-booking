# Responsive and Visual QA Contract — Draft

Status: awaiting approval  
Related ticket: [Define Responsive and Visual QA Acceptance](tickets/06-responsive-and-qa-contract.md)

This contract defines when the editorial travel redesign is visually complete. It covers behavior and acceptance, not implementation details.

## 1. Viewport matrix

Every public page, booking step, and admin workspace should be checked at these representative widths:

| Label | Width | Primary check |
| --- | ---: | --- |
| Small phone | 375px | single-column layout, readable controls, no clipping |
| Large phone | 430px | booking cards, sticky summary, navbar menu |
| Tablet | 768px | two-column transitions and content density |
| Laptop | 1280px | primary desktop composition and tables |
| Wide desktop | 1440px | max-width, whitespace, image cropping |

Use fluid sizing between these anchors. Avoid horizontal scrolling except where a dense admin table has an explicitly labeled scroll region.

## 2. Responsive behavior rules

- Public pages collapse to one column on small phones; split editorial layouts may stack image below the route narrative.
- Booking keeps the current step and entered values when the viewport changes. The summary is sticky on desktop and collapsible on mobile.
- Navbar becomes a compact menu on phone widths; the language toggle remains reachable without opening a second nested menu.
- Admin tables become stacked cards on phone widths. Primary actions remain visible; secondary actions move into an overflow menu.
- Images use intentional crops with a stable focal point; no image may stretch, distort, or push the primary CTA below an unreasonable amount of content.

## 3. Motion and reduced motion

- Default motion is restrained: one page-entry reveal and short state transitions only where they clarify change.
- Respect `prefers-reduced-motion: reduce` by removing reveal transforms, parallax, autoplay, and non-essential animated scrolling.
- Functional feedback must never rely on animation alone; status changes, validation errors, and success messages need text and accessible semantics.
- Avoid infinite ambient motion in the hero and admin utility shell.

## 4. Keyboard and focus acceptance

- Every interactive control is reachable in logical DOM order with Tab/Shift+Tab.
- Focus is always visible against Deep Sea, Ink, Sand, and image surfaces; do not use color change alone.
- Menus, dialogs, accordions, drawers, and the booking stepper support Escape and appropriate focus return.
- A keyboard user can complete the booking flow without pointer input, including vehicle selection, date/time fields, review, and submit.
- Error summaries and the first invalid field receive an intentional focus target after submit.
- Mobile menu and admin overflow actions do not trap focus after they close.

## 5. Contrast and content checks

- Body text, labels, controls, and status text meet WCAG AA contrast against their actual surface, not only the palette swatch.
- Coral buttons must retain readable text in hover, pressed, disabled, and focus states.
- Gold is reserved for route/price emphasis and must not be the only indicator of meaning.
- Every image has useful alt text or is explicitly decorative; anonymous reviews never expose customer identity.
- English is the baseline copy; Thai toggle states preserve layout without clipped glyphs or untranslated UI labels.
- Long names, destinations, validation messages, and translated strings wrap without overlapping controls.

## 6. Screenshot acceptance set

Before calling a page complete, capture at minimum:

1. Home at 375px and 1440px.
2. Booking Journey, Contact, and Review steps at 375px and 1280px.
3. Price list, Reviews, FAQ, Contact, About, Travel, and QA/empty/error states at 375px and 1440px.
4. Admin Dashboard and Bookings at 375px and 1280px, including pending and empty states.

For each screenshot, verify: no overflow, hierarchy matches the approved wireframe, primary CTA is obvious, focus/validation state is understandable, and the footer or final action is reachable.

## 7. Definition of done

A page passes only when:

- It matches the approved page hierarchy and editorial tokens.
- It passes the viewport, keyboard, reduced-motion, contrast, localization, and content checks above.
- Its loading, empty, error, and success states have been reviewed.
- No console error, broken image, layout shift, or inaccessible interactive state remains in the acceptance screenshots.

## Approval needed

Please approve this viewport matrix and acceptance contract, or specify which breakpoint, accessibility rule, or screenshot requirement should change before this ticket is closed.
