<script setup lang="ts">
const stats = [
  { title: 'Total Users', value: 120, icon: 'fa-users', color: 'primary' },
  { title: 'Total Courses', value: 18, icon: 'fa-book', color: 'success' },
  { title: 'Active Trainers', value: 6, icon: 'fa-chalkboard-teacher', color: 'warning' },
  { title: 'Enrollments', value: 340, icon: 'fa-user-graduate', color: 'info' }
]
</script>

<template>
  <div class="container-fluid">
    <!-- Header -->
    <div class="mb-4">
      <h3 class="fw-bold">Dashboard</h3>
      <p class="text-muted">Welcome back! Here’s an overview.</p>
    </div>

    <!-- Stat Cards -->
    <div class="row g-3 mb-4">
      <div
        class="col-xl-3 col-md-6"
        v-for="(item, index) in stats"
        :key="index"
      >
        <div class="card shadow-sm border-0">
          <div class="card-body d-flex align-items-center">
            <div
              class="icon-box me-3"
              :class="`bg-${item.color}`"
            >
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
