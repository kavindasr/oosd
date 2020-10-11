const {webSettings} = require("./setting");
const views = require("./factories/viewsFolder");
const {reportMethod} = require("./methods/reportMethod");
const UserBuilder = require("./factories/userBuilder");



const login = async (sMethod)=>{

    const method = sMethod.method;
    const uBuilder = new UserBuilder();
    var response = null;

    // -----------starts here

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
            await sMethod.addUser(user);
            redirect(method,user.mainPage);
        }
    }

    // -----------------ends here
    return(response);
}

const tokenedAccess = async (sMethod)=>{
    var response = null;
    const method = sMethod.method;

    // ---------------- starts here

    const token = method.getToken();
    if(token){
        const user = sMethod.getUser(token);
        
        if(user){
            user.setLastUsedTime(new Date().getTime());
            if(method.getPath(1) == 'api'){
                //api method
                const apiMethod = method.getApiMethod();
                await apiMethod.setQuery();
                response = await apiMethod.execute(user.apiAccessControl(method.getPath(2),method.type));  
            }
            else if(method.getPath(1) == 'report'){
                const report = new reportMethod(method);
                response = await report.execute(user.type);
            }
            else if(method.getPath(1) == 'signup' && user.apiAccessControl(method.getPath(1),method.type)){
                response = await sMethod.signup();

            }
            else if(method.getPath(1) == 'changePass'&& user.apiAccessControl(method.getPath(1),method.type)){
                response = await sMethod.changePass();
            }
            else if(method.getPath(1) == 'logOut'){
                await sMethod.logOut(token);
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

    // -------------------- ends here

    return(response);
}

// ------------------------------------------------------------------------------------

function redirect(method,path){
    method.res.writeHead(302,{'Content-Type':'text/plain','Location':webSettings.protocol+"://"+webSettings.host+":"+webSettings.webport+path});
}

module.exports = {
    login,
    tokenedAccess
};




