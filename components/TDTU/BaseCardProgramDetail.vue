<template>                                                                                                                      
  <UCard class="base-card-program-detail">                                                                                      
    <div class="flex flex-col space-y-4 overflow-y-auto">                                                                       
      <h2 class="text-2xl font-bold">{{ studyField }}</h2>                                                                      
      <p><strong>Faculty:</strong> {{ faculty }}</p>                                                                            
      <p><strong>Program Type:</strong> {{ programType }}</p>                                                                   
      <p><strong>Education Level:</strong> {{ educationLevel }}</p>                                                             
      <div v-html="introduction"></div>                                                                                         
      <div v-html="careerProspects"></div>                                                                                      
      <div v-html="outcome"></div>                                                                                              
      <div v-html="syllabub"></div>                                                                                             
      <div v-html="admissionCandidates"></div>                                                                                  
      <div v-html="registration"></div>                                                                                         
      <div v-html="tuition"></div>                                                                                              
      <div v-html="contact"></div>                                                                                              
      <button class="focus:outline-none focus:ring focus:border-blue-300">Close</button> <!-- Focusable element -->             
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
  introduction: { type: String, required: true },                                                                               
  careerProspects: { type: String, required: true },                                                                            
  outcome: { type: String, required: true },                                                                                    
  syllabub: { type: String, required: true },                                                                                   
  admissionCandidates: { type: String, required: true },                                                                        
  registration: { type: String, required: true },                                                                               
  tuition: { type: String, required: true },                                                                                    
  contact: { type: String, required: true },                                                                                    
});                                                                                                                             
</script>                                                                                                                       
                                                                                                                                
<style scoped>                                                                                                                  
.base-card-program-detail {                                                                                                     
  max-width: 600px;                                                                                                             
  max-height: 80vh;                                                                                                             
  overflow-y: auto;                                                                                                             
  margin: 1rem;                                                                                                                 
}                                                                                                                               
</style>  