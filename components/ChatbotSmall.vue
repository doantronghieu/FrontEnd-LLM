<template>
  <div>
    <ChatbotIcon @toggle-chat-window="toggleChatWindow" />
    <ChatWindow :visible="chatWindowVisible"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const chatWindowVisible = ref(false);

const toggleChatWindow = () => {
  chatWindowVisible.value = !chatWindowVisible.value;
};

</script>
