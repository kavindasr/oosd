const http = require("http");
const {webSettings} = require("./settings");
const views = require("./factories/viewsFolder");
const public = require("./factories/publicFolder");
const methodFactory = require("./factories/MethodFactory");
const UserBuilder = require("./factories/userBuilder");
const {getUser,addUser,signup} = require('./services/user-services');

const uBuilder = new UserBuilder();

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
                var user,token;
                ({user,token} = await uBuilder.create(method));
                
                if(user.err){
                    redirect(method,'/login')
                }
                else{
                    method.setToken(token);
                    addUser(user);
                    redirect(method,user.mainPage)
                }
                
            }  
        }
        else if(method.getPath(1) == ''){
            redirect(method,'/login');
        }
        else{
            const token = method.getToken();
            if(token){
                const user = await getUser(token,uBuilder);

                if(method.getPath(1) == 'api' && user.apiAccessControl(method.getPath(2),method.type)){
                    //api method
                    const apiMethod = method.getApiMethod();
                    await apiMethod.setQuery();
                    response = await apiMethod.execute();
                }
                //else if (user.viewAccessControl(method.url.pathname)){
                else if(method.getPath(1) == 'signup'){
                    //only allowed MOH users
                    response = await signup(method);
                }
                else{
                    //render views
                    if (user.viewAccessControl(method.url.pathname)){
                        response = await views.render(method.url.pathname);
                    }
                    else{
                        console.log("Can't access view request");
                    }
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



