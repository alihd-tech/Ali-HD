<template>
  <footer
    id="contact"
    class="site-footer relative scroll-mt-20 border-t border-base-300/25"
  >
    <div
      class="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div class="absolute inset-0 opacity-[0.04]">
        <div class="grid-background site-footer-grid h-full w-full" />
      </div>
      <div
        class="absolute -top-28 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        class="absolute bottom-0 right-1/4 h-52 w-52 rounded-full bg-secondary/8 blur-3xl"
      />
    </div>

    <div
      class="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
      aria-hidden="true"
    />

    <div class="relative z-10">
      <div
        class="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
      >
        <article
          class="site-footer-panel overflow-hidden rounded-3xl border border-base-300/45"
          aria-labelledby="footer-heading"
        >
          <header
            class="site-footer-panel-header relative border-b border-base-300/30 px-6 py-8 sm:px-8 sm:py-10 lg:px-10"
          >
            <div
              class="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-primary/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              class="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
            >
              <div class="max-w-2xl space-y-4">
                <div class="flex flex-wrap items-center gap-3">
                  <p class="site-footer-eyebrow">Contact</p>
                  <span class="site-footer-status" role="status">
                    <span class="site-footer-status-dot" aria-hidden="true" />
                    Open to opportunities
                  </span>
                </div>
                <h2
                  id="footer-heading"
                  class="font-quicksand text-2xl font-bold tracking-tight text-base-content sm:text-3xl lg:text-[2rem]"
                >
                  Let&apos;s build something
                  <span class="gradient-text">solid</span>
                </h2>
                <p
                  class="max-w-xl text-sm leading-relaxed text-base-content/70 sm:text-base"
                >
                  Open to collaborations, product work, and thoughtful engineering roles.
                  I usually reply within a few days.
                </p>
              </div> 
            </div>
          </header>

          <div class="grid lg:grid-cols-12">
            <aside
              class="flex flex-col gap-6 border-b border-base-300/30 p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-8 xl:p-10"
            >
              <NuxtLink to="/" class="site-footer-profile group">
                <div class="relative shrink-0">
                  <div
                    class="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/40 to-secondary/25 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div
                    class="site-footer-avatar relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-base-300/50 bg-primary/10 shadow-lg sm:h-28 sm:w-28"
                  >
                    <img
                      src="/alihd.jpg"
                      alt=""
                      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width="112"
                      height="112"
                    />
                  </div>
                </div>
                <div class="min-w-0 flex-1 space-y-1">
                  <p class="font-ace text-lg font-bold tracking-tight text-base-content transition-colors group-hover:text-primary">
                    Ali HD
                  </p>
                  <p class="text-sm text-base-content/60">
                    Full-stack engineer &amp; web architect
                  </p>
                  <p class="truncate text-xs text-base-content/45">
                    {{ contactEmail }}
                  </p>
                </div>
                <Icon
                  name="ph:caret-right-bold"
                  class="h-4 w-4 shrink-0 text-base-content/20 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </NuxtLink>

              <nav aria-label="Site navigation" class="space-y-5">
                <div>
                  <p class="site-footer-nav-label">Explore</p>
                  <ul class="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-1">
                    <li v-for="link in footerNav" :key="link.href">
                      <NuxtLink :to="link.href" class="site-footer-nav-link">
                        <Icon :name="link.icon" class="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                        {{ link.label }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>

                <div v-if="showPageAnchors">
                  <p class="site-footer-nav-label">On this page</p>
                  <ul class="mt-2 flex flex-wrap gap-2">
                    <li v-for="link in pageAnchors" :key="link.href">
                      <a :href="link.href" class="site-footer-chip site-footer-chip--muted">
                        {{ link.label }}
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </aside>

            <section
              class="flex flex-col p-6 sm:p-8 lg:col-span-8 lg:p-8 xl:p-10"
              aria-label="Social and external links"
            >
              <div class="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p class="site-footer-nav-label">Connect</p>
                  <p class="mt-1 text-sm text-base-content/55">
                    Profiles, repos, and direct messages
                  </p>
                </div>
                <span class="hidden text-xs text-base-content/40 sm:inline">
                  {{ socialLinks.length }} channels
                </span>
              </div>

              <ul class="grid flex-1 gap-3 sm:grid-cols-2">
                <li v-for="social in socialLinks" :key="social.name">
                  <a
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="site-footer-link-card group"
                    :aria-label="`${social.name}: ${social.subtitle} (opens in new tab)`"
                  >
                    <span class="site-footer-link-icon" aria-hidden="true">
                      <Icon :name="social.icon" class="h-5 w-5" />
                    </span>
                    <span class="min-w-0 flex-1">
                      <span class="site-footer-link-name">{{ social.name }}</span>
                      <span class="site-footer-link-sub">{{ social.subtitle }}</span>
                    </span>
                    <Icon
                      name="ph:arrow-up-right-bold"
                      class="site-footer-link-arrow h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </div>

      <div class="site-footer-bar border-t border-base-300/25">
        <div
          class="container mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:justify-between lg:gap-6 lg:px-8 lg:py-6"
        >
          <p class="text-center text-xs text-base-content/50 sm:text-left sm:text-sm">
            © {{ currentYear }}
            <NuxtLink to="/" class="site-footer-inline-link">Ali Heydari</NuxtLink>.
            Crafted with care.
          </p>

          <nav aria-label="Footer legal and utility" class="flex flex-wrap items-center justify-center gap-2">
            <NuxtLink
              v-for="link in footerMetaLinks"
              :key="link.href"
              :to="link.href"
              class="site-footer-meta-chip"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <a href="#top" class="site-footer-back-top">
            <Icon name="ph:arrow-up-bold" class="h-4 w-4" aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
