const http = require("http");
const {webSettings} = require("./setting");
const public = require("./factories/publicFolder");
const methodFactory = require("./factories/MethodFactory");
const UserBuilder = require("./factories/userBuilder");
const {login,tokenedAccess} = require("./facadeIN");
const {checkExpiry,getSessions} = require('./services/user-services');

const uBuilder = new UserBuilder();

const server = http.createServer((req,res)=>{

    const method = methodFactory.getMethod(req,res);
    
    (async ()=>{
        var response = null;
        
        if(method.getPath(1) == 'public'){ // Public folder access for all the user types
            response = await public.send(method.url.pathname);
        }
        else if(method.getPath(1) == 'login'){ // login and user creation and session maintaining
            response = await login(method);
        }
        else{ // access restricted for different users and all database accesses
            response = await tokenedAccess(method);
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
    getSessions(uBuilder); // loads any session data from the db which has not been expired
    checkExpiry(); // continuously checks for the expiry at each 5 mts 
    
});





