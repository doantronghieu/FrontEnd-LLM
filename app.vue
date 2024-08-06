<template>
  <div>
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