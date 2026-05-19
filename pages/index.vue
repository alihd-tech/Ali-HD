<template>
  <div id="top" class="index-page relative w-full min-h-0 self-start text-left">
    <div id="main-content" tabindex="-1" class="relative z-[1] outline-none">
      <!-- Hero -->
      <section
        aria-labelledby="hero-heading"
        class="hero-section relative overflow-hidden border-b border-base-300/25 pb-12 pt-16 sm:pb-14 sm:pt-12 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-20%,color-mix(in_srgb,var(--color-primary)_7%,transparent),transparent)]"
          aria-hidden="true"
        />

        <div class="container relative z-10 mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-10 lg:px-8">
          <div class="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
            <div
              :key="`hero-${activeHeroLevel}`"
              class="order-2 space-y-8 lg:order-1 lg:col-span-7"
            >
              <header class="space-y-4 border-l-2 border-primary/50 pl-5 sm:pl-6">
                <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">
                  {{ heroCopy.pillLabel }}
                </p>
                <p id="hero-eyebrow" class="text-sm font-medium text-base-content/70">
                  {{ heroCopy.eyebrow }}
                </p>
              </header>

              <div class="space-y-5">
                <h1
                  id="hero-heading"
                  class="text-3xl leading-[1.05] tracking-tight sm:text-4xl md:text-[2.75rem] lg:text-[3.15rem]"
                >
                  <span class="block text-base-content font-ace">{{ heroCopy.headlineName }}</span>
                  <span
                    class="mt-1 block bg-gradient-to-r from-primary via-secondary/90 to-info bg-clip-text text-transparent text-xl"
                  >
                    {{ heroCopy.headlineAccent }}
                  </span>
                </h1>
                <p class="font-quicksand text-lg font-semibold leading-snug text-base-content/90 sm:text-xl">
                  {{ heroCopy.subhead }}
                </p>
                <p class="max-w-xl text-base leading-relaxed text-base-content/75 md:text-[1.0625rem]">
                  {{ heroCopy.body }}
                </p>
              </div>

              <nav
                aria-label="Primary actions"
                class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <a
                  href="#projects"
                  class="btn bg-primary text-primary-content btn-sm w-full gap-2 px-6 sm:w-auto"
                >
                  <Icon name="fluent:folder-24-filled" width="18" height="18" aria-hidden="true" />
                  {{ heroCopy.primaryCta }}
                </a>
                <a
                  href="#stack"
                  class="btn btn-ghost btn-sm w-full gap-1.5 border border-base-300/40 text-base-content/80 hover:border-primary/30 hover:bg-base-200/40 hover:text-primary sm:w-auto"
                >
                  {{ heroCopy.secondaryCta }}
                  <Icon name="fluent:arrow-right-24-regular" width="16" height="16" aria-hidden="true" />
                </a>
              </nav>
            </div>

            <aside class="order-2 lg:col-span-5">
              <Transition name="hero-panel-swap" mode="out-in">
                <Keypad
                  v-if="!showHeroCustomizer"
                  key="keypad"
                  @code-complete="showHeroCustomizer = true"
                />
                <div
                  v-else
                  key="customizer"
                  class="hero-customizer-card relative max-w-sm mx-auto overflow-hidden rounded-2xl border border-base-300/60 bg-base-100 p-5 shadow-xl sm:p-6"
                >
                  <div
                    class="pointer-events-none absolute -inset-px bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-70"
                    aria-hidden="true"
                  />
                  <header class="relative mb-5 text-center">
                    <div class="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon name="fluent:settings-24-filled" class="h-5 w-5" />
                    </div>
                    <h2 class="text-sm font-semibold tracking-wide text-base-content">Customizer</h2>
                    <p class="mt-0.5 text-xs text-base-content/50">Tune complexity, nerd mode, and accent</p>
                  </header>
                  <UiCustomizerPanel class="relative" />
                </div>
              </Transition>
            </aside>
          </div>
        </div>
      </section>

      <!-- Principles / Stack -->
      <section
        id="stack"
        :key="`principles-${activeLevel}-${personalityKey}`"
        aria-labelledby="stack-heading"
        class="stack-section relative scroll-mt-20 border-b border-base-300/25 py-12 sm:py-14 md:py-16 lg:py-20"
      >
        <div class="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header class="index-section-header mb-10 md:mb-12 lg:mb-14">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div class="max-w-2xl space-y-3">
                <p class="index-eyebrow">{{ sectionHeader.eyebrow }}</p>
                <h2
                  id="stack-heading"
                  class="font-quicksand text-2xl font-bold tracking-tight text-base-content sm:text-3xl lg:text-[2rem]"
                >
                  {{ sectionHeader.titleLead }}
                  <span class="text-primary">{{ sectionHeader.titleAccent }}</span>
                </h2>
                <p class="text-base leading-relaxed text-base-content/70 md:text-[1.0625rem]">
                  {{ sectionHeader.intro }}
                </p>
              </div>
              <p class="shrink-0 text-sm text-base-content/55 lg:text-right">
                <span class="font-medium text-base-content/80">{{ complexityLabel }}</span>
                <span class="mx-2 text-base-content/30" aria-hidden="true">&middot;</span>
                <span>Adapts with complexity settings</span>
              </p>
            </div>
          </header>

          <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <article
              v-for="story in stackStories"
              :key="story.id"
              class="index-card group flex flex-col rounded-2xl border border-base-300/40 bg-base-100/40 p-6 transition-colors duration-300 hover:border-base-300/70 hover:bg-base-100/60"
              :class="stackCardAccent(story.accent)"
            >
              <div class="mb-4" aria-hidden="true">
                <span
                  class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-base-300/50 bg-base-200/50"
                  :class="stackIconClass(story.accent)"
                >
                  <Icon :name="story.icon || 'fluent:layer-24-filled'" class="h-[18px] w-[18px]" />
                </span>
              </div>
              <h3 class="mb-2 font-quicksand text-lg font-bold leading-snug text-base-content">
                {{ story.title }}
              </h3>
              <p class="flex-1 text-sm leading-relaxed text-base-content/75">
                {{ story.body }}
              </p>
              <p
                v-if="story.tags?.length"
                class="mt-4 border-t border-base-300/30 pt-4 text-xs leading-relaxed text-base-content/55"
              >
                {{ story.tags.join(' \u00B7 ') }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section
        id="projects"
        aria-labelledby="projects-heading"
        class="relative scroll-mt-20 border-b border-base-300/25 py-12 sm:py-14 md:py-16 lg:py-20"
      >
        <div class="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header class="index-section-header mb-10 flex flex-col gap-4 sm:mb-12 md:flex-row md:items-end md:justify-between">
            <div class="max-w-xl space-y-3">
              <p class="index-eyebrow">Portfolio</p>
              <h2
                id="projects-heading"
                class="font-quicksand text-2xl font-bold tracking-tight text-base-content sm:text-3xl"
              >
                Featured <span class="text-primary">projects</span>
              </h2>
              <p class="text-base leading-relaxed text-base-content/70">
                Design software, travel platforms, and operator tooling — shipped end to end with live links.
              </p>
            </div>
          </header>

          <div class="grid gap-6 lg:grid-cols-2">
            <article
              v-for="project in projects"
              :key="project.title"
              class="index-project group flex flex-col overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/35 transition-colors duration-300 hover:border-primary/25 hover:bg-base-100/55"
              :class="{ 'lg:col-span-2': project.featured || project.wide }"
            >
              <div
                v-if="project.banner"
                class="relative aspect-[3/1] overflow-hidden border-b border-base-300/30 sm:aspect-[2.4/1]"
              >
                <img
                  :src="project.banner"
                  :alt="project.bannerAlt"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-base-100/90 via-base-100/20 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div class="flex flex-1 flex-col p-6 sm:p-7">
                <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div class="flex min-w-0 items-center gap-3">
                    <img
                      v-if="project.logo"
                      :src="project.logo"
                      :alt="project.logoAlt"
                      class="h-10 w-10 rounded-lg border border-base-300/40 bg-base-100 object-contain p-1"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <p class="text-[11px] font-semibold uppercase tracking-wider text-base-content/50">
                        {{ project.category }}
                        <template v-if="project.status">
                          <span class="text-base-content/35"> &middot; {{ project.status }}</span>
                        </template>
                      </p>
                      <h3 class="font-quicksand text-lg font-bold text-base-content sm:text-xl">
                        {{ project.title }}
                      </h3>
                    </div>
                  </div>
                  <time
                    class="shrink-0 text-sm font-medium tabular-nums text-base-content/50"
                    :datetime="projectYearDatetime(project.year)"
                  >
                    {{ project.year }}
                  </time>
                </div>

                <p class="mb-4 flex-1 text-sm leading-relaxed text-base-content/75 sm:text-[0.9375rem]">
                  {{ project.description }}
                </p>

                <ul
                  v-if="project.highlights?.length"
                  class="mb-4 space-y-2 border-l border-base-300/40 pl-4"
                  :aria-label="`Highlights for ${project.title}`"
                >
                  <li
                    v-for="highlight in project.highlights"
                    :key="highlight"
                    class="text-sm leading-snug text-base-content/70"
                  >
                    {{ highlight }}
                  </li>
                </ul>

                <p
                  v-if="project.tags?.length"
                  class="mb-5 text-xs text-base-content/50"
                >
                  {{ project.tags.join(' \u00B7 ') }}
                </p>

                <div
                  class="mt-auto flex flex-wrap items-center gap-3 border-t border-base-300/25 pt-5"
                >
                  <a
                    v-if="project.href"
                    :href="project.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-primary btn-sm gap-1.5"
                    :aria-label="`${project.ctaLabel || 'Open'} ${project.title} (opens in new tab)`"
                  >
                    {{ project.ctaLabel || 'Open' }}
                    <Icon name="fluent:open-24-regular" width="14" height="14" aria-hidden="true" />
                  </a>
                  <a
                    v-if="project.repo"
                    :href="project.repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-ghost btn-sm gap-1.5 text-base-content/70 hover:text-primary"
                    :aria-label="`View ${project.title} on GitHub (opens in new tab)`"
                  >
                    <Icon name="ph:github-logo" width="14" height="14" aria-hidden="true" />
                    Repository
                  </a>
                  <span
                    v-if="!project.href && !project.repo"
                    class="text-sm text-base-content/55"
                  >
                    Private / internal
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Tech strip -->
      <TechLogoMarquee />

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { pageSeo, SITE_URL } from '~/utils/site'

const homeSeo = pageSeo.home

useSiteSeo({
  ...homeSeo,
  jsonLd: [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Ali HD',
      alternateName: ['Ali Heydari', 'alihd.ir'],
      url: SITE_URL,
      description: homeSeo.description,
      inLanguage: 'en-US',
      publisher: personRef(),
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: homeSeo.title,
      description:
        'Designing and engineering full-stack systems where performance, architecture, and user experience meet clean modern development.',
      isPartOf: websiteRef(),
      about: personRef(),
      mainEntity: personRef(),
      inLanguage: 'en-US',
    },
  ],
})

