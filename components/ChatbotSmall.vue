<template>
  <div>
    <ChatbotIcon @toggle-chat-window="toggleChatWindow" />
    <ChatWindow :visible="chatWindowVisible" @send-message="sendMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const chatWindowVisible = ref(false);

const toggleChatWindow = () => {
  chatWindowVisible.value = !chatWindowVisible.value;
};

const sendMessage = (message) => {
  // Logic to handle the sent message
  console.log('Message sent:', message);
};
</script>
