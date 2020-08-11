const http = require("http");
const {webSettings} = require("./settings");
const views = require("./factories/viewsFolder");
const public = require("./factories/publicFolder");
const methodFactory = require("./factories/MethodFactory");
const UserBuilder = require("./factories/userBuilder");
const {getUser,addUser} = require('./services/user-services');


const server = http.createServer((req,res)=>{

    console.log(req.method,req.url);
    
    const method = methodFactory.getMethod(req,res);

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
                const uBuilder = new UserBuilder(method);
                var user,token;
                ({user,token} = await uBuilder.create());
                method.setToken(token);
                addUser(user);
            }  
        }
        else if(method.getPath(1) == ''){
            redirect(method,'/login');
        }
        else{
            const token = method.getToken();
            if(token){
                const user = await getUser(token);

                if(method.getPath(1) == 'api' && user.apiAccessControl(method.getPath(2),method.type)){
                    //api method
                    const apiMethod = method.getApiMethod();
                    await apiMethod.setQuery();
                    response = await apiMethod.execute();
                }
                else if (user.viewAccessControl(method.url.pathname)){
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



