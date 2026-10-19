import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCollection } from '@/lib/firestore';
import { groupProjectsByCategory } from '@/lib/categories';
import { useProjects } from '@/hooks/useProjects';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCollection('categories'),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

/** Published works grouped by category, each with its icon and cover image. */
export function useWorkCategories() {
  const projectsQuery = useProjects();
  const categoriesQuery = useCategories();

  // Stable between renders, so scroll animations built from it don't restart.
  const data = useMemo(
    () => groupProjectsByCategory(projectsQuery.data, categoriesQuery.data),
    [projectsQuery.data, categoriesQuery.data]
  );

  return {
    data,
    isLoading: projectsQuery.isLoading || categoriesQuery.isLoading,
  };
}
