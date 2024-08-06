<template>
  <transition name="fade">
    <div class="chat-window" v-if="visible" :class="{ fullscreen: isFullscreen }">
      <div class="chat-header">
        <div class="scroll-buttons">
          <UTooltip text="Maximize/Minimize">
            <button @click="toggleFullscreen">
              <Icon :name="isFullscreen ? 'material-symbols:fullscreen-exit' : 'material-symbols:fullscreen'" size="1.2em" color="white"/>
            </button>
          </UTooltip>
          
          <UTooltip text="Scroll up">
            <button @click="scrollToTop">
              <Icon name="material-symbols:arrow-upward" size="1.2em" color="white"/>
            </button>
          </UTooltip>
          <UTooltip text="Scroll down">
            <button @click="scrollToBottom">
              <Icon name="material-symbols:arrow-downward" size="1.2em" color="white"/>
            </button>
          </UTooltip>
        </div>
  
        <span>Chat</span>
  
        <div class="chat-providers">
          <ChatProviderIcon
            :isActive="providersStore.currentProvider === 'chatgpt'"
            tooltipText="Change to ChatGPT"
            activeIcon="/chat-providers/chat-gpt-icon.png"
            inactiveIcon="/chat-providers/chat-gpt-off-icon.png"
            iconAlt="ChatGPT Icon"
            @toggleMode="() => toggleChatProvider('chatgpt')"
          />
          
          <ChatProviderIcon
            :isActive="providersStore.currentProvider === 'custom'"
            tooltipText="Change to Chat Custom"
            activeIcon="/chat-providers/chat-custom-icon.png"
            inactiveIcon="/chat-providers/chat-custom-off-icon.png"
            iconAlt="ChatCustom Icon"
            @toggleMode="() => toggleChatProvider('custom')"
          />
          
          <UTooltip text="Close">
            <button @click="closeChat" class="close-button">
              <Icon name="material-symbols:close" size="1.2em" color="white"/>
            </button>
          </UTooltip>
        </div>
      </div>
  
      <div class="chat-messages" ref="chatMessages">
        <MessageBubble v-for="(message, index) in messages" :key="index" :message="message" />
        <UProgress v-if="showProgress" animation="elastic" size="md" :color="config.public.NUXT_MAIN_COLOR"/>
      </div>
  
      <div class="message-input-container">
        <MessageInput @send-message="sendMessage"></MessageInput>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import { useMessagesStore } from '~/store/messages';
import { useProvidersStore } from '~/store/providers';
import { useChatRandom } from '~/composables/useChatRandom';
import { useChatGpt } from '~/composables/useChatGpt';
import { useChatCustom } from '~/composables/useChatCustom';
import MessageBubble from './MessageBubble.vue';
import MessageInput from './MessageInput.vue';
import ChatProviderIcon from './ChatProviderIcon.vue'

const config = useRuntimeConfig();

const providersStore = useProvidersStore();
const messagesStore = useMessagesStore();

const { getRandomMessage } = useChatRandom();
const { streamChatGpt } = useChatGpt()
const { streamChatCustom, getUserIp } = useChatCustom();

const toast = useToast()

const props = defineProps({
  visible: Boolean
});

const emit = defineEmits(['toggle-visibility', 'send-message', 'fullscreen-change']);

const messages = ref(messagesStore.messages);
const chatMessages = ref(null);

onMounted(async () => {
  await getUserIp();
});

const toggleChatProvider = (provider) => {
  let description = '';
  if (providersStore.currentProvider === provider) {
    description = `Turning off using ${provider} AI`
  } else if (provider === 'chatgpt') {
    description = "Turning on using ChatGPT"
  } else if (provider === 'custom') {
    description = "Turning on using Chat Custom"
  }
  
  let color = '';
  if (providersStore.currentProvider === provider) {
    color = 'red'
  } else {
    color = config.public.NUXT_MAIN_COLOR
  }
  
  providersStore.setProvider(provider);
  scrollToBottom();

  toast.add({
    id:"Chat_Provider_Notification",
    title:"Changing Chat Provider",
    description:description,
    color:color,
    timeout:1500,
  })
};

const scrollToTop = () => {
  if (chatMessages.value) {
    chatMessages.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

const scrollToBottom = () => {
  if (chatMessages.value) {
    chatMessages.value.scrollTo({
      top: chatMessages.value.scrollHeight,
      behavior: 'smooth'
    });
  }
};

const isFullscreen = ref(false);

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  emit('fullscreen-change', isFullscreen.value);
};

const showProgress = ref(false);

const sendMessage = async (message) => {
  messagesStore.addMessage('user', message);
  emit('send-message', message);
  scrollToBottom();
  showProgress.value = true;

  const updateMessage = (newChunk) => {
    if (showProgress.value) {
      showProgress.value = false;
    }
    messagesStore.addChunk('chatbot', newChunk);
    scrollToBottom();
  };
  
  if (providersStore.currentProvider === 'chatgpt') {
    scrollToBottom();
    await streamChatGpt(message, updateMessage);
  } 
  else if (providersStore.currentProvider === 'custom') {
    scrollToBottom();
    await streamChatCustom(
      message,
      updateMessage,
      undefined, // Use default SERVER_FASTAPI from config
      undefined, // Use default HISTORY_TYPE from config
      'user123',  // Replace with actual user ID if available
      'session456' // Replace with actual session ID if available
    );
  }
  else {
    // Simulate chatbot response with streaming message
    setTimeout(() => {
      const botMessage = getRandomMessage();
      streamFakeMessage('chatbot', botMessage);
    }, 1000);
  }
};

const streamFakeMessage = (sender, message) => {
  showProgress.value = false;

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
  bottom: 100px;
  right: 20px;
  width: 400px;
  height: 600px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  z-index: 9999;
}

.chat-window.fullscreen {
  width: 80vw;
  height: 80vh;
  bottom: 10vh;
  right: 10vw;
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
  justify-content: flex-end;
  align-items: center;
}

.chat-header span {
  font-weight: bold;
  font-size: 1.1em;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.scroll-buttons {
  display: flex;
  gap: 5px;
}

.scroll-buttons button, .close-button {
  cursor: pointer;
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  padding: 5px;
  background: none;
  border: none;
  border-radius: 50%;
}

.scroll-buttons button:hover, .close-button:hover {
  transform: scale(1.2);
  background-color: rgba(255, 255, 255, 0.2);
}

.close-button {
  margin-left: 12px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .chat-window {
    width: 90vw;
    height: 80vh;
    bottom: 10vh;
    right: 5vw;
  }

  .chat-window.fullscreen {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }
}
</style>