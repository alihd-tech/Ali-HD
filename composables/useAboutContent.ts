type ExpertiseItem = { title: string; accent: 'primary' | 'secondary' | 'info' | 'success'; body: string }
type SkillGroup = { label: string; accent: 'primary' | 'secondary' | 'info'; items: string[] }

export type AboutContent = {
  heroTitle: string
  heroTitleAccent: string
  heroSubtitle: string
  bio: [string, string]
  expertise: ExpertiseItem[]
  skills: SkillGroup[]
}

const plain: AboutContent = {
  heroTitle: 'Full-Stack Engineer ',
  heroTitleAccent: '& Web Architect',
  heroSubtitle:
    'Building thoughtfully engineered systems where performance, architecture, and user experience align. Five years of hands-on experience shipping production software across the full stack.',
  bio: [
    "I'm a full-stack engineer based in Iran with a passion for building systems that scale. I specialize in designing and implementing robust architectures that handle real-world complexity without sacrificing developer experience.",
    'My work spans backend services (Scala, FastAPI, Laravel), frontend interfaces (Nuxt, Vue, TypeScript), and infrastructure (Docker, PostgreSQL, Redis). I believe in shipping things fast while maintaining high standards for code quality and system reliability.',
  ],
  expertise: [
    {
      title: 'Backend Engineering',
      accent: 'primary',
      body: 'Scala, FastAPI, Laravel. Building APIs, data pipelines, and microservices that stay performant under load.',
    },
    {
      title: 'Frontend Architecture',
      accent: 'secondary',
      body: 'Nuxt, Vue, TypeScript. Designing component systems and state management that scale with teams.',
    },
    {
      title: 'Database & Infrastructure',
      accent: 'info',
      body: 'PostgreSQL, Redis, Docker. Provisioning, scaling, and maintaining production systems reliably.',
    },
    {
      title: 'Product Engineering',
      accent: 'success',
      body: 'Full-stack delivery from concept to shipping. Balancing technical excellence with time-to-market.',
    },
  ],
  skills: [
    {
      label: 'Languages',
      accent: 'primary',
      items: ['TypeScript', 'Scala', 'Python', 'PHP', 'Rust', 'Zig'],
    },
    {
      label: 'Frameworks & Libraries',
      accent: 'secondary',
      items: ['Nuxt', 'Vue.js', 'React', 'Next.js', 'FastAPI', 'Laravel', 'http4s'],
    },
    {
      label: 'Infrastructure & Tools',
      accent: 'info',
      items: ['PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Git', 'Linux'],
    },
  ],
}

const nerd: AboutContent = {
  heroTitle: 'Systems Engineer ',
  heroTitleAccent: '& polyglot runtime wrangler',
  heroSubtitle:
    'I optimize for p99 latency, bounded contexts, and type-safe contracts from Postgres through OpenAPI to the DOM. Five years shipping services that survive traffic spikes and schema migrations.',
  bio: [
    'Based in Iran, I treat the stack as one system: schemas, services, caches, and UI contracts stay aligned. I like invariants enforced at compile time, observability that answers “why slow?” in one dashboard, and deploy paths that do not page me at 3am.',
    'Typical week: http4s + tapir or FastAPI for core logic, Laravel when iteration speed wins, Nuxt/Vue with strict TypeScript on the surface. Postgres with tuned plans (PgBouncer), Redis with explicit invalidation, Docker locally and the same images in prod. If it is not measurable, it is not done.',
  ],
  expertise: [
    {
      title: 'Backend & services',
      accent: 'primary',
      body: 'Scala (http4s, tapir), FastAPI, Laravel. OpenAPI-first APIs, idempotent handlers, and services that degrade gracefully instead of falling over.',
    },
    {
      title: 'Frontend & delivery',
      accent: 'secondary',
      body: 'Nuxt 3, Vue, TypeScript. Hybrid SSR/SPA where it helps, codegen from API specs, and bundles split so LCP stays honest under real networks.',
    },
    {
      title: 'Data & ops',
      accent: 'info',
      body: 'PostgreSQL, Redis, Docker, K8s when needed. Migrations with zero-downtime patterns, cache keys you can reason about, and metrics that tie code changes to SLOs.',
    },
    {
      title: 'Product under constraints',
      accent: 'success',
      body: 'Ship vertical slices with feature flags, keep architecture boring where possible, and save cleverness for the bottlenecks profiling actually shows.',
    },
  ],
  skills: [
    {
      label: 'Languages',
      accent: 'primary',
      items: ['TypeScript', 'Scala', 'Python', 'PHP', 'Rust', 'Zig', 'SQL'],
    },
    {
      label: 'Frameworks & runtimes',
      accent: 'secondary',
      items: ['Nuxt', 'Vue', 'http4s', 'tapir', 'FastAPI', 'Laravel', 'Nitro'],
    },
    {
      label: 'Infra & observability',
      accent: 'info',
      items: ['PostgreSQL', 'Redis', 'Docker', 'OpenAPI', 'PgBouncer', 'Prometheus', 'Linux'],
    },
  ],
}

export function useAboutContent() {
  const store = useAppStore()

  const content = computed(() => (store.nerd ? nerd : plain))
  const isNerd = computed(() => store.nerd)
  const modeLabel = computed(() => (store.nerd ? 'Nerd mode' : 'Plain English'))

  return { content, isNerd, modeLabel }
}
