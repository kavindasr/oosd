const {DepotSuperviser,Mayor,Clerk,MOH} = require("../users/user");
const {compare} = require("bcryptjs");
const {getAccessToken} = require("../services/auth-services")
const { parse } = require('querystring');
const {executeSQL} = require('../db/db');

class UserBuilder{
    constructor(method){
        this.method=method;
    }
    userCreation(userName,userType,sessionID,lastTime){
        var us = null;
        if (userType=="depot"){
            us = new DepotSuperviser(userName,"depot",sessionID,lastTime);
            
        }else if (userType=="mayor"){
            us = new Mayor(userName,"mayor",sessionID,lastTime);
            
        }else if (userType=="clerk"){
            us = new Clerk(userName,"clerk",sessionID,lastTime);
            
        }else if (userType=="moh"){
            us =  new MOH(userName,"moh",sessionID,lastTime);
            
        }
        return us
    }

    async create(method){
        const body = parse(await method.getBody());
        const uname = body.userName;
        const password=body.password;
        
        try{
            const credential = await executeSQL(`SELECT user_type , password FROM user_table WHERE user_name = '${uname}'`);
            
            const hashedPass = credential[0].password;
            const userType= credential[0].user_type;
            const success = await compare(password,hashedPass);
            
            if(success){
                
                console.log("Password matches!");
                const us = this.userCreation(uname,userType);
                if(!us){
                    return {user:{err:true},token:"password mismatch"};
                }
                const data1 = us.sessionID;
                const data2 = us.type;
                const token = getAccessToken({sessionID:data1,type:data2});
                //this.method.setToken(token);
                return {user:us,token:token};
            }
            else{
                console.log("Password mismatch!");
                return {user:{err:true},token:"Password mismatch!"};
            }
        }catch(e){
            return {user:{err:true},token:"User name is not vaild!"};
        }
        
    }

}


module.exports = UserBuilder;



