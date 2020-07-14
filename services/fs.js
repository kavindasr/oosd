const fs = require('fs');

function read(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        }); 
    });
    
}
    

module.exports ={read};