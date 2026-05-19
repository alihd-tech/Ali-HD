<template>
  <div class="h-screen w-screen bg-primary relative overflow-hidden"> 
    <!-- Top Navigation -->
    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-40">
      <button type="button" @click="chooseCustomizer" class="flex items-center justify-center">
        <span class="p-0 hover:bg-black/10 text-primary lh-1-4 font-bold transition-colors font-ace">
          Ali HD
        </span>
      </button>
    </div>
    <!-- Main Container - Centered with padding from viewport edges -->
    <div class="flex h-full min-h-0 w-full items-center justify-center p-4">
      <div class="h-full min-h-0 w-full max-h-[calc(100vh-1.5rem)]">
        <!-- Phone-like Container --> 
        <div class="bg-base-200 rounded-[1.5rem] shadow-2xl relative overflow-hidden h-full flex flex-col min-h-0">
          <!-- Notch -->
          <button
            type="button"
            class="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-36 h-6 bg-base-300 backdrop-blur-md shadow-lg shadow-primary/10 rounded-b-2xl cursor-pointer transition-colors hover:bg-base-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Open phone controls"
            aria-haspopup="dialog"
            @click="chooseCustomizer"
          />
          

          <!-- Scrollable Content Area -->
          <main
            id="scroll-container"
            class="relative z-[1] flex-1 min-h-0 overflow-y-auto overscroll-y-contain touch-pan-y"
          >
            <div class="flex w-full min-h-min flex-col">
              <slot />
            </div>
          </main>
          
          
        </div>
      </div>
    </div> 

    <UiDrawer />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
// Register UiDrawer if not auto-imported
import UiDrawer from '~/components/Ui/Drawer.vue'

const showNotchChoice = ref(false)
 

function openNotchChoiceModal() {
  showNotchChoice.value = true
}

function closeNotchChoice() {
  showNotchChoice.value = false
}

function chooseCustomizer() {
  closeNotchChoice()
  window.dispatchEvent(new CustomEvent('open-settings'))
}
 

function handleNotchEscape(e) {
  if (e.key === 'Escape' && showNotchChoice.value) {
    closeNotchChoice()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleNotchEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleNotchEscape)
})
</script>