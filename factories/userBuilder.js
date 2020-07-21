const {DepotSuperviser,Mayor,Clerk,MOH} = require("../users/user");
const bcrypt = require("bcryptjs");
const {getAccessToken,getUserID} = require("../services/auth-services")
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
        console.log(uname,password);
        //console.log(body.userName,body.password);
        try{
            const credential = await executeSQL(`SELECT user_type , password FROM user_table WHERE user_name = '${uname}'`);
            const hashedPass = credential[0].password;
            const userType= credential[0].user_type;
            console.log(hashedPass , userType);

            bcrypt.compare(password, hashedPass, function(err, isMatch) {
                if (err) {
                  console.log("error");
                } else if (!isMatch) {
                  console.log("Password doesn't match!")
                } else {
                    var us = null;
                    
                    console.log("Password matches!")
                    if (userType=="DepotSuperviser"){
                        us = new DepotSuperviser(uname,"DepotSuperviser");
                        
                    }else if (userType=="Mayor"){
                        us = new Mayor(uname,"Mayor");
                        
                    }else if (userType=="Clerk"){
                        us = new Clerk(uname,"Clerk");
                       
                    }else if (userType=="moh"){
                        us =  new MOH(uname,"moh");
                        
                    }else{
                        return null;
                    }
                    const data1 = us.sessionID;
                    const data2 = us.type;
                    console.log(data1,data2);
                    this.method.setToken(getAccessToken({data1,data2}));
                    //this.method.setToken(getAccessToken({data1,data2}));
                    return(us);
                }
              });

        }catch(e){
            console.log("sdfs  eeerrrr");
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