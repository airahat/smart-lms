<template>
  <div class="container mt-4">
    <h2 class="mb-4">Course Details</h2>

    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>

    <div v-else-if="course">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{{ course.id }}</td>
          </tr>
          <tr>
            <th>Course Code</th>
            <td>{{ course.course_code }}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{{ course.title }}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{{ course.description }}</td>
          </tr>
          <tr>
            <th>Duration (Hrs.)</th>
            <td>{{ course.duration }}</td>
          </tr>
          <tr>
            <th>Trainer</th>
            <td>{{ course.trainer_name }}</td>
          </tr>
        </tbody>
      </table>

      <router-link to="/courses" class="btn btn-secondary mt-3">Back to Courses</router-link>
    </div>

    <div v-else class="alert alert-danger">
      Course not found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/config/api';

interface Course {
  id: number;
  course_code: string;
  title: string;
  description: string;
  duration: string;
  trainer_id: number;
  trainer_name: string;
}

const route = useRoute();
const router = useRouter();
const course = ref<Course | null>(null);
const loading = ref(true);

// Immediately invoked async function
(async () => {
  const courseId = route.params.id;
  if (!courseId) {
    router.push('/courses');
    return;
  }

  try {
    const res = await api.get(`courses/${courseId}`);
    console.log('Course fetched:', res.data);
    course.value = res.data.course;
  } catch (err) {
    console.error('Error fetching course:', err);
    course.value = null;
  } finally {
    loading.value = false;
  }
})();
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>
