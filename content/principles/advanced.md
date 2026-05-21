---
eyebrow: Engineering principles
titleLead: 'How I '
titleAccent: build in practice
intro: Same four ideas, with more technical detail. Depth follows your complexity setting.
performance:
  body: 'Tune query plans (PgBouncer), cache with Redis and explicit invalidation from Scala services, and split routes in Nuxt. Targets: LCP under 1.2s, CLS under 0.05.'
  tags:
    - PgBouncer
    - Redis
    - Route rules
    - Core Web Vitals
    - Edge
architecture:
  body: Nitro modules with domain boundaries; OpenAPI from Scala tapir; generated TypeScript types so front and back stay aligned.
  tags:
    - DDD
    - Nitro modules
    - OpenAPI codegen
    - tapir / http4s
ux:
  body: Hybrid SSR/SPA where it helps, WCAG 2.2 AA by default, and GSAP for feedback that does not jank the main thread.
  tags:
    - WCAG 2.2 AA
    - SSR / SPA
    - GSAP
fullstack:
  body: Scala and FastAPI for correctness-critical paths; Laravel for glue and fast iteration; Nuxt, Vue, and TypeScript for the experience layer.
  tags:
    - Scala
    - FastAPI
    - Laravel
    - Nuxt
    - gRPC
    - Kafka
---
