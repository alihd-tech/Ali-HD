import type { PortfolioProject } from '~/types/portfolio-project'

export function portfolioProjectPath(slug: string) {
  return `/projects/${slug}`
}

export async function usePortfolioProject(slug: MaybeRefOrGetter<string>) {
  const path = computed(() => portfolioProjectPath(toValue(slug)))

  const { data: project } = await useAsyncData(
    () => `portfolio-project-${toValue(slug)}`,
    () =>
      queryContent<PortfolioProject>('/projects')
        .where({ _path: path.value })
        .findOne(),
  )

  return {
    project,
    path,
  }
}
