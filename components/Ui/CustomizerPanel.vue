<template>
  <div class="customizer-panel space-y-6">
    <!-- Complexity Range -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-[11px] font-semibold uppercase tracking-[0.18em] text-base-content/60">
          Complexity
        </label>
        <span class="badge badge-sm" :class="complexityBadgeClass">
          {{ store.complexity.title }}
        </span>
      </div>
      <p class="text-xs text-base-content/50 mb-3">{{ store.complexity.description }}</p>

      <div class="flex items-center gap-3">
        <span
          v-for="c in complexities"
          :key="c.slug"
          class="flex-1"
        >
          <button
            type="button"
            class="w-full rounded-lg border py-2 text-center text-xs font-medium transition-all"
            :class="store.complexity.slug === c.slug
              ? 'border-primary bg-primary/15 text-primary shadow-[0_0_12px] shadow-primary/10'
              : 'border-base-300/40 bg-base-200/30 text-base-content/60 hover:border-primary/30 hover:bg-primary/5'"
            @click="store.setComplexity(c.slug)"
          >
            {{ c.title }}
          </button>
        </span>
      </div>
    </div>

    <!-- Nerd Toggle -->
    <div class="flex items-center justify-between rounded-xl border border-base-300/35 bg-base-200/25 px-4 py-3">
      <div>
        <p class="text-sm font-semibold text-base-content">Nerd mode</p>
        <p class="text-[11px] text-base-content/50">Show technical details and jargon</p>
      </div>
      <button
        type="button"
        role="switch"
        :aria-checked="store.nerd"
        class="relative h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        :class="store.nerd ? 'bg-primary' : 'bg-base-300'"
        @click="store.toggleNerd"
      >
        <span
          class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out"
          :class="store.nerd ? 'translate-x-5' : 'translate-x-0'"
        />
      </button>
    </div>

    <!-- Color Accent Picker -->
    <div>
      <label class="text-[11px] font-semibold uppercase tracking-[0.18em] text-base-content/60 mb-3 block">
        Accent Color
      </label>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="key in accentKeys"
          :key="key"
          type="button"
          class="group flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-all"
          :class="store.colorAccent === key
            ? 'border-current bg-base-200/50 shadow-[0_0_12px] shadow-current/10'
            : 'border-base-300/35 bg-base-200/20 hover:border-base-300/60 hover:bg-base-200/35'"
          :style="store.colorAccent === key
            ? { color: colorAccentMap[key].hex, borderColor: colorAccentMap[key].hex }
            : {}"
          :aria-pressed="store.colorAccent === key"
          :aria-label="`Accent color: ${colorAccentMap[key].label}`"
          @click="selectAccent(key)"
        >
          <span
            class="h-4 w-4 shrink-0 rounded-full border-2 border-base-300/30"
            :style="{ backgroundColor: colorAccentMap[key].hex }"
          />
          <span class="text-xs font-medium" :class="store.colorAccent === key ? 'text-base-content' : 'text-base-content/60'">
            {{ colorAccentMap[key].label }}
          </span>
        </button>
      </div>
    </div>
 
  </div>
</template>

<script setup lang="ts">
import { complexities, type ColorAccent, colorAccentMap } from '~/types'

const store = useAppStore()

const accentKeys = Object.keys(colorAccentMap) as ColorAccent[]

function selectAccent(key: string) {
  if (key in colorAccentMap) {
    store.setColorAccent(key as ColorAccent)
  }
}

const complexityBadgeClass = computed(() => {
  switch (store.complexity.slug) {
    case 'simple': return 'badge-outline'
    case 'balanced': return 'badge-primary'
    case 'advanced': return 'badge-secondary'
    default: return 'badge-ghost'
  }
})
</script>
