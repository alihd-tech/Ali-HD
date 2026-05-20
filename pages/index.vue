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
                  @code-complete="unlockHeroCustomizer"
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
          <header class="index-section-header mb-8 flex flex-col gap-4 sm:mb-9 md:flex-row md:items-end md:justify-between">
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

          <ul class="projects-grid m-0 list-none space-y-3 p-0 sm:grid sm:grid-cols-1 sm:gap-4 sm:space-y-0 lg:grid-cols-1 lg:gap-5">
            <li
              v-for="project in projects"
              :key="project.title"
              class="min-w-0"
            >
              <article
                class="index-project-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/40 transition-[border-color,box-shadow,background-color] duration-300 hover:border-primary/25 hover:bg-base-100/55 hover:shadow-lg hover:shadow-primary/[0.07]"
                :class="projectCardAccent(project.accent)"
              >
                <div
                  v-if="project.banner"
                  class="index-project-banner relative w-full overflow-hidden border-b border-base-300/20"
                >
                  <img
                    :src="project.banner"
                    :alt="project.bannerAlt"
                    class="index-project-thumb aspect-[16/9] h-auto w-full object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:saturate-110 sm:aspect-[2.35/1] md:aspect-[2.65/1]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/25 to-base-100/5"
                    aria-hidden="true"
                  />
                  <div
                    class="index-project-banner-accent pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                    :class="projectCardAccent(project.accent)"
                    aria-hidden="true"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-base-content/[0.06]"
                    aria-hidden="true"
                  />
                  <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
                    <img
                      v-if="project.logo"
                      :src="project.logo"
                      :alt="project.logoAlt"
                      class="h-9 w-9 rounded-xl border border-base-300/40 bg-base-100/90 object-contain p-1 shadow-lg backdrop-blur-sm sm:h-10 sm:w-10"
                      loading="lazy"
                      decoding="async"
                    />
                    <time
                      class="ms-auto rounded-lg border border-base-300/35 bg-base-100/80 px-2 py-1 text-[11px] font-semibold tabular-nums text-base-content/70 shadow-sm backdrop-blur-sm"
                      :datetime="projectYearDatetime(project.year)"
                    >
                      {{ project.year }}
                    </time>
                  </div>
                </div>

                <div class="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                <header class="mb-2 flex items-start justify-between gap-2 sm:mb-2.5">
                  <div class="min-w-0 space-y-1">
                    <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-base-content/50">
                        {{ project.category }}
                      </p>
                      <span
                        v-if="project.status"
                        class="inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[10px] font-medium leading-tight"
                        :class="projectStatusClass(project.status)"
                      >
                        <span
                          class="h-1 w-1 shrink-0 rounded-full"
                          :class="projectStatusDotClass(project.status)"
                          aria-hidden="true"
                        />
                        {{ project.status }}
                      </span>
                    </div>
                    <h3 class="truncate font-quicksand text-base font-bold leading-tight text-base-content sm:text-[1.0625rem]">
                      {{ project.title }}
                    </h3>
                  </div>
                  <time
                    class="shrink-0 pt-0.5 text-[11px] font-medium tabular-nums text-base-content/45"
                    :datetime="projectYearDatetime(project.year)"
                  >
                    {{ project.year }}
                  </time>
                </header>

                <p class="mb-2 line-clamp-2 text-xs leading-relaxed text-base-content/72 sm:text-[0.8125rem]">
                  {{ project.description }}
                </p>

                <ul
                  v-if="project.highlights?.length"
                  class="mb-2.5 grid gap-0.5 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-0.5"
                  :aria-label="`Highlights for ${project.title}`"
                >
                  <li
                    v-for="highlight in project.highlights"
                    :key="highlight"
                    class="flex min-w-0 items-start gap-1.5 text-[11px] leading-snug text-base-content/62 sm:text-xs"
                  >
                    <Icon
                      name="fluent:checkmark-circle-12-filled"
                      class="mt-px h-3 w-3 shrink-0 opacity-70"
                      :class="projectIconClass(project.accent)"
                      aria-hidden="true"
                    />
                    <span class="line-clamp-2">{{ highlight }}</span>
                  </li>
                </ul>

                <footer class="mt-auto flex flex-col gap-2.5 border-t border-base-300/20 pt-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <ul
                    v-if="project.tags?.length"
                    class="m-0 flex min-w-0 list-none flex-wrap gap-1 p-0"
                    aria-label="Technologies"
                  >
                    <li
                      v-for="tag in project.tags.slice(0, 5)"
                      :key="tag"
                    >
                      <span class="index-project-tag inline-block max-w-[8.5rem] truncate rounded-md border border-base-300/35 bg-base-200/35 px-1.5 py-px text-[10px] font-medium text-base-content/58">
                        {{ tag }}
                      </span>
                    </li>
                    <li v-if="project.tags.length > 5">
                      <span
                        class="inline-block rounded-md border border-dashed border-base-300/40 px-1.5 py-px text-[10px] font-medium text-base-content/45"
                        :title="project.tags.slice(5).join(', ')"
                      >
                        +{{ project.tags.length - 5 }}
                      </span>
                    </li>
                  </ul>

                  <div class="flex shrink-0 flex-wrap items-center gap-1.5 sm:justify-end">
                    <a
                      v-if="project.href"
                      :href="project.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-primary btn-xs gap-1 px-2.5 min-h-7 h-7"
                      :aria-label="`${project.ctaLabel || 'Open'} ${project.title} (opens in new tab)`"
                    >
                      <span class="max-w-[6.5rem] truncate sm:max-w-none">{{ project.ctaLabel || 'Open' }}</span>
                      <Icon name="fluent:open-24-regular" width="12" height="12" aria-hidden="true" />
                    </a>
                    <a
                      v-if="project.repo && project.repo !== project.href"
                      :href="project.repo"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-ghost btn-xs min-h-7 h-7 w-7 px-0 text-base-content/65 hover:text-primary"
                      :aria-label="`View ${project.title} on GitHub (opens in new tab)`"
                    >
                      <Icon name="ph:github-logo" width="14" height="14" aria-hidden="true" />
                    </a>
                    <span
                      v-if="!project.href && !project.repo"
                      class="text-[11px] text-base-content/50"
                    >
                      Private / internal
                    </span>
                  </div>
                </footer>
              </div>
            </article>
            </li>
          </ul>
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

