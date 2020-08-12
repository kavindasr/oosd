const {DepotSuperviser,Mayor,Clerk,MOH} = require("../users/user");
const {compare} = require("bcryptjs");
const {getAccessToken} = require("../services/auth-services")
const { parse } = require('querystring');
const {executeSQL} = require('../db/db');

class UserBuilder{
    constructor(method){
        this.method=method;
    }
    userCreation(userName,userType,sessionID){
        var us = null;
        if (userType=="depot"){
            us = new DepotSuperviser(userName,"depot",sessionID);
            
        }else if (userType=="mayor"){
            us = new Mayor(userName,"mayor",sessionID);
            
        }else if (userType=="clerk"){
            us = new Clerk(userName,"clerk",sessionID);
            
        }else if (userType=="moh"){
            us =  new MOH(userName,"moh",sessionID);
            
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
                return {user:{err:true},token:"password mismatch"};
            }
        }catch(e){
            return {user:{err:true},token:"User name is not vaild"};
        }
        
    }

}


module.exports = UserBuilder;



//createUser = (userType)=>{
//    switch(userType){
//       case "depot_supervisor":
//            const DS = require("../users/depot_supervisor");
//            return new DS();
//        case "moh_officer":
//            const MO = require("../users/moh_officer");
//            return new MO();
//        default:
//            return null;
//    }
//}