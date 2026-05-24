<template>
  <div class="ui-drawer">
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <button
          v-if="showDrawer"
          type="button"
          class="ui-drawer__backdrop fixed inset-0 z-[60] cursor-default border-0 bg-base-content/20 backdrop-blur-md"
          aria-label="Close drawer"
          @click="closeDrawer"
        />
      </Transition>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <aside
          v-if="showDrawer"
          class="ui-drawer__shell fixed z-[70] bottom-4 right-4 left-4 mx-auto flex sm:left-auto sm:mx-0 w-[min(calc(100vw-1.5rem),24rem)]"
          role="dialog"
          aria-labelledby="ui-drawer-title"
          aria-modal="true"
          @click.stop
        >
          <div
            class="flex max-h-[min(88vh,640px)] w-full flex-col overflow-hidden rounded-2xl border border-base-300/50 bg-base-100/90 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            <!-- Header -->
            <div class="flex shrink-0 items-center justify-between gap-3 border-b border-base-300/25 px-4 py-3">
              <div class="min-w-0">
                <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                  Customizer
                </p>
                <h3
                  id="ui-drawer-title"
                  class="font-quicksand text-base font-bold leading-tight text-base-content"
                >
                  Settings
                </h3>
              </div>
              <button
                type="button"
                class="btn btn-ghost btn-xs btn-circle shrink-0"
                aria-label="Close"
                @click="closeDrawer"
              >
                <Icon name="fluent:dismiss-24-regular" class="h-4 w-4" />
              </button>
            </div>

            <!-- Body -->
            <div class="relative min-h-0 overflow-y-auto p-4">
              <UiCustomizerPanel compact />
            </div>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showDrawer = ref(false)

const openSettingsDrawer = () => {
  showDrawer.value = true
}

const closeDrawer = () => {
  showDrawer.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showDrawer.value) {
    closeDrawer()
  }
}

onMounted(() => {
  window.addEventListener('open-settings', openSettingsDrawer)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('open-settings', openSettingsDrawer)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.ui-drawer__backdrop {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

@media (max-width: 640px) {
  .ui-drawer__shell {
    bottom: 0.75rem;
  }
}
</style>
