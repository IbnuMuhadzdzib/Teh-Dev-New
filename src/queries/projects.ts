import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { createProject, getProjects } from '@/services/projects';
import type { CreateProjectPayload } from '@/types/projects';

export function useProjectsQuery() {
  return useQuery({ queryKey: ['projects'], queryFn: getProjects });
}

export function useCreateProjectMutation(createdBy: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProject(payload, createdBy),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}