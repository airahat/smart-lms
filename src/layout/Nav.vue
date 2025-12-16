<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/lms.png" class="logo" alt="">


      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item me-2">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item me-2">
            <router-link class="nav-link" to="#">Exams</router-link>
          </li>
          <li class="nav-item dropdown me-2">
            <router-link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Tests
            </router-link>
            <ul class="dropdown-menu me-2" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Schedule a Test</a></li>
            </ul>
          </li>

          <li class="nav-item me-2">
            <router-link class="nav-link" to="/ai-advisor">AI Adviser</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <div class="input-group">
            <input class="form-control" type="search" placeholder="search here..." aria-label="Search">
            <button class="btn btn-outline-info" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>