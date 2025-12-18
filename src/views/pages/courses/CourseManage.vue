<script setup lang="ts">
import { api } from '@/config/api';
import { ref, onMounted } from 'vue';
import type { Course } from '@/interfaces/courses';
import { useRouter } from 'vue-router';
import { defaultCourse } from '@/interfaces/courses';
import { useUserStore } from '@/store/user';
const userStore = useUserStore();

onMounted(() => {
  if (!userStore.user) {
    const localUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (localUser) userStore.setUser(localUser);
  }
});

const courses = ref<Course[]>([defaultCourse]);

function fetchCourses() {
    api.get('courses')
        .then(response => {
            console.log('Courses fetched:', response.data);
            courses.value = response.data.courses;
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
}

fetchCourses();


function deleteCourse(id: number) {
  if (!confirm('Are you sure you want to delete this course?')) return;

  api.delete(`courses/${id}`)
    .then(() => {
      courses.value = courses.value.filter(c => c.id !== id);
    })
    .catch(err => {
      console.error('Delete failed:', err);
    });
}

</script>

<template>
    <div class="container-fluid">

        <div>
            <div class="bg-success text-light fs-4 fw-bolder d-flex p-2"><span>Courses List</span> <router-link
                    to="/courses/create" class="btn btn-outline-info text-light fw-bolder ms-auto">Add
                    New+</router-link>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Instructor</th>
                        <th>Duration (Hrs.)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(course, index) in courses" :key="course.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ course.course_code }}</td>
                        <td>{{ course.title }}</td>
                        <td>{{ course.trainer_name }}</td>
                        <td>{{ course.duration }}</td>
                        <td>
                            <router-link :to="`/courses/${course.id}/details`" class="btn btn-sm" v-if="userStore.isAdmin"><i
                                    class="fa-solid fa-eye fs-5 "></i></router-link>
                                    <router-link :to="`/courses/${course.id}/edit`" class="btn btn-sm" v-if="userStore.isAdmin"><i
                                        class="fa-solid fs-5 fa-pen-to-square text-info"></i></router-link>
                                        <button @click="deleteCourse(course.id)" class="btn btn-sm" v-if="userStore.isAdmin"><i
                                            class="fa-regular fa-trash-can fs-5 text-danger"></i></button>
                                            <router-link :to="`/courses/${course.id}/details`" class="btn btn-sm" v-else><i
                                                    class="fa-solid fa-eye fs-5 "></i></router-link>
                        </td>
                    </tr>

                </tbody>


            </table>
        </div>

    </div>
</template>

<style scoped></style>