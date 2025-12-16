// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/pages/Dashboard.vue';
import User from '@/views/pages/User.vue';
import Students from '@/views/pages/Students.vue';
import Tests from '@/views/pages/Tests.vue';
import CourseManage from '@/views/pages/courses/CourseManage.vue';
import CourseCreate from '@/views/pages/courses/CourseCreate.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import UserManage from '@/views/pages/users/UserManage.vue';
import UserCreate from '@/views/pages/users/UserCreate.vue';
import AiAdvisor from '@/views/pages/AiAdvisor.vue';
import CourseDetails from '@/views/pages/courses/CourseDetails.vue';
import Trainers from '@/views/pages/Trainers.vue';

const routes = [
  { path: '/login', component: Login, meta: { hideLayout: true } },
  { path: '/register', component: Register, meta: { hideLayout: true } },
  { path: '/', component: Dashboard },
  { path: '/user', component: User },
  { path: '/students', component: Students },
  { path: '/trainers', component: Trainers },
  { path: '/tests', component: Tests },
  { path: '/courses', component: CourseManage },
  { path: '/courses/create', component: CourseCreate },
  { path: '/courses/:id/details', component: CourseDetails },
  { path: '/users', component: UserManage, meta: { requiresAdmin: true } },
  { path: '/users/create', component: UserCreate, meta: { requiresAdmin: true } },
  { path: '/ai-advisor', component: AiAdvisor }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard for authentication & roles
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // JWT token
  const userStr = localStorage.getItem('user'); // User info
  const user = userStr ? JSON.parse(userStr) : null;

  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  // Redirect logged-in users away from login/register
  if ((to.path === '/login' || to.path === '/register') && token) {
    return next('/'); // already logged in
  }

  // Redirect to login if route requires auth and token is missing
  if (authRequired && !token) {
    return next('/login');
  }

  // Role-based access for admin routes
  if (to.meta.requiresAdmin && (!user || user.role_id !== 1)) {
    alert('Access denied. Admins only.');
    return next('/'); 
  }

  next();
});

export default router;
