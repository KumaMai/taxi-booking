# Deployment options review — 2026-07-12

## Conclusion

The repository can be deployed now to a managed platform, but an actual deployment still requires the owner's provider account, domain, database, SMTP, and auth secrets. The best immediate fit is **Railway: one Next.js service + managed PostgreSQL**, with Prisma migrations configured as a pre-deploy command.

The previously agreed **DigitalOcean VPS + Docker + Nginx** remains the better long-term option when predictable monthly cost, full control, and operational ownership matter. It is not the fastest first launch because TLS, backups, monitoring, patching, and rollback become our responsibility.

## Comparison

| Option | Fit for this repo | Strengths | Risks / work still required | Recommendation |
|---|---|---|---|---|
| Railway + PostgreSQL | Highest immediate fit | Native Next.js flow, managed Postgres, environment variables, pre-deploy `prisma migrate deploy`, simple GitHub/CLI deploy | Provider account, billing, backups/retention policy, SMTP/Upstash secrets | **Use for first production launch** |
| Render Web Service + Render Postgres | Good alternative | Straightforward Node web service, managed Postgres, recovery/backup features | Configure migrations and health checks; service/database plans and cold-start behavior need validation | Good second choice |
| Vercel + Neon/Prisma Postgres | Best Next.js DX, but needs adaptation | Excellent Next.js integration and preview deployments | Current `@prisma/adapter-pg` connection strategy must be validated for serverless pooling; background notification retry and SMTP execution need production-duration testing | Use if adopting a serverless-oriented DB/runtime |
| DigitalOcean App Platform | Better managed version of the original provider | Git/container deploy, managed platform, less VPS maintenance | Need to validate Prisma migration command, DB connectivity, and service sizing; less control than a VPS | Good compromise |
| DigitalOcean VPS + Docker/Nginx | Best control/cost at steady state | Predictable infra, full control, existing deployment plan | We own OS updates, firewall, TLS, backups, monitoring, rollback, and incident response | **Long-term target** |

## Why Railway is the immediate recommendation

Railway's official Next.js guide documents GitHub/CLI deployment, PostgreSQL provisioning, `DATABASE_URL` reference variables, and a pre-deploy command for `prisma migrate deploy`:

- https://docs.railway.com/guides/nextjs

That matches this repository's current architecture without requiring a serverless database rewrite. The app already has a database readiness endpoint, production environment validator, migration files, runtime smoke checks, and CI browser checks.

## Why Vercel is not the default today

Vercel is a strong Next.js host and Prisma documents a Vercel + Postgres path:

- https://www.prisma.io/docs/guides/postgres/vercel

However, this app uses a standard PostgreSQL adapter and performs notification retries after the booking response. Before choosing Vercel, we should explicitly test pooled connections, function duration, and notification delivery under the target plan. Railway/Render provide a more direct long-running Node service model for the current code.

## Minimum launch sequence (Railway)

1. Create a Railway project and add a PostgreSQL service.
2. Connect the GitHub repository as a Next.js service.
3. Set all variables from `.env.example`, including `NEXT_PUBLIC_SITE_URL`, SMTP, `NEXTAUTH_*`, admin credentials, and Upstash.
4. Set pre-deploy command to `pnpm exec prisma migrate deploy`.
5. Set the start command to `pnpm start` and expose the generated domain.
6. Run `pnpm check:production-env` in the release environment.
7. Verify `/api/health`, `pnpm smoke`, Admin login, Thai toggle, and a real test notification.
8. Add the custom domain, HTTPS, database backup policy, and an uptime alert.

## Decision

- **Can deploy now?** Yes, through Railway/Render/DigitalOcean App Platform once account access and secrets are supplied.
- **Can Codex deploy it without those?** No. Creating external infrastructure or entering secrets requires explicit account access/authorization.
- **Better than the original plan?** Railway is better for the first launch and lower operational burden. The original DigitalOcean VPS plan is better after traffic and operational needs justify owning the infrastructure.
