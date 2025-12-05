import {createRouter, createWebHistory} from 'vue-router';
import Dashboard from '@/views/pages/Dashboard.vue';
import User from '@/views/pages/User.vue';
import Students from '@/views/pages/Students.vue';
import Tests from '@/views/pages/Tests.vue';

const myRouter = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Dashboard},
        {path: '/user', component: User},
        {path: '/students', component: Students},
        {path: '/tests', component: Tests},
    ]
});

export default myRouter;