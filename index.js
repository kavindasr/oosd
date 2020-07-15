const http = require("http");
const {webSettings} = require("./settings");
const views = require("./factories/viewsFolder");
const public = require("./factories/publicFolder");
const methodFactory = require("./factories/MethodFactory");

// const Cookies = require("cookies");
// const keys = ['keyboard cat']
// if(req.url === "/test"){
//         var cookies = new Cookies(req, res, { keys: keys });
//         //cookies.set("LastVisit",new Date().toISOString(),{maxAge:500000,signed:true});
//         console.log(cookies.get("LastVisit",{signed:true}));
//     }
const server = http.createServer((req,res)=>{
    console.log(req.method,req.url);
    
    const method = methodFactory.getMethod(req,res);
    //const token = method.getToken();
    //console.log(method.url);
    // (async ()=>{
    //     var body = await method.getBody(); 
    //     console.log(body);
    // })();  // use self-invoking function to avoid null body
    (async ()=>{
        var response = null;
        if(method.getPath(1) == 'public'){
            //access public folder
            response = await public.send(method.url.pathname);
        }
        else if(method.getPath(1) == 'login'){
            response = await views.render(method.url.pathname);
        }
        else{
            const token = method.getToken();
            if(method.getPath(1) == 'api'){
                //api method
            }
            else{
                //render views
                response = await views.render(method.url.pathname);
            }   
        }
        if(response){
            response.send(method.res);
        }
        else{
            method.res.end();
        }
        
    })();
    

});

server.listen(webSettings.webport,()=>{
    console.log("Listening on port",webSettings.webport);
});