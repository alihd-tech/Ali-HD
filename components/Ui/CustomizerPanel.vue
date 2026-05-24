<template>
  <div
    class="customizer-panel"
    :class="compact ? 'customizer-panel--compact' : 'customizer-panel--card'"
  >
    <div
      class="customizer-panel__inner"
      :class="compact
        ? 'space-y-6'
        : 'customizer-panel__shell relative overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/40 p-5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-6'"
    >
      <template v-if="!compact">
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-secondary/[0.05]"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/[0.06] blur-3xl"
          aria-hidden="true"
        />
      </template>

      <div :class="compact ? '' : 'relative'">
        <header v-if="!compact" class="flex items-start gap-3"> 
          <div class="min-w-0 flex-1"> 
            <h2 class="font-quicksand text-base font-bold leading-tight text-base-content sm:text-lg">
              Make it Different
            </h2>
            <p class="mt-1 text-xs leading-relaxed text-base-content/55 sm:text-sm">
              Little Things To See in other ways
            </p>
          </div>
        </header>

        <!-- Live preview -->
        <div
          class="customizer-preview overflow-hidden"
          :class="compact ? '' : 'mt-5'"
          role="status"
          :aria-label="`Current look: ${store.themeConfig?.label} theme with ${store.accentConfig.label} accent`"
        >
          <div
            class="min-h-[5.75rem] sm:min-h-[6rem]" 
          > 
            <div class="flex h-full flex-col justify-end gap-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex min-w-0 items-start gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200"
                    :class="store.nerd
                      ? 'border-secondary/30 bg-secondary/10 text-secondary'
                      : 'border-base-300/40 bg-base-100/40 text-base-content/55'"
                  >
                    <Icon
                      :name="store.nerd ? 'fluent:code-24-filled' : 'fluent:text-paragraph-24-regular'"
                      class="h-4 w-4"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="min-w-0">
                    <h3 id="customizer-nerd-heading" class="text-sm font-semibold text-base-content">
                      Details
                    </h3>
                    <p class="mt-1 text-xs leading-relaxed text-base-content/55">
                      {{ store.nerd
                        ? 'Depth & detailed content'
                        : 'Plain-language content' }}
                    </p>
                  </div>
                </div>
                <div class="flex shrink-0 items-center gap-2 pt-1">
                  <span
                    class="h-2.5 w-2.5 rounded-full ring-2 ring-white/25"
                    :style="{ backgroundColor: store.accentConfig.hex }"
                  />
                  <span
                    class="h-2.5 w-2.5 rounded-full opacity-80"
                    :style="{ backgroundColor: activeThemePreview.dot }"
                  />
                  <span class="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
              </div>

              <div
                class="customizer-nerd-switch"
                role="radiogroup"
                aria-labelledby="customizer-nerd-heading"
              >
                <div class="customizer-nerd-switch__track">
                  <span
                    class="customizer-nerd-switch__glide"
                    :class="store.nerd ? 'customizer-nerd-switch__glide--nerd' : 'customizer-nerd-switch__glide--plain'"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    role="radio"
                    :aria-checked="!store.nerd"
                    class="customizer-nerd-option"
                    :class="{ 'customizer-nerd-option--active': !store.nerd }"
                    @click="setNerdMode(false)"
                  >
                    <Icon
                      name="fluent:text-paragraph-24-regular"
                      class="customizer-nerd-option__icon"
                      aria-hidden="true"
                    />
                    <span>Plain</span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    :aria-checked="store.nerd"
                    class="customizer-nerd-option"
                    :class="{ 'customizer-nerd-option--active': store.nerd }"
                    @click="setNerdMode(true)"
                  >
                    <Icon
                      name="fluent:code-24-filled"
                      class="customizer-nerd-option__icon"
                      aria-hidden="true"
                    />
                    <span>Nerd</span>
                  </button>
                </div>
              </div>
            </div>
          </div> 
        </div>

        <div class="space-y-7" :class="compact ? 'mt-0' : 'mt-6'">
          <!-- Theme -->
          <section aria-labelledby="customizer-theme-heading">
            <div class="customizer-section-head">
              <h3 id="customizer-theme-heading" class="customizer-section-title">
                <Icon name="fluent:weather-moon-24-regular" class="h-4 w-4 text-primary/80" aria-hidden="true" />
                Theme
              </h3>
            </div>

            <div
              class="customizer-theme-grid mt-3 grid gap-2"
              role="radiogroup"
              aria-labelledby="customizer-theme-heading"
            >
              <button
                v-for="t in themes"
                :key="t.slug"
                type="button"
                role="radio"
                class="customizer-theme-option group relative flex flex-col overflow-hidden rounded-xl border text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
                :class="store.theme === t.slug
                  ? 'customizer-theme-option--active border-primary/50 shadow-[0_0_0_1px] shadow-primary/25'
                  : 'border-base-300/40 hover:border-base-300/70'"
                :aria-checked="store.theme === t.slug"
                :aria-label="`${t.label}: ${t.description}`"
                @click="store.setTheme(t.slug)"
              >
                <div
                  class="relative h-[4.25rem] w-full shrink-0"
                  :style="{ background: themePreview(t.slug).gradient }"
                >
                  <div class="absolute inset-0 flex items-start justify-between p-2.5">
                    <span
                      class="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-black/20 text-white/90 backdrop-blur-sm transition-transform duration-200 group-hover:scale-105"
                    >
                      <Icon
                        :name="t.isDark ? 'ph:moon-bold' : 'ph:sun-bold'"
                        class="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      v-if="store.theme === t.slug"
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-content shadow-sm"
                    >
                      <Icon name="fluent:checkmark-12-filled" class="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                  <div
                    class="absolute bottom-2 left-2.5 right-2.5 flex gap-1"
                    aria-hidden="true"
                  >
                    <span
                      class="h-1.5 flex-1 rounded-full opacity-90"
                      :style="{ backgroundColor: themePreview(t.slug).surface }"
                    />
                    <span
                      class="h-1.5 w-4 rounded-full"
                      :style="{ backgroundColor: themePreview(t.slug).dot }"
                    />
                  </div>
                </div>
                <div
                  class="flex flex-1 flex-col gap-0.5 border-t border-base-300/25 px-2.5 py-2"
                  :class="store.theme === t.slug ? 'bg-primary/[0.06]' : 'bg-base-200/20'"
                >
                  <span
                    class="text-xs font-semibold leading-tight"
                    :class="store.theme === t.slug ? 'text-primary' : 'text-base-content'"
                  >
                    {{ t.label }}
                  </span>
                  <span class="line-clamp-1 text-[10px] leading-snug text-base-content/50">
                    {{ t.isDark ? 'Dark palette' : 'Light palette' }}
                  </span>
                </div>
              </button>
            </div>
          </section>

          <!-- Accent -->
          <section aria-labelledby="customizer-accent-heading">
            <div class="customizer-section-head">
              <h3 id="customizer-accent-heading" class="customizer-section-title">
                <Icon name="fluent:color-24-regular" class="h-4 w-4 text-primary/80" aria-hidden="true" />
                Accent
              </h3>
              <span class="text-[10px] font-medium text-base-content/45">
                {{ store.accentConfig.label }}
              </span>
            </div>

            <div
              class="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6"
              role="radiogroup"
              aria-labelledby="customizer-accent-heading"
            >
              <button
                v-for="key in accentKeys"
                :key="key"
                type="button"
                role="radio"
                class="customizer-accent-option group flex flex-col items-center gap-1.5 rounded-xl border border-transparent px-1 py-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
                :class="store.colorAccent === key
                  ? 'customizer-accent-option--active bg-base-200/40'
                  : 'bg-transparent hover:bg-base-200/30'"
                :style="store.colorAccent === key
                  ? {
                    boxShadow: `0 0 0 2px color-mix(in srgb, ${colorAccentMap[key].hex} 55%, transparent), 0 4px 14px -4px color-mix(in srgb, ${colorAccentMap[key].hex} 45%, transparent)`,
                  }
                  : {}"
                :aria-checked="store.colorAccent === key"
                :aria-label="`Accent: ${colorAccentMap[key].label}`"
                @click="selectAccent(key)"
              >
                <span
                  class="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-base-300/25 transition-transform duration-200 group-hover:scale-110"
                  :style="{ backgroundColor: colorAccentMap[key].hex }"
                >
                  <Icon
                    v-if="store.colorAccent === key"
                    name="fluent:checkmark-12-filled"
                    class="h-4 w-4 text-white drop-shadow-sm"
                    aria-hidden="true"
                  />
                </span>
                <span
                  class="max-w-full truncate text-[10px] font-medium leading-none"
                  :class="store.colorAccent === key ? 'text-base-content' : 'text-base-content/50'"
                >
                  {{ colorAccentMap[key].label }}
                </span>
              </button>
            </div>
          </section>
 
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type ColorAccent, colorAccentMap } from '~/types'
import { themes } from '~/stores/app'

