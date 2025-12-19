<script setup lang="ts">
import { ref } from 'vue'
import { api } from '@/config/api'

interface Trainer {
  id: number
  name: string
  email: string
  phone: string | null
  address: string | null
}

const students = ref<Trainer[]>([])

function fetchStudents() {
  api.get('students')
    .then(res => {
      console.log('Students fetched:', res.data)
      students.value = res.data.students
    })
    .catch(err => {
      console.error('Error fetching Students:', err)
    })
}

// call directly (no onMounted)
fetchStudents()
</script>

<template>
  <div class="container-fluid">
    
    <div class="d-flex align-items-center bg-success text-light p-2 ">
      <h4 class="fw-bold">Manage Students</h4>

      <router-link
        to="/students/create"
        class="btn btn-outline-info ms-auto"
      >
        Add Student +
      </router-link>
    </div>

    
    <table class="table table-striped align-middle">
      <thead>
        <tr>
          <th>SL</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="students.length === 0">
          <td colspan="6" class="text-center text-muted">
            No students found
          </td>
        </tr>

        <tr
          v-for="(student, index) in students"
          :key="student.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phone ?? '-' }}</td>
          <td>{{ student.address ?? '-' }}</td>

          <td>
            <router-link
              :to="`/students/details/${student.id}`"
              class="btn btn-sm"
            >
              <i class="fa-solid fa-eye fs-5"></i>
            </router-link>

            <router-link
              :to="`/students/edit/${student.id}`"
              class="btn btn-sm"
            >
              <i class="fa-solid fa-pen-to-square fs-5 text-info"></i>
            </router-link>

            <router-link
              :to="`/students/delete/${student.id}`"
              class="btn btn-sm"
            >
              <i class="fa-regular fa-trash-can fs-5 text-danger"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
th {
  white-space: nowrap;
}
</style>
