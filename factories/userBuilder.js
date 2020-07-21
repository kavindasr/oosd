const {DepotSuperviser,Mayor,Clerk,MOH} = require("../users/user");
const bcrypt = require("bcryptjs");
const {getAccessToken,getUserID} = require("../services/auth-services")
const { parse } = require('querystring');

class UserBuilder{
    constructor(method){
        this.method=method;
    }

    async create(){
        const body = parse(await this.method.getBody());
        console.log(body.userName,body.password);
        //password="password"
        const userType = "MOH";  // should be read from the database
        const hashedPass="$2a$10$PI7tlwPvEqVr2nYQCrIfNekoLkxEHk48hvpD44VBRTP6WRkhRGJwu"; // should be read from the database
        
/*
        bcrypt.compare(pass, hashedPass, function(err, isMatch) {
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
                   
                }else if (userType=="MOH"){
                    us = MOH(uname,"MOH");
                    
                }else{
                    return null;
                }
                data1 = us.sessionID;
                data2 = us.type;

                method.setToken(getAccessToken({data1,data2}));
                return(us);
            }
          })
*/

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