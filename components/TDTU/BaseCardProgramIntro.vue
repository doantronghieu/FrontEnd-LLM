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
}

.base-card-program-intro:hover {
  @apply transform scale-105 shadow-lg;
}

.text-primary {
  color: var(--color-primary);
}

.text-secondary {
  color: var(--color-secondary);
}
</style>