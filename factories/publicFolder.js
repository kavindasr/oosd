const {read} = require("../services/fs");
const path = require("path");
const {Send404,SendCSS,SendJS,SendIMG} = require("../responses/response");

async function send(pathname){
    const ext = path.extname(path.posix.basename(pathname));
    var response;
    if(ext == '.css'){
        response = new SendCSS();
    }
    else if(ext == '.js'){
        response = new SendJS();
    }
    else{
        if(ext == '.svg'){
            response = new SendIMG(null,"svg+xml");
        }
        else if(ext == '.jpg'){
            response = new SendIMG(null,"jpeg");
        }
        else{
            response = new SendIMG(null,"png");
        }
    }
    try{
        var data = await read("."+pathname);
        response.setData(data);
        return response;
    }
    catch(err){
        console.log("file not found");
        return new Send404();
    }
 
}


module.exports = {send};