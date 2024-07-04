<template>
<transition name="fade">
  <div class="chat-window" v-if="visible">

    <div class="chat-header">
      <span>Chat</span>
      
      <div class="chat-providers">
        <UTooltip text="Change to ChatGPT">

          <img
          :src="providersStore.currentProvider === 'chatgpt' ? '/chat-providers/chatgpt-icon.png' : '/chat-providers/chatgpt-off-icon.png'"
          alt="ChatGPT Icon"
          class="chat-provider-icon"
          @click="toggleModeChatGpt"
          >
        </UTooltip>

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
import { useProvidersStore } from '~/store/providers';
import { useChatRandom } from '~/composables/useChatRandom';
import { useChatGpt } from '~/composables/useChatGpt';
import MessageBubble from './MessageBubble.vue';
import MessageInput from './MessageInput.vue';

const { getRandomMessage } = useChatRandom();
const { openaiStreamChatCompletion } = useChatGpt()

const providersStore = useProvidersStore();
const messagesStore = useMessagesStore();

const props = defineProps({
  visible: Boolean
});

const emit = defineEmits(['toggle-visibility', 'send-message']);

const messages = ref(messagesStore.messages);
const chatMessages = ref(null);

const toggleModeChatGpt = () => {
  providersStore.setProvider(providersStore.currentProvider === 'random' ? 'chatgpt' : 'random');
  messagesStore.addMessage('user', providersStore.currentProvider === 'chatgpt' ? "Turning on using ChatGPT" : "Turning off using ChatGPT");
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

  if (providersStore.currentProvider === 'chatgpt') {
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
  width: 360px;
  height: 460px;
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

.chat-providers {
  display: flex;
  justify-content: end;
  align-items: center;
}

.chat-provider-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-left: 10px;
  transition: transform 0.2s ease-in-out;
}
.chat-provider-icon:hover {
  transform: scale(1.2);
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
