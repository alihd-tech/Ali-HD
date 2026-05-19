<template>
  <div class="min-h-screen bg-base-100">
    <section class="relative overflow-hidden border-b border-base-300/25 py-16 md:py-24">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_5%,transparent),transparent)]"
        aria-hidden="true"
      />

      <div class="container section-container relative z-10 mx-auto max-w-5xl">
        <div class="space-y-6">
          <span class="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">Contact</span>
          <h1 class="font-quicksand text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Let&apos;s build something
            <span class="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent">
              solid
            </span>
          </h1>
          <p class="text-lg leading-relaxed text-base-content/75 md:text-xl">
            Open to collaborations, product work, and thoughtful engineering roles. I usually reply within a few days.
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20">
      <div class="container section-container mx-auto max-w-5xl">
        <div class="grid gap-8 lg:grid-cols-2">
          <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-8 backdrop-blur">
            <h2 class="font-quicksand mb-4 text-xl font-bold text-base-content">Email</h2>
            <a
              :href="`mailto:${contactEmail}`"
              class="btn btn-primary gap-2"
            >
              <Icon name="fluent:mail-24-filled" class="h-4 w-4" aria-hidden="true" />
              {{ contactEmail }}
            </a>
          </div>

          <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-8 backdrop-blur">
            <h2 class="font-quicksand mb-4 text-xl font-bold text-base-content">Social</h2>
            <ul class="space-y-3">
              <li v-for="link in socialLinks" :key="link.name">
                <a
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer me"
                  class="flex items-center gap-3 text-base-content/80 transition-colors hover:text-primary"
                >
                  <Icon :name="link.icon" class="h-5 w-5 text-primary" aria-hidden="true" />
                  <span>
                    <span class="font-medium">{{ link.name }}</span>
                    <span class="block text-sm text-base-content/55">{{ link.subtitle }}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p class="mt-10 text-center text-sm text-base-content/55">
          Prefer the full portfolio experience?
          <NuxtLink to="/" class="link link-primary">Return home</NuxtLink>
        </p>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { pageSeo, SITE_URL } from '~/utils/site'

const config = useRuntimeConfig()
const contactEmail = config.public.contactEmail as string
const socialLinks = config.public.socialLinks as Array<{
  name: string
  url: string
  icon: string
  subtitle: string
}>

const seo = pageSeo.contact

useSiteSeo({
  ...seo,
  jsonLd: {
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact#webpage`,
    url: `${SITE_URL}/contact`,
    name: seo.title,
    description: seo.description,
    isPartOf: websiteRef(),
    about: personRef(),
    inLanguage: 'en-US',
  },
})
</script>