const route = useRoute()

const footerNav = [
  { label: 'Home', href: '/', icon: 'ph:house-bold' },
  { label: 'About', href: '/about', icon: 'ph:user-bold' },
  { label: 'Projects', href: '/projects', icon: 'ph:folder-bold' },
  { label: 'Blog', href: '/blog', icon: 'ph:article-bold' },
  { label: 'Contact', href: '/contact', icon: 'ph:envelope-bold' },
] as const

const pageAnchors = [
  { label: 'Top', href: '#top' },
  { label: 'Approach', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const

const footerMetaLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const

const showPageAnchors = computed(() => route.path === '/')

const { public: publicConfig } = useRuntimeConfig()
const socialLinks = publicConfig.socialLinks
const contactEmail = publicConfig.contactEmail
 
</script>

<style scoped>  

.site-footer-panel {
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--color-primary) 6%, transparent),
    color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 50%, transparent) 38%,
    color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 55%, transparent)
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--color-primary) 8%, transparent),
    0 16px 48px color-mix(in srgb, #000 8%, transparent);
  animation: footer-panel-in 0.55s ease-out both;
}

@keyframes footer-panel-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.site-footer-panel-header {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 25%, transparent),
    transparent
  );
}

.site-footer-eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 88%, var(--fallback-bc, oklch(var(--bc))));
}

.site-footer-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.65rem;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 65%, transparent);
  background: color-mix(in srgb, var(--color-success, #36d399) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-success, #36d399) 22%, transparent);
  border-radius: 9999px;
}

.site-footer-status-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 9999px;
  background: var(--color-success, #36d399);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-success, #36d399) 25%, transparent);
  animation: footer-pulse 2.4s ease-in-out infinite;
}

@keyframes footer-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}

.site-footer-nav-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 42%, transparent);
}

.site-footer-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  margin: -0.75rem;
  border-radius: 1rem;
  transition: background 0.2s ease;
}

.site-footer-profile:hover {
  background: color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 40%, transparent);
}

.site-footer-profile:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--color-primary) 50%, transparent);
  outline-offset: 2px;
}

.site-footer-nav-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 72%, transparent);
  border-radius: 0.625rem;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.site-footer-nav-link:hover {
  color: var(--color-primary, #ffac00);
  background: color-mix(in srgb, var(--color-primary) 6%, transparent);
}

.site-footer-nav-link.router-link-active {
  color: var(--color-primary, #ffac00);
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.site-footer-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.25;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 78%, transparent);
  background: color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 45%, transparent);
  border: 1px solid color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 12%, transparent);
  border-radius: 9999px;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.site-footer-chip:hover {
  color: var(--color-primary, #ffac00);
  border-color: color-mix(in srgb, var(--color-primary) 35%, transparent);
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
  transform: translateY(-1px);
}

.site-footer-chip--muted {
  background: transparent;
}

.site-footer-link-card {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  height: 100%;
  min-height: 4.25rem;
  padding: 0.875rem 1rem;
  border-radius: 1rem;
  border: 1px solid color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 14%, transparent);
  background: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 35%, transparent);
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.site-footer-link-card:hover {
  border-color: color-mix(in srgb, var(--color-primary) 32%, transparent);
  background: color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 55%, transparent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--color-primary) 8%, transparent),
    0 8px 24px color-mix(in srgb, #000 6%, transparent);
  transform: translateY(-2px);
}

.site-footer-link-card:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--color-primary) 50%, transparent);
  outline-offset: 2px;
}

.site-footer-link-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  color: var(--color-primary, #ffac00);
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary) 22%, transparent);
  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.site-footer-link-card:hover .site-footer-link-icon {
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  transform: scale(1.05);
}

.site-footer-link-arrow {
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 25%, transparent);
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.site-footer-link-card:hover .site-footer-link-arrow {
  color: var(--color-primary, #ffac00);
  transform: translate(2px, -2px);
}

.site-footer-link-name {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 45%, transparent);
}

.site-footer-link-sub {
  display: block;
  margin-top: 0.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 88%, transparent);
}

.site-footer-bar {
  background: color-mix(in srgb, var(--fallback-b3, oklch(var(--b3))) 18%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.site-footer-inline-link {
  font-weight: 500;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 70%, transparent);
  transition: color 0.2s ease;
}

.site-footer-inline-link:hover {
  color: var(--color-primary, #ffac00);
}

.site-footer-meta-chip {
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 55%, transparent);
  border: 1px solid color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 10%, transparent);
  border-radius: 9999px;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.site-footer-meta-chip:hover {
  color: var(--color-primary, #ffac00);
  border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
  background: color-mix(in srgb, var(--color-primary) 6%, transparent);
}

.site-footer-back-top {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 60%, transparent);
  border: 1px solid color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 12%, transparent);
  border-radius: 9999px;
  background: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 30%, transparent);
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.site-footer-back-top:hover {
  color: var(--color-primary, #ffac00);
  border-color: color-mix(in srgb, var(--color-primary) 35%, transparent);
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
  box-shadow: 0 0 20px color-mix(in srgb, var(--color-primary) 12%, transparent);
}

.site-footer-back-top:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--color-primary) 50%, transparent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .site-footer-panel {
    animation: none;
  }

  .site-footer-status-dot {
    animation: none;
  }

  .site-footer-avatar img,
  .site-footer-link-card,
  .site-footer-chip {
    transition: none;
  }

  .site-footer-link-card:hover,
  .site-footer-chip:hover {
    transform: none;
  }
}
</style>
