<template>
  <UCard class="base-card-personnel hover:shadow-lg transition-all duration-300">
    <div class="flex flex-col space-y-4">
      <h2 class="text-2xl font-bold text-primary">{{ name }}</h2>
      
      <div v-for="(value, key) in cardInfo" :key="key" class="flex items-center space-x-2">
        <UBadge color="primary" class="w-24 text-center">{{ key }}</UBadge>
        <p class="flex-1">{{ value }}</p>
      </div>
      
      <a :href="`mailto:${email}`" class="text-primary hover:underline flex items-center space-x-2">
        <UIcon name="i-heroicons-envelope" />
        <span>{{ email }}</span>
      </a>
      
      <div class="flex items-center space-x-2">
        <UIcon name="i-heroicons-map-pin" class="text-primary" />
        <p>{{ office }}</p>
      </div>
    </div>
  </UCard>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  faculty: { type: String, required: true },
  name: { type: String, required: true }, 
  position: { type: String, required: true },
  major: { type: String, required: true },
  email: { type: String, required: true },
  office: { type: String, required: true },
  department: { type: String, required: true },
});

const cardInfo = computed(() => ({
  Position: props.position,
  Major: props.major,
  Faculty: props.faculty,
  Department: props.department,
}));
</script>

<style scoped>
.base-card-personnel {
  max-width: 400px;
  margin: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}

.base-card-personnel:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.text-primary {
  color: var(--color-primary);
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.base-card-personnel {
  animation: cardEntrance 0.5s ease-out;
}

@media (max-width: 640px) {
  .base-card-personnel {
    font-size: 14px;
  }
}
</style>