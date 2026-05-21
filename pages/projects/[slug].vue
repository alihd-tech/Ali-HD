<template>
  <div class="min-h-screen bg-base-100">
    <section class="relative overflow-hidden border-b border-base-300/25">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_6%,transparent),transparent)]"
        aria-hidden="true"
      />

      <div
        v-if="project.banner"
        class="relative aspect-[21/9] max-h-[min(52vh,28rem)] w-full overflow-hidden border-b border-base-300/25 bg-base-200"
      >
        <img
          :src="project.banner"
          :alt="project.bannerAlt || project.title"
          class="h-full w-full object-cover"
          fetchpriority="high"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent" />
      </div>

      <div class="container section-container relative z-10 mx-auto max-w-6xl py-6 md:py-8">
        <AppBreadcrumb :items="breadcrumbItems" />
      </div>
    </section>

    <section class="border-b border-base-300/25 py-10 md:py-14">
      <div class="container section-container mx-auto max-w-6xl">
        <header
          class="space-y-6"
          :class="projectCardAccent(project.accent)"
        >
          <div class="flex flex-wrap items-start gap-4 sm:gap-5">
            <div
              v-if="project.logo"
              class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-base-300/40 bg-base-100/90 p-1.5 shadow-lg backdrop-blur-sm sm:h-16 sm:w-16"
            >
              <img
                :src="project.logo"
                :alt="project.logoAlt || `${project.title} logo`"
                class="h-full w-full object-contain"
                width="64"
                height="64"
                decoding="async"
              />
            </div>
            <div
              v-else
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-bold sm:h-16 sm:w-16 sm:text-xl"
              :class="projectLogoWrapClass(project.accent)"
            >
              {{ projectInitial(project.title) }}
            </div>

            <div class="min-w-0 flex-1 space-y-3">
              <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
                <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-base-content/50">
                  {{ project.category }}
                </p>
                <span
                  v-if="project.status"
                  class="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium"
                  :class="projectStatusClass(project.status)"
                >
                  <span
                    class="h-1.5 w-1.5 shrink-0 rounded-full"
                    :class="projectStatusDotClass(project.status)"
                    aria-hidden="true"
                  />
                  {{ project.status }}
                </span>
                <time
                  class="text-sm font-medium tabular-nums text-base-content/55"
                  :datetime="projectYearDatetime(project.year)"
                >
                  {{ project.year }}
                </time>
              </div>

              <h1 class="font-quicksand text-3xl font-bold leading-tight tracking-tight text-base-content sm:text-4xl md:text-[2.75rem]">
                {{ project.title }}
              </h1>

              <p class="max-w-3xl text-lg leading-relaxed text-base-content/75 md:text-xl">
                {{ project.description }}
              </p>
            </div>
          </div>
        </header>
      </div>
    </section>

    <div class="py-10 md:py-14">
      <div class="container section-container mx-auto max-w-6xl">
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <aside class="lg:col-span-4 xl:col-span-3">
            <div class="sticky top-24 space-y-5">
              <div
                v-if="project.highlights?.length"
                class="rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur"
              >
                <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                  Highlights
                </p>
                <ul class="space-y-3 text-sm text-base-content/75">
                  <li
                    v-for="highlight in project.highlights"
                    :key="highlight"
                    class="flex gap-2"
                  >
                    <Icon
                      name="fluent:checkmark-circle-12-filled"
                      class="mt-0.5 h-4 w-4 shrink-0"
                      :class="projectIconClass(project.accent)"
                      aria-hidden="true"
                    />
                    <span>{{ highlight }}</span>
                  </li>
                </ul>
              </div>

              <div
                v-if="project.tags?.length"
                class="rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur"
              >
                <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                  Stack
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.tags"
                    :key="tech"
                    class="rounded-full border px-2.5 py-1 text-xs font-medium"
                    :class="projectTagClass(project.accent)"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur">
                <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                  Links
                </p>
                <div class="flex flex-col gap-2">
                  <a
                    v-if="project.href"
                    :href="project.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all hover:shadow-lg"
                    :class="projectBtnClass(project.accent)"
                    :aria-label="`${project.ctaLabel || 'Open'} ${project.title} (opens in new tab)`"
                  >
                    <Icon
                      :name="project.repo && project.repo === project.href ? 'ph:github-logo-bold' : 'fluent:open-24-regular'"
                      class="h-4 w-4"
                      aria-hidden="true"
                    />
                    {{ project.ctaLabel || 'Visit' }}
                  </a>
                  <a
                    v-if="project.repo && project.repo !== project.href"
                    :href="project.repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-base-300/40 px-4 py-2.5 text-sm font-semibold text-base-content/80 transition-all hover:border-info/40 hover:text-info"
                    :aria-label="`View ${project.title} on GitHub (opens in new tab)`"
                  >
                    <Icon name="ph:github-logo" class="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                  <p
                    v-if="!project.href && !project.repo"
                    class="text-sm text-base-content/50"
                  >
                    Private / internal — no public link
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <article class="min-w-0 lg:col-span-8 xl:col-span-9">
            <div
              v-if="hasBody"
              class="project-prose rounded-2xl border border-base-300/30 bg-base-100/30 p-6 sm:p-8 md:p-10 backdrop-blur"
            >
              <ContentRenderer :value="project" />
            </div>
            <div
              v-else
              class="rounded-2xl border border-base-300/30 bg-base-100/30 p-6 sm:p-8 md:p-10 backdrop-blur"
            >
              <p class="text-base leading-relaxed text-base-content/80 md:text-lg">
                {{ project.description }}
              </p>
            </div>

            <div
              v-if="prevProject || nextProject"
              class="mt-10 grid gap-4 sm:grid-cols-2"
            >
              <NuxtLink
                v-if="prevProject"
                :to="prevProject._path!"
                class="group rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur transition-all hover:border-primary/35 hover:shadow-lg hover:shadow-primary/[0.06]"
              >
                <span class="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                  <Icon name="fluent:arrow-left-24-regular" class="h-3.5 w-3.5" aria-hidden="true" />
                  Previous
                </span>
                <p class="mt-2 font-quicksand text-base font-bold text-base-content transition-colors group-hover:text-primary line-clamp-2">
                  {{ prevProject.title }}
                </p>
              </NuxtLink>
              <div v-else class="hidden sm:block" />

              <NuxtLink
                v-if="nextProject"
                :to="nextProject._path!"
                class="group rounded-2xl border border-base-300/40 bg-base-100/50 p-5 text-end backdrop-blur transition-all hover:border-secondary/35 hover:shadow-lg hover:shadow-secondary/[0.06] sm:col-start-2"
              >
                <span class="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                  Next
                  <Icon name="fluent:arrow-right-24-regular" class="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p class="mt-2 font-quicksand text-base font-bold text-base-content transition-colors group-hover:text-primary line-clamp-2">
                  {{ nextProject.title }}
                </p>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </div>

    <section
      v-if="relatedProjects.length"
      class="border-t border-base-300/25 py-12 md:py-16"
    >
      <div class="container section-container mx-auto max-w-6xl">
        <header class="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="project-eyebrow mb-2">More work</p>
            <h2 class="font-quicksand text-2xl font-bold text-base-content">
              Other projects
            </h2>
          </div>
          <NuxtLink
            to="/projects"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            All projects
            <Icon name="fluent:arrow-right-24-regular" class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </header>

        <div class="grid gap-6 md:grid-cols-2">
          <NuxtLink
            v-for="item in relatedProjects"
            :key="item._path"
            :to="item._path!"
            class="group overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 p-6 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
          >
            <p class="text-[11px] font-semibold uppercase tracking-wider text-base-content/50">
              {{ item.category }}
            </p>
            <h3 class="mt-2 font-quicksand text-lg font-bold leading-snug text-base-content transition-colors group-hover:text-primary line-clamp-2">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-base-content/70 line-clamp-2">
              {{ item.description }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="border-t border-base-300/25 py-12 md:py-16">
      <div class="container section-container mx-auto max-w-5xl">
        <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-8 text-center backdrop-blur sm:p-10">
          <h2 class="font-quicksand text-2xl font-bold text-base-content">
            Interested in working together?
          </h2>
          <p class="mx-auto mt-3 max-w-md text-base-content/70">
            I'm open to collaborations, contract work, and interesting engineering challenges.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/projects"
              class="inline-flex items-center gap-2 rounded-xl border-2 border-base-300/40 bg-base-100 px-6 py-3 text-sm font-semibold text-base-content transition-all hover:border-primary/50 hover:bg-primary/5"
            >
              <Icon name="fluent:folder-24-regular" class="h-4 w-4" aria-hidden="true" />
              All projects
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-primary px-8 py-3 font-semibold text-primary-content transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              <Icon name="fluent:mail-24-regular" class="h-4 w-4" aria-hidden="true" />
              Get in touch
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '~/composables/useBreadcrumbSchema'
import type { PortfolioProject } from '~/types/portfolio-project'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { project: projectData } = await usePortfolioProject(slug)

if (!projectData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const project = projectData.value

const { data: allProjects } = await useAsyncData('all-portfolio-projects', () =>
  queryContent<PortfolioProject>('/projects').sort({ order: 1 }).find(),
)

useHead({
  title: `${project.title} — Ali HD`,
  meta: [
    { name: 'description', content: project.description },
    ...(project.banner
      ? [{ property: 'og:image', content: `https://alihd.ir${project.banner}` }]
      : []),
  ],
})

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: project.title },
])

