---
title: Advanced Nuxt Architecture Patterns
description: Hybrid routeRules, Nitro module boundaries, edge auth middleware, pooled Postgres, and OpenTelemetry on production Nuxt fleets.
date: 2025-03-10
tags:
  - Nuxt
  - Architecture
  - Performance
  - Edge Computing
readingTime: 12
---

At request volumes where cold starts, connection storms, and cross-team merge conflicts matter, I treat Nuxt as **Nitro + Vue SSR/CSR policy** with explicit route rules and module-owned server surfaces.

## Hybrid rendering via `routeRules`

```typescript
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/blog/**': { swr: 3600 },
    '/api/**': { cors: true },
    '/dashboard/**': { ssr: false },
  },
})
```

- **Prerender** — marketing shells, zero origin work per hit
- **SWR** — document HTML with background revalidation; tune TTL to business staleness
- **`ssr: false`** — authenticated SPA islands; session established client-side, APIs still protected server-side

## Event-driven Nitro modules

Monolithic `server/api` does not scale with team size. I shard by domain:

```
server/
  modules/
    auth/
      routes.ts
      events.ts
    billing/
      routes.ts
      webhooks.ts
```

Each module owns routes, hooks, and background handlers. Features delete cleanly; cross-module calls go through typed facades, not deep imports.

## Edge middleware for auth

Unauthorized traffic should terminate before origin:

```typescript
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  if (url.pathname.startsWith('/api/protected')) {
    const token = getHeader(event, 'authorization')
    if (!validateToken(token)) {
      throw createError({ statusCode: 401 })
    }
  }
})
```

Validate JWT/session consistently at the edge; origin handlers assume `event.context.auth` is already resolved.

## Pooled Postgres

Under concurrency, direct connections exhaust Postgres. Supavisor/PgBouncer in **transaction mode** + Drizzle/Prisma pool settings aligned to serverless/worker counts. Migrations and long reads use a separate role or session mode where needed.

## Observability

OpenTelemetry via Nitro plugins: structured logs, trace context propagated from edge → API → DB. SLO dashboards tied to deploy markers, not vanity averages.

## Trade-offs

Worth it when: multi-team monorepo, route-level traffic skew, edge latency SLAs. Overkill for single-squad products — Nuxt defaults are well-calibrated; deviate on evidence from profiles and incident postmortems, not blog posts.
