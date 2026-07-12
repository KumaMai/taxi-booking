import assert from "node:assert/strict";
import test from "node:test";

import { buildBookingEmailHtml } from "./email";

const booking = {
  bookingRef: "ref-123",
  fullName: '<img src=x onerror="alert(1)">',
  phoneCountry: "+66",
  phone: "0812345678",
  email: "safe@example.com",
  adultPassengers: 2,
  childPassengers: 0,
  pickupDate: new Date("2099-01-01T00:00:00.000Z"),
  pickupTime: "12:30",
  vehicleType: "SUV",
  pickupType: "AIRPORT",
  pickupDetail: "TG201",
  dropoffLocation: "Khao Lak",
  mapsLink: "javascript:alert(1)",
  contactChannel: "WHATSAPP",
  contactInfo: "+66812345678",
  notes: "<strong>not markup</strong>",
};

test("escapes customer-controlled HTML and discards unsafe map URLs", () => {
  const html = buildBookingEmailHtml(booking);

  assert.equal(html.includes("<img src=x"), false);
  assert.equal(html.includes("<strong>not markup</strong>"), false);
  assert.equal(html.includes("&lt;strong&gt;not markup&lt;/strong&gt;"), true);
  assert.equal(html.includes("javascript:alert(1)"), false);
});
