<template>
  <div class="container my-5">
    <!-- Loading state -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted fw-semibold">Loading course details...</p>
    </div>

    <!-- Course details -->
    <div v-else-if="course" class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 rounded-3">
          <div class="card-header bg-white border-bottom">
            <h4 class="mb-0 fw-bold">{{ course.title }}</h4>
            <small class="text-muted fw-bold">Course code - {{ course.course_code }}</small>
          </div>

          <div class="card-body">
            <!-- Info rows -->
            <div class="mb-3 row">
              <div class="col-4 text-muted fw-semibold">Duration:</div>
              <div class="col-8">{{ course.duration }} hrs</div>
            </div>

            <div class="mb-3 row">
              <div class="col-4 text-muted fw-semibold">Trainer:</div>
              <div class="col-8">{{ course.trainer_name }}</div>
            </div>

            <!-- Description -->
            <div class="mb-3">
              <div class="text-muted fw-semibold mb-2">Description:</div>
              
              <!-- Paragraphs -->
              <p v-for="(para, idx) in descriptionParagraphs" :key="'p-'+idx">{{ para }}</p>

              <!-- Modules -->
              <ul v-if="modules.length">
                <li v-for="(module, idx) in modules" :key="'m-'+idx">{{ module }}</li>
              </ul>
            </div>
          </div>

          <div class="card-footer bg-white border-top text-end">
            <router-link to="/courses" class="btn btn-outline-primary">
              ← Back to Courses
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else class="alert alert-danger text-center">
      Course not found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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

// Computed properties to format description
const descriptionParagraphs = computed(() => {
  if (!course.value?.description) return [];
  return course.value.description
    .split(/\n\n+/) // split by double line breaks
    .filter(p => !p.match(/^\d+\./) && !p.startsWith("Course Modules:"))
    .map(p => p.trim());
});

const modules = computed(() => {
  if (!course.value?.description) return [];
  const matches = course.value.description.match(/^\d+\..+/gm);
  return matches ? matches.map(m => m.trim()) : [];
});

// Fetch course data
(async () => {
  const courseId = route.params.id;
  if (!courseId) {
    router.push('/courses');
    return;
  }

  try {
    const res = await api.get(`courses/${courseId}`);
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
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.card-body p {
  line-height: 1.6;
  margin-bottom: 1rem;
}
.card-body ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.card-body ul li {
  margin-bottom: 0.5rem;
}
</style>
