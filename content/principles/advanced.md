---
eyebrow: Engineering principles
titleLead: 'How I '
titleAccent: run platforms in production
intro: Same four pillars with systems and operational depth—how web infrastructure, backend architecture, and delivery surfaces stay aligned under load.
performance:
  body: Query plans, explicit cache invalidation, route-level delivery splits, and edge-aware SSR—metrics tied to LCP, CLS, and p99 latency, not vanity scores on staging hardware.
  tags:
    - p99 latency
    - Cache invalidation
    - Edge-aware SSR
    - Core Web Vitals
architecture:
  body: Contract-first APIs, bounded contexts, and session semantics that fail closed—shared invariants so SSR surfaces, orchestration layers, and transactional backends do not drift apart after deploy.
  tags:
    - Contract-first APIs
    - Bounded contexts
    - Fail-closed auth
ux:
  body: Hybrid rendering only where it earns its keep, WCAG treated as default, and motion that does not starve the main thread—structured data and crawl paths owned by the platform, not marketing tickets.
  tags:
    - WCAG 2.2 AA
    - Hybrid rendering
    - Structured data
fullstack:
  body: Payment state machines, webhook reliability, schema migrations with zero-drama rollout, and observability that maps code changes to SLOs—platform systems engineering from crawl to checkout.
  tags:
    - Payment invariants
    - Webhook reliability
    - SLOs & observability
---
