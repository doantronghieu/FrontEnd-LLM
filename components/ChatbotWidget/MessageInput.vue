<template>
  <div class="message-input">
    <input 
      type="text" 
      v-model="message" 
      @keyup.enter="sendMessage" 
      placeholder="Type a message..." 
      :disabled="isLoading"
      ref="inputField"
      aria-label="Message input"
    />
    <button 
      class="btn-send-msg" 
      @click="sendMessage" 
      :disabled="isDisabled"
      aria-label="Send message"
    >
      <Icon 
        :name="isLoading ? 'eos-icons:loading' : 'material-symbols:send-outline-rounded'" 
        size="1.5em" 
        :color="isDisabled ? '#999' : 'var(--color-primary)'"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['send-message']);

const message = ref('');
const isLoading = ref(false);
const inputField = ref(null);

const sendMessage = () => {
  if (message.value.trim() && !isLoading.value) {
    isLoading.value = true;
    emit('send-message', message.value);
    message.value = '';
    isLoading.value = false;
    inputField.value?.focus();
  }
};

const isDisabled = computed(() => isLoading.value || !message.value.trim());
</script>

<style scoped>
.message-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-top: 1px solid #eee;
  background-color: #ffffff;
}

.message-input input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
  outline: none;
  background-color: #f8f8f8;
  font-size: 14px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.message-input input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.25);
}

.message-input input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.btn-send-msg {
  padding: 8px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-send-msg:hover:not(:disabled),
.btn-send-msg:focus:not(:disabled) {
  background-color: #e0e0e0;
  transform: scale(1.1);
}

.btn-send-msg:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .message-input {
    padding: 10px;
  }
  
  .message-input input {
    padding: 10px 14px;
    font-size: 16px;
  }
}
</style>