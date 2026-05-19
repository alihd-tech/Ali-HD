const STACK_STORIES = [
  {
    id: 'performance',
    icon: 'fluent:rocket-24-filled',
    accent: 'primary',
    title: 'Performance Engineering',
  },
  {
    id: 'architecture',
    icon: 'fluent:building-cube-24-filled',
    accent: 'secondary',
    title: 'Thoughtful Architecture',
  },
  {
    id: 'ux',
    icon: 'fluent:cursor-hover-24-filled',
    accent: 'info',
    title: 'User Experience',
  },
  {
    id: 'fullstack',
    icon: 'fluent:layer-24-filled',
    accent: 'success',
    title: 'Full-Stack Delivery',
  },
  {
    id: 'reliability',
    icon: 'fluent:shield-checkmark-24-filled',
    accent: 'primary',
    title: 'Reliability & Scale',
  },
  {
    id: 'craft',
    icon: 'fluent:handshake-24-filled',
    accent: 'secondary',
    title: 'Engineering Craft',
  },
] as const

type StoryId = (typeof STACK_STORIES)[number]['id']

type StoryCopy = { body: string; tags: string[] }

const STACK_COPY: Record<0 | 1 | 2, Record<StoryId, StoryCopy>> = {
  0: {
    performance: {
      body: 'Systems that stay fast under real load, not just in benchmarks.',
      tags: [],
    },
    architecture: {
      body: 'Patterns that make complexity manageable, not just tolerable.',
      tags: [],
    },
    ux: {
      body: 'Interfaces that respect people\'s time and attention.',
      tags: [],
    },
    fullstack: {
      body: 'From database schema to pixel-perfect UI — every layer matters.',
      tags: [],
    },
    reliability: {
      body: 'Production systems built for real-world conditions.',
      tags: [],
    },
    craft: {
      body: 'Code that others can reason about and systems that grow gracefully.',
      tags: [],
    },
  },
  1: {
    performance: {
      body: 'Systems that stay fast under real load — optimized query plans, intelligent caching, and code splitting that keeps time-to-interactive low even as features grow.',
      tags: ['Code Splitting', 'Caching', 'Core Web Vitals'],
    },
    architecture: {
      body: 'Patterns that make complexity manageable — event-driven modules, clear domain boundaries, and separation of concerns that let teams move independently.',
      tags: ['Domain-Driven', 'Event-Driven', 'Modular'],
    },
    ux: {
      body: 'Interfaces that respect people\'s time and attention — progressive enhancement, accessibility-first, and interactions that feel instant.',
      tags: ['A11y', 'Progressive Enhancement', 'Micro-interactions'],
    },
    fullstack: {
      body: 'From database schema to pixel-perfect UI — Scala and FastAPI for robust backends, Laravel for rapid iteration, and Nuxt/TypeScript for frontends that feel instant.',
      tags: ['Scala', 'FastAPI', 'Laravel', 'Nuxt', 'TypeScript'],
    },
    reliability: {
      body: 'Production systems built for real-world conditions — connection pooling, structured logging, and CI/CD pipelines that teams actually trust.',
      tags: ['CI/CD', 'Observability', 'Connection Pooling'],
    },
    craft: {
      body: 'Code that others can reason about and systems that grow gracefully — well-named composables, proper TypeScript types, and documentation that stays current.',
      tags: ['TypeScript', 'Composables', 'Documentation'],
    },
  },
  2: {
    performance: {
      body: 'Systems that stay fast under real load — optimized query plans with PgBouncer in transaction mode, Redis caching with invalidation events from Scala services, and route-level code splitting via Nuxt 4 route rules. I target LCP < 1.2s and CLS < 0.05 on production.',
      tags: ['Code Splitting', 'Redis Invalidation', 'PgBouncer', 'Core Web Vitals', 'Edge Rendering'],
    },
    architecture: {
      body: 'Patterns that make complexity manageable — event-driven Nitro modules with clear domain boundaries, OpenAPI specs generated from Scala\'s tapir definitions, and auto-generated TypeScript types that eliminate the "type mismatch" class of bugs across the stack.',
      tags: ['Domain-Driven', 'Event-Driven Modules', 'OpenAPI Codegen', 'tapir/http4s'],
    },
    ux: {
      body: 'Interfaces that respect people\'s time and attention — progressive enhancement with SSR/SPA hybrid rendering, WCAG 2.2 AA compliance, and micro-interactions via GSAP that provide clear visual feedback without jank.',
      tags: ['WCAG 2.2 AA', 'Hybrid SSR/SPA', 'GSAP', 'Progressive Enhancement'],
    },
    fullstack: {
      body: 'From database schema to pixel-perfect UI — Scala and FastAPI for correctness-critical business logic, Laravel for rapid prototyping and glue code, and Nuxt/Vue with TypeScript for frontends. Each layer does what it\'s best at.',
      tags: ['Scala', 'FastAPI', 'Laravel', 'Nuxt', 'TypeScript', 'gRPC', 'Kafka'],
    },
    reliability: {
      body: 'Production systems built for real-world conditions — connection pooling via Supavisor, OpenTelemetry integration via Nitro plugins for distributed tracing, and CI/CD pipelines with exactly-once processing semantics for data pipelines.',
      tags: ['OpenTelemetry', 'Supavisor', 'Kafka', 'Exactly-Once', 'CI/CD'],
    },
    craft: {
      body: 'Code that others can reason about and systems that grow gracefully — well-named composables over clever abstractions, proper TypeScript types with Drizzle ORM, and structured logging that makes production debugging tractable.',
      tags: ['Drizzle ORM', 'Composables', 'Structured Logging', 'Type Safety'],
    },
  },
}

function principlesLevel(level: number): 0 | 1 | 2 {
  if (level >= 2) return 2
  if (level >= 1) return 1
  return 0
}

export function usePrinciplesStack() {
  const store = useAppStore()

  const sectionHeader = computed(() => {
    if (store.complexityLevel >= 2) {
      return {
        eyebrow: 'Engineering Principles',
        titleLead: 'How I approach ',
        titleAccent: 'building',
        intro: 'Every system I build follows these core principles — from database schema to pixel-perfect UI. The depth of each principle adapts to the complexity you choose.',
      }
    }
    if (store.complexityLevel >= 1) {
      return {
        eyebrow: 'Engineering Principles',
        titleLead: 'How I build ',
        titleAccent: 'software',
        intro: 'Core principles that guide my work across the full stack.',
      }
    }
    return {
      eyebrow: 'Approach',
      titleLead: 'What I ',
      titleAccent: 'focus on',
      intro: 'The essentials of how I work.',
    }
  })

  const stackStories = computed(() => {
    const copy = STACK_COPY[principlesLevel(store.complexityLevel)]
    return STACK_STORIES.map(story => ({
      ...story,
      ...copy[story.id],
    }))
  })

  const complexityLabel = computed(() => store.complexity.title)
  const activeLevel = computed(() => store.complexityLevel)

  return { sectionHeader, stackStories, complexityLabel, activeLevel }
}
