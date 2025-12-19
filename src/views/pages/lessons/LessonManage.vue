<template>
    <div class="container my-5">
        <!-- Header -->
        <div class="d-flex justify-content-between bg-success align-items-center rounded-top p-2">
            <h2 class="fw-bold text-white mb-0">Manage Lessons</h2>
            <router-link to="/lessons/create" class="btn btn-outline-info shadow-sm">
                + Create Lesson
            </router-link>
        </div>

        <div class="bg-light p-2" >
            <!-- Course Filter -->
            <div class="mb-4">
                <label class="form-label fw-semibold">Filter by Course</label>
                <select v-model="selectedCourse" class="form-select bg-dark text-light border-secondary shadow-sm"
                    @change="fetchLessons">
                    <option value="">All Courses</option>
                    <option v-for="course in courses" :key="course.id" :value="course.id">
                        {{ course.title }}
                    </option>
                </select>
            </div>

            <!-- Lessons Table -->
            <div class="card bg-white shadow-sm rounded-4 border-secondary text-center">
                <table class="table table-hover table-light mb-0 align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>SL</th>
                            <th>Lesson Title</th>
                            <th>Course</th>
                            <th>Lesson Order</th>
                            <th>Free</th>
                            <th>Status</th>
                            <th class="text-end">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-if="lessons.length === 0">
                            <td colspan="7" class="text-center py-4 text-muted">
                                No lessons found
                            </td>
                        </tr>

                        <tr v-for="(lesson, index) in lessons" :key="lesson.id" class="align-middle">
                            <td>{{ index + 1 }}</td>
                            <td>{{ lesson.title }}</td>
                            <td>{{ lesson.course?.title || '-' }}</td>
                            <td>{{ lesson.lesson_order }}</td>
                            <td>
                                <span class="badge" :class="lesson.is_free ? 'bg-success' : 'bg-secondary'">
                                    {{ lesson.is_free ? 'Yes' : 'No' }}
                                </span>
                            </td>
                            <td>
                                <span class="badge" :class="lesson.status ? 'bg-success' : 'bg-danger'">
                                    {{ lesson.status ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="text-end">
                                <router-link :to="`/lessons/${lesson.id}/edit`"
                                    class="btn btn-sm btn-warning me-2 shadow-sm">
                                    Edit
                                </router-link>
                                <button class="btn btn-sm btn-danger shadow-sm" @click="deleteLesson(lesson.id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/config/api'

const lessons = ref<any[]>([])
const courses = ref<any[]>([])
const selectedCourse = ref('')

/* Fetch courses */
const fetchCourses = async () => {
    try {
        const res = await api.get('/courses')
        courses.value = res.data.courses
    } catch (error) {
        console.error('Failed to fetch courses', error)
    }
}

/* Fetch lessons */
const fetchLessons = async () => {
    try {
        const url = selectedCourse.value
            ? `/courses/${selectedCourse.value}/lessons`
            : '/lessons'

        const res = await api.get(url)
        lessons.value = res.data.lessons
    } catch (error) {
        console.error('Failed to fetch lessons', error)
        lessons.value = []
    }
}

/* Delete lesson */
const deleteLesson = async (id: number) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return

    try {
        await api.delete(`/lessons/${id}`)
        fetchLessons()
    } catch (error) {
        console.error('Failed to delete lesson', error)
    }
}

onMounted(() => {
    fetchCourses()
    fetchLessons()
})
</script>

<style scoped>
.table-hover tbody tr:hover {
    background-color: #2a2a2a;
    transition: 0.2s ease-in-out;
}

.card {
    border: none;
}

.btn {
    transition: transform 0.1s ease-in-out;
}

.btn:hover {
    transform: translateY(-2px);
}
</style>
