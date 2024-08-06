<template>
  <div class="min-h-screen bg-background text-text">
    <BackgroundComponent />
    <UNotifications />
    <NuxtLayout>
      <NuxtPage />
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
  --color-text: #ffffff;
}

body {
  font-family: 'Arial', sans-serif;
}



.text-text {
  color: var(--color-text);
}
</style>