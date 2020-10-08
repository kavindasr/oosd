const {hash,compare} = require("bcryptjs");
const {getUserID} = require("../services/auth-services");
const {executeSQL} = require("../db/db");
const {Send200,Send406,Send500} = require("../responses/response");


const users = new Map();

class serviceMethod{
    constructor (){
        this.method = null;
    }

    setMethod(method){
        this.method=method;
    }

    checkExpiry(){
        setInterval(exCheck,300000); // checking at a rate of 5 mts
    }

    async getSessions(uBuilder) {
        const data = await executeSQL(`SELECT * FROM session_table`);
        if (data.length!=0){
            for (const [key, value] of data.entries()) {
                var user = uBuilder.userCreation(value.user_name,value.user_type,value.sessionID,value.start_time);
                console.log(value.user_name + " logged in");
                users.set(user.sessionID,user);
            }
        }else{
            console.log("No existing user");
        }
        
    }

    async addUser(user){

        const chkVar = await executeSQL(`SELECT sessionID FROM session_table WHERE user_name = '${user.userName}'`);
        
        for (const [key, value] of chkVar.entries()) { // Removing any existing clients with the logger's userName
            users.delete(value.sessionID);
            await executeSQL(`DELETE FROM session_table WHERE sessionID= '${value.sessionID}'`);
        }
    
        users.set(user.sessionID, user); 
    
        try{
            const data = await executeSQL(`INSERT INTO session_table VALUES ('${user.sessionID}','${user.userName}','${user.type}',${new Date().getTime()})`);
        }
        catch(e){
            console.log("error execution");
        }
    
    }

    async signup(){
        const {userName,userType,password} = JSON.parse(await this.method.getBody());
        console.log(userName);
        try{
            const data = await executeSQL(`SELECT user_name FROM user_table WHERE user_name = '${userName}'`);
            if(data[0]){
                return new Send406();
            }
            else{
                const hashedPassword = await hash(password,10);
                const data = await executeSQL(`INSERT INTO user_table VALUES ('${userName}','${userType}','${hashedPassword}')`);
                return new Send200("User added");
            }
        }catch(e){
            return new Send500(e);
            
        }   
    }

    async changePass(){
        const {NewPassword,CurrPassword} = JSON.parse(await this.method.getBody());
        const uName = this.method.searchURL("uName");
        console.log(NewPassword,CurrPassword,uName);
        var credential,hashedPass,success;
        try{
            credential = await executeSQL(`SELECT user_type , password FROM user_table WHERE user_name = ${uName}`); 
            hashedPass = credential[0].password;
            success = await compare(CurrPassword,hashedPass); 
        }
        catch(e){
            return new Send500();
        }   
        
        if(success){
            try{
                const data = await executeSQL(`SELECT user_name FROM user_table WHERE user_name = ${uName}`);
                if(data[0]){
                    const hashedPassword = await hash(NewPassword,10);
                    const data = await executeSQL(`UPDATE user_table SET password = '${hashedPassword}' WHERE user_name = ${uName} `); 
                    return new Send200("Password Changed");
                }
                else{
                    return new Send406("error");
                }
            }catch(e){
                return new Send500(e); 
            }   
        }else{
            return new Send406("Invalid credentials passed! Check again");
        }
                
        
    }

    async logOut(token){
        const sessionID = getUserID(token);
        users.delete(sessionID);
        try{
            const data = await executeSQL(`DELETE FROM session_table WHERE sessionID= '${sessionID}'`);
        }
        catch(e){
            console.log("database error");
        }
    }

    getUser(token){
        const sessionID = getUserID(token);
        if(sessionID){
            var user = users.get(sessionID); //should check db also if user is null
            return user;
        }
        else{
            return null;
        }
    }
}

async function exCheck(){
    if(users.size!=0){
        for (const [key, value] of users.entries()) {
            if (value.isExpired()){
                console.log( value.userName + " expired");
                users.delete(key);
                try{
                    const data = await executeSQL(`DELETE FROM session_table WHERE sessionID= '${key}'`);
                }catch(e){
                    console.log("database error");
                }
            }else{
                console.log( value.userName + " Not yet expired");
            }
        }
    }else{
        console.log("No logged in users");
    }
    

}


module.exports = serviceMethod ;