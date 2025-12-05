<script setup lang="ts">
import Nav from './layout/Nav.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/style.css';
import Sidebar from './layout/Sidebar.vue';


</script>

<template>
    <header>

        <Nav />
    </header>
    <div class="d-flex min-vh-100">
        <Sidebar />
        <main class="container mt-4">
          
            <router-view>

                
            </router-view>

        </main>
    </div>
</template>

<style scoped>


</style>
