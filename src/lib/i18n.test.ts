import assert from "node:assert/strict";
import test from "node:test";
import { COMMON_COPY, NAV_COPY, copy } from "./i18n";

test("shared navigation has both locales", () => { for (const item of NAV_COPY) { assert.ok(item.en.trim()); assert.ok(item.th.trim()); } });
test("copy selects the requested locale", () => { assert.equal(copy("en", COMMON_COPY.bookRide), "Book a ride"); assert.equal(copy("th", COMMON_COPY.bookRide), "จองรถ"); });
