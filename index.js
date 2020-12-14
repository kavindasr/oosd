const http = require("http");
const {webSettings} = require("./setting");
const public = require("./factories/publicFolder");
const methodFactory = require("./factories/MethodFactory");
const UserBuilder = require("./factories/userBuilder");
const {login,tokenedAccess} = require("./facadeIN");
const serviceMethod = require("./methods/serviceMethod");

const uBuilder = new UserBuilder();
const sMethod_out = new serviceMethod();

const server = http.createServer((req,res)=>{
    const sMethod = new serviceMethod();
    const method = methodFactory.getMethod(req,res);
    sMethod.setMethod(method);
    
    (async ()=>{
        var response = null;
        
        if(method.getPath(1) == 'public'){ // Public folder access for all the user types
            response = await public.send(method.url.pathname);
        }
        else if(method.getPath(1) == 'login'){ // login and user creation and session maintaining
            response = await login(sMethod);
        }
        else{ // access restricted for different users and all database accesses
            response = await tokenedAccess(sMethod);
        }

        if(response){  // Response handling to end the request
            response.send(method.res);
            console.log(req.method,req.url,response.code);
        }
        else{
            console.log(req.method,req.url);
            method.res.end();
        }
        
    })();
    

});

server.listen(webSettings.webport,()=>{
    console.log("Listening on port",webSettings.webport); 
    sMethod_out.getSessions(uBuilder); //Load session data when the server initiates
    sMethod_out.checkExpiry(); // continously check for the user expiry
    
});





