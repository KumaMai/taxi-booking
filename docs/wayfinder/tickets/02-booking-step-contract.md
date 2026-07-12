---
title: Define the Progressive Booking Step Contract
type: wayfinder:prototype
status: closed
assignee: codex
depends_on:
  - Define Page Wireframes and Copy Hierarchy
---

## Question

Which existing booking fields belong to each step, what summary is persistent,
and how do validation, back/next, mobile layout, and review/submit behave?

## Prototype

[Progressive Booking Step Contract Prototype](../booking-step-contract-prototype.md)

Drafted against the current BookingForm fields and API contract. Awaiting human
approval before this ticket can be closed.

## Resolution

Approved by the user. The booking presentation is a three-step flow: Journey,
Contact, and Review. Each step validates only its own fields, preserves values on
back navigation, exposes an accessible stepper and summary, and keeps the current
API/database/email contract unchanged. The full field order, copy, error behavior,
responsive summary, and accessibility contract live in the linked prototype.

Resolved: 2026-07-11
