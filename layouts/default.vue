<template>
  <div class="default-layout">
    <nav class="top-nav">
      <div class="nav-content">
        <div class="nav-links">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link">
            <UIcon :name="link.icon" class="nav-link-icon" />
            <span class="nav-link-text">{{ link.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </nav>
    <div class="sidebar-container">
      <div class="logo-container">
        <img 
          src="/logo.png" 
          alt="Logo" 
          class="logo"
        />
      </div>
      <UVerticalNavigation 
        :links="links" 
        class="sidebar"
      />
    </div>
    <main class="content">
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
</script>

<style scoped>
.default-layout {
  display: flex;
  min-height: 100vh;
}

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-speed) ease;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 4px;
}

.nav-link-icon {
  font-size: 1.2em;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--color-primary);
}

.sidebar-container {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 40;
  display: flex;
  flex-direction: column;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.logo {
  height: 40px;
  width: auto;
}

.sidebar {
  flex-grow: 1;
  overflow-y: auto;
}

.content {
  flex: 1;
  padding: 80px 20px 20px;
  margin-left: 250px;
}

:deep(.u-vertical-navigation-item) {
  transition: all var(--transition-speed) ease;
}

:deep(.u-vertical-navigation-item:hover) {
  background-color: rgba(0, 0, 0, 0.05);
}

:deep(.u-vertical-navigation-item.router-link-active) {
  background-color: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary);
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

@media (max-width: 768px) {
  .sidebar-container {
    width: 60px;
  }

  .logo {
    height: 30px;
  }

  .content {
    margin-left: 60px;
  }

  .nav-link-text {
    display: none;
  }

  :deep(.u-vertical-navigation-item-label) {
    display: none;
  }

  :deep(.u-vertical-navigation-item) {
    justify-content: center;
  }
}
</style>