const LandingPage = () => import('@/views/landing-page/index.vue');

const landingPageRoutes = [
  {
    path: '/landing-page',
    name: 'landing-page',
    component: LandingPage,
  },
];

export default landingPageRoutes;