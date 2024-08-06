<template>
  <div v-if="visible" class="chatbot-icon" @click="toggleChatWindow">
    <img src="/assets/bot-icon.gif" alt="Chatbot Icon" />
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean
});

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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  z-index: 9999;
  overflow: hidden;
}

.chatbot-icon:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.chatbot-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease-in-out;
}

.chatbot-icon:hover img {
  filter: brightness(1.1);
}
</style>