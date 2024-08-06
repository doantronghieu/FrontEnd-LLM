import { ref } from 'vue';                                                                                                      
 import axios from 'axios';                                                                                                      
  
 export function useTdtu() {                                                                                                     
   const fetchPersonnelData = async () => {                                                                                      
     try {                                                                                                                       
       const response = await axios.get('~/data/tdtu/feee/personnel.json');          
       console.log(response.data)                                             
       return response.data; // Ensure this is an array                                                                          
     } catch (error) {                                                                                                           
       console.error('Error fetching personnel data:', error);                                                                   
       return [];                                                                                                                
     }                                                                                                                           
   };                                                                                                                            
  
   const fetchProgramData = async () => {                                                                                        
     try {                                                                                                                       
       const response = await axios.get('~/data/tdtu/feee/programs.json');            
       console.log(response.data)                                             

       return response.data; // Ensure this is an array                                                                          
     } catch (error) {                                                                                                           
       console.error('Error fetching program data:', error);                                                                     
       return [];                                                                                                                
     }                                                                                                                           
   };                                                                                                                            
  
   return {                                                                                                                      
     fetchPersonnelData,                                                                                                         
     fetchProgramData,                                                                                                           
   };                                                                                                                            
 }                