import { useMutation } from '@tanstack/vue-query';
import { loginRequest } from '@/services/auth';

export function useLoginMutation() {
  return useMutation({ mutationFn: loginRequest });
}