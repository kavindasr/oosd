const {executeSQL} = require("../db/db");
const uniqid = require('uniqid');

class User{
    constructor(userName,type,sessionID,lastUsedTime){
        if(sessionID){
            this.sessionID = sessionID;
        }
        else{
            this.sessionID = uniqid();
        }
        if(lastUsedTime){
            this.lastUsedTime = lastUsedTime;
        }
        else{
            this.lastUsedTime = Number(new Date().getTime());
        }

        this.userName = userName;
        this.type=type;
        this.apiAccess=null;
        this.viewAccess=null;
    }

    apiAccessControl(table ,methodType){
        try{
            if (this.apiAccess[table][methodType]){
                return true;
            }else{
                return false;
            } 
        }
        catch{
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

    setLastUsedTime(time){
        this.lastUsedTime = Number(time);
        executeSQL(`UPDATE session_table SET start_time= '${Number(time)}' WHERE sessionID= '${this.sessionID}'`);
    }
    
    isExpired(){

        const inactiveTime = Number(new Date().getTime()) - this.lastUsedTime ; 
        if (inactiveTime> 3600000){ // session expires after 1 hour of inactivity
            return (true);
        }else{
            return (false);
        }
    }
    
}

class DepotSuperviser extends User{
    constructor(userName,type,sessionID,lastUsedTime){
        super(userName,type,sessionID,lastUsedTime);
        this.mainPage = '/depot/main';
        this.apiAccess = {
            employee             : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            attendance           : {GET:false,POST:true,PUT:true,DELETE:true,HEAD:false},
            division             : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            vehicle              : {GET:true,POST:true,PUT:false,DELETE:false,HEAD:true},
            gdetail              : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            ginbill              : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            gunbill              : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            vehicleout           : {GET:true,POST:true,PUT:false,DELETE:false},
            repair               : {GET:true,POST:true,PUT:true,DELETE:true},
            changePass           : {PUT:true}
            // user_table           : {GET:true,POST:false,PUT:false,DELETE:false},
            
        }
        this.viewAccess = {
            "depot":true,
            "moh"  :false,
            "clerk":false,
            "mayor":false,
            "changePassword":true
        }
    }
    
}

class MOH extends User{
    constructor(userName,type,sessionID,lastUsedTime){
        super(userName,type,sessionID,lastUsedTime);
        this.apiAccess = {
            employee             : {GET:true,POST:true,PUT:true,DELETE:true,HEAD:true},
            attendance           : {GET:true,POST:true,PUT:false,DELETE:false,HEAD:true},
            division             : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            vehicle              : {GET:true,POST:false,PUT:false,DELETE:true,HEAD:true},
            gdetail              : {GET:true,POST:true,PUT:true,DELETE:true,HEAD:true},
            ginbill              : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            gunbill              : {GET:true,POST:true,PUT:false,DELETE:false,HEAD:false},
            gout                 : {GET:true,POST:true,PUT:false,DELETE:false,HEAD:false},
            user                 : {GET:true,DELETE:true},
            gintype              : {GET:true,POST:true,PUT:true,DELETE:true,HEAD:false},
            vehicleout           : {GET:true,POST:true,PUT:false,DELETE:false},
            signup               : {POST:true},
            changePass           : {PUT:true},
            compout              : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:false},
            uTable               : {GET:true}
            
            // user_table           : {GET:true,POST:false,PUT:false,DELETE:false},
            // vehicle_distribution : {GET:true,POST:false,PUT:false,DELETE:false},
            // vehicle_repair       : {GET:true,POST:false,PUT:false,DELETE:false},
        }

        this.viewAccess = {
            "depot":false,
            "moh"  :true,
            "clerk":false,
            "mayor":false,
            "changePassword":true
        }
        this.mainPage = '/moh/homenew';
    }

    
}

class Clerk extends User{
    constructor(userName,type,sessionID){
        super(userName,type,sessionID);
        this.mainPage = '/clerk/clerk_gin';
        this.apiAccess = {
            employee             : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            attendance           : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            division             : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:false},
            vehicle              : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            gdetail              : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            gintype              : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:false},
            ginbill              : {GET:true,POST:true,PUT:false,DELETE:false,HEAD:false},
            gunbill              : {GET:true,POST:true,PUT:false,DELETE:false,HEAD:false},
            gout                 : {GET:true,POST:true,PUT:false,DELETE:false,HEAD:false},
            compin               : {GET:true,POST:true,PUT:false,DELETE:false,HEAD:false},
            compout              : {GET:true,POST:true,PUT:false,DELETE:false,HEAD:false},
            vehicleout           : {GET:false,POST:false,PUT:false,DELETE:false},
            changePass           : {PUT:true}
        }

        this.viewAccess = {
            "depot":false,
            "moh"  :false,
            "clerk":true,
            "mayor":false,
            "changePassword":true
        }
    }
    
}

class Mayor extends User{
    constructor(userName,type,sessionID,lastUsedTime){
        super(userName,type,sessionID,lastUsedTime);
        this.apiAccess = {
            employee             : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            attendance           : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:true},
            division             : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:false},
            vehicle              : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            gdetail              : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:false},
            ginbill              : {GET:false,POST:false,PUT:false,DELETE:false,HEAD:false},
            gunbill              : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:false},
            changePass           : {PUT:true},
            compout              : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:false},
            gout                 : {GET:true,POST:false,PUT:false,DELETE:false,HEAD:false}
        }

        this.viewAccess = {
            "depot":false,
            "moh"  :false,
            "clerk":false,
            "mayor":true,
            "changePassword":true
        }

        this.mainPage = '/mayor/Home'
    }
}





module.exports = {DepotSuperviser,MOH,Clerk,Mayor};
