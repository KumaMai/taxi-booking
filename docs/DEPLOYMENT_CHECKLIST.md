# Production deployment checklist

## Before the first deploy

- Create a production PostgreSQL database and set `DATABASE_URL` to its pooled TLS connection string.
- Generate a strong `NEXTAUTH_SECRET` (for example, `openssl rand -base64 32`).
- Set `NEXTAUTH_URL` and `AUTH_URL` to the public HTTPS origin and keep `AUTH_TRUST_HOST=true` behind the reverse proxy.
- Configure `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_TO` with a Gmail app password or another SMTP credential.
- Set a unique `ADMIN_EMAIL` and `ADMIN_PASSWORD`; never reuse the development values.
- Store secrets in the VPS secret store or CI environment, never in git.
- For multi-instance rate limiting, set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`; without them the app uses the local development fallback.
- Run `pnpm check:production-env` in the release environment. It fails closed for missing secrets, a short `NEXTAUTH_SECRET`, or a non-HTTPS public URL.

## Deploy and verify

```bash
pnpm install --frozen-lockfile
pnpm exec prisma migrate deploy
pnpm build
docker compose up -d
curl -fsS https://your-domain.example/api/health
```

The health endpoint must return HTTP 200 before traffic is switched to the new release. Keep the previous image available for rollback and take a database backup before applying a migration.

## Backup and rollback

Before every schema migration, create and verify a compressed dump:

```bash
pg_dump --format=custom --file="backup-$(date +%Y%m%d-%H%M).dump" "$DATABASE_URL"
pg_restore --list "backup-YYYYMMDD-HHMM.dump" > /dev/null
```

Keep the previous application image/release. If health or smoke checks fail, restore the previous image first. Restore the database dump only when the migration changed data destructively, and record the migration and restore result in the release log.

## After deploy

- Open `/admin/login` and change the initial admin password immediately.
- Submit a test booking and confirm the admin email arrives.
- Check the public pages and Thai toggle on desktop and mobile.
- Configure daily PostgreSQL backups and test restoring one backup.
- Confirm TLS renewal and the uptime monitor are working.
