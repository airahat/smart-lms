<template>
    <div class="container my-5">
        <div class="bg-success rounded-top">
            <h2 class="text-white fw-bolder p-3 mb-0">Create New Lesson</h2>
        </div>


        <form @submit.prevent="submitLesson" class="card p-4 shadow-sm">
            <!-- Course -->
            <div class="mb-3">
                <label class="form-label">Course</label>
                <select v-model="form.course_id" class="form-select" required>
                    <option value="">Select Course</option>
                    <option v-for="course in courses" :key="course.id" :value="course.id">
                        {{ course.title }}
                    </option>
                </select>
            </div>

            <!-- Lesson Title -->
            <div class="mb-3">
                <label class="form-label">Lesson Title</label>
                <input v-model="form.title" type="text" class="form-control" placeholder="Enter lesson title"
                    required />
            </div>

            <!-- Description -->
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea v-model="form.description" class="form-control" rows="2"></textarea>
            </div>

            <!-- Video URL -->
            <div class="mb-3">
                <label class="form-label">Video URL</label>
                <input v-model="form.video_url" type="url" class="form-control" placeholder="https://youtube.com/..." />
            </div>

            <!-- Content -->
            <div class="mb-3">
                <label class="form-label">Lesson Content</label>
                <textarea v-model="form.content" class="form-control" rows="5"
                    placeholder="Lesson details / notes"></textarea>
            </div>

            <!-- Free Preview -->
            <div class="form-check mb-3">
                <input v-model="form.is_free" class="form-check-input" type="checkbox" id="isFree" />
                <label class="form-check-label" for="isFree">
                    Free Preview Lesson
                </label>
            </div>

            <!-- Submit -->
            <button class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Saving...' : 'Create Lesson' }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/config/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const courses = ref<any[]>([])

const form = ref({
    course_id: '',
    title: '',
    description: '',
    content: '',
    video_url: '',
    is_free: false,
})

/* Fetch courses for dropdown */
onMounted(async () => {
    const res = await api.get('/courses')
    courses.value = res.data.courses
})

/* Submit lesson */
const submitLesson = async () => {
    loading.value = true
    try {
        await api.post('/lessons', form.value)
        router.push('/lessons')
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}
</script>
<style scoped>
.card{
    border-radius: 0%;
}
</style>