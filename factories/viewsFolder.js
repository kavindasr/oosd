const {read} = require("../fs/fs");
const path = require("path");
const {SendHTML} = require("../responses/response");



async function render(req,res){
    var sendHTML = new SendHTML();
    var filePath;
    if(path.extname(path.posix.basename(req.url)) != ''){ // if shows a error change posix to wni32 
        filePath = "./views"+req.url;
    }
    else{
        filePath = "./views"+req.url+".html";
    }
    try{
        var data = await read(filePath);
        sendHTML.send(res,data);
    }
    catch(err){
        try{
            var page404 = await read("./views/pageNotFound.html");
            sendHTML.send(res,page404);
        }
        catch(e){
            res.writeHead(400);
            res.write("400 Bad request");
            res.end();
        }
    }
 
}


module.exports = {render};