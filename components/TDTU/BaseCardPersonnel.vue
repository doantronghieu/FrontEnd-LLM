<template>                                                                                                                      
  <UCard class="base-card-personnel">                                                                                           
    <div class="flex flex-col space-y-2">                                                                                       
      <h2 class="text-xl font-bold">{{ name }}</h2>                                                                             
      <p><strong>Position:</strong> {{ position }}</p>                                                                          
      <p><strong>Major:</strong> {{ major }}</p>                                                                                
      <p><strong>Faculty:</strong> {{ faculty }}</p>                                                                            
      <p><strong>Department:</strong> {{ department }}</p>                                                                      
      <p><strong>Email:</strong> <a :href="`mailto:${email}`">{{ email }}</a></p>                                               
      <p><strong>Office:</strong> {{ office }}</p>                                                                              
    </div>                                                                                                                      
  </UCard>                                                                                                                      
</template>                                                                                                                     
 
<script setup>                                                                                                                  
defineProps({                                                                                                                   
  faculty: { type: String, required: true },                                                                                    
  name: { type: String, required: true },                                                                                       
  position: { type: String, required: true },                                                                                   
  major: { type: String, required: true },                                                                                      
  email: { type: String, required: true },                                                                                      
  office: { type: String, required: true },                                                                                     
  department: { type: String, required: true },                                                                                 
});                                                                                                                             
</script>                                                                                                                       
 
<style scoped>                                                                                                                  
.base-card-personnel {                                                                                                          
  max-width: 400px;                                                                                                             
  margin: 1rem;                                                                                                                 
}                                                                                                                               
</style>                  