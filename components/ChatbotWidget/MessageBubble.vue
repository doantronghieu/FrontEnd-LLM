<template>
  <div class="message-container" :class="{ 'user-message': message.sender === 'user' }">
    <div class="message-bubble" :class="{ 'user-message': message.sender === 'user', 'chatbot-message': message.sender === 'chatbot' }">
      <div class="message-content" v-html="renderMarkdown(message.content)"></div>
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked';

marked.use({ breaks: true, gfm: true })

defineProps({
  message: {
    type: Object,
    required: true,
    default: () => ({ sender: '', content: '' })
  }
});

const renderMarkdown = (content) => {
  return marked.parse(content);
};
</script>

<style scoped>
.message-container {
  display: flex;
  width: 100%;
  margin: 8px 0;
}

.message-container.user-message {
  justify-content: flex-end;
}

.message-bubble {
  padding: 12px;
  border-radius: 18px;
  max-width: 80%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.user-message .message-bubble {
  background-color: #007bff;
  color: white;
  border-bottom-right-radius: 4px;
}

.chatbot-message {
  background-color: #f0f0f0;
  color: #333;
  border-bottom-left-radius: 4px;
}

.message-content {
  word-wrap: break-word;
  line-height: 1.4;
}

.message-content :deep(p) {
  margin: 0 0 8px 0;
}

.message-content :deep(p:last-child) {
  margin-bottom: 0;
}

.message-content :deep(a) {
  color: inherit;
  text-decoration: underline;
  transition: opacity 0.3s ease;
}

.message-content :deep(a:hover) {
  opacity: 0.8;
}

.message-content :deep(code) {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
}

.message-content :deep(pre) {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 8px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 8px 0;
}

.message-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.message-bubble:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .message-bubble {
    max-width: 90%;
  }
}
</style>