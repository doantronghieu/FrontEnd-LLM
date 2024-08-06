<template>
  <UCard class="base-card-personnel hover:shadow-lg transition-all duration-300">
    <div class="flex flex-col space-y-3">
      <h2 class="text-xl font-bold text-primary">{{ name }}</h2>
      <p><strong class="text-secondary">Position:</strong> {{ position }}</p>
      <p><strong class="text-secondary">Major:</strong> {{ major }}</p>
      <p><strong class="text-secondary">Faculty:</strong> {{ faculty }}</p>
      <p><strong class="text-secondary">Department:</strong> {{ department }}</p>
      <p><strong class="text-secondary">Email:</strong> <a :href="`mailto:${email}`" class="text-primary hover:underline">{{ email }}</a></p>
      <p><strong class="text-secondary">Office:</strong> {{ office }}</p>
    </div>
  </UCard>
</template>

<script setup>
defineProps({
  faculty: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  major: { type: String, required: true },
  email: { type: String, required: true },
  office: { type: String, required: true },
  department: { type: String, required: true },
});
</script>

<style scoped>
.base-card-personnel {
  max-width: 400px;
  margin: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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

.text-secondary {
  color: var(--color-secondary);
}

/* Add a subtle hover effect to the email link */
a.text-primary {
  transition: color 0.3s ease;
}

a.text-primary:hover {
  color: var(--color-secondary);
}
</style>