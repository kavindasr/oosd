
const uniqid = require('uniqid');

class User{
    constructor(userName,type){
        this.sessionID = uniqid();
        this.userName = userName;
        this.type=type;
        this.apiAccess=null;
        this.viewAccess=null;
    }

    apiAccessControl(table ,methodType){
        if (this.apiAccess[table][methodType]){
            return true;
        }else{
            return false;
        }
    }

    viewAccessControl(pathname){
        const path = pathname.split("/");
        const accessCond = path[1];
    
        if (this.viewAccess[accessCond] || path.length == 2){
            return true;
        }else{
            return false;
        }
    }
    
   
}

class DepotSuperviser extends User{
    constructor(userName,type){
        super(userName,type);
        this.mainPage = '/depot/main';
        this.apiAccess = {
            employee             : {GET:false,POST:false,PUT:false,DELETE:false},
            attendance           : {GET:false,POST:true,PUT:true,DELETE:false},
            division             : {GET:false,POST:false,PUT:false,DELETE:false},
            vehicle              : {GET:false,POST:true,PUT:false,DELETE:false},

            // user_table           : {GET:true,POST:false,PUT:false,DELETE:false},
            // vehicle_distribution : {GET:true,POST:false,PUT:false,DELETE:false},
            // vehicle_repair       : {GET:true,POST:false,PUT:false,DELETE:false},
        }
        this.viewAccess = {
            "depot":true,
            "moh"  :false,
            "clerk":false,
            "mayor":false
        }
    }
    
}

class MOH extends User{
    constructor(userName,type){
        super(userName,type);
        this.apiAccess = {
            employee             : {GET:true,POST:true,PUT:false,DELETE:true},
            attendance           : {GET:true,POST:false,PUT:false,DELETE:false},
            division             : {GET:false,POST:false,PUT:false,DELETE:false},
            vehicle              : {GET:false,POST:false,PUT:false,DELETE:false},

            // user_table           : {GET:true,POST:false,PUT:false,DELETE:false},
            // vehicle_distribution : {GET:true,POST:false,PUT:false,DELETE:false},
            // vehicle_repair       : {GET:true,POST:false,PUT:false,DELETE:false},
        }

        this.viewAccess = {
            "depot":false,
            "moh"  :true,
            "clerk":false,
            "mayor":false
        }
        this.mainPage = '/moh/home';
    }

    
}

class Clerk extends User{
    constructor(userName,type){
        super(userName,type);
        this.apiAccess = {
            employee             : {GET:false,POST:false,PUT:false,DELETE:false},
            attendance           : {GET:false,POST:false,PUT:false,DELETE:false},
            division             : {GET:false,POST:false,PUT:false,DELETE:false},
            vehicle              : {GET:false,POST:false,PUT:false,DELETE:false},

            // user_table           : {GET:true,POST:false,PUT:false,DELETE:false},
            // vehicle_distribution : {GET:true,POST:false,PUT:false,DELETE:false},
            // vehicle_repair       : {GET:true,POST:false,PUT:false,DELETE:false},
        }

        this.viewAccess = {
            "depot":false,
            "moh"  :false,
            "clerk":true,
            "mayor":false
        }
    }
    
}

class Mayor extends User{
    constructor(userName,type){
        super(userName,type);
        this.apiAccess = {
            employee             : {GET:false,POST:false,PUT:false,DELETE:false},
            attendance           : {GET:true,POST:false,PUT:false,DELETE:false},
            division             : {GET:false,POST:false,PUT:false,DELETE:false},
            vehicle              : {GET:false,POST:false,PUT:false,DELETE:false},

            // user_table           : {GET:true,POST:false,PUT:false,DELETE:false},
            // vehicle_distribution : {GET:true,POST:false,PUT:false,DELETE:false},
            // vehicle_repair       : {GET:true,POST:false,PUT:false,DELETE:false},
        }

        this.viewAccess = {
            "depot":false,
            "moh"  :false,
            "clerk":false,
            "mayor":true
        }
    }
}





module.exports = {DepotSuperviser,MOH,Clerk,Mayor};

// hash(password,10,(err,encrypted)=>{
//     if(err){
//         return {err};
//     }
//     this.hashedPassword = encrypted;
//     console.log(this.sessionID,this.userName,this.hashedPassword);
// });