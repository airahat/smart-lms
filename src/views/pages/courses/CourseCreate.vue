<template>
  <div class="container my-5">
    <h1 class="text-center mb-5 text-white">Create New Course</h1>

    <form @submit.prevent="handleSubmit" class="bg-dark p-5 rounded-4 shadow-lg">
      <!-- Course Code -->
      <div class="mb-4">
        <label for="course_code" class="fw-bold text-white">Course Code:</label>
        <input type="text" id="course_code" class="form-control" v-model="course.course_code" required />
      </div>

      <!-- Course Title -->
      <div class="mb-4">
        <label for="title" class="fw-bold text-white">Course Title:</label>
        <input type="text" id="title" class="form-control" v-model="course.title" required />
      </div>

      <!-- Description with Quill -->
      <div class="mb-4">
        <label class="fw-bold text-white mb-2">Description:</label>
        <QuillEditor
          v-model="course.description"
          :modules="editorOptions.modules"
          theme="snow"
          class="description-editor"
        />
      </div>

      <!-- Trainer -->
      <div class="mb-4">
        <label for="trainer" class="fw-bold text-white">Instructor:</label>
        <select id="trainer" class="form-select" v-model="course.trainer_id" required>
          <option value="" disabled>Select Instructor</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>

      <!-- Duration -->
      <div class="mb-4">
        <label for="duration" class="fw-bold text-white">Duration (hrs):</label>
        <input type="text" id="duration" class="form-control" v-model="course.duration" required />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-info w-100 fw-bold">Create Course</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Course } from '@/interfaces/courses';
import type { Users } from '@/interfaces/users';
import { api } from '@/config/api';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// Initialize course
const course = ref<Course>({
  course_code: '',
  title: '',
  description: '',
  trainer_id: '',
  duration: ''
});

// Trainers list
const users = ref<Users[]>([]);

// Fetch trainers on mount
onMounted(async () => {
  try {
    const res = await api.get('trainers');
    users.value = res.data.trainers;
  } catch (err) {
    console.error('Error fetching trainers:', err);
  }
});

// Quill editor options
const editorOptions = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image']
    ]
  }
};

// Handle form submission
async function handleSubmit() {
  try {
    await api.post('courses', course.value);
    alert('Course created successfully!');
    course.value = {
      course_code: '',
      title: '',
      description: '',
      trainer_id: '',
      duration: ''
    };
  } catch (err) {
    console.error('Error creating course:', err);
    alert('Failed to create course.');
  }
}
</script>

<style scoped>
/* Quill Editor Styling */
.description-editor {
  min-height: 200px;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
}
.ql-toolbar {
  border-radius: 0.5rem 0.5rem 0 0;
  border: 1px solid #ced4da;
  border-bottom: none;
}
.ql-container {
  border-radius: 0 0 0.5rem 0.5rem;
}

/* Form input styling */
input.form-control,
select.form-select {
  border-radius: 0.5rem;
  padding: 0.6rem;
}

button.btn-info {
  font-size: 1.1rem;
  padding: 0.6rem;
  transition: transform 0.2s, box-shadow 0.2s;
}
button.btn-info:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}
</style>
