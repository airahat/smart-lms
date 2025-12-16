<template>
  <div class="chat-container">
    <div class="chat-box" ref="chatBox">
      <div v-for="(msg, i) in messages" :key="i">
        <strong :class="msg.role==='user'?'text-primary':'text-success'">
          {{ msg.role==='user'?'You':'AI' }}:
        </strong>
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model="userInput" placeholder="Type..." class="form-control"/>
      <button class="btn btn-primary">Send</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const messages = ref<{role:string, content:string}[]>([]);
const userInput = ref('');
const chatBox = ref<HTMLElement | null>(null);

async function sendMessage() {
  if(!userInput.value.trim()) return;

  messages.value.push({role:'user', content:userInput.value});
  const msg = userInput.value;
  userInput.value = '';

  try {
    const res = await axios.post('/api/chat', { message: msg });
    messages.value.push({ role:'assistant', content: res.data.reply });
    chatBox.value?.scrollTo({top: chatBox.value.scrollHeight, behavior:'smooth'});
  } catch (err) {
    messages.value.push({ role:'assistant', content: 'Error fetching response' });
  }
}
</script>

<style scoped>
.chat-box {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
