<template>
  <div class="default-layout">
    <nav class="top-nav">
      <div class="nav-content">
        <img 
          src="/logo.png" 
          alt="Logo" 
          class="logo" 
          @click="toggleSidebar" 
          :class="{ 'logo-active': isOpen }"
          :aria-label="isOpen ? 'Close sidebar' : 'Open sidebar'"
        />
        <div class="nav-links">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link">
            {{ link.label }}
          </NuxtLink>
        </div>
        <button @click="toggleSidebar" class="sidebar-toggle" :aria-label="isOpen ? 'Close sidebar' : 'Open sidebar'">
          <UIcon :name="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" />
        </button>
      </div>
    </nav>
    <UVerticalNavigation 
      :links="links" 
      class="sidebar" 
      :class="{ 'sidebar-open': isOpen, 'sidebar-closed': !isOpen }"
      v-show="isOpen"
    >
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
  flex-direction: column;
  min-height: 100vh;
}

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  height: 40px;
  width: auto;
  cursor: pointer;
  transition: transform var(--transition-speed) ease;
}

.logo:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: var(--color-text-light);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-speed) ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-secondary);
}

.sidebar-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 24px;
  cursor: pointer;
}

.sidebar {
  width: 13vw;
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: all var(--transition-speed) ease;
  z-index: 20;
  left: 0;
}

.content {
  flex: 1;
  padding: 80px 20px 20px;
  margin-left: 0;
  transition: margin-left var(--transition-speed) ease;
}

.content-shifted {
  margin-left: 250px;
}

.sidebar-toggle-arrow {
  position: absolute;
  bottom: 20px;
  right: -20px;
  background-color: var(--color-primary);
  color: var(--color-text-light);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
}

.sidebar-toggle-arrow:hover {
  background-color: var(--color-secondary);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .sidebar-toggle {
    display: block;
  }

  .sidebar {
    width: 250px;
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
    margin-left: 0;
  }
}

:deep(.u-vertical-navigation-item) {
  transition: all var(--transition-speed) ease;
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
  transition: width var(--transition-speed) ease;
}

:deep(.u-vertical-navigation-item:hover::after) {
  width: 100%;
}
</style>