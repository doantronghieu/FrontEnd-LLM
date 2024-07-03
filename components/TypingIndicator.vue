<template>
  <div class="typing-indicator" v-if="visible">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean
});
</script>

<style scoped>
.typing-indicator {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.typing-indicator span {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: #9e9e9e;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
