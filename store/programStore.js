import { defineStore } from 'pinia';                                                                                            
 import programData from '~/data/tdtu/feee/programs.json';                                                                       
                                                                                                                                 
 export const useProgramStore = defineStore('program', {                                                                         
   state: () => ({                                                                                                               
     programList: [],                                                                                                            
     selectedProgram: null,                                                                                                      
   }),                                                                                                                           
   actions: {                                                                                                                    
     fetchProgramData() {                                                                                                        
       if (Array.isArray(programData)) {                                                                                         
         this.programList = programData.map(program => ({                                                                        
           faculty: program.Faculty,                                                                                             
           studyField: program.StudyField,                                                                                       
           link: program.Link,                                                                                                   
           programType: program.ProgramType,                                                                                     
           educationLevel: program.EducationLevel,                                                                               
           introduction: program.Introduction,                                                                                   
           careerProspects: program.CareerProspects,                                                                             
           outcome: program.Outcome,                                                                                             
           syllabub: program.Syllabub,                                                                                           
           admissionCandidates: program.AdmissionCandidates,                                                                     
           registration: program.Registration,                                                                                   
           tuition: program.Tuition,                                                                                             
           contact: program.Contact,                                                                                             
         }));                                                                                                                    
       } else {                                                                                                                  
         console.error('Invalid data format for program data:', programData);                                                    
         this.programList = [];                                                                                                  
       }                                                                                                                         
     },                                                                                                                          
     setSelectedProgram(program) {                                                                                               
       this.selectedProgram = program;                                                                                           
     },                                                                                                                          
   },                                                                                                                            
 });                                 