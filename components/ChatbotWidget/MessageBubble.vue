<template>
  <div class="message-bubble" :class="{ 'user-message': message.sender === 'user', 'chatbot-message': message.sender === 'chatbot' }">
    <div class="message-content" v-html="renderMarkdown(message.content)"></div>
  </div>
</template>

<script setup>
import { marked } from 'marked';

defineProps({
  message: {
    type: Object,
    required: true,
    default: () => ({ sender: '', content: '' })
  }
});

const renderMarkdown = (content) => {
  return marked(content);
};
</script>

<style scoped>
.message-bubble {                                                                            
  padding: 10px;                                                                             
  border-radius: 10px;                                                                       
  margin: 5px 10px; /* Adjusted margin for better responsiveness */
  background-color: #f1f1f1;                                                                 
}                                                                                            

.user-message {                                                                              
  background-color: #007bff;                                                                 
  color: white;                                                                              
  align-self: flex-end;                                                                      
  margin-left: 10%; /* Adjusted margin for better responsiveness */
}                                                                                            
                                                                                             
.chatbot-message {                                                                           
  background-color: #e9e9e9;                                                                 
  color: black;                                                                              
  align-self: flex-start;                                                                    
  margin-right: 10%; /* Adjusted margin for better responsiveness */
}     

.message-content {
  word-wrap: break-word;
}
</style>
