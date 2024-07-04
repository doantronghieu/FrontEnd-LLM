<template>
  <div class="chatbot-icon" @click="toggleChatWindow">
    <img src="/assets/bot-icon.png" alt="Chatbot Icon" />
  </div>
</template>

<script setup>
const emit = defineEmits(['toggle-chat-window']);

const toggleChatWindow = () => {
  emit('toggle-chat-window');
};
</script>

<style scoped>
.chatbot-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out;
}

.chatbot-icon:hover {
  transform: scale(1.1);
}

.chatbot-icon img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
