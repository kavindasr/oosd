const {read} = require("../services/fs");
const path = require("path");
const {SendHTML,Send500} = require("../responses/response");



async function render(pathname){
    var filePath;
    if(path.extname(path.posix.basename(pathname)) != ''){ // if shows a error change posix to wni32 
        filePath = "./views"+pathname;
    }
    else{
        filePath = "./views"+pathname+".html";
    }
    try{
        var data = await read(filePath);
        return new SendHTML(data);  
    }
    catch(err){ 
        try{
            var page404 = await read("./views/pageNotFound.html");
            return new SendHTML(page404);
        }
        catch(e){
            return new Send500();
        }
    }
 
}


module.exports = {render};