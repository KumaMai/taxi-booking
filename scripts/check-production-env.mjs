const required = ["DATABASE_URL", "NEXTAUTH_SECRET", "NEXTAUTH_URL", "AUTH_URL", "EMAIL_USER", "EMAIL_PASS", "EMAIL_TO", "ADMIN_EMAIL", "ADMIN_PASSWORD", "NEXT_PUBLIC_SITE_URL"];
const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length > 0) { console.error(`Missing production environment variables: ${missing.join(", ")}`); process.exit(1); }
if (process.env.NEXTAUTH_SECRET.length < 32) { console.error("NEXTAUTH_SECRET must be at least 32 characters in production."); process.exit(1); }
if (!process.env.NEXT_PUBLIC_SITE_URL.startsWith("https://")) { console.error("NEXT_PUBLIC_SITE_URL must use https:// in production."); process.exit(1); }
if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) console.warn("Upstash credentials are not configured; distributed rate limiting will use the local fallback.");
console.log("Production environment validation passed.");
