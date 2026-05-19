<template>
  <footer
    id="contact"
    class="site-footer relative scroll-mt-20 border-t border-base-300/25"
  >
  <!-- bg decorative element -->
        
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
              class="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-primary/12 blur-3xl"
              aria-hidden="true"
            />
            <div class="relative space-y-4">
              <p class="site-footer-eyebrow">Contact</p>
              <h2
                id="footer-heading"
                class="font-quicksand text-2xl font-bold tracking-tight text-base-content sm:text-3xl lg:text-[2rem]"
              >
                Let&apos;s build something
                <span
                  class="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent"
                >
                  solid
                </span>
              </h2>
              <p class="max-w-xl text-sm leading-relaxed text-base-content/70 sm:text-base">
                Open to collaborations, product work, and thoughtful engineering roles.
                I usually reply within a few days.
              </p>
              <div class="flex flex-wrap items-center gap-3 pt-1">
                <a
                  :href="`mailto:${contactEmail}`"
                  class="btn btn-primary btn-sm gap-2 px-5 shadow-[0_0_24px] shadow-primary/15"
                >
                  <Icon name="fluent:mail-24-filled" class="h-4 w-4" aria-hidden="true" />
                  Email me
                </a>
                <a
                  href="https://solanam.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-ghost btn-sm gap-1.5 border border-base-300/40 text-base-content/75 hover:border-primary/30 hover:bg-base-200/40 hover:text-primary"
                >
                  solanam.com
                  <Icon name="fluent:open-24-regular" class="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </header>

          <div class="grid lg:grid-cols-12">
            <aside
              class="flex flex-col gap-6 border-b border-base-300/30 p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-8 xl:p-10"
            >
              <div class="flex items-center gap-4">
                <div class="relative shrink-0">
                  <div
                    class="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/35 to-secondary/20 opacity-90 blur-sm"
                    aria-hidden="true"
                  />
                  <div
                    class="site-footer-avatar group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-base-300/50 bg-primary/10 shadow-lg sm:h-32 sm:w-32"
                  >
                    <span class="font-ace text-3xl text-primary">AH</span>
                  </div>
                </div>
                <div class="min-w-0 space-y-1">
                  <p class="font-ace text-lg font-bold tracking-tight text-base-content">
                    Ali HD
                  </p>
                  <p class="text-sm text-base-content/60">
                    Full-stack engineer &amp; web architect
                  </p>
                  <p class="truncate text-xs text-base-content/45">
                    {{ contactEmail }}
                  </p>
                </div>
              </div>

              <nav aria-label="Footer navigation" class="space-y-4"> 
                <div>
                  <p class="site-footer-nav-label">On this page</p>
                  <ul class="mt-2 flex flex-wrap gap-2">
                    <li v-for="link in footerLinks.anchors" :key="link.href">
                      <a :href="link.href" class="site-footer-chip site-footer-chip--muted">
                        {{ link.label }}
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </aside>

            <section
              class="p-6 sm:p-8 lg:col-span-8 lg:p-8 xl:p-10"
              aria-label="Social and external links"
            >
              <p class="site-footer-nav-label mb-4">Connect</p>
              <ul class="grid gap-3 sm:grid-cols-2">
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
                      name="fluent:arrow-up-right-24-regular"
                      class="h-4 w-4 shrink-0 text-base-content/25 transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </div>

      <div class="border-t border-base-300/25 bg-base-300/10 backdrop-blur-sm">
        <div
          class="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8 lg:py-6"
        >
          <p class="text-center text-xs text-base-content/50 sm:text-left sm:text-sm">
            © {{ currentYear }} Ali Heydari. Crafted with care.
          </p>
          <a
            href="#top"
            class="site-footer-meta-link inline-flex items-center gap-2 rounded-full border border-base-300/35 bg-base-100/30 px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-primary/35 hover:bg-primary/8 hover:text-primary sm:text-sm"
          >
            <Icon name="fluent:arrow-up-24-filled" class="h-4 w-4" aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const footerLinks = {
  nav: [
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Glossary', path: '/glossory' },
  ],
  anchors: [
    { label: 'Approach', href: '#stack' },
    { label: 'Stack', href: '#tools' },
    { label: 'Projects', href: '#projects' },
  ],
}

const { public: publicConfig } = useRuntimeConfig()
const socialLinks = publicConfig.socialLinks
const contactEmail = publicConfig.contactEmail
</script>

<style scoped>
.site-footer {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 40%, transparent) 0%,
    color-mix(in srgb, var(--fallback-b3, oklch(var(--b3))) 30%, transparent) 100%
  );
}

.site-footer :deep(.site-footer-grid) {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(255, 172, 0, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 172, 0, 0.06) 1px, transparent 1px);
}

.site-footer-panel {
  background: linear-gradient(
    165deg,
    color-mix(in srgb, #ffac00 6%, transparent),
    color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 50%, transparent) 38%,
    color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 55%, transparent)
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, #fff 8%, transparent),
    0 16px 48px color-mix(in srgb, #000 8%, transparent);
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

.site-footer-nav-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 42%, transparent);
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
    background 0.2s ease;
}

.site-footer-chip:hover {
  color: var(--color-primary, #ffac00);
  border-color: color-mix(in srgb, var(--color-primary) 35%, transparent);
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
}

.site-footer-chip--muted {
  background: transparent;
}

.site-footer-link-card {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  border-radius: 1rem;
  border: 1px solid color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 14%, transparent);
  background: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 35%, transparent);
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.site-footer-link-card:hover {
  border-color: color-mix(in srgb, var(--color-primary) 32%, transparent);
  background: color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 55%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-primary) 8%, transparent);
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
  transition: background 0.2s ease;
}

.site-footer-link-card:hover .site-footer-link-icon {
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
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

.site-footer-meta-link {
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 60%, transparent);
}

.site-footer-meta-link:hover {
  color: var(--color-primary, #ffac00);
}

@media (prefers-reduced-motion: reduce) {
  .site-footer-avatar img {
    transition: none;
  }

  .site-footer-avatar:hover img:first-child,
  .site-footer-avatar:hover img:last-child {
    opacity: 1;
  }
}
</style>
