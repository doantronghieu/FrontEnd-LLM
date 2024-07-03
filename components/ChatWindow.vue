<template>
  <transition name="fade">
    <div class="chat-window" v-if="visible">
    <div class="chat-header" @click="toggleVisibility">
      <span>Chat</span>
    </div>
    <div class="chat-messages" ref="chatMessages" style="flex: 1; overflow-y: auto;">
      <MessageBubble v-for="(message, index) in messages" :key="index" :message="message" />
    </div>
    <MessageInput @send-message="sendMessage" />
    <button @click="deleteAllMessages" class="delete-all-button">
      <img src="../assets/delete-icon.png" alt="Delete All Messages" class="delete-icon" />
    </button>
    <button @click="deleteAllMessages" class="delete-all-button">Delete All Messages</button>
  </div>
</transition>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useMessagesStore } from '../store/messages';
import MessageBubble from './MessageBubble.vue';
import MessageInput from './MessageInput.vue';

const props = defineProps({
  visible: Boolean
});

const emit = defineEmits(['toggle-visibility', 'send-message']);

const messagesStore = useMessagesStore();
const messages = ref(messagesStore.messages);
const chatMessages = ref(null);

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

const scrollToBottom = () => {
  if (chatMessages.value) {
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
  }
};

const sendMessage = (message) => {                                                           
   messagesStore.addMessage('user', message);                                                 
   emit('send-message', message);                                                             
   scrollToBottom();                                                                          
                                                                                              
   // Simulate chatbot response with a random message                                         
   setTimeout(() => {                                                                         
     const botMessage = getRandomMessage();                                                   
     messagesStore.addMessage('chatbot', botMessage);                                         
     scrollToBottom();                                                                        
   }, 1000);                                                                                  
 };          

const deleteAllMessages = () => {
  messagesStore.$reset();
  scrollToBottom();
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

.chat-messages {
  display: flex;
  flex-direction: column;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}

.delete-all-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.delete-icon {
  width: 20px;
  height: 20px;
  filter: invert(15%) sepia(99%) saturate(7000%) hue-rotate(359deg) brightness(100%) contrast(116%);
}

.delete-all-button:hover .delete-icon {
  filter: invert(12%) sepia(99%) saturate(7000%) hue-rotate(359deg) brightness(100%) contrast(116%);
}
</style>
