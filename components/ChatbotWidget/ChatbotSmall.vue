<template>
  <div>
    <ChatbotIcon @toggle-chat-window="toggleChatWindow" :visible="!chatWindowVisible || !isFullscreen" />
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
};

</script>
