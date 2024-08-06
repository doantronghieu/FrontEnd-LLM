<template>                                                                                                                      
  <div>                                                                                                                         
    <h1 class="text-3xl font-bold mb-4">Programs</h1>                                                                           
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                                                          
      <BaseCardProgramIntro                                                                                                     
        v-for="program in programList"                                                                                          
        :key="program.link"                                                                                                     
        :faculty="program.faculty"                                                                                              
        :studyField="program.studyField"                                                                                        
        :link="program.link"                                                                                                    
        :programType="program.programType"                                                                                      
        :educationLevel="program.educationLevel"                                                                                
        @click="openModal(program)"                                                                                             
      />                                                                                                                        
    </div>                                                                                                                      
    <UModal v-model="isModalOpen">                                                                                              
       <BaseCardProgramDetail                                                                                                   
         v-if="selectedProgram"                                                                                                 
         :faculty="selectedProgram.faculty"                                                                                     
         :studyField="selectedProgram.studyField"                                                                               
         :link="selectedProgram.link"                                                                                           
         :programType="selectedProgram.programType"                                                                             
         :educationLevel="selectedProgram.educationLevel"                                                                       
         :introduction="selectedProgram.introduction"                                                                           
         :careerProspects="selectedProgram.careerProspects"                                                                     
         :outcome="selectedProgram.outcome"                                                                                     
         :syllabub="selectedProgram.syllabub"                                                                                   
         :admissionCandidates="selectedProgram.admissionCandidates"                                                             
         :registration="selectedProgram.registration"                                                                           
         :tuition="selectedProgram.tuition"                                                                                     
         :contact="selectedProgram.contact"                                                                                     
       />                                                                                                                       
     </UModal>                                                                                                                  
  </div>                                                                                                                        
</template>                                                                                                                     
                                                                                                                                
<script setup>                                                                                                                  
import { useProgramStore } from '~/store/programStore';                                                                         
import { ref, onMounted } from 'vue';                                                                                           
import BaseCardProgramIntro from '~/components/TDTU/BaseCardProgramIntro.vue';                                                  
import BaseCardProgramDetail from '~/components/TDTU/BaseCardProgramDetail.vue';                                                
                                                                                                                                
const programStore = useProgramStore();                                                                                         
const { programList, selectedProgram } = programStore;                                                                          
const isModalOpen = ref(false);                                                                                                 
                                                                                                                                
onMounted(() => {                                                                                                               
  programStore.fetchProgramData();                                                                                              
});                                                                                                                             
                                                                                                                                
const openModal = (program) => {                                                                                                
  programStore.setSelectedProgram(program);                                                                                     
  isModalOpen.value = true;                                                                                                     
};                                                                                                                              
                                                                                                                                
const closeModal = () => {                                                                                                      
  isModalOpen.value = false;                                                                                                    
};                                                                                                                              
</script>  