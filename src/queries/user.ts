import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import { getAllUsers, updateUserRole } from '@/services/user';
import type { UserRole } from '@/types/auth';

export function useUsersQuery(enabled: Ref<boolean>) {
  return useQuery({ queryKey: ['users'], queryFn: getAllUsers, enabled });
}

export function useUpdateUserRoleMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: UserRole }) =>
      updateUserRole(userId, role),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}