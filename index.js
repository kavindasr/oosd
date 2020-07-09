const http = require("http");
const settings = require("./settings");
const views = require("./factories/viewsFolder");
const public = require("./factories/publicFolder");
const methhodFactory = require("./factories/MethodFactory");

const server = http.createServer((req,res)=>{
    //console.log("Hello world");
    console.log(req.method,req.url);
    if(seperator == 'api'){
        //api method
    }
    else if(seperator == 'public'){
        //access public folder
        public.send(req,res);
    }
    else{
        //render views
        views.render(req,res);
    }

});

server.listen(settings.webPort,()=>{
    console.log("Listening on port",settings.webPort);
});