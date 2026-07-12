interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const entries = new Map<string, RateLimitEntry>();
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
  : null;

const distributedLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "15 m"), prefix: "taxi-booking" })
  : null;

export async function checkDistributedRateLimit(key: string, options: RateLimitOptions): Promise<RateLimitResult> {
  if (!distributedLimiter) return checkRateLimit(key, options);
  const result = await distributedLimiter.limit(key);
  return {
    allowed: result.success,
    remaining: result.remaining,
    retryAfterSeconds: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
  };
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
  now: number = Date.now(),
): RateLimitResult {
  const current = entries.get(key);

  if (!current || current.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + options.windowMs });
    return {
      allowed: true,
      remaining: Math.max(0, options.limit - 1),
      retryAfterSeconds: Math.ceil(options.windowMs / 1000),
    };
  }

  current.count += 1;
  const allowed = current.count <= options.limit;

  if (entries.size > 10_000) {
    for (const [entryKey, entry] of entries) {
      if (entry.resetAt <= now) entries.delete(entryKey);
    }
  }

  return {
    allowed,
    remaining: Math.max(0, options.limit - current.count),
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

export function resetRateLimitsForTests(): void {
  entries.clear();
}
