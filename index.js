const http = require("http");
const settings = require("./settings");
const viewFactory = require("./factories/viewFactory");

const server = http.createServer((req,res)=>{
    //console.log("Hello world");
    const seperator = req.url.split('/')[1]; //dividing according to the url
    if(seperator == 'api'){
        //api method
    }
    else if(seperator == 'public'){
        //access public folder
    }
    else{
        //render views
        viewFactory.render(req,res);
    }

});

server.listen(settings.webPort,()=>{
    console.log("Listening on port",settings.webPort);
});