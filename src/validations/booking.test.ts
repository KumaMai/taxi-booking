import assert from "node:assert/strict";
import test from "node:test";

import { bookingSchema } from "./booking";

function validBooking(): Record<string, unknown> {
  return {
    fullName: "Jane Traveller",
    phoneCountry: "+66",
    phone: "0812345678",
    email: "jane@example.com",
    adultPassengers: 2,
    childPassengers: 0,
    pickupDate: "2099-01-01",
    pickupTime: "12:30",
    vehicleType: "SUV",
    pickupType: "AIRPORT",
    pickupDetail: "TG201",
    dropoffLocation: "Khao Lak",
    mapsLink: "https://maps.app.goo.gl/example",
    contactChannel: "WHATSAPP",
    contactInfo: "+66812345678",
    notes: "Two suitcases",
    website: "",
  };
}

test("accepts a valid booking", () => {
  assert.equal(bookingSchema.safeParse(validBooking()).success, true);
});

test("rejects a pickup date in the past", () => {
  const input = validBooking();
  input.pickupDate = "2020-01-01";
  assert.equal(bookingSchema.safeParse(input).success, false);
});

test("requires pickup detail for airport and hotel bookings", () => {
  const input = validBooking();
  input.pickupDetail = "";
  assert.equal(bookingSchema.safeParse(input).success, false);
});

test("rejects unsafe map URLs", () => {
  const input = validBooking();
  input.mapsLink = "javascript:alert(1)";
  assert.equal(bookingSchema.safeParse(input).success, false);
});

test("rejects oversized free-text fields", () => {
  const input = validBooking();
  input.notes = "x".repeat(5001);
  assert.equal(bookingSchema.safeParse(input).success, false);
});

test("rejects a filled honeypot field", () => {
  const input = validBooking();
  input.website = "https://spam.example";
  assert.equal(bookingSchema.safeParse(input).success, false);
});
