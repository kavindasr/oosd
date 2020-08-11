const {DepotSuperviser,Mayor,Clerk,MOH} = require("../users/user");
const {compare} = require("bcryptjs");
const {getAccessToken} = require("../services/auth-services")
const { parse } = require('querystring');
const {executeSQL} = require('../db/db');

class UserBuilder{
    constructor(method){
        this.method=method;
    }

    async create(){
        const body = parse(await this.method.getBody());
        const uname = body.userName;
        const password=body.password;
        
        try{
            const credential = await executeSQL(`SELECT user_type , password FROM user_table WHERE user_name = '${uname}'`);
            
            const hashedPass = credential[0].password;
            const userType= credential[0].user_type;
            const success = await compare(password,hashedPass);
            
            if(success){
                var us = null;
                console.log("Password matches!");
                if (userType=="depotSuperviser"){
                    us = new DepotSuperviser(uname,"DepotSuperviser");
                    
                }else if (userType=="mayor"){
                    us = new Mayor(uname,"Mayor");
                    
                }else if (userType=="clerk"){
                    us = new Clerk(uname,"Clerk");
                    
                }else if (userType=="moh"){
                    us =  new MOH(uname,"moh");
                    
                }else{
                    return null;
                }
                const data1 = us.sessionID;
                const data2 = us.type;
                const token = getAccessToken({sessionID:data1,type:data2});
                //this.method.setToken(token);
                return {user:us,token:token};
            }
            else{
                console.log("Password mismatch!");
                return null;
            }
        }catch(e){
            return {err:"internel error", status:500};
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