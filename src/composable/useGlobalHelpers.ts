import { useRouter } from 'vue-router';
import type { LocationQueryRaw, RouteParamsRaw } from 'vue-router';

export function useGlobalHelpers() {
  const router = useRouter();

  function goToName(name: string, params?: RouteParamsRaw, query?: LocationQueryRaw) {
    router.push({ name, params, query });
  }

  return { goToName };
}