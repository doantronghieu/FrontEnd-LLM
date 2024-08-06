<template>
  <div class="message-bubble" :class="{ 'user-message': message.sender === 'user', 'chatbot-message': message.sender === 'chatbot' }">
    <div class="message-content" v-html="renderMarkdown(message.content)"></div>
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
.message-bubble {
  padding: 12px;
  border-radius: 18px;
  margin: 8px 0;
  max-width: 80%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.user-message {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
  margin-left: auto;
  border-bottom-right-radius: 4px;
}

.chatbot-message {
  background-color: #f0f0f0;
  color: #333;
  align-self: flex-start;
  margin-right: auto;
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
}

.message-content :deep(code) {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
}

.message-content :deep(pre) {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 8px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>