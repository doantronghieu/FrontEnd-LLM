<template>
  <UTooltip :text="tooltipText">
    <img
      :src="isActive ? activeIcon : inactiveIcon"
      :alt="iconAlt"
      class="chat-provider-icon"
      @click="toggleMode"
      :class="{ 'active': isActive }"
    />
  </UTooltip>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  },
  tooltipText: {
    type: String,
    required: true
  },
  activeIcon: {
    type: String,
    required: true
  },
  inactiveIcon: {
    type: String,
    required: true
  },
  iconAlt: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['toggleMode'])

const toggleMode = () => {
  emit('toggleMode')
}
</script>

<style scoped>
.chat-provider-icon {
  cursor: pointer;
  width: 28px;
  height: 28px;
  margin-left: 12px;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 0.7;
  border-radius: 50%;
}
.chat-provider-icon:hover {
  transform: scale(1.2);
  filter: brightness(1.2);
  opacity: 1;
}
.chat-provider-icon.active {
  opacity: 1;
  transform: scale(1.1);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}
</style>