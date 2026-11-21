import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import authRoutes from './modules/auth';
import dashboardRoutes from './modules/dashboard';
import landingPageRoutes from './modules/landing-page';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/landing-page' },
    { path: '/landing_page', redirect: '/landing-page' },
    ...landingPageRoutes,
    ...authRoutes,
    ...dashboardRoutes,
    { path: '/:pathMatch(.*)*', redirect: '/landing-page' },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth || to.name === 'login' || to.meta.founderOnly) {
    const auth = useAuthStore();
    if (!auth.ready) await auth.init();

    if (to.meta.requiresAuth && !auth.isLoggedIn) return { name: 'login' };
    if (to.name === 'login' && auth.isLoggedIn) return { name: 'dashboard-projects' };
    if (to.meta.founderOnly && !auth.isFounder) return { name: 'dashboard-projects' };
  }

  return true;
});

export default router;