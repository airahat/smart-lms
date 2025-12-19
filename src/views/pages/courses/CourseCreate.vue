<template>
  <div class="container my-5">
    <h1 class="text-center mb-5 text-white">Create New Course</h1>

    <form @submit.prevent="handleSubmit" class="bg-dark p-5 rounded-4 shadow-lg">
      <!-- Course Code -->
      <div class="mb-4">
        <label for="course_code" class="fw-bold text-white">Course Code:</label>
        <input
          type="text"
          id="course_code"
          class="form-control"
          v-model="course.course_code"
        />
      </div>

      <!-- Course Title -->
      <div class="mb-4">
        <label for="title" class="fw-bold text-white">Course Title:</label>
        <input
          type="text"
          id="title"
          class="form-control"
          v-model="course.title"
          required
        />
      </div>

      <!-- Description -->
      <div class="mb-4">
        <label class="fw-bold text-white mb-2">Description:</label>

        <div class="editor-toolbar mb-2">
          <button type="button" @click="editor.chain().focus().toggleBold().run()">B</button>
          <button type="button" @click="editor.chain().focus().toggleItalic().run()">I</button>
          <button type="button" @click="editor.chain().focus().toggleStrike().run()">S</button>
          <button type="button" @click="editor.chain().focus().toggleBulletList().run()">• List</button>
          <button type="button" @click="editor.chain().focus().toggleOrderedList().run()">1. List</button>
          <button type="button" @click="editor.chain().focus().setParagraph().run()">P</button>
        </div>

        <EditorContent class="description-editor" :editor="editor" />
      </div>

      <!-- Trainer -->
      <div class="mb-4">
        <label for="trainer" class="fw-bold text-white">Instructor:</label>
        <select
          id="trainer"
          class="form-select"
          v-model.number="course.trainer_id"
          @change="updateTrainerName"
          required
        >
          <option :value="0" disabled>Select Instructor</option>
          <option
            v-for="user in users"
            :key="user.id"
            :value="user.id"
          >
            {{ user.name }}
          </option>
        </select>
      </div>

      <!-- Duration -->
      <div class="mb-4">
        <label for="duration" class="fw-bold text-white">Duration (hrs):</label>
        <input
          type="number"
          id="duration"
          class="form-control"
          v-model.number="course.duration"
          min="0"
          required
        />
      </div>

      <!-- Course Status -->
      <div class="mb-4">
        <label for="course_status" class="fw-bold text-white">Course Status:</label>
        <select
          id="course_status"
          class="form-select"
          v-model.number="course.course_status_id"
          required
        >
          <option :value="0" disabled>Select Status</option>
          <option
            v-for="status in courseStatuses"
            :key="status.id"
            :value="status.id"
          >
            {{ status.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-info w-100 fw-bold">
        Create Course
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { api } from '@/config/api'
import type { Course } from '@/interfaces/courses'
import type { Users } from '@/interfaces/users'
import { defaultCourse } from '@/interfaces/courses'
import { useRouter } from 'vue-router'

const router = useRouter();
interface CourseStatus {
  id: number
  name: string
}


const course = ref<Course>({
  ...defaultCourse,
  course_status_id: 0
})


const users = ref<Users[]>([])
const courseStatuses = ref<CourseStatus[]>([])

// TipTap
const editor = new Editor({
  extensions: [StarterKit],
  content: course.value.description || '',
  onUpdate({ editor }) {
    course.value.description = editor.getHTML()
  }
})

onBeforeUnmount(() => {
  editor.destroy()
})

// fetch trainers
const fetchTrainers = async () => {
  const res = await api.get('trainers')
  users.value = res.data.trainers
}

// fetch course status
const fetchCourseStatuses = async () => {
  const res = await api.get('/course-statuses')
  console.log(res.data)
  courseStatuses.value = res.data.course_statuses
}

onMounted(() => {
  fetchTrainers()
  fetchCourseStatuses()
})

// set trainer name
function updateTrainerName() {
  const trainer = users.value.find(
    u => u.id === course.value.trainer_id
  )
  course.value.trainer_name = trainer ? trainer.name : ''
}

// submit
async function handleSubmit() {
  try {
    await api.post('courses', course.value)
    alert('Course created successfully!')
    course.value = { ...defaultCourse, course_status_id: 0 }
    editor.commands.setContent('')
    router.push('/courses')
  } catch (err) {
    console.error(err)
    alert('Failed to create course.')
  }
}
</script>

<style scoped>
.description-editor {
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.editor-toolbar {
  display: flex;
  gap: 5px;
}

.editor-toolbar button {
  padding: 0.3rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  cursor: pointer;
}

.editor-toolbar button:hover {
  background-color: #eee;
}

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
