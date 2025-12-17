
import { createApp } from 'vue'
import App from './App.vue'
import myRouter from '@/routes/index.ts'
import { createPinia } from 'pinia';

const pinia = createPinia();


createApp(App).use(myRouter).use(pinia).mount('#app')