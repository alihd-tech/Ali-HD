/**
 * Principles stack — four cards whose copy scales with site complexity (0–2).
 * Level 0: one-line summaries. Level 1: what + how. Level 2: concrete stack & practices.
 */

const STACK_STORIES = [
  {
    id: 'performance',
    icon: 'fluent:rocket-24-filled',
    accent: 'primary',
    title: 'Performance',
  },
  {
    id: 'architecture',
    icon: 'fluent:building-lighthouse-24-filled',
    accent: 'secondary',
    title: 'Architecture',
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
    title: 'Full-Stack',
  },
] as const

type StoryId = (typeof STACK_STORIES)[number]['id']

type StoryCopy = { body: string; tags: string[] }

/** Card body + optional tag line per story, keyed by complexity tier. */
const STACK_COPY: Record<0 | 1 | 2, Record<StoryId, StoryCopy>> = {
  0: {
    performance: {
      body: 'Stay fast under real traffic, not just in benchmarks.',
      tags: [],
    },
    architecture: {
      body: 'Structure that handles growth without turning into a maze.',
      tags: [],
    },
    ux: {
      body: 'Interfaces that respect time, attention, and accessibility.',
      tags: [],
    },
    fullstack: {
      body: 'Own the path from database schema to polished UI.',
      tags: [],
    },
  },
  1: {
    performance: {
      body: 'Keep apps responsive as features grow: lean bundles, smart caching, and Core Web Vitals that reflect real users.',
      tags: ['Code splitting', 'Caching', 'Core Web Vitals'],
    },
    architecture: {
      body: 'Use clear boundaries—domains, events, and modules—so teams can change one part without breaking the rest.',
      tags: ['Domain-driven design', 'Event-driven', 'Modular'],
    },
    ux: {
      body: 'Build accessible, progressively enhanced UIs with interactions that feel immediate, not sluggish.',
      tags: ['A11y', 'Progressive enhancement', 'Micro-interactions'],
    },
    fullstack: {
      body: 'Match each layer to its strength: Scala and FastAPI for core logic, Laravel for rapid delivery, Nuxt and TypeScript for sharp frontends.',
      tags: ['Scala', 'FastAPI', 'Laravel', 'Nuxt', 'TypeScript'],
    },
  },
  2: {
    performance: {
      body: 'Tune query plans (PgBouncer), cache with Redis and explicit invalidation from Scala services, and split routes in Nuxt. Targets: LCP under 1.2s, CLS under 0.05.',
      tags: ['PgBouncer', 'Redis', 'Route rules', 'Core Web Vitals', 'Edge'],
    },
    architecture: {
      body: 'Nitro modules with domain boundaries; OpenAPI from Scala tapir; generated TypeScript types so front and back stay aligned.',
      tags: ['DDD', 'Nitro modules', 'OpenAPI codegen', 'tapir / http4s'],
    },
    ux: {
      body: 'Hybrid SSR/SPA where it helps, WCAG 2.2 AA by default, and GSAP for feedback that does not jank the main thread.',
      tags: ['WCAG 2.2 AA', 'SSR / SPA', 'GSAP'],
    },
    fullstack: {
      body: 'Scala and FastAPI for correctness-critical paths; Laravel for glue and fast iteration; Nuxt, Vue, and TypeScript for the experience layer.',
      tags: ['Scala', 'FastAPI', 'Laravel', 'Nuxt', 'gRPC', 'Kafka'],
    },
  },
}

function principlesLevel(level: number): 0 | 1 | 2 {
  if (level >= 2) return 2
  if (level >= 1) return 1
  return 0
}

const SECTION_HEADERS: Record<0 | 1 | 2, { eyebrow: string; titleLead: string; titleAccent: string; intro: string }> = {
  0: {
    eyebrow: 'Approach',
    titleLead: 'What I ',
    titleAccent: 'focus on',
    intro: 'Four pillars that guide how I design, build, and ship software.',
  },
  1: {
    eyebrow: 'Principles',
    titleLead: 'How I ',
    titleAccent: 'build',
    intro: 'The balance I aim for across the stack—speed, structure, and experience.',
  },
  2: {
    eyebrow: 'Engineering principles',
    titleLead: 'How I ',
    titleAccent: 'build in practice',
    intro: 'Same four ideas, with more technical detail. Depth follows your complexity setting.',
  },
}

export function usePrinciplesStack() {
  const store = useAppStore()

  const sectionHeader = computed(() => SECTION_HEADERS[principlesLevel(store.complexityLevel)])

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
