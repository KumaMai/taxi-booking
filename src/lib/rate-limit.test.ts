import assert from "node:assert/strict";
import test from "node:test";

import { checkRateLimit, resetRateLimitsForTests } from "./rate-limit";

test("blocks requests after the configured limit", () => {
  resetRateLimitsForTests();
  const options = { limit: 2, windowMs: 60_000 };

  assert.equal(checkRateLimit("booking:ip", options, 1_000).allowed, true);
  assert.equal(checkRateLimit("booking:ip", options, 1_001).allowed, true);
  assert.equal(checkRateLimit("booking:ip", options, 1_002).allowed, false);
});

test("opens a fresh window after expiry", () => {
  resetRateLimitsForTests();
  const options = { limit: 1, windowMs: 1_000 };

  assert.equal(checkRateLimit("booking:ip", options, 1_000).allowed, true);
  assert.equal(checkRateLimit("booking:ip", options, 1_500).allowed, false);
  assert.equal(checkRateLimit("booking:ip", options, 2_000).allowed, true);
});
