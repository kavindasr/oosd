
const uniqid = require('uniqid');

class User{
    constructor(userName,type){
        this.sessionID = uniqid();
        this.userName = userName;
        this.type=type;
    }
   
}

class DepotSuperviser extends User{
    constructor(userName,type){
        super(userName,type);
        this.mainPage = '/depot/main';
        this.apiAccess = {
            employee        : {GET:true,POST:false,PUT:false,DELETE:false},
            attenattendance : {GET:true,POST:false,PUT:false,DELETE:false},
        }
    }
    apiAccessControl(table , methodType){

    }
}

class MOH extends User{
    constructor(userName,type){
        super(userName,type);
        this.mainPage = '/depot/main';
    }
}

class Clerk extends User{
    constructor(userName,type){
        super(userName,type);
    }
}

class Mayor extends User{
    constructor(userName,type){
        super(userName,type);
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