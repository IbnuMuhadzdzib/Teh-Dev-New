import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import { createTask, getAllTasks, getMyTasks, updateTask } from '@/services/task';
import type { CreateTaskPayload, UpdateTaskPayload } from '@/types/task';

export function useMyTasksQuery(userId: Ref<string>) {
  return useQuery({
    queryKey: computed(() => ['tasks', 'mine', userId.value]),
    queryFn: () => getMyTasks(userId.value),
    enabled: computed(() => !!userId.value),
  });
}

export function useAllTasksQuery(enabled: Ref<boolean>) {
  return useQuery({ queryKey: ['tasks', 'all'], queryFn: getAllTasks, enabled });
}

export function useCreateTaskMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });
}

export function useUpdateTaskMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateTaskPayload) => updateTask(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });
}