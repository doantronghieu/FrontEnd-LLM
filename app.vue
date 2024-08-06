<template>
  <div>

    <!-- <UContainer>
      <NuxtPage />
    </UContainer> -->

    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->

    

    <BackgroundComponent />
    <ChatbotSmall />
    <UNotifications />

    <NuxtLayout>                                                                                                                
      <NuxtPage />                                                                                                              
    </NuxtLayout>  
  </div>
</template>

<script setup>
import ChatbotSmall  from '~/components/ChatbotWidget/ChatbotSmall.vue';
import BackgroundComponent from '~/components/ui/BackgroundComponent.vue';

</script>
