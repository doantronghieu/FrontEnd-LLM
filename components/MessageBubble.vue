<template>
  <div class="message-bubble" :class="{ 'user-message': message.sender === 'user', 'chatbot-message': message.sender === 'chatbot' }">
    <div class="message-content">{{ message.content }}</div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
    default: () => ({ sender: '', content: '' })
  }
});
</script>

<style scoped>
.message-bubble {                                                                            
  padding: 10px;                                                                             
  border-radius: 10px;                                                                       
  margin: 5px 15px; /* Added 15px margin to both sides */                                    
  background-color: #f1f1f1;                                                                 
}                                                                                            
                                                                                             
.user-message {                                                                              
  background-color: #007bff;                                                                 
  color: white;                                                                              
  align-self: flex-end;                                                                      
  margin-left: 15%; /* Added margin to the left side */                                      
}                                                                                            
                                                                                             
.chatbot-message {                                                                           
  background-color: #e9e9e9;                                                                 
  color: black;                                                                              
  align-self: flex-start;                                                                    
  margin-right: 15%; /* Added margin to the right side */                                    
}     

.message-content {
  word-wrap: break-word;
}
</style>
