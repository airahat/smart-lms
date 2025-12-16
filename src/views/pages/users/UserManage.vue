<template>
    <div>
        <div>
            <div class="bg-success text-light fs-4 fw-bolder d-flex p-2"><span>Users List</span> <router-link
                    to="/users/create" class="btn btn-outline-info text-light fw-bolder ms-auto">Add
                    New+</router-link></div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="user.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.role }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.address }}</td>
                        <td>
                            <router-link to="/users/details" class="btn btn-sm"><i
                                    class="fa-solid fa-eye fs-5 "></i></router-link>
                            <router-link to="/users/edit" class="btn btn-sm"><i
                                    class="fa-solid fs-5 fa-pen-to-square text-info"></i></router-link>
                            <router-link to="/users/delete" class="btn btn-sm"><i
                                    class="fa-regular fa-trash-can fs-5 text-danger"></i></router-link>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Users } from '@/interfaces/users';
import { defaultUser } from '@/interfaces/users';
import { api } from '@/config/api';
const users = ref<Users>(defaultUser);

function fetchUsers() {
    api.get('users')
        .then(response => {
            console.log('Users fetched:', response.data);
            users.value = response.data.users;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}
fetchUsers();

</script>

<style scoped></style>