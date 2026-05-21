<template>
  <div class="min-h-screen bg-base-100">
    <section class="relative overflow-hidden border-b border-base-300/25 py-16 md:py-24">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_5%,transparent),transparent)]"
        aria-hidden="true"
      />

      <div class="container section-container relative z-10 mx-auto max-w-6xl">
        <div class="space-y-6">
          <AppBreadcrumb :items="breadcrumbItems" />
          <div class="inline-block">
            <span class="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">Portfolio</span>
          </div>
          <h1 class="font-quicksand text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Featured <span class="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent">projects</span>
          </h1>
          <p class="text-lg leading-relaxed text-base-content/75 md:text-xl">
            Design software, travel platforms, and operator tooling — shipped end to end with live links.
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20">
      <div class="container section-container relative z-10 mx-auto max-w-6xl">
        <div class="grid gap-8 lg:grid-cols-2">
          <article
            v-for="(project, index) in projects"
            :key="project.title"
            class="group overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 backdrop-blur transition-all hover:shadow-xl"
            :class="[
              projectCardHover(project.accent),
              index === projects.length - 1 ? 'col-span-full' : '',
            ]"
          >
            <div
              class="grid gap-0"
              :class="index === projects.length - 1 ? 'lg:grid-cols-3' : ''"
            >
              <div
                class="relative overflow-hidden border-b border-base-300/25 bg-base-200"
                :class="[
                  index === projects.length - 1
                    ? 'aspect-video lg:border-b-0 lg:border-r lg:border-base-300/25'
                    : 'aspect-video',
                ]"
              >
                <img
                  v-if="project.banner"
                  :src="project.banner"
                  :alt="project.bannerAlt || project.title"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent" />
                <img
                  v-if="project.logo"
                  :src="project.logo"
                  :alt="project.logoAlt || `${project.title} logo`"
                  class="absolute bottom-3 start-3 h-10 w-10 rounded-xl border border-base-300/40 bg-base-100/90 object-contain p-1 shadow-lg backdrop-blur-sm sm:bottom-4 sm:start-4"
                  loading="lazy"
                  decoding="async"
                />
                <time
                  class="absolute end-3 top-3 rounded-lg border border-base-300/35 bg-base-100/80 px-2 py-1 text-[11px] font-semibold tabular-nums text-base-content/70 shadow-sm backdrop-blur-sm sm:end-4 sm:top-4"
                  :datetime="projectYearDatetime(project.year)"
                >
                  {{ project.year }}
                </time>
              </div>

              <div
                class="p-6 sm:p-8"
                :class="index === projects.length - 1 ? 'lg:col-span-2' : ''"
              >
                <div class="mb-3 flex items-center gap-3">
                  <div
                    v-if="project.logo"
                    class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-base-300/40 bg-base-100/90 p-1 lg:hidden"
                  >
                    <img
                      :src="project.logo"
                      :alt="project.logoAlt || `${project.title} logo`"
                      class="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div
                    v-else
                    class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
                    :class="projectLogoWrapClass(project.accent)"
                  >
                    {{ projectInitial(project.title) }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p class="text-[11px] font-semibold uppercase tracking-wider text-base-content/50">
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
                    <h3 class="font-quicksand text-xl font-bold text-base-content">
                      {{ project.title }}
                    </h3>
                  </div>
                </div>

                <p class="mb-4 text-sm leading-relaxed text-base-content/75">
                  {{ project.description }}
                </p>

                <ul
                  v-if="project.highlights?.length"
                  class="mb-6 space-y-2 border-l border-base-300/30 pl-4 text-sm text-base-content/70"
                >
                  <li
                    v-for="highlight in project.highlights"
                    :key="highlight"
                  >
                    {{ highlight }}
                  </li>
                </ul>

                <div
                  v-if="project.tags?.length"
                  class="mb-5 flex flex-wrap gap-2"
                >
                  <span
                    v-for="tech in project.tags"
                    :key="tech"
                    class="rounded-full border px-2.5 py-1 text-xs font-medium"
                    :class="projectTagClass(project.accent)"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div class="flex flex-wrap gap-3 border-t border-base-300/25 pt-4">
                  <a
                    v-if="project.href"
                    :href="project.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 rounded-lg border-2 px-4 py-2 text-center text-sm font-semibold transition-all hover:shadow-lg"
                    :class="projectBtnClass(project.accent)"
                    :aria-label="`${project.ctaLabel || 'Open'} ${project.title} (opens in new tab)`"
                  >
                    <Icon
                      :name="project.repo && project.repo === project.href ? 'ph:github-logo-bold' : 'fluent:open-24-regular'"
                      class="me-1 inline"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    />
                    {{ project.ctaLabel || 'Visit' }}
                  </a>
                  <a
                    v-if="project.repo && project.repo !== project.href"
                    :href="project.repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-lg border-2 border-base-300/40 px-4 py-2 text-center text-sm font-semibold text-base-content/80 transition-all hover:border-info/40 hover:text-info"
                    :aria-label="`View ${project.title} on GitHub (opens in new tab)`"
                  >
                    <Icon name="ph:github-logo" width="16" height="16" class="me-1 inline" aria-hidden="true" />
                    GitHub
                  </a>
                  <span
                    v-if="!project.href && !project.repo"
                    class="text-sm text-base-content/50"
                  >
                    Private / internal
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="border-t border-base-300/25 py-12 md:py-16">
      <div class="container section-container relative z-10 mx-auto max-w-5xl text-center">
        <h2 class="font-quicksand text-2xl font-bold text-base-content mb-4">
          Interested in working together?
        </h2>
        <p class="text-base-content/70 mb-6">
          I'm open to collaborations, contract work, and interesting engineering challenges.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-block rounded-xl border-2 border-primary bg-primary px-8 py-3 font-semibold text-primary-content transition-all hover:shadow-lg hover:shadow-primary/30"
        >
          Get in touch
        </NuxtLink>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '~/composables/useBreadcrumbSchema'
import {
  projectBtnClass,
  projectCardHover,
  projectInitial,
  projectLogoWrapClass,
  projectStatusClass,
  projectStatusDotClass,
  projectTagClass,
  projectYearDatetime,
} from '~/data/projects'

const { projects } = await usePortfolioProjects()

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Projects' },
]
</script>
