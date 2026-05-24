<template>
  <footer
    id="contact"
    class="site-footer scroll-mt-20 border-t border-base-300/30 bg-base-200/15"
  >
    <div class="container mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
      <div
        class="flex flex-col gap-7 sm:gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10"
      >
        <div class="min-w-0 shrink-0 space-y-2.5">
          <NuxtLink
            to="/#top"
            class="site-footer-brand group inline-flex items-center gap-3"
            title="Ali HD — home, full-stack engineer portfolio"
          >
            <div
              class="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-base-300/50 bg-primary/10"
            >
              <img
                src="/alihd.jpg"
                :alt="profileImageAlt"
                title="علی حیدری"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                width="44"
                height="44"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="min-w-0">
              <p class="font-ace text-base font-bold tracking-tight text-base-content transition-colors group-hover:text-primary">
                Ali HD
              </p>
              <p class="text-xs text-base-content/55">
                Full-stack engineer &amp; web architect
              </p>
            </div>
          </NuxtLink> 
        </div>
 

        <div class="shrink-0 lg:text-right">
          <p class="site-footer-label lg:text-right">Connect</p>
          <ul class="mt-2 flex flex-wrap gap-1.5 lg:justify-end">
            <li v-for="social in socialLinks" :key="social.name">
              <a
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="site-footer-social"
                :aria-label="socialLinkLabel(social)"
                :title="socialLinkLabel(social)"
              >
                <Icon :name="social.icon" class="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div> 
  </footer>
</template>

<script setup lang="ts">
import type { SocialLink } from '~/types'
const currentYear = new Date().getFullYear() 
const profileImageAlt = 'Ali Heydari — full-stack engineer and web architect portrait'
 
 
const { public: publicConfig } = useRuntimeConfig()
const socialLinks = publicConfig.socialLinks as SocialLink[] 
function socialLinkLabel(social: SocialLink) {
  return `${social.name}: ${social.subtitle} (opens in new tab)`
}
</script>

<style scoped>
.site-footer-label {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 42%, transparent);
}

.site-footer-brand:focus-visible,
.site-footer-email:focus-visible,
.site-footer-nav-link:focus-visible,
.site-footer-anchor:focus-visible,
.site-footer-social:focus-visible,
.site-footer-inline-link:focus-visible,
.site-footer-back-top:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--color-primary) 50%, transparent);
  outline-offset: 2px;
  border-radius: 0.25rem;
}

.site-footer-brand {
  border-radius: 0.5rem;
  margin: -0.25rem;
  padding: 0.25rem;
  transition: opacity 0.2s ease;
}

.site-footer-nav-link,
.site-footer-anchor {
  font-size: 0.8125rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 68%, transparent);
  transition: color 0.2s ease;
}

.site-footer-nav-link:hover,
.site-footer-anchor:hover {
  color: var(--color-primary, #ffac00);
}

.site-footer-nav-link.router-link-active {
  color: var(--color-primary, #ffac00);
}

.site-footer-social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 12%, transparent);
  background: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 40%, transparent);
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.site-footer-social:hover {
  color: var(--color-primary, #ffac00);
  border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
}

.site-footer-inline-link {
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 65%, transparent);
  transition: color 0.2s ease;
}

.site-footer-inline-link:hover {
  color: var(--color-primary, #ffac00);
}

.site-footer-back-top {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 55%, transparent);
  transition: color 0.2s ease;
}

.site-footer-back-top:hover {
  color: var(--color-primary, #ffac00);
}

@media (prefers-reduced-motion: reduce) {
  .site-footer-brand img {
    transition: none;
  }
}
</style>
