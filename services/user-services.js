const {hash,compare} = require("bcryptjs");
const {getUserID} = require('./auth-services');
const {executeSQL} = require("../db/db");
const {Send200,Send406,Send500} = require("../responses/response");
const user = require("../users/user");

const users = new Map();

const addUser = async (user)=>{

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

const signup = async (method) =>{
    const {userName,userType,password} = JSON.parse(await method.getBody());
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

const changePass = async (method) =>{
    const {NewPassword} = JSON.parse(await method.getBody());
    const uName = method.searchURL("uName");
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
}

const logOut = async(token) =>{
    const sessionID = getUserID(token);
    users.delete(sessionID);
    try{
        const data = await executeSQL(`DELETE FROM session_table WHERE sessionID= '${sessionID}'`);
    }
    catch(e){
        console.log("database error");
    }
}

const authUser = async (email,password)=>{
    const user = users.find(u=>u.email===email);

    if(user ){
        const success = await compare(password,user.password);
        if(success){
            return user;
        }

    }
    return false;
};

const getUser =  (token)=>{
    const sessionID = getUserID(token);
    if(sessionID){
        var user = users.get(sessionID); //should check db also if user is null
        return user;
    }
    else{
        return null;
    }
}

const checkExpiry = () =>{
    setInterval(exCheck,300000); // checking at a rate of 5 mts
}

async function exCheck(){
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

}

const getSessions = async (uBuilder) => {
    const data = await executeSQL(`SELECT * FROM session_table`);
    if (data.length!=0){
        for (const [key, value] of data.entries()) {
            var user = uBuilder.userCreation(value.user_name,value.user_type,value.sessionID,value.start_time);
            users.set(user.sessionID,user);
        }
    }else{
        console.log("No existing user");
    }
    
}



module.exports = {
    addUser,
    authUser,
    getUser,
    signup,
    logOut,
    changePass,
    checkExpiry,
    getSessions
};



// if(!user){
        //     try{
        //         const data = await executeSQL(`SELECT * FROM session_table WHERE sessionID= '${sessionID}'`);
        //         user = uBuilder.userCreation(data[0].userName,data[0].userType,data[0].sessionID,data[0].startTime);
        //     }
        //     catch(e){
        //         return null;
        //     }
        // }