import type { PortfolioProject } from '~/data/projects'

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
