---
title: Scala Meets Frontend
description: OpenAPI codegen from tapir/http4s, FastAPI as edge BFF, and Kafka/WebSocket/cache invalidation across a polyglot stack.
date: 2025-04-05
tags:
  - Scala
  - FastAPI
  - Full Stack
  - Architecture
readingTime: 7
---

The question is not “Scala **or** TypeScript?” — it is how to keep **invariants** on the server and **typed contracts** at the UI boundary without manual DTO drift.

## API contract: OpenAPI as source of truth

Generate OpenAPI from Scala via **tapir** or **http4s** descriptors. CI publishes the spec; Nuxt consumes it with `openapi-typescript` (or equivalent) so breaking changes fail `tsc`, not staging.

```typescript
// generated — do not hand-edit
export type CreateOrderRequest = components['schemas']['CreateOrderRequest']
```

Version paths (`/v1`) or negotiate via headers; never silently rename fields consumers already codegen against.

## FastAPI as BFF / glue

For rapid surface-area changes, FastAPI sits as a **backend-for-frontend**:

- JWT validation, rate limits, response shaping
- Delegation to Scala for correctness-critical paths (pricing, ledger, inventory)

Python iteration speed at the edge; Scala for algebraic data types and property-tested domain cores.

## Communication matrix

| Pattern | Use when |
|---------|----------|
| REST + OpenAPI | CRUD, public/mobile clients |
| gRPC | service-to-service, low overhead |
| Kafka | domain events, eventual consistency |
| WebSocket | live UI (presence, notifications) |
| Redis | read-through cache; invalidation events from Scala publishers |

Cache keys must include tenant/version dimensions; invalidation is event-driven, not TTL prayer.

## Operational lesson

Polyglot pays off when boundaries are **hard**: Scala owns invariants, TypeScript owns presentation state, Python owns fast-moving integration glue. Blurring layers — business rules in Vue stores, DTOs hand-copied weekly — is what actually hurts.
