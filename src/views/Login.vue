<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/config/api'; // Make sure your Axios instance is configured with baseURL

const router = useRouter();

const user = ref({
  email: 'examples@gmail.com',
  password: '123456'
});

const login = async () => {
  try {
    // 1. Send login request
    const response = await api.post('/login', {
      email: user.value.email,
      password: user.value.password
    });

    // 2. Save token in localStorage
    localStorage.setItem('token', response.data.token);

    // 3. Fetch current user profile
    const userResponse = await api.get('/me');
    localStorage.setItem('user', JSON.stringify(userResponse.data));

    // 4. Redirect to dashboard
    router.push('/');
  } catch (error: any) {
    console.error(error.response?.data || error);
    alert('Login failed! Check your credentials.');
  }
};
</script>

<template>
  <div class="login-form">
    <img src="@/assets/lms.png" alt="logo" class="img-fluid lms-logo mb-4" />
    <h1 class="text-center login">Login</h1>

    <form @submit.prevent="login">
      <div class="form-group mb-3"> 
        <label for="email" class="text-white fw-bolder">Email:</label>
        <input type="text" class="form-control" id="email" v-model="user.email" required />
      </div>
      <div class="form-group mb-3">
        <label for="password" class="text-white fw-bolder">Password:</label>
        <input type="password" class="form-control" id="password" v-model="user.password" required />
      </div>
      <button type="submit" class="btn btn-outline-info login-btn">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login-form{
  max-width: 800px;
  margin: 50px auto;
  border: 1px solid #17a2b8;
  padding: 30px;
}
.lms-logo {
  display: block;
  margin: 0 auto;
  max-width: 200px;
}
.login-btn{
  transition: transform 0.3s ease;
  display: block;
  margin: 0 auto;
  min-width: 80px;
}
.login{
  color: white;
  font-weight: bolder;
}
</style>