defineProps<{
  compact?: boolean
}>()

const store = useAppStore()

const themePreviews = {
  dark: {
    gradient: 'linear-gradient(135deg, #1a2e1a 0%, #0d1a0d 55%, #161616 100%)',
    surface: '#243824',
    dot: '#36d399',
  },
  light: {
    gradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #f0fdf4 100%)',
    surface: '#a7f3d0',
    dot: '#059669',
  },
  night: {
    gradient: 'linear-gradient(135deg, #0a0e27 0%, #1e1b4b 55%, #312e81 100%)',
    surface: '#3730a3',
    dot: '#818cf8',
  },
} as const

type ThemePreviewSlug = keyof typeof themePreviews

const activeThemePreview = computed(() => themePreview(store.theme))

function themePreview(slug: string) {
  if (slug in themePreviews) {
    return themePreviews[slug as ThemePreviewSlug]
  }
  return themePreviews.dark
}

const accentKeys = Object.keys(colorAccentMap) as ColorAccent[]

function selectAccent(key: string) {
  if (key in colorAccentMap) {
    store.setColorAccent(key as ColorAccent)
  }
}

function setNerdMode(nerd: boolean) {
  if (store.nerd !== nerd) {
    store.toggleNerd()
  }
}
</script>

<style scoped>
.customizer-eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 88%, var(--fallback-bc, oklch(var(--bc))));
}

