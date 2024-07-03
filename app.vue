<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <ChatbotIcon @toggle-chat-window="toggleChatWindow" />
    <ChatWindow :visible="chatWindowVisible" @send-message="sendMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatbotIcon from './components/ChatbotIcon.vue';
import ChatWindow from './components/ChatWindow.vue';

const chatWindowVisible = ref(false);

const toggleChatWindow = () => {
  chatWindowVisible.value = !chatWindowVisible.value;
  console.log('Chat window visibility:', chatWindowVisible.value); // Add this line for debugging
};

const sendMessage = (message) => {
  // Logic to handle the sent message
  console.log('Message sent:', message);
};
</script>
