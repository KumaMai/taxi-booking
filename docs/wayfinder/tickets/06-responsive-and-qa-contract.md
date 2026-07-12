---
title: Define Responsive and Visual QA Acceptance
type: wayfinder:grilling
status: closed
assignee: codex
depends_on:
  - Define Page Wireframes and Copy Hierarchy
  - Define the Progressive Booking Step Contract
---

## Question

Which viewport breakpoints, reduced-motion rules, keyboard/focus requirements,
contrast checks, and screenshot acceptance criteria define design completion?

## Prototype

See [responsive-and-visual-qa-contract-prototype.md](../responsive-and-visual-qa-contract-prototype.md).

The draft proposes a five-width matrix (375, 430, 768, 1280, 1440), reduced-motion compliance, keyboard/focus acceptance, contrast and bilingual content checks, and a screenshot set covering public, booking, and admin states. This ticket remains in progress pending approval.

## Resolution

Approved. The redesign completion contract is:

- Validate at 375px, 430px, 768px, 1280px, and 1440px with no unintended overflow.
- Stack public editorial layouts and booking summaries appropriately; preserve booking values across viewport changes.
- Convert admin tables to readable cards on phones while keeping primary actions visible.
- Respect `prefers-reduced-motion` and never rely on animation for functional feedback.
- Require logical keyboard order, visible focus, Escape/focus return for overlays, and focusable booking errors.
- Check WCAG AA contrast on actual surfaces, bilingual wrapping, safe anonymous review labels, and useful image alt text.
- Review the defined screenshot acceptance set across public pages, all booking steps, admin dashboard/bookings, and empty/error/success states.
- Definition of done includes no console errors, broken images, layout shifts, or inaccessible interaction states in the acceptance set.

Prototype: [responsive-and-visual-qa-contract-prototype.md](../responsive-and-visual-qa-contract-prototype.md)
