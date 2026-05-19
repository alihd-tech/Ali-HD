<template>
  <div class="min-h-screen bg-base-100">
    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-base-300/25 py-16 md:py-24">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_5%,transparent),transparent)]" aria-hidden="true" />

      <div class="container section-container relative z-10 mx-auto max-w-6xl">
        <div class="space-y-6">
          <div class="inline-block">
            <span class="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">Portfolio</span>
          </div>
          <h1 class="font-quicksand text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Featured <span class="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent">projects</span>
          </h1>
          <p class="text-lg leading-relaxed text-base-content/75 md:text-xl">
            A collection of products shipped end-to-end with live links. From design software to travel platforms to open-source tooling.
          </p>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-12 md:py-20">
      <div class="container section-container relative z-10 mx-auto max-w-6xl">
        <div class="grid gap-8 lg:grid-cols-2">
          <!-- Solanam -->
          <article class="group overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 backdrop-blur">
            <div class="relative aspect-video overflow-hidden border-b border-base-300/25 bg-base-200">
              <img
                src="https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=1260"
                alt="Solanam design software interface"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent" />
            </div>
            <div class="p-6 sm:p-8">
              <div class="mb-3 flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                  S
                </div>
                <div>
                  <p class="text-[11px] font-semibold uppercase tracking-wider text-base-content/50">Design Software</p>
                  <h3 class="font-quicksand text-xl font-bold text-base-content">Solanam</h3>
                </div>
              </div>

              <p class="mb-4 text-sm leading-relaxed text-base-content/75">
                Web-based design software with canvas workflows, asset tooling, and a product surface built for creators in the browser.
              </p>

              <ul class="mb-6 space-y-2 border-l border-base-300/30 pl-4 text-sm text-base-content/70">
                <li>In-browser design editor with collaborative features</li>
                <li>Product-grade UX and performance</li>
                <li>Live at solanam.com with active users</li>
              </ul>

              <div class="mb-5 flex flex-wrap gap-2">
                <span v-for="tech in ['Rust', 'Tauri', 'Nuxt', 'FastAPI', 'TypeScript', 'PWA']" :key="tech" class="rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary">
                  {{ tech }}
                </span>
              </div>

              <div class="flex gap-3 pt-4 border-t border-base-300/25">
                <a
                  href="https://solanam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 rounded-lg border-2 border-primary bg-primary px-4 py-2 text-center font-semibold text-primary-content transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  <Icon name="fluent:open-24-regular" class="inline mr-1" />
                  Visit
                </a>
              </div>
            </div>
          </article>

          <!-- eSimTrip -->
          <article class="group overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 transition-all hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/10 backdrop-blur">
            <div class="relative aspect-video overflow-hidden border-b border-base-300/25 bg-base-200">
              <img
                src="https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260"
                alt="eSimTrip travel platform"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent" />
            </div>
            <div class="p-6 sm:p-8">
              <div class="mb-3 flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary font-bold text-sm">
                  E
                </div>
                <div>
                  <p class="text-[11px] font-semibold uppercase tracking-wider text-base-content/50">Travel Services</p>
                  <h3 class="font-quicksand text-xl font-bold text-base-content">eSimTrip</h3>
                </div>
              </div>

              <p class="mb-4 text-sm leading-relaxed text-base-content/75">
                Full eSIM travel ecosystem with consumer storefronts, vendor consoles, and regional brands for local and global markets.
              </p>

              <ul class="mb-6 space-y-2 border-l border-base-300/30 pl-4 text-sm text-base-content/70">
                <li>Multi-tenant ecosystem (.com, .ir, .me domains)</li>
                <li>Vendor and operator platforms</li>
                <li>Local & global product strategies</li>
              </ul>

              <div class="mb-5 flex flex-wrap gap-2">
                <span v-for="tech in ['Nuxt', 'Next', 'Laravel', 'APIs', 'Multi-Tenant']" :key="tech" class="rounded-full border border-secondary/20 bg-secondary/8 px-2.5 py-1 text-xs font-medium text-secondary">
                  {{ tech }}
                </span>
              </div>

              <div class="flex gap-3 pt-4 border-t border-base-300/25">
                <a
                  href="https://esimtrip.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 rounded-lg border-2 border-secondary bg-secondary px-4 py-2 text-center font-semibold text-secondary-content transition-all hover:shadow-lg hover:shadow-secondary/30"
                >
                  <Icon name="fluent:open-24-regular" class="inline mr-1" />
                  Visit
                </a>
              </div>
            </div>
          </article>

          <!-- Open Source - Full Width -->
          <article class="group col-span-full overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/50 transition-all hover:border-info/30 hover:shadow-xl hover:shadow-info/10 backdrop-blur">
            <div class="grid gap-6 lg:grid-cols-3">
              <div class="relative aspect-video overflow-hidden border-b border-base-300/25 bg-base-200 lg:border-b-0 lg:border-r">
                <img
                  src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260"
                  alt="Open source and developer tooling"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent" />
              </div>

              <div class="p-6 sm:p-8 lg:col-span-2">
                <div class="mb-3 flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info font-bold text-sm">
                    O
                  </div>
                  <div>
                    <p class="text-[11px] font-semibold uppercase tracking-wider text-base-content/50">Open Source</p>
                    <h3 class="font-quicksand text-xl font-bold text-base-content">Dev Tooling & Open Source Projects</h3>
                  </div>
                </div>

                <p class="mb-4 text-sm leading-relaxed text-base-content/75">
                  Browser extensions, shared libraries, and upstream contributions — reusable pieces extracted from production builds.
                </p>

                <ul class="mb-6 space-y-2 border-l border-base-300/30 pl-4 text-sm text-base-content/70">
                  <li>Actively maintained solaxnm extension and project starters</li>
                  <li>Docs, algorithms, and upstream framework contributions</li>
                  <li>GitHub-first delivery model with community engagement</li>
                </ul>

                <div class="mb-5 flex flex-wrap gap-2">
                  <span v-for="tech in ['Rust-Tauri', 'Nuxt-Vue', 'PHP-Laravel', 'Python-FastAPI', 'WebAssembly', 'TypeScript']" :key="tech" class="rounded-full border border-info/20 bg-info/8 px-2.5 py-1 text-xs font-medium text-info">
                    {{ tech }}
                  </span>
                </div>

                <div class="flex gap-3 pt-4 border-t border-base-300/25">
                  <a
                    href="https://github.com/alihd-tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 rounded-lg border-2 border-info bg-info px-4 py-2 text-center font-semibold text-info-content transition-all hover:shadow-lg hover:shadow-info/30"
                  >
                    <Icon name="ph:github-logo-bold" class="inline mr-1" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
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

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { pageSeo, SITE_URL } from '~/utils/site'

const seo = pageSeo.projects

useSiteSeo({
  ...seo,
  jsonLd: {
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/projects#webpage`,
    url: `${SITE_URL}/projects`,
    name: seo.title,
    description: seo.description,
    isPartOf: websiteRef(),
    about: personRef(),
    inLanguage: 'en-US',
  },
})
</script>
