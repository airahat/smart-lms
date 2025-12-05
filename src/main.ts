
import { createApp } from 'vue'
import App from './App.vue'
import myRouter from '@/routes/index.ts'


createApp(App).use(myRouter).mount('#app')