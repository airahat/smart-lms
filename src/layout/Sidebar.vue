<template>
  <div class="d-flex flex-column sidebar pt-5  p-1 text-white bg-dark ">

    <ul class="nav nav-pills flex-column mb-auto text-start">

      <li>
        <router-link to="/" class="nav-link text-white  d-flex align-items-center">
          Dashboard <i class="fa-solid fa-chart-line ms-auto"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/user" class="nav-link text-white  d-flex align-items-center">
          Users <i class="fa-solid fa-users ms-auto"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/students" class="nav-link text-white  d-flex align-items-center">
          Students <i class="fa-solid fa-user-graduate ms-auto"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/tests" class="nav-link text-white d-flex align-items-center">
          Tests <i class="fa-solid fa-file-pen ms-auto"></i>
        </router-link>
      </li>
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1"
        data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>