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
          :aria-labelledby="drawerMode === 'keypad' ? 'keypad-drawer-title' : 'ui-drawer-title'"
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
                  {{ drawerMode === 'settings' ? 'Customizer' : 'Secure layer' }}
                </p>
                <h3
                  :id="drawerMode === 'keypad' ? 'keypad-drawer-title' : 'ui-drawer-title'"
                  class="font-quicksand text-base font-bold leading-tight text-base-content"
                >
                  {{ drawerMode === 'settings' ? 'Settings' : 'Secure access' }}
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
              <template v-if="drawerMode === 'settings'">
                <UiCustomizerPanel class="mb-6" />

                <!-- Theme Toggle -->
                <div class="flex items-center justify-between rounded-xl border border-base-300/35 bg-base-200/25 px-3 py-2.5">
                  <div>
                    <p class="text-xs font-semibold text-base-content">Dark mode</p>
                    <p class="text-[10px] text-base-content/45">Toggle light/dark appearance</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    :aria-checked="store.isDark"
                    class="relative h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    :class="store.isDark ? 'bg-primary' : 'bg-base-300'"
                    @click="store.toggleTheme"
                  >
                    <span
                      class="pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out"
                      :class="store.isDark ? 'translate-x-4' : 'translate-x-0'"
                    />
                  </button>
                </div>
              </template>

              <!-- Keypad placeholder -->
              <template v-else>
                <div class="text-center py-8 text-base-content/50">
                  <Icon name="fluent:lock-closed-24-filled" class="text-3xl mb-3 block mx-auto text-secondary" />
                  <p class="text-sm">Keypad lock is not yet configured.</p>
                  <p class="text-xs mt-1 text-base-content/40">Add a PIN in settings to enable.</p>
                </div>
              </template>
            </div>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

type DrawerMode = 'settings' | 'keypad'

const store = useAppStore()
const showDrawer = ref(false)
const drawerMode = ref<DrawerMode>('settings')

const openSettingsDrawer = () => {
  drawerMode.value = 'settings'
  showDrawer.value = true
}

const openKeypadDrawer = () => {
  drawerMode.value = 'keypad'
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
  window.addEventListener('open-keypad', openKeypadDrawer)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('open-settings', openSettingsDrawer)
  window.removeEventListener('open-keypad', openKeypadDrawer)
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
