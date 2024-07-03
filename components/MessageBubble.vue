<template>
  <div class="message-bubble" :class="{ 'user-message': message.sender === 'user', 'chatbot-message': message.sender === 'chatbot' }">
    <div class="message-content">{{ message.text }}</div>
    <div class="timestamp">{{ message.timestamp }}</div>
  </div>
</template>

<script setup>
defineProps({
  message: Object
});
</script>

<style scoped>
.message-bubble {
  margin: 10px;
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 70%;
  word-wrap: break-word;
  line-height: 1.4;
}

.user-message {
  background-color: #dcf8c6;
  align-self: flex-end;
  border-bottom-right-radius: 0;
  margin-left: auto; /* Align to the right */
}

.chatbot-message {
  background-color: #e5e5ea;
  align-self: flex-start;
  border-bottom-left-radius: 0;
  margin-right: auto; /* Align to the left */
}
</style>
