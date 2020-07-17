const {DepotSuperviser,Mayor,Clerk,MOH} = require("../users/user");
const bcrypt = require("bcryptjs");
const method = require("../methods/method");
const {getAccessToken,getUserID} = require("../services/auth-services")


class userBuilder{
    constructor(){
        this.method=method;
    }

    async create(){
        const body = await method.getBODY();
        const uname=body.userName;
        const pass=body.password;

        const userType = "MOH";  // should be read from the database
        const hashedPass="$2a$10$PI7tlwPvEqVr2nYQCrIfNekoLkxEHk48hvpD44VBRTP6WRkhRGJwu"; // should be read from the database
        

        bcrypt.compare(pass, hashedPass, function(err, isMatch) {
            if (err) {
              console.log("error");
            } else if (!isMatch) {
              console.log("Password doesn't match!")
            } else {
                const us = null;
                
                console.log("Password matches!")
                if (userType=="DepotSuperviser"){
                    const us = new DepotSuperviser(uname,"DepotSuperviser");
                    
                }else if (userType=="Mayor"){
                    const us = new Mayor(uname,"Mayor");
                    
                }else if (userType=="Clerk"){
                    const us = new Clerk(uname,"Clerk");
                   
                }else if (userType=="MOH"){
                    const us = Clerk(uname,"MOH");
                    
                }else{
                    return null;
                }
                data1 = us.sessionID;
                data2 = us.type;

                method.setToken(getAccessToken({data1,data2}));
                return(us);
            }
          })


    }

}


module.exports = userBuilder;



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