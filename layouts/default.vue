<template>
  <div class="default-layout">
    <button @click="toggleSidebar" class="sidebar-toggle" :aria-label="isOpen ? 'Close sidebar' : 'Open sidebar'">
      <UIcon :name="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-menu'" />
    </button>
    <UVerticalNavigation :links="links" class="sidebar" :class="{ 'sidebar-open': isOpen, 'sidebar-closed': !isOpen }">
      <template #bottom>
        <button @click="toggleSidebar" class="sidebar-toggle-arrow" :aria-label="isOpen ? 'Close sidebar' : 'Open sidebar'">
          <UIcon :name="isOpen ? 'i-heroicons-chevron-left' : 'i-heroicons-chevron-right'" />
        </button>
      </template>
    </UVerticalNavigation>
    <main class="content" :class="{ 'content-shifted': isOpen }">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Personnel',
    icon: 'i-heroicons-user-group',
    to: '/tdtu/feee/personnel'
  },
  {
    label: 'Programs',
    icon: 'i-heroicons-academic-cap',
    to: '/tdtu/feee/programs'
  }
];

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.default-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 12vw;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 20;
  left: 0;
}

.content {
  flex: 1;
  padding: 20px;
  margin-left: 12vw;
  transition: margin-left 0.3s ease;
}

.sidebar-toggle {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 30;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidebar-toggle:hover {
  background-color: var(--color-secondary);
}

.sidebar-toggle-arrow {
  position: absolute;
  bottom: 20px;
  right: -20px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar-toggle-arrow:hover {
  background-color: var(--color-secondary);
}

@media (max-width: 768px) {
  .sidebar {
    width: 200px;
    transform: translateX(-100%);
  }

  .sidebar-open {
    transform: translateX(0);
  }

  .sidebar-closed {
    transform: translateX(-100%);
  }

  .content {
    margin-left: 0;
  }

  .content-shifted {
    margin-left: 200px;
  }
}

:deep(.u-vertical-navigation-item) {
  transition: all 0.3s ease;
}

:deep(.u-vertical-navigation-item:hover) {
  background-color: rgba(var(--color-primary-rgb), 0.1);
}

:deep(.u-vertical-navigation-item.router-link-active) {
  background-color: var(--color-primary);
  color: var(--color-text-light);
}

.sidebar {
  animation: sidebarEntrance 0.5s ease-out;
}

@keyframes sidebarEntrance {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.sidebar:focus-within {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

:deep(.u-vertical-navigation-item) {
  position: relative;
  overflow: hidden;
}

:deep(.u-vertical-navigation-item::after) {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}

:deep(.u-vertical-navigation-item:hover::after) {
  width: 100%;
}
</style>