const {hash,compare} = require("bcrypt");
const uniqid = require('uniqid');
//users[]
class User{
    constructor(userName, password){
        this.sessionID = uniqid();
        this.userName = userName;
        hash(password,10,(err,encrypted)=>{
            if(err){
                return {err};
            }
            this.hashedPassword = encrypted;
            console.log(this.sessionID,this.userName,this.hashedPassword);
        });
    }
    async compareHash(password){
        console.log(await compare(password,this.hashedPassword));
    }
}

class DepotSupervisor extends User{
    constructor(userName,password){
        super(userName,password);
        this.ACCESS_TOKEN_SECRECT = "Hello_SuperviSOR";
    }
}

class MohOfficer extends User{
    constructor(userName,password){
        super(userName,password);
        this.ACCESS_TOKEN_SECRECT = "Hello_DOCTOR";
    }
}
module.exports = {DepotSupervisor,MohOfficer};