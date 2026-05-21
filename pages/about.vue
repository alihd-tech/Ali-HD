<template>
  <div class="min-h-screen bg-base-100">
    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-base-300/25 py-16 md:py-24">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_5%,transparent),transparent)]" aria-hidden="true" />

      <div class="container section-container relative z-10 mx-auto max-w-5xl">
        <AppBreadcrumb :items="breadcrumbItems" class="mb-6" />
        <div
          :key="`about-hero-${isNerd ? 'nerd' : 'plain'}`"
          class="space-y-6"
        >
          <div class="inline-block">
            <span class="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">About me</span>
          </div>
          <h1 class="font-quicksand text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {{ content.heroTitle }}<span class="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent">{{ content.heroTitleAccent }}</span>
          </h1>
          <p class="text-lg leading-relaxed text-base-content/75 md:text-xl">
            {{ content.heroSubtitle }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 md:py-20">
      <div class="container section-container relative z-10 mx-auto max-w-5xl">
        <div class="grid gap-12 lg:grid-cols-3">
          <!-- Main Column -->
          <div
            :key="`about-main-${isNerd ? 'nerd' : 'plain'}`"
            class="lg:col-span-2 space-y-12"
          >
            <!-- Biography -->
            <div class="space-y-4">
              <h2 class="font-quicksand text-2xl font-bold text-base-content">Who I am</h2>
              <p
                v-for="(paragraph, index) in content.bio"
                :key="`bio-${index}`"
                class="leading-relaxed text-base-content/75"
              >
                {{ paragraph }}
              </p>
            </div>

            <!-- Expertise Grid -->
            <div class="space-y-4">
              <h2 class="font-quicksand text-2xl font-bold text-base-content">Core Expertise</h2>
              <div class="grid gap-4 sm:grid-cols-2">
                <div
                  v-for="item in content.expertise"
                  :key="item.title"
                  class="rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur"
                >
                  <h3 class="font-bold mb-2" :class="expertiseTitleClass(item.accent)">
                    {{ item.title }}
                  </h3>
                  <p class="text-sm leading-relaxed text-base-content/70">
                    {{ item.body }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Skills -->
            <div class="space-y-4">
              <h2 class="font-quicksand text-2xl font-bold text-base-content">Technical Skills</h2>
              <div class="space-y-3">
                <div
                  v-for="group in content.skills"
                  :key="group.label"
                >
                  <p class="text-sm font-medium text-base-content mb-2">{{ group.label }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="skill in group.items"
                      :key="skill"
                      class="rounded-full border px-3 py-1 text-xs font-medium"
                      :class="skillTagClass(group.accent)"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-6">
            <!-- Nerd mode -->
            <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-6 backdrop-blur">
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0">
                  <h3 class="font-bold text-base-content flex items-center gap-2">
                    <Icon
                      :name="isNerd ? 'fluent:code-24-filled' : 'fluent:person-24-filled'"
                      class="text-primary shrink-0"
                      aria-hidden="true"
                    />
                    Nerd mode
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-base-content/65">
                    {{ isNerd
                      ? 'Technical depth, stack specifics, and the jargon I use with other engineers.'
                      : 'Plain-language overview — flip on for specs, metrics, and implementation detail.' }}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="isNerd"
                  aria-label="Toggle nerd mode"
                  class="relative mt-0.5 h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  :class="isNerd ? 'bg-primary' : 'bg-base-300'"
                  @click="store.toggleNerd()"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out"
                    :class="isNerd ? 'translate-x-5' : 'translate-x-0'"
                  />
                </button>
              </div>
              <p
                class="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em]"
                :class="isNerd ? 'text-primary' : 'text-base-content/45'"
                role="status"
              >
                {{ modeLabel }}
              </p>
            </div>
 
          </aside>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { type BreadcrumbItem } from '~/composables/useBreadcrumbSchema';

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About' },
]

const store = useAppStore()
const { content, isNerd, modeLabel } = await useAboutContent()

const EXPERTISE_TITLE: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  info: 'text-info',
  success: 'text-success',
}

const SKILL_TAG: Record<string, string> = {
  primary: 'border-primary/30 bg-primary/8 text-primary',
  secondary: 'border-secondary/30 bg-secondary/8 text-secondary',
  info: 'border-info/30 bg-info/8 text-info',
}

function expertiseTitleClass(accent: string) {
  return EXPERTISE_TITLE[accent] ?? EXPERTISE_TITLE.primary
}

function skillTagClass(accent: string) {
  return SKILL_TAG[accent] ?? SKILL_TAG.primary
}
</script>
