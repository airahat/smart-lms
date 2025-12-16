<script setup lang="ts">
import { ref } from 'vue';
import type { Course } from '@/interfaces/courses';
import type { Users } from '@/interfaces/users';
import { defaultUser } from '@/interfaces/users';
import { defaultCourse } from '@/interfaces/courses';
import { api } from '@/config/api';
const course = ref<Course>(defaultCourse);
    const users = ref<Users[]>([defaultUser]);
    function fetchUsers() { 
        api.get('trainers')
            .then(response => {
                console.log('trainers fetched:', response.data);
                users.value = response.data.trainers;
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
            });
    }
    fetchUsers();

    function handleSubmit(){
        api.post('courses', course.value)
        .then(response => {
            console.log('Course created:', response.data);
            alert('Course created successfully!');
            course.value = defaultCourse;
        })
    }
 </script>
<template>
    <div class="text-white">
        <h1 class="text-center mb-4">Create New Course</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
                <label for="course_code" class="fw-bolder">Course Code:</label>
                <input type="text" class="form-control" id="course_code" v-model="course.course_code" required />
            </div>
            <div class="form-group mb-3">
                <label for="title" class="fw-bolder">Course Title:</label>
                <input type="text" class="form-control" id="title" v-model="course.title" required />
            </div>
            <div class="form-group mb-3">
                <label for="description" class="fw-bolder">Description:</label>
                <textarea class="form-control" id="description" v-model="course.description"></textarea>
            </div>
            <div class="form-group mb-3">
                <label for="trainer" class="fw-bolder">Instructor:</label>
                <select name="trainer_id" id="trainer" class="form-select" v-model="course.trainer_id" required>
                    <option value="" disabled>Select Instructor</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="duration" class="fw-bolder">Duration:</label>
                <input type="text" class="form-control" id="duration" v-model="course.duration" required />
            </div>
            <button class="btn btn-outline-info">Submit</button>
        </form>
    </div>
</template>


<style scoped>

</style>