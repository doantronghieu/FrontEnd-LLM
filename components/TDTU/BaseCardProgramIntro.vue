<template>                                                                                                                      
  <UCard class="base-card-program-intro" @click="handleClick">                                                                  
    <div class="flex flex-col space-y-2">                                                                                       
      <h2 class="text-xl font-bold">{{ studyField }}</h2>                                                                       
      <p><strong>Faculty:</strong> {{ faculty }}</p>                                                                            
      <p><strong>Program Type:</strong> {{ programType }}</p>                                                                   
      <p><strong>Education Level:</strong> {{ educationLevel }}</p>                                                             
    </div>                                                                                                                      
  </UCard>                                                                                                                      
</template>                                                                                                                     
                                                                                                                                
<script setup>                                                                                                                  
defineProps({                                                                                                                   
  faculty: { type: String, required: true },                                                                                    
  studyField: { type: String, required: true },                                                                                 
  link: { type: String, required: true },                                                                                       
  programType: { type: String, required: true },                                                                                
  educationLevel: { type: String, required: true },                                                                             
});                                                                                                                             
                                                                                                                                
const emit = defineEmits(['click']);                                                                                            
                                                                                                                                
const handleClick = () => {                                                                                                     
  emit('click');                                                                                                                
};                                                                                                                              
</script>                                                                                                                       
                                                                                                                                
<style scoped>                                                                                                                  
.base-card-program-intro {                                                                                                      
  max-width: 400px;                                                                                                             
  margin: 1rem;                                                                                                                 
  cursor: pointer;                                                                                                              
  transition: transform 0.2s;                                                                                                   
}                                                                                                                               
                                                                                                                                
.base-card-program-intro:hover {                                                                                                
  transform: scale(1.05);                                                                                                       
}                                                                                                                               
</style>          