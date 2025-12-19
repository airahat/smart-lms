<template>
  <div style="margin:50px;">
    <h2>Test Quill Editor</h2>
    <div v-if="showEditor">
      <QuillEditor v-model="content" theme="snow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const content = ref('');
const showEditor = ref(false);

onMounted(() => {
  showEditor.value = true;
});
</script>
