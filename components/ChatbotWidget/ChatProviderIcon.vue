<template>
  <UTooltip :text="tooltipText">
    <img
      :src="isActive ? activeIcon : inactiveIcon"
      :alt="iconAlt"
      class="chat-provider-icon"
      @click="toggleMode"
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
  width: 20px;
  height: 20px;
  margin-left: 10px;
  transition: transform 0.2s ease-in-out;
}
.chat-provider-icon:hover {
  transform: scale(1.2);
}
</style>
