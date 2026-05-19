export default defineNuxtPlugin(() => {
  const store = useAppStore()
  store.initTheme()
})
