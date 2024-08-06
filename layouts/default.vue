<template>
  <div class="default-layout">
    <UVerticalNavigation :links="links" class="sidebar" />
    <main class="content">
      <Breadcrumbs class="mb-4" />
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
  min-height: 100vh;
}

.sidebar {
  width: 200px;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  z-index: 10;
}

.content {
  flex: 1;
  padding: 20px;
  margin-left: 200px;
  transition: margin-left 0.3s ease;
}

@media (max-width: 768px) {
  .sidebar {
    width: 60px;
  }

  .content {
    margin-left: 60px;
  }
}
</style>