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

const trainers = ref<Trainer[]>([])

function fetchTrainers() {
  api.get('trainers')
    .then(res => {
      console.log('Trainers fetched:', res.data)
      trainers.value = res.data.trainers
    })
    .catch(err => {
      console.error('Error fetching trainers:', err)
    })
}

// call directly (no onMounted)
fetchTrainers()
</script>

<template>
  <div class="container-fluid">
    
    <div class="d-flex align-items-center bg-success text-light p-2 ">
      <h4 class="fw-bold">Manage Trainers</h4>

      <router-link
        to="/trainers/create"
        class="btn btn-outline-info ms-auto"
      >
        Add Trainer +
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
        <tr v-if="trainers.length === 0">
          <td colspan="6" class="text-center text-muted">
            No trainers found
          </td>
        </tr>

        <tr
          v-for="(trainer, index) in trainers"
          :key="trainer.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ trainer.name }}</td>
          <td>{{ trainer.email }}</td>
          <td>{{ trainer.phone ?? '-' }}</td>
          <td>{{ trainer.address ?? '-' }}</td>

          <td>
            <router-link
              :to="`/trainers/details/${trainer.id}`"
              class="btn btn-sm"
            >
              <i class="fa-solid fa-eye fs-5"></i>
            </router-link>

            <router-link
              :to="`/trainers/edit/${trainer.id}`"
              class="btn btn-sm"
            >
              <i class="fa-solid fa-pen-to-square fs-5 text-info"></i>
            </router-link>

            <router-link
              :to="`/trainers/delete/${trainer.id}`"
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
