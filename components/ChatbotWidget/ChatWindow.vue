<template>
<transition name="fade">
  <div class="chat-window" v-if="visible" :class="{ fullscreen: isFullscreen }">

    <div class="chat-header">
      <div class="scroll-buttons">
        <UTooltip text="Maximize/Minimize">
          <button @click="toggleFullscreen">
            <Icon :name="isFullscreen ? 'material-symbols:fullscreen-exit' : 'material-symbols:fullscreen'" size="1em" color="white"/>
          </button>
        </UTooltip>
        
        <UTooltip text="Scroll up">
          <button @click="scrollToTop">
            <Icon name="material-symbols:arrow-upward" size="1em" color="white"/>
          </button>
        </UTooltip>
        <UTooltip text="Scroll down">
          <button @click="scrollToBottom">
            <Icon name="material-symbols:arrow-downward" size="1em" color="white"/>
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
      </div>
    </div>

    <div class="chat-messages" ref="chatMessages" style="flex: 1; overflow-y: auto;">
      <MessageBubble v-for="(message, index) in messages" :key="index" :message="message" />
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
import MessageBubble from './MessageBubble.vue';
import MessageInput from './MessageInput.vue';
import ChatProviderIcon from './ChatProviderIcon.vue'

const { getRandomMessage } = useChatRandom();
const { streamChatGpt } = useChatGpt()

const providersStore = useProvidersStore();
const messagesStore = useMessagesStore();

const toast = useToast()

const props = defineProps({
  visible: Boolean
});

const emit = defineEmits(['toggle-visibility', 'send-message', 'fullscreen-change']);

const messages = ref(messagesStore.messages);
const chatMessages = ref(null);

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
    color = 'green'
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
  if (isFullscreen.value) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  emit('fullscreen-change', isFullscreen.value);
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
    await streamChatGpt(message, updateMessage);
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
  transition: width 0.3s, height 0.3s, bottom 0.3s, right 0.3s, border-radius 0.3s, opacity 0.3s, transform 0.3s;
}

.chat-window.fullscreen {
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  border-radius: 25px;
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

.chat-header span {
  font-weight: bold;
}

.chat-messages {
  display: flex;
  flex-direction: column;
}

.scroll-buttons {
  display: flex;
  justify-content: space-between;
}

.scroll-buttons button {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  padding: 3px;
}

.scroll-buttons button:hover {
  transform: scale(1.5);
}

.fade-enter-active, .fade-leave-active {
  transition: width 0.3s, height 0.3s, bottom 0.3s, right 0.3s, border-radius 0.3s, opacity 0.3s, transform 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}

</style>
