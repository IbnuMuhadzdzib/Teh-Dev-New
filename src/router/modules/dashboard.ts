const DashboardLayout = () => import('@/views/dashboard/layout/DashboardLayout.vue');
const ProjectsTab = () => import('@/views/dashboard/projects/index.vue');
const TasksTab = () => import('@/views/dashboard/tasks/index.vue');
const DocumentsTab = () => import('@/views/dashboard/documents/index.vue');
const UsersTab = () => import('@/views/dashboard/users/index.vue');

export default [
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: { name: 'dashboard-projects' } },
      {
        path: 'projects',
        name: 'dashboard-projects',
        component: ProjectsTab,
        meta: { requiresAuth: true, title: 'Projects' },
      },
      {
        path: 'tasks',
        name: 'dashboard-tasks',
        component: TasksTab,
        meta: { requiresAuth: true, title: 'Task' },
      },
      {
        path: 'documents',
        name: 'dashboard-documents',
        component: DocumentsTab,
        meta: { requiresAuth: true, title: 'Dokumen' },
      },
      {
        path: 'users',
        name: 'dashboard-users',
        component: UsersTab,
        meta: { requiresAuth: true, title: 'Manajemen User', founderOnly: true },
      },
    ],
  },
];