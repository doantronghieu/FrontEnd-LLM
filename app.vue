<template>
  <div class="min-h-screen bg-background text-text flex flex-col">
    <BackgroundComponent />
    <UNotifications />
    <NuxtLayout class="flex-grow">
      <Transition name="page" mode="out-in">
        <NuxtPage />
      </Transition>
    </NuxtLayout>
    <ChatbotSmall />
    <NuxtRouteAnnouncer />
  </div>
</template>

<script setup>
import ChatbotSmall from '~/components/ChatbotWidget/ChatbotSmall.vue';
import BackgroundComponent from '~/components/ui/BackgroundComponent.vue';
</script>

<style>
:root {
  --color-primary: #4a90e2;
  --color-secondary: #f39c12;
  --color-background: #f5f7fa;
  --color-text: #333333;
  --color-text-light: #ffffff;
  --color-sidebar-bg: rgba(255, 255, 255, 0.8);
  --color-sidebar-text: #000000;
  --font-sans: 'Roboto', 'Arial', sans-serif;
  --transition-speed: 0.3s;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

body {
  font-family: var(--font-sans);
  line-height: 1.6;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.text-text {
  color: var(--color-text);
}

.text-text-light {
  color: var(--color-text-light);
}

html {
  scroll-behavior: smooth;
}

:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

* {
  transition: color var(--transition-speed) ease, background-color var(--transition-speed) ease;
}

@media (max-width: 768px) {
  body {
    font-size: 16px;
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-background);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-secondary);
}

.page-enter-active,
.page-leave-active {
  transition: opacity var(--transition-speed), transform var(--transition-speed);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a1a1a;
    --color-text: #000000;
    --color-text-light: #cccccc;
    --color-sidebar-bg: rgba(40, 40, 40, 0.8);
    --color-sidebar-text: #ffffff;
  }
}

a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.page-enter-active,
.page-leave-active {
  transition: opacity var(--transition-speed) ease, transform var(--transition-speed) ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>