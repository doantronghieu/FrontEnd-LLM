<template>
  <div class="message-input">
    <input type="text" v-model="message" @keyup.enter="sendMessage" placeholder="Type a message..." />
    
    <button @click="sendMessage"><Icon name="material-symbols:send-outline-rounded" size="2em" color="blue"/></button>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['send-message']);

const message = ref('');

const sendMessage = () => {
  if (message.value.trim()) {
    emit('send-message', message.value);
    message.value = '';
  }
};
</script>

<style scoped>
.message-input {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
}

.message-input input {
  flex: 1;
  padding: 5px;
  border: none;
  border-right: 1px solid #ccc;
}

.message-input button {
  padding: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>
