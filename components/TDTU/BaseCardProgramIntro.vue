<template>
  <UCard class="base-card-program-intro" @click="handleClick" tabindex="0" @keydown.enter="handleClick">
    <div class="flex flex-col space-y-3">
      <h2 class="text-xl font-bold text-primary">{{ studyField }}</h2>
      <p><UBadge color="primary" variant="solid">Faculty</UBadge> {{ faculty }}</p>
      <p><UBadge color="primary" variant="solid">Program Type</UBadge> {{ programType }}</p>
      <p><UBadge color="primary" variant="solid">Education Level</UBadge> {{ educationLevel }}</p>
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

.base-card-program-intro:hover,
.base-card-program-intro:focus {
  @apply transform scale-105 shadow-lg;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(var(--color-primary-rgb), 0.1) 100%);
}

.base-card-program-intro:hover h2,
.base-card-program-intro:focus h2 {
  color: var(--color-secondary);
}

.text-primary {
  color: var(--color-primary);
}

.text-secondary {
  color: var(--color-secondary);
}

.base-card-program-intro:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.5);
}

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
  animation: introCardEntrance 0.3s ease-out;
}

@media (max-width: 640px) {
  .base-card-program-intro {
    font-size: 14px;
  }
}

.base-card-program-intro:hover .u-badge,
.base-card-program-intro:focus .u-badge {
  background-color: var(--color-secondary);
}

@media (prefers-reduced-motion: reduce) {
  .base-card-program-intro {
    animation: none;
  }
  
  .base-card-program-intro:hover,
  .base-card-program-intro:focus {
    transform: none;
  }
}
</style>