const showHeroCustomizer = ref(false)

const { heroCopy, activeHeroLevel } = useHeroContent()
const { activeLevel, complexityLabel, sectionHeader, stackStories } = usePrinciplesStack()
const {
  ensureStructureLoaded,
  applyPersonalityToDocument,
  isNerd,
  selectedComplexityId,
} = usePersonality()

const personalityKey = computed(
  () => `${selectedComplexityId.value ?? 'complexity'}:${isNerd.value ? 'nerd' : 'plain'}`,
)

onMounted(async () => {
  await ensureStructureLoaded()
  applyPersonalityToDocument()
})

function projectYearDatetime(year: string) {
  const n = parseInt(String(year), 10)
  return Number.isFinite(n) ? String(n) : String(year)
}

const ACCENT_BORDER: Record<string, string> = {
  primary: 'border-l-primary/60 hover:border-l-primary',
  secondary: 'border-l-secondary/60 hover:border-l-secondary',
  info: 'border-l-info/60 hover:border-l-info',
  success: 'border-l-success/60 hover:border-l-success',
}

const ACCENT_ICON: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  info: 'text-info',
  success: 'text-success',
}

function stackCardAccent(accent = 'primary') {
  return `border-l-[3px] ${ACCENT_BORDER[accent] ?? ACCENT_BORDER.primary}`
}

