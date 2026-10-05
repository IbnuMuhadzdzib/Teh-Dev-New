const LandingPage = () => import('@/views/landing-page/index.vue');

const landingPageRoutes = [
  {
    path: '/landing-page',
    name: 'landing-page',
    component: LandingPage,
  },
  {
    path: '/services/:slug',
    name: 'service-detail',
    component: () => import('@/views/landing-page/partials/service-section-detail.vue'), 
  },
  {
    path: '/project/:slug',
    name: 'project-detail',
    component: () => import('@/views/landing-page/partials/project-section-detail.vue'), 
  },
];

export default landingPageRoutes;