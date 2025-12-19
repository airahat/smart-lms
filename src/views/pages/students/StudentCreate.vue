<template>
    <div class="container mt-4 text-white">
        <h2 class="mb-4">Add New Student</h2>

        <!-- <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div> -->

        <form @submit.prevent="createUser">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="user.name" type="text" id="name" class="form-control" required>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="user.email" type="email" id="email" class="form-control" required>
            </div>

            <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input v-model="user.phone" type="text" id="phone" class="form-control">
            </div>

            <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input v-model="user.address" type="text" id="address" class="form-control">
            </div>

            <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select v-model="user.role_id" id="role" class="form-select" required>
                    <option value="" disabled>Select Role</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Create Student</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/config/api';
import { useRouter } from 'vue-router';
const router = useRouter();

interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
    role_id: number | '';
}

interface Role {
    id: number;
    name: string;
}

const user = ref<User>({
    name: '',
    email: '',
    phone: '',
    address: '',
    role_id: 3
});

const roles = ref<Role[]>([]);
const successMessage = ref('');
const errorMessage = ref('');

onMounted(async () => {
    try {
        const res = await api.get('roles');
        roles.value = res.data.roles;
    } catch (err) {
        console.error('Error fetching roles:', err);
    }
});

const createUser = async () => {
    successMessage.value = '';
    errorMessage.value = '';
    try {
        const res = await api.post('users', user.value);
        successMessage.value = res.data.message || 'User created successfully!';
        user.value = { name: '', email: '', phone: '', address: '', role_id: '' };
        router.push('/students');
    } catch (err: any) {
        console.error(err);
        errorMessage.value = err.response?.data?.message || 'Error creating user.';
    }
};
</script>

<style scoped>
.container {
    max-width: 800px;
    border: 1px solid #abdefc;
    padding: 30px;
    border-radius: 8px;
    box-shadow: #3b3e41 10px 15px 10px;
}
</style>
