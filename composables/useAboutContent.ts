import type { AboutContent, AboutContentDoc } from '~/types/site-content'

export type { AboutContent } from '~/types/site-content'

const ABOUT_FALLBACK: AboutContent = {
  heroTitle: 'Full Stack Engineer ',
  heroTitleAccent: '& Web Infrastructure Engineer',
  heroSubtitle:
    'Full Stack Engineer specializing in scalable web infrastructure and platform systems — where backend architecture, SSR delivery, API ecosystems, and operations are designed to work together.',
  bio: [
    'I am a systems-oriented full stack engineer based in Iran with five years shipping production platforms that carry real traffic, real payments, and real operational risk.',
    'My strength is architectural cohesion — making SSR surfaces, backend APIs, payment infrastructure, auth, caching, and deployment paths behave as one machine instead of a pile of integrations.',
  ],
  expertise: [],
  skills: [],
}

function toAboutContent(doc?: AboutContentDoc): AboutContent {
  if (!doc) return ABOUT_FALLBACK
  return {
    heroTitle: doc.heroTitle,
    heroTitleAccent: doc.heroTitleAccent,
    heroSubtitle: doc.heroSubtitle,
    bio: doc.bio ?? [],
    expertise: doc.expertise ?? [],
    skills: doc.skills ?? [],
  }
}

export async function useAboutContent() {
  const store = useAppStore()
  const { pick } = await useContentVariants<AboutContentDoc>('about-panel-content', '/about')

  const content = computed(() => {
    const slug = store.nerd ? 'nerd' : 'plain'
    return toAboutContent(pick(slug, 'plain'))
  })

  const isNerd = computed(() => store.nerd)
  const modeLabel = computed(() => (store.nerd ? 'Nerd mode' : 'Plain English'))

  return { content, isNerd, modeLabel }
}
