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
                  class="hero-customizer-card relative max-w-sm mx-auto overflow-hidden rounded-2xl border-2 border-base-300 bg-base-100 p-5 shadow-xl sm:p-6"
                >
                  <div
                    class="pointer-events-none absolute -inset-px bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-70"
                    aria-hidden="true"
                  /> 
      
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
        class="stack-section relative scroll-mt-20 overflow-hidden border-b border-base-300/25 py-12 sm:py-14 md:py-16 lg:py-20"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_0%_50%,color-mix(in_srgb,var(--color-primary)_6%,transparent),transparent),radial-gradient(ellipse_50%_40%_at_100%_80%,color-mix(in_srgb,var(--color-secondary)_5%,transparent),transparent)]"
          aria-hidden="true"
        />

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
              <div
                class="flex shrink-0 items-center gap-3 rounded-full border border-base-300/35 bg-base-100/50 px-4 py-2 text-sm backdrop-blur-sm lg:self-end"
                role="status"
              >
                <span
                  class="relative flex h-2 w-2"
                  aria-hidden="true"
                >
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-75" />
                  <span class="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span class="text-base-content/55">
                  <span class="font-medium text-base-content/85">{{ complexityLabel }}</span>
                  <span class="mx-1.5 text-base-content/25" aria-hidden="true">&middot;</span>
                  Live depth
                </span>
              </div>
            </div>
          </header>

          <div
            class="stack-bento grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
            role="list"
          >
            <article
              v-for="(story, index) in stackStories"
              :key="story.id"
              role="listitem"
              class="stack-card group relative flex min-h-[13.5rem] flex-col overflow-hidden rounded-2xl border border-base-300/35 bg-base-100/35 p-5 sm:min-h-[14.5rem] sm:p-6"
              :class="stackCardClass(story.accent)"
            >
              <span
                class="stack-card-index pointer-events-none absolute -end-1 -top-3 select-none font-ace text-[4.5rem] font-bold leading-none tracking-tighter sm:text-[5.25rem]"
                :class="stackIndexClass(story.accent)"
                aria-hidden="true"
              >
                {{ stackIndexLabel(index) }}
              </span>

              <div
                class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                :class="stackGlowClass(story.accent)"
                aria-hidden="true"
              />

              <div class="relative flex items-start justify-between gap-3">
                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br shadow-sm transition-transform duration-500 group-hover:scale-105"
                  :class="stackIconWrapClass(story.accent)"
                  aria-hidden="true"
                >
                  <Icon :name="story.icon || 'fluent:layer-24-filled'" class="h-5 w-5" />
                </div> 
              </div>

              <div class="relative mt-5 flex flex-1 flex-col">
                <h3 class="font-quicksand text-lg font-bold leading-snug text-base-content sm:text-xl">
                  {{ story.title }}
                </h3>
                <p class="mt-2 flex-1 text-sm leading-relaxed text-base-content/72 sm:text-[0.9375rem]">
                  {{ story.body }}
                </p>

                <ul
                  v-if="story.tags?.length"
                  class="mt-4 flex flex-wrap gap-1.5"
                  :aria-label="`Topics for ${story.title}`"
                >
                  <li
                    v-for="tag in story.tags"
                    :key="tag"
                  >
                    <span
                      class="inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium leading-tight transition-colors duration-300"
                      :class="stackTagClass(story.accent)"
                    >
                      {{ tag }}
                    </span>
                  </li>
                </ul>
              </div>

              <div
                class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-base-300/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
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
                    :alt="projectBannerAlt(project)"
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
                      :alt="projectLogoAlt(project)"
                      class="h-9 w-9 rounded-xl border border-base-300/40 bg-base-100/90 object-contain p-1 shadow-lg backdrop-blur-sm sm:h-10 sm:w-10"
                      width="40"
                      height="40"
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
                      :aria-label="projectVisitLabel(project)"
                      :title="projectVisitLabel(project)"
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
                      :aria-label="projectGitHubLabel(project)"
                      :title="projectGitHubLabel(project)"
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
import { type PortfolioProject } from '~/data/projects';
import { portfolioProjects as projects, projectCardAccent, projectIconClass, projectStatusClass, projectStatusDotClass, projectYearDatetime } from '~/data/projects';

