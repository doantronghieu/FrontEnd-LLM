<template>
  <div class="chatbot-small">
    <ChatbotIcon @toggle-chat-window="toggleChatWindow" :visible="true" />
    <ChatWindow 
      :visible="chatWindowVisible" 
      @fullscreen-change="handleFullscreenChange" 
      @close="closeChatWindow"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatbotIcon from './ChatbotIcon.vue';
import ChatWindow from './ChatWindow.vue';

const chatWindowVisible = ref(false);
const isFullscreen = ref(false);

const toggleChatWindow = () => {
  chatWindowVisible.value = !chatWindowVisible.value;
};

const closeChatWindow = () => {
  chatWindowVisible.value = false;
};

const handleFullscreenChange = (fullscreen) => {
  isFullscreen.value = fullscreen;
  if (!fullscreen) {
    chatWindowVisible.value = false;
  }
};
</script>

<style scoped>
.chatbot-small {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}
</style>