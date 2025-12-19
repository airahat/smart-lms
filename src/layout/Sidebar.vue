<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/config/api'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const isCollapsed = ref(false)

onMounted(() => {
  if (!userStore.user) {
    const localUser = JSON.parse(localStorage.getItem('user') || 'null')
    if (localUser) userStore.setUser(localUser)
  }
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const logout = async () => {
  try {
    await api.post('/logout')
  } finally {
    localStorage.clear()
    window.location.href = '/login'
  }
}
</script>

<template>
  <!-- ONLY ADD :class -->
  <div
    id="sidebar"
    class="d-flex flex-column sidebar p-1 text-white bg-dark"
    :class="{ collapsed: isCollapsed }"
  >

    <!-- ONLY ADD @click (id kept for CSS safety) -->
    <div class="toggle-div ms-auto" id="toggle-div" @click="toggleSidebar">
      <i class="fa-solid fa-chevron-right text-dark fs-4"></i>
    </div>

    <!-- EVERYTHING BELOW IS UNCHANGED -->
    <div class="sidebar-profile text-center mb-4"> 
      <img src="@/assets/default.png" alt="" class="rounded-circle">
      <div class="role">
        <span v-if="userStore.user?.role_id === 1">Admin</span>
        <span v-else-if="userStore.user?.role_id === 2">Editor</span>
        <span v-else-if="userStore.user?.role_id === 3">Student</span>
        <span v-else-if="userStore.user?.role_id === 4">Trainer</span>
      </div>
    </div>

    <ul class="nav nav-pills flex-column mb-auto pe-4 text-start mt-5">
      <li>
        <router-link to="/" class="nav-link text-white d-flex align-items-center">
          Dashboard <i class="fa-solid fa-chart-line ms-auto"></i>
        </router-link>
      </li>

      <li>
        <router-link to="/courses" class="nav-link text-white d-flex align-items-center">
          Courses <i class="fa-solid fa-book-open ms-auto"></i>
        </router-link>
      </li>

      <li>
        <router-link to="/lessons" class="nav-link text-white d-flex align-items-center">
          Lessons <i class="fa-solid fa-video ms-auto"></i>
        </router-link>
      </li>

      <li v-if="userStore.isAdmin">
        <router-link to="/students" class="nav-link text-white d-flex align-items-center">
          Students <i class="fa-solid fa-user-graduate ms-auto"></i>
        </router-link>
      </li>

      <li v-if="userStore.isAdmin">
        <router-link to="/trainers" class="nav-link text-white d-flex align-items-center">
          Trainers <i class="fa-solid fa-chalkboard-user ms-auto"></i>
        </router-link>
      </li>

      <li>
        <router-link to="/quizzes" class="nav-link text-white d-flex align-items-center">
          Quizzes <i class="fa-solid fa-file-pen ms-auto"></i>
        </router-link>
      </li>

      <li>
        <router-link to="/assignments" class="nav-link text-white d-flex align-items-center">
          Assignments <i class="fa-solid fa-tasks ms-auto"></i>
        </router-link>
      </li>

      <li>
        <router-link to="/suggestions" class="nav-link text-white d-flex align-items-center">
          Suggestions <i class="fa-solid fa-lightbulb ms-auto"></i>
        </router-link>
      </li>

      <li v-if="userStore.isAdmin">
        <router-link to="/users" class="nav-link text-white d-flex align-items-center">
          Users <i class="fa-solid fa-chart-simple ms-auto"></i>
        </router-link>
      </li>
    </ul>

    <hr>

    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
         data-bs-toggle="dropdown">
        <img src="@/assets/default.png" width="32" height="32"
             class="rounded-circle me-2">
        <strong>{{ userStore.user?.name || 'Guest' }}</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li>
          <button @click="logout" class="dropdown-item">Sign out</button>
        </li>
      </ul>
    </div>
  </div>
</template>
