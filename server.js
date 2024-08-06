const express = require('express');                                                                                             
const fs = require('fs');                                                                                                       
const path = require('path');                                                                                                   
 
const app = express();                                                                                                          
const port = 3000;                                                                                                              
 
app.get('/api/personnel', (req, res) => {                                                                                       
  const filePath = path.join(__dirname, 'data', 'tdtu', 'feee', 'personnel.json');                                              
  fs.readFile(filePath, 'utf8', (err, data) => {                                                                                
    if (err) {                                                                                                                  
      res.status(500).send('Error reading file');                                                                               
    } else {                                                                                                                    
      res.json(JSON.parse(data));                                                                                               
    }                                                                                                                           
  });                                                                                                                           
});                                                                                                                             
 
app.get('/api/programs', (req, res) => {                                                                                        
  const filePath = path.join(__dirname, 'data', 'tdtu', 'feee', 'programs.json');                                               
  fs.readFile(filePath, 'utf8', (err, data) => {                                                                                
    if (err) {                                                                                                                  
      res.status(500).send('Error reading file');                                                                               
    } else {                                                                                                                    
      res.json(JSON.parse(data));                                                                                               
    }                                                                                                                           
  });                                                                                                                           
});                                                                                                                             
 
app.listen(port, () => {                                                                                                        
  console.log(`Server is running on port ${port}`);                                                                             
}); 