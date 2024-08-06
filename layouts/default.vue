<template>                                                                                                                      
  <div class="default-layout">                                                                                                  
    <UVerticalNavigation :links="links" class="sidebar" />                                                                      
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
    icon: 'heroicons:user-group-16-solid',                                                                                                   
    to: '/tdtu/feee/personnel'                                                                                                  
  },                                                                                                                            
  {                                                                                                                             
    label: 'Programms',                                                                                                         
    icon: 'heroicons:academic-cap-16-solid',                                                                                                   
    to: '/tdtu/feee/programs'                                                                                                   
  }                                                                                                                             
]                                                                                                                               
</script>                                                                                                                       
                                                                                                                                
<style scoped>                                                                                                                  
.default-layout {                                                                                                               
  display: flex;                                                                                                                
  flex-direction: row;                                                                                                          
  min-height: 100vh;                                                                                                            
}                                                                                                                               
                                                                                                                                
.sidebar {                                                                                                                      
  width: 140px; /* Adjust the width as needed */                                                                                
  overflow-y: auto;                                                                                                             
}                                                                                                                               
                                                                                                                                
.content {                                                                                                                      
  flex: 1;                                                                                                                      
  padding: 20px;                                                                                                                
}                                                                                                                               
</style>      