function projectBannerAlt(project: PortfolioProject) {
  return project.bannerAlt ?? `${project.title} — project screenshot`
}

function projectLogoAlt(project: PortfolioProject) {
  return project.logoAlt ?? `${project.title} logo`
}

function projectVisitLabel(project: PortfolioProject) {
  const action = project.ctaLabel || 'Open'
  return `${action} ${project.title} (opens in new tab)`
}

function projectGitHubLabel(project: PortfolioProject) {
  return `View ${project.title} on GitHub (opens in new tab)`
}

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

const STACK_CARD: Record<string, string> = {
  primary: 'hover:border-primary/35 hover:shadow-lg hover:shadow-primary/[0.08]',
  secondary: 'hover:border-secondary/35 hover:shadow-lg hover:shadow-secondary/[0.08]',
  info: 'hover:border-info/35 hover:shadow-lg hover:shadow-info/[0.08]',
  success: 'hover:border-success/35 hover:shadow-lg hover:shadow-success/[0.08]',
}

const STACK_GLOW: Record<string, string> = {
  primary: 'bg-gradient-to-br from-primary/10 via-transparent to-transparent',
  secondary: 'bg-gradient-to-br from-secondary/10 via-transparent to-transparent',
  info: 'bg-gradient-to-br from-info/10 via-transparent to-transparent',
  success: 'bg-gradient-to-br from-success/10 via-transparent to-transparent',
}

const STACK_INDEX: Record<string, string> = {
  primary: 'text-primary/[0.07]',
  secondary: 'text-secondary/[0.07]',
  info: 'text-info/[0.07]',
  success: 'text-success/[0.07]',
}

const STACK_ICON_WRAP: Record<string, string> = {
  primary: 'border-primary/25 from-primary/20 to-primary/5 text-primary',
  secondary: 'border-secondary/25 from-secondary/20 to-secondary/5 text-secondary',
  info: 'border-info/25 from-info/20 to-info/5 text-info',
  success: 'border-success/25 from-success/20 to-success/5 text-success',
}

const STACK_TAG: Record<string, string> = {
  primary: 'border-primary/20 bg-primary/10 text-primary group-hover:border-primary/30 group-hover:bg-primary/12',
  secondary: 'border-secondary/20 bg-secondary/10 text-secondary group-hover:border-secondary/30 group-hover:bg-secondary/12',
  info: 'border-info/20 bg-info/10 text-info group-hover:border-info/30 group-hover:bg-info/12',
  success: 'border-success/20 bg-success/10 text-success group-hover:border-success/30 group-hover:bg-success/12',
}

function stackIndexLabel(index: number) {
  return String(index + 1).padStart(2, '0')
}

function stackCardClass(accent = 'primary') {
  return STACK_CARD[accent] ?? STACK_CARD.primary
}

function stackGlowClass(accent = 'primary') {
  return STACK_GLOW[accent] ?? STACK_GLOW.primary
}

function stackIndexClass(accent = 'primary') {
  return STACK_INDEX[accent] ?? STACK_INDEX.primary
}

function stackIconWrapClass(accent = 'primary') {
  return STACK_ICON_WRAP[accent] ?? STACK_ICON_WRAP.primary
}

function stackTagClass(accent = 'primary') {
  return STACK_TAG[accent] ?? STACK_TAG.primary
}

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

.stack-card {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    background-color 0.35s ease,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.stack-card:hover {
  transform: translateY(-2px);
}

.stack-card-index {
  font-variant-numeric: tabular-nums;
}

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
  .stack-card,
  .stack-card:hover {
    transform: none;
    transition: none;
  }

  .index-project-thumb {
    transition: none;
  }

  .hero-panel-swap-enter-active,
  .hero-panel-swap-leave-active {
    transition: none;
  }
}
</style>
