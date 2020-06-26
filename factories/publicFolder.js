const {read} = require("../fs/fs");
const path = require("path");
const {Send404,SendCSS,SendJS,SendIMG} = require("../responses/response");

async function send(req,res){
    const ext = path.extname(path.posix.basename(req.url));
    var response;
    if(ext == '.css'){
        response = new SendCSS();
    }
    else if(ext == '.js'){
        response = new SendJS();
    }
    else{
        if(ext == '.svg'){
            response = new SendIMG("svg+xml");
        }
        else if(ext == '.jpg'){
            response = new SendIMG("jpeg");
        }
        else{
            response = new SendIMG("png");
        }
    }
    try{
        var data = await read("."+req.url);
        response.send(res,data);
    }
    catch(err){
        var send404 = new Send404();
        send404.send(res);
        console.log("file not found");
    }
 
}


module.exports = {send};