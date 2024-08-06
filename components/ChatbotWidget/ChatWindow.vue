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
          v-for="provider in ['chatgpt', 'custom']"
          :key="provider"
          :isActive="providersStore.currentProvider === provider"
          :tooltipText="`Change to ${provider === 'chatgpt' ? 'ChatGPT' : 'Chat Custom'}`"
          :activeIcon="`/chat-providers/chat-${provider}-icon.png`"
          :inactiveIcon="`/chat-providers/chat-${provider}-off-icon.png`"
          :iconAlt="`${provider === 'chatgpt' ? 'ChatGPT' : 'ChatCustom'} Icon`"
          @toggleMode="() => toggleChatProvider(provider)"
        />
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
// ... (keep the existing script code)
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

.scroll-buttons button {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  padding: 5px;
  background: none;
  border: none;
}

.scroll-buttons button:hover {
  transform: scale(1.2);
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