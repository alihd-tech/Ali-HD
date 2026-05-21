import type { PrinciplesContentDoc, PrinciplesSectionHeader } from '~/types/site-content'

const STACK_STORIES = [
  {
    id: 'performance',
    icon: 'fluent:rocket-24-filled',
    accent: 'primary',
    title: 'Delivery Performance',
  },
  {
    id: 'architecture',
    icon: 'fluent:building-lighthouse-24-filled',
    accent: 'secondary',
    title: 'Systems Architecture',
  },
  {
    id: 'ux',
    icon: 'fluent:cursor-hover-24-filled',
    accent: 'info',
    title: 'Surface & Experience',
  },
  {
    id: 'fullstack',
    icon: 'fluent:layer-24-filled',
    accent: 'success',
    title: 'Platform Cohesion',
  },
] as const

type StoryId = (typeof STACK_STORIES)[number]['id']

const SECTION_FALLBACK: PrinciplesSectionHeader = {
  eyebrow: 'Principles',
  titleLead: 'How I ',
  titleAccent: 'build platforms',
  intro:
    'Balance across delivery performance, systems architecture, surface quality, and full-stack cohesion—web infrastructure engineered to run as one system.',
}

function principlesLevel(level: number): 0 | 1 | 2 {
  if (level >= 2) return 2
  if (level >= 1) return 1
  return 0
}

const LEVEL_TO_SLUG = ['simple', 'balanced', 'advanced'] as const

function sectionFromDoc(doc?: PrinciplesContentDoc): PrinciplesSectionHeader {
  if (!doc) return SECTION_FALLBACK
  return {
    eyebrow: doc.eyebrow,
    titleLead: doc.titleLead,
    titleAccent: doc.titleAccent,
    intro: doc.intro,
  }
}

export async function usePrinciplesStack() {
  const store = useAppStore()
  const { pick } = await useContentVariants<PrinciplesContentDoc>('principles-content', '/principles')

  const activeDoc = computed(() => {
    const slug = LEVEL_TO_SLUG[principlesLevel(store.complexityLevel)]
    return pick(slug)
  })

  const sectionHeader = computed(() => sectionFromDoc(activeDoc.value))

  const stackStories = computed(() => {
    const doc = activeDoc.value
    return STACK_STORIES.map(story => {
      const copy = doc?.[story.id as StoryId]
      return {
        ...story,
        body: copy?.body ?? '',
        tags: copy?.tags ?? [],
      }
    })
  })

  const complexityLabel = computed(() => store.complexity.title)
  const activeLevel = computed(() => store.complexityLevel)

  return { sectionHeader, stackStories, complexityLabel, activeLevel }
}
