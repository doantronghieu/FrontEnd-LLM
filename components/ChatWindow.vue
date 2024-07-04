<template>
<transition name="fade">
  <div class="chat-window" v-if="visible">

    <div class="chat-header">
      <span>Chat</span>

      <div class="chatgpt-icon" @click="toggleModeChatGpt">
        <img v-if="modeChatGpt.value" src="~/assets/chatgpt-icon.png" alt="ChatGPT Icon">
        <img v-else src="~/assets/chatgpt-icon.png" alt="ChatGPT Off Icon">
      </div>
    </div>

    <div class="chat-messages" ref="chatMessages" style="flex: 1; overflow-y: auto;">
      <MessageBubble v-for="(message, index) in messages" :key="index" :message="message" />
    </div>

    <MessageInput @send-message="sendMessage" />
  </div>
</transition>

</template>

<script setup>
import { ref } from 'vue';
import { useMessagesStore } from '~/store/messages';
import { useChatGpt } from '~/composables/useChatGpt';
import { useChatRandom } from '~/composables/useChatRandom';

const props = defineProps({
  visible: Boolean
});

const emit = defineEmits(['toggle-visibility', 'send-message']);

const { modeChatGpt, setModeChatGpt, openaiStreamChatCompletion } = useChatGpt();
const { getRandomMessage } = useChatRandom()

const messagesStore = useMessagesStore();
const messages = ref(messagesStore.messages);
const chatMessages = ref(null);

const toggleModeChatGpt = () => {
  setModeChatGpt(!modeChatGpt.value);
  if (modeChatGpt.value) {
    messagesStore.addMessage('user', "Turning on using ChatGPT"); 
  } else {
    messagesStore.addMessage('user', "Turning off using ChatGPT"); 
  }
};

const scrollToBottom = () => {
  if (chatMessages.value) {
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
  }
};

const sendMessage = async (message) => {
  messagesStore.addMessage('user', message);
  emit('send-message', message);
  scrollToBottom();

  if (modeChatGpt.value) {
    const updateMessage = (newChunk) => {
      messagesStore.addChunk('chatbot', newChunk);
      scrollToBottom();
    };
    await openaiStreamChatCompletion(message, updateMessage);
  } else {
    // Simulate chatbot response with streaming message
    setTimeout(() => {
      const botMessage = getRandomMessage();
      streamFakeMessage('chatbot', botMessage);
    }, 1000);
  }
};

const streamFakeMessage = (sender, message) => {
  const chunkSize = 5;
  let index = 0;
  const interval = setInterval(() => {
    if (index < message.length) {
      const chunk = message.slice(index, index + chunkSize);
      messagesStore.addChunk(sender, chunk);
      index += chunkSize;
      scrollToBottom();
    } else {
      clearInterval(interval);
    }
  }, 100);
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
  cursor: default;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatgpt-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-left: 10px;
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

</style>
