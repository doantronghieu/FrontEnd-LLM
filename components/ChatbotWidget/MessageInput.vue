<template>
  <div class="message-input">
    <input type="text" v-model="message" @keyup.enter="sendMessage" placeholder="Type a message..." />
    
    <button class="btn-send-msg" @click="sendMessage"><Icon name="material-symbols:send-outline-rounded" size="2em" color="blue"/></button>
    
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
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-top: 1px solid #ccc;
  background-color: #f9f9f9;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 10px;
  outline: none;
}

.message-input button {
  padding: 4px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.message-input button:hover {
  background-color: #e0e0e0;
}


</style>
