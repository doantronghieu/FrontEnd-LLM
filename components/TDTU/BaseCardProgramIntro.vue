<template>
  <UCard class="base-card-program-intro" @click="handleClick">
    <div class="flex flex-col space-y-3">
      <h2 class="text-xl font-bold text-primary">{{ studyField }}</h2>
      <p><strong class="text-secondary">Faculty:</strong> {{ faculty }}</p>
      <p><strong class="text-secondary">Program Type:</strong> {{ programType }}</p>
      <p><strong class="text-secondary">Education Level:</strong> {{ educationLevel }}</p>
    </div>
  </UCard>
</template>

<script setup>
defineProps({
  faculty: { type: String, required: true },
  studyField: { type: String, required: true },
  link: { type: String, required: true },
  programType: { type: String, required: true },
  educationLevel: { type: String, required: true },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
.base-card-program-intro {
  @apply cursor-pointer transition-all duration-300 ease-in-out bg-white bg-opacity-90;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.base-card-program-intro:hover {
  @apply transform scale-105 shadow-lg;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.text-primary {
  color: var(--color-primary);
}

.text-secondary {
  color: var(--color-secondary);
}

.base-card-program-intro:hover {
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(var(--color-primary-rgb), 0.1) 100%);
}

.base-card-program-intro:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.5);
}

/* Add a subtle animation on card entrance */
@keyframes introCardEntrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.base-card-program-intro {
  animation: introCardEntrance 0.5s ease-out;
}

/* Improve readability on smaller screens */
@media (max-width: 640px) {
  .base-card-program-intro {
    font-size: 14px;
  }
}
</style>