const sortedProjects = computed(() => allProjects.value ?? [])

const currentIndex = computed(() =>
  sortedProjects.value.findIndex((p) => p._path === project._path),
)

const prevProject = computed(() => {
  const idx = currentIndex.value
  if (idx <= 0) return null
  return sortedProjects.value[idx - 1] ?? null
})

const nextProject = computed(() => {
  const idx = currentIndex.value
  if (idx < 0 || idx >= sortedProjects.value.length - 1) return null
  return sortedProjects.value[idx + 1] ?? null
})

const relatedProjects = computed(() => {
  if (!allProjects.value?.length) return []
  const currentTags = new Set(project.tags ?? [])

  return allProjects.value
    .filter((p) => p._path !== project._path)
    .map((p) => {
      const shared = (p.tags ?? []).filter((t) => currentTags.has(t)).length
      return { project: p, score: shared }
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return (a.project.order ?? 99) - (b.project.order ?? 99)
    })
    .slice(0, 2)
    .map(({ project: p }) => p)
})

const hasBody = computed(() => {
  const children = (project as { body?: { children?: unknown[] } }).body?.children
  return Array.isArray(children) && children.length > 0
})
</script>

<style scoped>
.project-eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 88%, var(--fallback-bc, oklch(var(--bc))));
}

.project-prose {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: color-mix(in srgb, var(--color-base-content) 82%, transparent);
}
</style>
