<template>
  <div class="default-layout">
   
    <UVerticalNavigation :links="links" class="sidebar" />
    <main class="content">
      <Breadcrumbs />
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Personnel',
    icon: 'heroicons:user-group-16-solid',
    to: '/tdtu/feee/personnel'
  },
  {
    label: 'Programs',
    icon: 'heroicons:academic-cap-16-solid',
    to: '/tdtu/feee/programs'
  }
]
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sidebar {
  width: 140px;
  overflow-y: auto;
}

.content {
  flex: 1;
  padding: 20px;
}

@media (min-width: 768px) {
  .default-layout {
    flex-direction: row;
  }
}
</style>