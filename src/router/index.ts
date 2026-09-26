import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import authRoutes from './modules/auth';
import dashboardRoutes from './modules/dashboard';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', redirect: { name: 'login' } }, ...authRoutes, ...dashboardRoutes],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (!auth.ready) await auth.init();

  if (to.meta.requiresAuth && !auth.isLoggedIn) return { name: 'login' };
  if (to.name === 'login' && auth.isLoggedIn) return { name: 'dashboard-projects' };
  if (to.meta.founderOnly && !auth.isFounder) return { name: 'dashboard-projects' };

  return true;
});

export default router;