<script setup lang="ts">
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
const stats = [
  { title: 'Total Users', value: 120, icon: 'fa-users', color: 'primary' },
  { title: 'Total Courses', value: 18, icon: 'fa-book', color: 'success' },
  { title: 'Active Trainers', value: 6, icon: 'fa-chalkboard-teacher', color: 'warning' },
  { title: 'Enrollments', value: 340, icon: 'fa-user-graduate', color: 'info' }
]
</script>

<template>
  <div class="container-fluid">
    <!-- Admin Dashboard  -->
    <div  class="mb-4" v-if="userStore.isAdmin">
      <h3 class="fw-bold text-light">Dashboard</h3>
      <p class=" text-light">Welcome back! Here's an overview.</p>
    </div>
    <div v-if="userStore.isAdmin">
      <!-- Stat Cards -->
      <div class="row g-3 mb-4">
        <div class="col-xl-3 col-md-6" v-for="(item, index) in stats" :key="index">
          <div class="card shadow-sm border-0">
            <div class="card-body d-flex align-items-center">
              <div class="icon-box me-3" :class="`bg-${item.color}`">
                <i class="fa-solid" :class="item.icon"></i>
              </div>
              <div>
                <h6 class="mb-0 text-muted">{{ item.title }}</h6>
                <h4 class="fw-bold mb-0">{{ item.value }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Static Sections -->
      <div class="row g-3">
        <div class="col-lg-8">
          <div class="card shadow-sm border-0">
            <div class="card-header fw-bold">Recent Activity</div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">New course “Vue Basics” added</li>
                <li class="list-group-item">Trainer John assigned to Course 101</li>
                <li class="list-group-item">5 new users registered</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- Student Dashboard   -->
    <div v-else>
      <div class="card shadow-sm border-0">
        <div class="card-body">
          <h5 class="card-title">Welcome to Your Student Dashboard</h5>
          <p class="card-text">Here you can find your enrolled courses and track your progress.</p>
          <router-link to="/courses" class="btn btn-primary">Browse Courses</router-link>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-body">
          <h5 class="card-title">Your Enrollments</h5>
          <p class="card-text">You are currently enrolled in 3 courses. Keep up the great work!</p>
          <router-link to="/my-courses" class="btn btn-secondary">View My Courses</router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-box {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
}
</style>
