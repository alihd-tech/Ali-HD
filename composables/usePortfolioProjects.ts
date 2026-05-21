import type { PortfolioProject } from '~/types/portfolio-project'

export async function usePortfolioProjects() {
  const { data: projects } = await useAsyncData('portfolio-projects', () =>
    queryContent<PortfolioProject>('/projects')
      .sort({ order: 1 })
      .find()
  )

  return {
    projects: computed(() => projects.value ?? []),
  }
}
