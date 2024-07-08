<template>
  <div>
    <ChatbotIcon @toggle-chat-window="toggleChatWindow" :visible="true" />
    <ChatWindow :visible="chatWindowVisible" @fullscreen-change="handleFullscreenChange"/>
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

const handleFullscreenChange = (fullscreen) => {
  isFullscreen.value = fullscreen;
  if (!fullscreen) {
    chatWindowVisible.value = false;
  }
};

</script>
