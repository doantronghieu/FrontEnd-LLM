import { defineStore } from 'pinia';                                                                                            
 import personnelData from '~/data/tdtu/feee/personnel.json';                                                                    
                                                                                                                                 
 export const usePersonnelStore = defineStore('personnel', {                                                                     
   state: () => ({                                                                                                               
     personnelList: [],                                                                                                          
   }),                                                                                                                           
   actions: {                                                                                                                    
     fetchPersonnelData() {                                                                                                      
       if (Array.isArray(personnelData)) {                                                                                       
         this.personnelList = personnelData.map(personnel => ({                                                                  
           faculty: personnel.Faculty,                                                                                           
           name: personnel.Name,                                                                                                 
           position: personnel.Position,                                                                                         
           major: personnel.Major,                                                                                               
           email: personnel.Email,                                                                                               
           office: personnel.Office,                                                                                             
           department: personnel.Department,                                                                                     
         }));                                                                                                                    
       } else {                                                                                                                  
         console.error('Invalid data format for personnel data:', personnelData);                                                
         this.personnelList = [];                                                                                                
       }                                                                                                                         
     },                                                                                                                          
   },                                                                                                                            
 });   