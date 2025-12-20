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
  <div class="container-fluid py-4">

    <h1 class="text-white fw-bolder">All Courses</h1>
    <div class="row g-4">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="course in courses"
        :key="course.id"
      >
        <div class="card h-100 shadow-sm course-card">

          <!-- Header -->
          <div class="card-header bg-success text-white">
            <h6 class="mb-0 text-truncate">{{ course.title }}</h6>
          </div>

          <!-- Body -->
          <div class="card-body">
            <p class="mb-2">
              <strong>Code:</strong> {{ course.course_code }}
            </p>
            <p class="mb-2">
              <strong>Instructor:</strong> {{ course.trainer_name }}
            </p>
            <p class="mb-0">
              <strong>Duration:</strong> {{ course.duration }} hours
            </p>
          </div>

          <!-- Footer -->
          <div class="card-footer bg-light d-flex justify-content-between">
            <router-link
              :to="`/courses/${course.id}/details`"
              class="btn btn-sm btn-outline-primary"
            >
              View
            </router-link>

            <div v-if="userStore.isAdmin">
              <router-link
                :to="`/courses/${course.id}/edit`"
                class="btn btn-sm btn-outline-success me-1"
              >
                Edit
              </router-link>
              <button
                @click="deleteCourse(course.id)"
                class="btn btn-sm btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>

    .course-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

</style>