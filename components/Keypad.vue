<template>
  <div class="relative max-w-sm mx-auto overflow-hidden rounded-2xl border border-base-300/60 bg-base-100 p-5 shadow-xl sm:p-6">
    <!-- Premium background glowing gradients -->
    <div
      class="pointer-events-none absolute -inset-px bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-70"
      aria-hidden="true"
    />

    <!-- Header / Status Section -->
    <header class="relative mb-6 text-center">
      <div class="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon name="fluent:shield-lock-24-filled" class="h-5 w-5" />
      </div>
      <h2 class="text-sm font-semibold tracking-wide text-base-content">Enter Passcode</h2>
      <p class="mt-0.5 text-xs text-base-content/50">Please enter your 4-digit security code</p>
    </header>

    <!-- Passcode Display (Digit Indicators) -->
    <section class="relative mb-6" aria-label="Passcode entry display">
      <div class="flex justify-center gap-3" role="presentation">
        <div
          v-for="(digit, index) in enteredCode"
          :key="index"
          class="relative flex h-14 w-12 items-center justify-center rounded-xl border-2 transition-all duration-150 sm:h-16 sm:w-14"
          :class="{
            'border-primary bg-primary/5 shadow-sm shadow-primary/10': digit !== null,
            'border-secondary bg-base-100 ring-4 ring-secondary/10': index === currentIndex && !isComplete,
            'border-base-300 bg-base-200/40': digit === null && index !== currentIndex,
          }"
        >
          <!-- Smooth crossfade for dots/digits -->
          <span
            v-if="digit !== null"
            class="font-sans text-xl font-bold tracking-tight text-base-content sm:text-2xl"
          >
            {{ showDigits ? digit : '•' }}
          </span>
          
          <!-- Subtle cursor for current active position -->
          <span
            v-else-if="index === currentIndex && !isComplete"
            class="h-5 w-0.5 animate-pulse rounded-full bg-secondary"
          />
        </div>
      </div>

      <!-- Linear Micro-Progress Tracker -->
      <div class="mt-4 flex items-center gap-3 px-2">
        <div class="h-1 flex-1 overflow-hidden rounded-full bg-base-200">
          <div 
            class="h-full bg-primary transition-all duration-300 ease-out"
            :style="{ width: `${(filledCount / 4) * 100}%` }"
          />
        </div>
        <span class="font-mono text-[10px] font-bold uppercase tracking-wider text-base-content/40">
          {{ filledCount }} / 4
        </span>
      </div>
    </section>

    <!-- Dynamic Security Grid Section -->
    <section class="relative" aria-label="Security Keypad">
      <div class="grid grid-cols-3 gap-3">
        <!-- Rows 1 to 9 -->
        <button
          v-for="number in numericDigits"
          :key="number"
          type="button"
          class="keypad-btn"
          :disabled="isAnimating || isComplete"
          @click="selectNumber(number)"
        >
          {{ number }}
        </button>

        <!-- Row 4: Utility Left (Visibility Toggle) -->
        <button
          type="button"
          class="utility-btn"
          :aria-label="showDigits ? 'Hide passcode digits' : 'Show passcode digits'"
          @click="toggleVisibility"
        >
          <Icon :name="showDigits ? 'fluent:eye-off-24-regular' : 'fluent:eye-24-regular'" class="h-5 w-5" />
          <span class="mt-0.5 text-[10px] font-medium tracking-wide">
            {{ showDigits ? 'Hide' : 'Show' }}
          </span>
        </button>

        <!-- Row 4: Centered 0 Key -->
        <button
          type="button"
          class="keypad-btn"
          :disabled="isAnimating || isComplete"
          @click="selectNumber(0)"
        >
          0
        </button>

        <!-- Row 4: Utility Right (Backspace) -->
        <button
          type="button"
          class="utility-btn"
          :disabled="filledCount === 0 || isAnimating || isComplete"
          aria-label="Delete last digit"
          @click="clearLastDigit"
        >
          <Icon name="fluent:backspace-24-regular" class="h-5 w-5" />
          <span class="mt-0.5 text-[10px] font-medium tracking-wide">Clear</span>
        </button>
      </div>
    </section>

    <!-- Reveal overlay after passcode complete -->
    <Transition name="overlay-fade">
      <div
        v-if="isComplete"
        class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-base-100/95 p-6 text-center backdrop-blur-md"
      >
        <div
          class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
          aria-hidden="true"
        >
          <Icon name="fluent:paint-brush-24-filled" class="h-7 w-7" />
        </div>
        <h3 class="text-base font-semibold text-base-content sm:text-lg">
          <span class="typewriter-text">{{ revealedText }}</span><span
            v-if="isTyping"
            class="typewriter-cursor"
            aria-hidden="true"
          >|</span>
        </h3>
        <p class="mt-2 text-xs text-base-content/50">
          Unlocking theme controls…
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'

