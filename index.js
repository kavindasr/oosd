const http = require("http");
const {webSettings} = require("./settings");
const views = require("./factories/viewsFolder");
const public = require("./factories/publicFolder");
const methodFactory = require("./factories/MethodFactory");
const UserBuilder = require("./factories/userBuilder");
const {getUser,addUser,signup,logOut,changePass,checkExpiry,getSessions} = require('./services/user-services');

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
                    method.setToken(token,false,5000);
                    redirect(method,'/login')
                }
                else{
                    method.setToken(token,true,50000000);
                    await addUser(user);
                    redirect(method,user.mainPage);
                }
                
            }  
        }
        else{
            const token = method.getToken();
            if(token){
                const user = getUser(token);
                if(user){
                    user.setLastUsedTime(new Date().getTime());
                    if(method.getPath(1) == 'api'){
                        //api method
                        const apiMethod = method.getApiMethod();
                        await apiMethod.setQuery();
                        console.log(apiMethod.getQuery);
                        response = await apiMethod.execute(user.apiAccessControl(method.getPath(2),method.type));  
                    }
                    else if(method.getPath(1) == 'signup' && user.apiAccessControl(method.getPath(1),method.type)){
                        //only allowed MOH users
                        response = await signup(method);
                    }
                    else if(method.getPath(1) == 'changePass'&& user.apiAccessControl(method.getPath(1),method.type)){
                        response = await changePass(method);
                    }
                    else if(method.getPath(1) == 'logOut'){
                        await logOut(token);
                        redirect(method,'/login');
                    }
                    else{
                        //render views
                        if(method.getPath(1) == ''){
                            redirect(method,user.mainPage);
                        }
                        else if (user.viewAccessControl(method.url.pathname)){
                            response = await views.render(method.url.pathname);
                        }
                        else if(user.viewAccessControl(method.url.pathname) == false){
                            redirect(method,'/notAllowed');
                        }
                        else{
                            redirect(method,'/pageNotFound');
                        }
                    }   
                }
                else{
                    redirect(method,'/login');
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
    getSessions(uBuilder); // loads any session data from the db
    checkExpiry(); // continuously checks for the expiry at each 5 mts 
    
});

function redirect(method,path){
    method.res.writeHead(302,{'Content-Type':'text/plain','Location':webSettings.protocol+"://"+webSettings.host+":"+webSettings.webport+path});
}