.customizer-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.customizer-section-title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--fallback-bc, oklch(var(--bc)));
}

.customizer-theme-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.customizer-theme-option--active {
  transform: translateY(-1px);
}

.customizer-preview__swatch {
  transition: background 0.35s ease;
}

.customizer-nerd-switch__track {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.125rem;
  padding: 0.1875rem;
  border-radius: 0.75rem;
  border: 1px solid color-mix(in srgb, var(--fallback-b3, oklch(var(--b3))) 55%, transparent);
  background: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 28%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, white 8%, transparent);
}

.customizer-nerd-switch__glide {
  position: absolute;
  top: 0.1875rem;
  bottom: 0.1875rem;
  width: calc(50% - 0.1875rem);
  border-radius: 0.5625rem;
  border: 1px solid transparent;
  transition:
    left 0.28s cubic-bezier(0.34, 1.2, 0.64, 1),
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.customizer-nerd-switch__glide--plain {
  left: 0.1875rem;
  border-color: color-mix(in srgb, var(--fallback-b3, oklch(var(--b3))) 70%, transparent);
  background: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 72%, transparent);
  box-shadow:
    0 1px 2px color-mix(in srgb, black 12%, transparent),
    0 4px 12px -6px color-mix(in srgb, black 25%, transparent);
}

.customizer-nerd-switch__glide--nerd {
  left: calc(50% + 0.0625rem);
  border-color: color-mix(in srgb, var(--color-secondary) 35%, transparent);
  background: color-mix(in srgb, var(--color-secondary) 14%, var(--fallback-b1, oklch(var(--b1))));
  box-shadow:
    0 1px 2px color-mix(in srgb, var(--color-secondary) 20%, transparent),
    0 6px 16px -6px color-mix(in srgb, var(--color-secondary) 35%, transparent);
}

.customizer-nerd-option {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  min-height: 2rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.5625rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 48%, transparent);
  transition: color 0.2s ease;
  cursor: pointer;
}

.customizer-nerd-option:focus {
  outline: none;
}

.customizer-nerd-option:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--color-primary) 55%, transparent);
  outline-offset: 2px;
}

.customizer-nerd-option--active {
  color: var(--fallback-bc, oklch(var(--bc)));
}

.customizer-nerd-option--active:last-child {
  color: var(--color-secondary);
}

.customizer-nerd-option__icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
  opacity: 0.75;
  transition: opacity 0.2s ease;
}

.customizer-nerd-option--active .customizer-nerd-option__icon {
  opacity: 1;
}

.customizer-panel--card .customizer-panel__inner {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

@media (prefers-reduced-motion: reduce) {
  .customizer-theme-option,
  .customizer-theme-option--active,
  .customizer-accent-option,
  .customizer-nerd-switch__glide,
  .customizer-nerd-option,
  .customizer-nerd-option__icon,
  .customizer-preview__swatch {
    transition: none;
  }

  .customizer-nerd-switch__glide--nerd,
  .customizer-nerd-switch__glide--plain {
    left: auto;
    right: auto;
  }

  .customizer-nerd-switch__glide--plain {
    left: 0.1875rem;
  }

  .customizer-nerd-switch__glide--nerd {
    left: calc(50% + 0.0625rem);
  }

  .customizer-accent-option.group:hover span:first-child {
    transform: none;
  }
}
</style>