const emit = defineEmits(['code-complete', 'code-change'])

const REVEAL_MESSAGE = 'See The Customizer now'
const TYPEWRITER_MS = 42

// Internal State
const enteredCode = ref([null, null, null, null])
const isAnimating = ref(false)
const showDigits = ref(false)
const revealedText = ref('')
const isTyping = ref(false)
let typewriterTimer = null

const numericDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Computed Calculations
const filledCount = computed(() => enteredCode.value.filter(num => num !== null).length)
const currentIndex = computed(() => enteredCode.value.findIndex(num => num === null))
const isComplete = computed(() => enteredCode.value.every(num => num !== null))
const finalCode = computed(() => enteredCode.value.join(''))

// Methods
const selectNumber = async (number) => {
  if (isAnimating.value || isComplete.value) return

  const indexToFill = currentIndex.value
  if (indexToFill === -1) return

  if (navigator.vibrate) navigator.vibrate(15)

  isAnimating.value = true
  enteredCode.value[indexToFill] = number

  await nextTick()
  setTimeout(() => {
    isAnimating.value = false
  }, 60)

  emit('code-change', finalCode.value)

  if (isComplete.value) {
    if (navigator.vibrate) navigator.vibrate([40, 30, 50])
  }
}

const clearLastDigit = async () => {
  if (isAnimating.value || filledCount.value === 0) return

  // Find the last index that contains data
  const targetIndex = enteredCode.value.map(el => el !== null).lastIndexOf(true)
  
  if (targetIndex !== -1) {
    isAnimating.value = true
    enteredCode.value[targetIndex] = null

    await nextTick()
    setTimeout(() => {
      isAnimating.value = false
    }, 60)

    emit('code-change', finalCode.value)
  }
}

const toggleVisibility = () => {
  showDigits.value = !showDigits.value
}

function clearTypewriter() {
  if (typewriterTimer) {
    clearInterval(typewriterTimer)
    typewriterTimer = null
  }
}

function startReveal() {
  clearTypewriter()
  revealedText.value = ''
  isTyping.value = true

  const prefersReducedMotion =
    typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    revealedText.value = REVEAL_MESSAGE
    isTyping.value = false
    setTimeout(() => emit('code-complete', finalCode.value), 400)
    return
  }

  let index = 0
  typewriterTimer = setInterval(() => {
    revealedText.value += REVEAL_MESSAGE[index]
    index += 1
    if (index >= REVEAL_MESSAGE.length) {
      clearTypewriter()
      isTyping.value = false
      setTimeout(() => emit('code-complete', finalCode.value), 550)
    }
  }, TYPEWRITER_MS)
}

watch(isComplete, (complete) => {
  if (complete) {
    if (navigator.vibrate) navigator.vibrate([40, 20, 40])
    startReveal()
  } else {
    clearTypewriter()
    revealedText.value = ''
    isTyping.value = false
  }
})

onBeforeUnmount(clearTypewriter)
</script>

<style scoped>
/* Standard Input Keys */
.keypad-btn {
  @apply flex h-14 items-center justify-center rounded-xl text-xl font-semibold 
  transition-all duration-100 border border-base-300/70 select-none;
  background-color: color-mix(in oklch, var(--color-base-200) 30%, var(--color-base-100));
  color: var(--color-base-content);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  -webkit-tap-highlight-color: transparent;
}

.keypad-btn:active:not(:disabled) {
  @apply scale-[0.95];
  background-color: color-mix(in oklch, var(--color-primary) 15%, var(--color-base-100));
}

/* Secondary Action Utility Buttons (Eye and Clear icons) */
.utility-btn {
  @apply flex flex-col h-14 items-center justify-center rounded-xl transition-all duration-100
  text-base-content/60 border border-transparent select-none;
  -webkit-tap-highlight-color: transparent;
}

.utility-btn:hover:not(:disabled) {
  @apply text-base-content border-base-300 bg-base-200/50;
}

.utility-btn:active:not(:disabled) {
  @apply scale-95 bg-base-200;
}

.utility-btn:disabled, .keypad-btn:disabled {
  @apply opacity-30 pointer-events-none;
}

/* Fast Fluid Overlay Animations */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  transform: scale(1.03);
}

/* Accessible System Motion Accommodations */
.typewriter-cursor {
  display: inline-block;
  margin-left: 1px;
  color: var(--color-primary);
  animation: typewriter-blink 0.85s step-end infinite;
}

@keyframes typewriter-blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .keypad-btn, .utility-btn, .overlay-fade-enter-active {
    transform: none !important;
    transition: none !important;
  }
  .animate-pulse {
    animation: none !important;
  }
  .typewriter-cursor {
    animation: none;
  }
}
</style>