const Login = () => import('@/views/auth/login/index.vue');

export default [
  { path: '/login', name: 'login', component: Login, meta: { title: 'Login' } },
];