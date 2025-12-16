<script setup lang="ts">
import { api } from '@/config/api';

const logout = async () => {
  try {
    await api.post("/logout");
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
   
    window.location.href = "/login";
  } catch (error) {
    console.error(error);
    alert("Logout failed!");
  }
};
</script>


<template>
  <div id="sidebar" class="d-flex flex-column sidebar p-1 text-white bg-dark">
    <div class="toggle-div ms-auto" id="toggle-div">
      <i class="fa-solid fa-chevron-right text-dark fs-4"></i>
    </div>

    <div class="sidebar-profile text-center mb-4"> 
      <img src="@/assets/default.png" alt="" class="rounded-circle">
      <div class="role">Admin</div>
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

      <li>
        <router-link to="/students" class="nav-link text-white d-flex align-items-center">
          Students <i class="fa-solid fa-user-graduate ms-auto"></i>
        </router-link>
      </li>

      <li>
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

      <li>
        <router-link to="/files" class="nav-link text-white d-flex align-items-center">
          Files <i class="fa-solid fa-folder-open ms-auto"></i>
        </router-link>
      </li>

      <li>
        <router-link to="/users" class="nav-link text-white d-flex align-items-center">
          Users <i class="fa-solid fa-chart-simple ms-auto"></i>
        </router-link>
      </li>



    </ul>

    <hr>

    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
         id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="" alt="" width="32" height="32"
             class="rounded-circle me-2">
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <button @click="logout" class="dropdown-item">Sign out</button>
      </ul>
    </div>
  </div>
</template>
