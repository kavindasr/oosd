const http = require("http");
const {webSettings} = require("./settings");
const views = require("./factories/viewsFolder");
const public = require("./factories/publicFolder");
const methhodFactory = require("./factories/MethodFactory");

// const Cookies = require("cookies");
// const keys = ['keyboard cat']
// if(req.url === "/test"){
//         var cookies = new Cookies(req, res, { keys: keys });
//         //cookies.set("LastVisit",new Date().toISOString(),{maxAge:500000,signed:true});
//         console.log(cookies.get("LastVisit",{signed:true}));
//     }
const server = http.createServer((req,res)=>{
    console.log(req.method,req.url);
    
    const method = methhodFactory.getMethod(req,res);
    
    if(method.getPath(1) == 'api'){
        //api method
    }
    else if(method.getPath(1) == 'public'){
        //access public folder
        public.send(req,res);
    }
    else{
        //render views
        views.render(req,res);
    }

});

server.listen(webSettings.webport,()=>{
    console.log("Listening on port",webSettings.webport);
});