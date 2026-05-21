---
title: Scaling Nuxt Applications
description: Route-level rendering modes, Nitro caching, composable boundaries, and Pinia scope — patterns for Nuxt apps under real load.
date: 2025-02-20
tags:
  - Nuxt
  - Architecture
  - Performance
readingTime: 8
---

Shipping a Nuxt 3 app is easy. Keeping LCP, TTFB, and bundle graphs honest at scale means choosing rendering mode per route, tightening data-fetch boundaries, and resisting global state creep.

## Module boundaries over type-based folders

File-based routing does not imply a flat `components/` dump. I group by **bounded context** — `features/billing/`, `features/blog/` — each with local components, composables, and route helpers. Cross-feature imports go through explicit barrels so circular deps show up in CI, not at 2am.

## Server-side data and Nitro caching

Default to `useAsyncData` / `useFetch` on the server for document-shaped payloads. Pair with `routeRules` when you need SWR or ISR:

```typescript
export default defineNuxtConfig({
  routeRules: {
    '/marketing/**': { prerender: true },
    '/catalog/**': { swr: 900 },
  },
})
```

SWR gives you edge-cached HTML with background revalidation — good for catalog and blog surfaces where staleness is bounded, not forbidden.

## Component and composable contracts

Components stay presentational; composables own IO and derived state. Typed props via `defineProps<{}>()` + `withDefaults`. Shared logic lives in composables named after **capabilities** (`useCheckoutSession`), not after Vue APIs.

## Pinia scope

Stores for session, feature flags, and cross-route UI chrome only. Page-local `ref`/`computed` beats a store when the consumer set is one route tree — fewer invalidation paths, simpler DevTools traces.

## Scaling checklist

| Signal | Likely fix |
|--------|------------|
| Large JS on landing | Route-level code splitting, audit auto-imports |
| Slow TTFB on dynamic routes | Server fetch + cache headers / SWR |
| Duplicate fetches in tree | Lift `useAsyncData` key to layout, pass via provide/inject |

Measure with Web Vitals + server timing headers before micro-optimizing components.
