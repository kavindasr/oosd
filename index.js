const http = require("http");
const {webSettings} = require("./settings");
const views = require("./factories/viewsFolder");
const public = require("./factories/publicFolder");
const methodFactory = require("./factories/MethodFactory");
const userBuilder = require("./factories/userBuilder");



const {getUser} = require('./services/user-services');

const server = http.createServer((req,res)=>{

    console.log(req.method,req.url);
    
    const method = methodFactory.getMethod(req,res);
    
    // find the relevent user and wrap it with the method


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

            if (method.type=="GET"){
                response = await views.render(method.url.pathname);
            }else if (method.type=="POST"){
                const UBuilder = new userBuilder(method);
                const user = UBuilder.create();
            }
            
        }
        else if(method.getPath(1) == ''){
            redirect(method,'/login');
        }
        else{
            const token = method.getToken();
            if(token){
                const user = getUser(token);
                if(method.getPath(1) == 'api'){
                    //api method
                }
                else{
                    //render views
                    response = await views.render(method.url.pathname);
                }   
            }
            else{
                redirect(method,'/login');
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

function redirect(method,path){
    method.res.writeHead(302,{'Content-Type':'text/plain','Location':webSettings.protocol+"://"+webSettings.host+":"+webSettings.webport+path});
}



