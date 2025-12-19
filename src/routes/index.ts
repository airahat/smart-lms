// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/pages/Dashboard.vue';
import User from '@/views/pages/User.vue';
import Students from '@/views/pages/students/StudentManage.vue';
import StudentsCreate from '@/views/pages/students/StudentCreate.vue';
import Tests from '@/views/pages/Tests.vue';
import CourseManage from '@/views/pages/courses/CourseManage.vue';
import CourseCreate from '@/views/pages/courses/CourseCreate.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import UserManage from '@/views/pages/users/UserManage.vue';
import UserCreate from '@/views/pages/users/UserCreate.vue';
import AiAdvisor from '@/views/pages/AiAdvisor.vue';
import CourseDetails from '@/views/pages/courses/CourseDetails.vue';
import Trainers from '@/views/pages/trainers/TrainersManage.vue';
import TrainersCreate from '@/views/pages/trainers/TrainersCreate.vue';
import Quill from '@/views/Quill.vue';
import LessonCreate from '@/views/pages/lessons/LessonCreate.vue';
import LessonManage from '@/views/pages/lessons/LessonManage.vue';

const routes = [
  { path: '/login', component: Login, meta: { hideLayout: true } },
  { path: '/register', component: Register, meta: { hideLayout: true } },
  { path: '/', component: Dashboard },
  { path: '/students', component: Students, meta: { requiresAdmin: true, admin: true }  },
  { path: '/students/create', component: StudentsCreate, meta: { requiresAdmin: true, admin: true }  },
  { path: '/trainers', component: Trainers, meta: { requiresAdmin: true, admin: true }  },
  { path: '/trainers/create', component: TrainersCreate, meta: { requiresAdmin: true, admin: true }  },
  { path: '/tests', component: Tests },
  { path: '/courses', component: CourseManage },
  { path: '/courses/create', component: CourseCreate, meta: { requiresAdmin: true, admin: true }  },
  { path: '/courses/:id/details', component: CourseDetails },
  {path: '/lessons/create', component: LessonCreate, meta: { requiresAdmin: true, admin: true } },
  {path: '/lessons', component: LessonManage, meta: { requiresAdmin: true, admin: true } },
  { path: '/users', component: UserManage, meta: { requiresAdmin: true, admin: true } },
  { path: '/users/create', component: UserCreate, meta: { requiresAdmin: true, admin: true  } },
  { path: '/ai-advisor', component: AiAdvisor },
  { path: '/quill', component: Quill }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); 
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if ((to.path === '/login' || to.path === '/register') && token) {
    return next('/'); 
  }

  if (authRequired && !token) {
    return next('/login');
  }

  if (to.meta.requiresAdmin && (!user || user.role_id !== 1)) {
    alert('Access denied. Admins only.');
    return next('/'); 
  }

  next();
});

export default router;
