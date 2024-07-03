<template>
  <transition name="fade">
    <div class="chat-window" v-if="visible">
    <div class="chat-header" @click="toggleVisibility">
      <span>Chat</span>
    </div>
    <div class="chat-messages" style="flex: 1; overflow-y: auto;">
      <MessageBubble v-for="(message, index) in messages" :key="index" :message="message" />
    </div>
    <MessageInput @send-message="sendMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MessageBubble from './MessageBubble.vue';
import MessageInput from './MessageInput.vue';

const props = defineProps({
  visible: Boolean
});

const emit = defineEmits(['toggle-visibility', 'send-message']);

const messages = ref([]);

const toggleVisibility = () => {
  emit('toggle-visibility');
};

const randomMessages = [
  "Hello! How can I assist you today?",
  "Is there anything specific you need help with?",
  "I'm here to help! What's on your mind?",
  "Feel free to ask me anything!",
  "How's your day going so far?"
];

const getRandomMessage = () => {
  return randomMessages[Math.floor(Math.random() * randomMessages.length)];
};

const sendMessage = (message) => {
  messages.value.push({ text: message, sender: 'user' });
  emit('send-message', message);

  // Simulate chatbot response with a random message
  setTimeout(() => {
    const botMessage = getRandomMessage();
    messages.value.push({ text: botMessage, sender: 'chatbot' });
  }, 1000);
};
</script>

<style scoped>
.chat-window {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  height: 450px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  transition: opacity 0.3s, transform 0.3s;
}

.chat-header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header span {
  font-weight: bold;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}
</style>
