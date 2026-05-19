<template>
  <div class="drawer-panel relative overflow-hidden rounded-2xl border border-base-300/40">
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
      aria-hidden="true"
    />

    <div class="relative p-6">
      <div class="mb-5 flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
          <Icon name="fluent:person-24-filled" class="h-5 w-5 text-primary" />
        </div>
        <div>
          <p class="font-display text-sm font-bold text-base-content">Ali HD</p>
          <p class="text-xs text-base-content/55">Full-Stack Engineer</p>
        </div>
      </div>

      <div class="space-y-3">
        <div
          v-for="item in drawerItems"
          :key="item.label"
          class="drawer-item flex items-center gap-3 rounded-xl border border-base-300/30 bg-base-100/30 px-4 py-3 transition-colors hover:border-primary/25 hover:bg-base-100/50"
        >
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="item.iconClass">
            <Icon :name="item.icon" class="h-4 w-4" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-base-content">{{ item.label }}</p>
            <p class="truncate text-xs text-base-content/50">{{ item.value }}</p>
          </div>
        </div>
      </div>

      <div class="mt-5 border-t border-base-300/25 pt-4">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in techTags"
            :key="tag"
            class="inline-flex items-center rounded-full border border-base-300/30 bg-base-100/25 px-2.5 py-0.5 text-[11px] font-medium text-base-content/65"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const drawerItems = [
  {
    icon: 'fluent:location-24-filled',
    label: 'Based in',
    value: 'Iran — Remote Worldwide',
    iconClass: 'bg-info/10 text-info border border-info/20',
  },
  {
    icon: 'fluent:briefcase-24-filled',
    label: 'Focus',
    value: 'Full-Stack · Architecture · Performance',
    iconClass: 'bg-primary/10 text-primary border border-primary/20',
  },
  {
    icon: 'fluent:clock-24-filled',
    label: 'Experience',
    value: '5+ years shipping production systems',
    iconClass: 'bg-success/10 text-success border border-success/20',
  },
  {
    icon: 'fluent:mail-24-filled',
    label: 'Reach me',
    value: 'support@alihd.ir',
    iconClass: 'bg-secondary/10 text-secondary border border-secondary/20',
  },
]

const techTags = ['Nuxt', 'TypeScript', 'Scala', 'FastAPI', 'Laravel', 'Vue', 'Docker', 'PWA']
</script>
