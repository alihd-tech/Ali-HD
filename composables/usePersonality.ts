export function usePersonality() {
  const store = useAppStore()

  const selectedComplexityId = computed(() => store.complexity.id)
  const isNerd = computed(() => store.complexityLevel >= 2)

  async function ensureStructureLoaded() {
    // No-op — content is static, no async loading needed
  }

  function applyPersonalityToDocument() {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-complexity', store.complexity.slug)
    }
  }

  return {
    selectedComplexityId,
    isNerd,
    ensureStructureLoaded,
    applyPersonalityToDocument,
  }
}
