<template>
  
  <div class="chat-container p-3">
    <div class="bg-success rounded-top ">
      <h2 class="p-3 text-light fw-bolder mb-0">Talk to Your Personal AI Advisor</h2>
    </div>
    <div class="chat-box mb-2" ref="chatBox">
      <div v-for="(msg, i) in messages" :key="i" class="mb-2">
        <strong :class="msg.role === 'user' ? 'text-primary' : 'text-success'">
          {{ msg.role === 'user' ? 'You' : 'AI' }}:
        </strong>

      
        <div v-if="msg.role === 'ai'" v-html="msg.html"></div>

       
        <span v-else>{{ msg.content }}</span>
      </div>

      
      <div v-if="loading" class="text-success"><em>AI is typing...</em></div>
    </div>

  
    <form @submit.prevent="sendMessage" class="d-flex">
      <input 
        v-model="userInput" 
        placeholder="Type a message..." 
        class="form-control me-2" 
        :disabled="loading"
      />
      <button class="btn btn-primary" :disabled="loading">Send</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { marked } from 'marked';
import { api } from '@/config/api';

interface Message {
  role: 'user' | 'ai';
  content: string;
  html?: string; 
}

const messages = ref<Message[]>([]);
const userInput = ref('Hi!');
const chatBox = ref<HTMLElement | null>(null);
const loading = ref(false);

const scrollToBottom = () => {
  nextTick(() => {
    if (chatBox.value) {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }
  });
};

async function sendMessage() {
  if (!userInput.value.trim()) return;

  
  messages.value.push({ role: 'user', content: userInput.value });
  const msg = userInput.value;
  userInput.value = '';
  loading.value = true;
  scrollToBottom();

  try {
    const res = await api.post('chat', { message: msg });

    const aiReply = res.data.reply || 'No reply from AI.';

    // Synchronous parse to HTML (string only)
    const htmlString: string = marked.parse(aiReply);

    messages.value.push({
      role: 'ai',
      content: aiReply,
      html: htmlString
    });

  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Error fetching response';
    messages.value.push({
      role: 'ai',
      content: errorMessage,
      html: `<span class="text-danger">${errorMessage}</span>`
    });
  } finally {
    loading.value = false;
    scrollToBottom();
  }
}
</script>

<style scoped>
.chat-box {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  /* border-radius: 5px; */
  padding: 10px;
  background-color: #f9f9f9;
}


.chat-box .ai strong { font-weight: bold; }
.chat-box .ai em { font-style: italic; }
.chat-box .ai code { background-color: #eee; padding: 2px 4px; border-radius: 3px; }
</style>
