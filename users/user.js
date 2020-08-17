
const uniqid = require('uniqid');

class User{
    constructor(userName,type,sessionID,startTime){
        if(sessionID){
            this.sessionID = sessionID;
        }
        else{
            this.sessionID = uniqid();
        }
        if(startTime){
            this.startTime = startTime;
        }
        else{
            this.startTime = new Date().getTime();
        }
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
    constructor(userName,type,sessionID){
        super(userName,type,sessionID);
        this.mainPage = '/depot/main';
        this.apiAccess = {
            employee             : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            attendance           : {GET:false,POST:true,PUT:true,DELETE:true,HEAD:false},
            division             : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            vehicle              : {GET:true,POST:true,PUT:false,DELETE:false,HEAD:true},

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
    constructor(userName,type,sessionID){
        super(userName,type,sessionID);
        this.apiAccess = {
            employee             : {GET:true,POST:true,PUT:true,DELETE:true,HEAD:true},
            attendance           : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            division             : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            vehicle              : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            signup               : {POST:true}
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
    constructor(userName,type,sessionID){
        super(userName,type,sessionID);
        this.apiAccess = {
            employee             : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            attendance           : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            division             : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            vehicle              : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},

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
    constructor(userName,type,sessionID){
        super(userName,type,sessionID);
        this.apiAccess = {
            employee             : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            attendance           : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            division             : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            vehicle              : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},

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