const KEYPAD_UNLOCKED_KEY = 'alihd-keypad-unlocked'

const showHeroCustomizer = ref(false)

function unlockHeroCustomizer() {
  showHeroCustomizer.value = true
  if (import.meta.client) {
    localStorage.setItem(KEYPAD_UNLOCKED_KEY, '1')
  }
}

onMounted(() => {
  if (localStorage.getItem(KEYPAD_UNLOCKED_KEY) === '1') {
    showHeroCustomizer.value = true
  }
})

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

function projectCardAccent(accent = 'primary') {
  return `border-l-[3px] ${ACCENT_BORDER[accent] ?? ACCENT_BORDER.primary}`
}

function projectIconClass(accent = 'primary') {
  return ACCENT_ICON[accent] ?? ACCENT_ICON.primary
}

function projectStatusClass(status: string) {
  const key = status.toLowerCase()
  if (key === 'live') {
    return 'border-success/25 bg-success/8 text-success'
  }
  if (key === 'active' || key === 'ongoing') {
    return 'border-info/25 bg-info/8 text-info'
  }
  return 'border-base-300/40 bg-base-200/40 text-base-content/60'
}

function projectStatusDotClass(status: string) {
  const key = status.toLowerCase()
  if (key === 'live') return 'bg-success'
  if (key === 'active' || key === 'ongoing') return 'bg-info'
  return 'bg-base-content/40'
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
    accent: 'primary',
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
    accent: 'secondary',
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
    accent: 'info',
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
.index-project-card {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.index-project-card {
  min-height: 0;
}

@media (min-width: 640px) {
  .index-project-card > div:first-child {
    align-self: stretch;
    min-height: 7.75rem;
  }

  .index-project-thumb {
    min-height: 100%;
  }
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
  .index-project-thumb {
    transition: none;
  }

  .hero-panel-swap-enter-active,
  .hero-panel-swap-leave-active {
    transition: none;
  }
}
</style>
