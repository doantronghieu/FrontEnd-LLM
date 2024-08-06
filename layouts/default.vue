<template>                                                                                                                      
  <div class="default-layout">                                                                                                  
    <UVerticalNavigation :links="links" />                                                                                            
    <main class="content">                                                                                                      
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
    icon: 'i-heroicons-home',
    to: '/tdtu/feee/personnel'
  },
  {
    label: 'Programms',
    icon: 'i-heroicons-home',
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
                                                                                                                                
.content {                                                                                                                      
  flex: 1;                                                                                                                      
  padding: 20px;                                                                                                                
}                                                                                                                               
</style>                     