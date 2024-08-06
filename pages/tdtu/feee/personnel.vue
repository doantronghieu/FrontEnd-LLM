<template>                                                                                                                      
  <div>                                                                                                                         
    <h1 class="text-3xl font-bold mb-4">Personnel</h1>                                                                          
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                                                          
      <BaseCardPersonnel                                                                                                        
        v-for="personnel in personnelList"                                                                                      
        :key="personnel.email"                                                                                                  
        :faculty="personnel.faculty"                                                                                            
        :name="personnel.name"                                                                                                  
        :position="personnel.position"                                                                                          
        :major="personnel.major"                                                                                                
        :email="personnel.email"                                                                                                
        :office="personnel.office"                                                                                              
        :department="personnel.department"                                                                                      
      />                                                                                                                        
    </div>                                                                                                                      
  </div>                                                                                                                        
</template>                                                                                                                     

<script setup>                                                                                                                  
import { usePersonnelStore } from '~/store/personnelStore';                                                                     
import { onMounted } from 'vue';                                                                                                
import BaseCardPersonnel from '~/components/TDTU/BaseCardPersonnel.vue'; // Ensure this path is correct                         
 
const personnelStore = usePersonnelStore();                                                                                     
const { personnelList } = personnelStore;                                                                                       
 
onMounted(() => {                                                                                                               
  personnelStore.fetchPersonnelData();                                                                                          
});                                                                                                                             
</script>  