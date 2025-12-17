<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/config/api'; // Axios instance with baseURL

const router = useRouter();

const user = ref({
  name: 'John Smith',
  email: 'example@gmail.com',
  phone: '0123456789',
  password: '123456',
  password_confirmation: '123456', // Important for Laravel validation
  address: '123 Main Street, Dhaka',
});

const register = async () => {
  try {
    // 1. Send registration request
    const response = await api.post('/register', {
      name: user.value.name,
      email: user.value.email,
      phone: user.value.phone,
      address: user.value.address,
      password: user.value.password,
      password_confirmation: user.value.password_confirmation,
    });

    // 2. Save JWT token
    localStorage.setItem('token', response.data.token);

    // 3. Fetch current user
    const userResponse = await api.get('/me');
    localStorage.setItem('user', JSON.stringify(userResponse.data));

    // 4. Redirect to dashboard
    router.push('/');
  } catch (error: any) {
    console.error(error.response?.data || error);
    alert('Registration failed! Check console for details.');
  }
};
</script>

<template>
  <div class="registration-form">
    <img src="@/assets/lms.png" alt="logo" class="img-fluid lms-logo mb-4" />
    <h1 class="text-center text-light fw-bolder">Register</h1>

    <form @submit.prevent="register">
      <div class="form-group mb-3"> 
        <label for="name" class="text-white fw-bolder">Full Name:</label>
        <input type="text" class="form-control" id="name" v-model="user.name" required />
      </div>
      <div class="form-group mb-3"> 
        <label for="email" class="text-white fw-bolder">Email:</label>
        <input type="text" class="form-control" id="email" v-model="user.email" required />
      </div>
      <div class="form-group mb-3"> 
        <label for="phone" class="text-white fw-bolder">Phone:</label>
        <input type="text" class="form-control" id="phone" v-model="user.phone" required />
      </div>
      <div class="form-group mb-3"> 
        <label for="address" class="text-white fw-bolder">Address:</label>
        <input type="text" class="form-control" id="address" v-model="user.address" required />
      </div>
      <div class="form-group mb-3">
        <label for="password" class="text-white fw-bolder">Password:</label>
        <input type="password" class="form-control" id="password" v-model="user.password" required />
      </div>
      <div class="form-group mb-3">
        <label for="password_confirmation" class="text-white fw-bolder">Confirm Password:</label>
        <input type="password" class="form-control" id="password_confirmation" v-model="user.password_confirmation" required />
      </div>
      <button type="submit" class="btn btn-outline-info login-btn">Register</button>
    </form>
        <div>
      <p class="text-center mt-3 text-white">
        Already have an account?
        <router-link to="/login" class="text-info fw-bold">Login</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.registration-form{
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
</style>