function stackIconClass(accent = 'primary') {
  return ACCENT_ICON[accent] ?? ACCENT_ICON.primary
}

const projects = [
  {
    title: 'Solanam',
    year: '2025',
    category: 'Design Software',
    status: 'Live',
    description:
      'Web-based design software — canvas workflows, asset tooling, and a product surface built for creators in the browser.',
    highlights: ['In-browser design editor', 'Product-grade UX', 'Shipped at solanam.com'],
    tags: ['Rust', 'Tauri', 'Nuxt', 'FastAPI', 'TypeScript', 'PWA'],
    banner: '/images/projects/solanam.jpg',
    bannerAlt: 'Solanam web based design software — banner',
    logo: '/favicon.ico',
    logoAlt: 'Solanam logo',
    href: 'https://solanam.com',
    featured: true,
    ctaLabel: 'solanam.com',
  },
  {
    title: 'eSimTrip',
    year: '2023',
    category: 'Travel Services',
    status: 'Live',
    description:
      'Full eSIM travel ecosystem — consumer storefronts, vendor consoles, and regional brands for local and global markets.',
    highlights: [
      'eSimTrip Ecosystem (.com · .ir · .me)',
      'Vendor & Operator Platforms',
      'Local & Global Product Lines',
    ],
    tags: ['Nuxt', 'Next', 'Laravel', 'APIs', 'Multi-Tenant'],
    banner: '/images/projects/esimtrip.jpg',
    bannerAlt: 'Esimtrip eSIM travel platform — banner',
    logo: '/favicon.ico',
    logoAlt: 'Esimtrip logo',
    href: 'https://esimtrip.com',
    featured: true,
    wide: true,
    ctaLabel: 'esimtrip.com',
  },
  {
    title: 'Dev tooling & Open Source Projects',
    year: 'Ongoing',
    category: 'Open Source Projects',
    status: 'Active',
    description:
      'Browser extensions, shared libraries, and upstream contributions — reusable pieces extracted from production builds.',
    highlights: ['solaxnm extension & starters', 'Docs & algorithm contributions', 'GitHub-first delivery'],
    tags: ['Rust-Tauri', 'Nuxt-Vue', 'PHP-Laravel', 'Python-FastAPI', 'WebAssembly-Zig', 'EVM-Solidity', 'Raku-Perl', 'TypeScript'],
    banner: '/images/projects/alihd.jpg',
    bannerAlt: 'Open source repositories and developer tooling — banner',
    logo: '/favicon.ico',
    logoAlt: 'Ali HD logo',
    href: 'https://github.com/alihd-tech',
    repo: 'https://github.com/alihd-tech',
    featured: false,
    wide: true,
    ctaLabel: 'GitHub',
  },
]
</script>

<style scoped>
.index-eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 88%, var(--fallback-bc, oklch(var(--bc))));
}

.hero-section {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 35%, transparent),
    transparent 42%
  );
}

.index-card,
.index-project {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.index-contact-link:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--color-primary) 50%, transparent);
  outline-offset: 2px;
}

.hero-panel-swap-enter-active,
.hero-panel-swap-leave-active {
  transition:
    opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-panel-swap-enter-from,
.hero-panel-swap-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .index-project img {
    transition: none;
  }

  .hero-panel-swap-enter-active,
  .hero-panel-swap-leave-active {
    transition: none;
  }
}
</style>
