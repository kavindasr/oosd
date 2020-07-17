
const uniqid = require('uniqid');
//users[]
class User{
    constructor(userName,type){
        this.sessionID = uniqid();
        this.userName = userName;
        this.type=type;
      
    }
   
}

class DepotSupervisor extends User{
    constructor(userName,type){
        super(userName,type);
    }
}

class MOH extends User{
    constructor(userName,type){
        super(userName,type);
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
module.exports = {DepotSupervisor,MOH,Clerk,Mayor};

// hash(password,10,(err,encrypted)=>{
//     if(err){
//         return {err};
//     }
//     this.hashedPassword = encrypted;
//     console.log(this.sessionID,this.userName,this.hashedPassword);
// });