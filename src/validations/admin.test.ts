import assert from "node:assert/strict";
import test from "node:test";

import {
  bookingStatusFilterSchema,
  bookingStatusSchema,
  routePriceSchema,
  settingSchema,
} from "./admin";

test("rejects forged booking statuses and invalid filters", () => {
  assert.equal(
    bookingStatusSchema.safeParse({ id: "1", status: "DELETED" }).success,
    false,
  );
  assert.equal(bookingStatusFilterSchema.safeParse("INVALID").success, false);
});

test("rejects non-numeric and excessive route prices", () => {
  assert.equal(
    routePriceSchema.safeParse({
      id: "1",
      priceStandard: "not-a-number",
      priceSuv: "1200",
      priceVan: "1300",
      isActive: "true",
    }).success,
    false,
  );
  assert.equal(
    routePriceSchema.safeParse({
      id: "1",
      priceStandard: "1000001",
      priceSuv: "1200",
      priceVan: "1300",
      isActive: "true",
    }).success,
    false,
  );
});

test("only permits known public setting keys", () => {
  assert.equal(
    settingSchema.safeParse({ key: "NEXTAUTH_SECRET", value: "changed" })
      .success,
    false,
  );
});
