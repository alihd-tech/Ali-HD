<template>
  <div class="min-h-screen bg-base-100">
    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-base-300/25 py-16 md:py-24">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_5%,transparent),transparent)]" aria-hidden="true" />

      <div class="container section-container relative z-10 mx-auto max-w-5xl">
        <div class="space-y-6">
          <div class="inline-block">
            <span class="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">About me</span>
          </div>
          <h1 class="font-quicksand text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Full-Stack Engineer <span class="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent">&</span> Web Architect
          </h1>
          <p class="text-lg leading-relaxed text-base-content/75 md:text-xl">
            Building thoughtfully engineered systems where performance, architecture, and user experience align. Five years of hands-on experience shipping production software across the full stack.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 md:py-20">
      <div class="container section-container relative z-10 mx-auto max-w-5xl">
        <div class="grid gap-12 lg:grid-cols-3">
          <!-- Main Column -->
          <div class="lg:col-span-2 space-y-12">
            <!-- Biography -->
            <div class="space-y-4">
              <h2 class="font-quicksand text-2xl font-bold text-base-content">Who I am</h2>
              <p class="leading-relaxed text-base-content/75">
                I'm a full-stack engineer based in Iran with a passion for building systems that scale. I specialize in designing and implementing robust architectures that handle real-world complexity without sacrificing developer experience.
              </p>
              <p class="leading-relaxed text-base-content/75">
                My work spans backend services (Scala, FastAPI, Laravel), frontend interfaces (Nuxt, Vue, TypeScript), and infrastructure (Docker, PostgreSQL, Redis). I believe in shipping things fast while maintaining high standards for code quality and system reliability.
              </p>
            </div>

            <!-- Expertise Grid -->
            <div class="space-y-4">
              <h2 class="font-quicksand text-2xl font-bold text-base-content">Core Expertise</h2>
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur">
                  <h3 class="font-bold text-primary mb-2">Backend Engineering</h3>
                  <p class="text-sm leading-relaxed text-base-content/70">
                    Scala, FastAPI, Laravel. Building APIs, data pipelines, and microservices that stay performant under load.
                  </p>
                </div>
                <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur">
                  <h3 class="font-bold text-secondary mb-2">Frontend Architecture</h3>
                  <p class="text-sm leading-relaxed text-base-content/70">
                    Nuxt, Vue, TypeScript. Designing component systems and state management that scale with teams.
                  </p>
                </div>
                <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur">
                  <h3 class="font-bold text-info mb-2">Database & Infrastructure</h3>
                  <p class="text-sm leading-relaxed text-base-content/70">
                    PostgreSQL, Redis, Docker. Provisioning, scaling, and maintaining production systems reliably.
                  </p>
                </div>
                <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-5 backdrop-blur">
                  <h3 class="font-bold text-success mb-2">Product Engineering</h3>
                  <p class="text-sm leading-relaxed text-base-content/70">
                    Full-stack delivery from concept to shipping. Balancing technical excellence with time-to-market.
                  </p>
                </div>
              </div>
            </div>

            <!-- Skills -->
            <div class="space-y-4">
              <h2 class="font-quicksand text-2xl font-bold text-base-content">Technical Skills</h2>
              <div class="space-y-3">
                <div>
                  <p class="text-sm font-medium text-base-content mb-2">Languages</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="skill in ['TypeScript', 'Scala', 'Python', 'PHP', 'Rust', 'Zig']" :key="skill" class="rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                      {{ skill }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-base-content mb-2">Frameworks & Libraries</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="skill in ['Nuxt', 'Vue.js', 'React', 'Next.js', 'FastAPI', 'Laravel', 'http4s']" :key="skill" class="rounded-full border border-secondary/30 bg-secondary/8 px-3 py-1 text-xs font-medium text-secondary">
                      {{ skill }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-base-content mb-2">Infrastructure & Tools</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="skill in ['PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Git', 'Linux']" :key="skill" class="rounded-full border border-info/30 bg-info/8 px-3 py-1 text-xs font-medium text-info">
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-6">
            <!-- Quick Facts -->
            <div class="rounded-2xl border border-base-300/40 bg-base-100/50 p-6 backdrop-blur">
              <h3 class="font-bold text-base-content mb-4 flex items-center gap-2">
                <Icon name="fluent:info-24-filled" class="text-primary" />
                Quick Facts
              </h3>
              <ul class="space-y-3 text-sm">
                <li class="flex gap-3">
                  <span class="font-semibold text-primary">Location</span>
                  <span class="text-base-content/70">Iran, Remote</span>
                </li>
                <li class="flex gap-3">
                  <span class="font-semibold text-primary">Experience</span>
                  <span class="text-base-content/70">5+ years</span>
                </li>
                <li class="flex gap-3">
                  <span class="font-semibold text-primary">Focus</span>
                  <span class="text-base-content/70">Full-stack systems</span>
                </li>
                <li class="flex gap-3">
                  <span class="font-semibold text-primary">Availability</span>
                  <span class="text-base-content/70">Contract & freelance</span>
                </li>
              </ul>
            </div>

            <!-- CTA -->
            <NuxtLink
              to="/contact"
              class="block rounded-2xl border-2 border-primary bg-primary px-6 py-4 text-center font-semibold text-primary-content transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              Get in touch
            </NuxtLink>
          </aside>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { pageSeo, SITE_URL } from '~/utils/site'

const seo = pageSeo.about

useSiteSeo({
  ...seo,
  jsonLd: {
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: seo.title,
    description: seo.description,
    isPartOf: websiteRef(),
    about: personRef(),
    inLanguage: 'en-US',
  },
})
</script>
