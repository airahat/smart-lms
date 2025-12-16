<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Nav from './layout/Nav.vue';
import Sidebar from './layout/Sidebar.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/style.css';
import './assets/main.js';

const route = useRoute();


const showLayout = computed(() => {
  return route.path !== '/login' && route.path !== '/register';
});
</script>

<template>
  <div>
    
    <header v-if="showLayout">
      <Nav />
    </header>

    <div class="d-flex min-vh-100">
    
      <Sidebar v-if="showLayout" />

      <main class="container-fluid mt-4 px-5">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>
