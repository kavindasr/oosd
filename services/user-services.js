const {hash,compare} = require("bcryptjs");
const {getUserID} = require('./auth-services');
const {executeSQL} = require("../db/db");
const {Send200,Send406,Send500} = require("../responses/response");
const user = require("../users/user");

const users = new Map();

const addUser = async (user)=>{
    users.set(user.sessionID,user); // should be added to db

}

const signup = async (method) =>{
    const {userName,userType,password} = JSON.parse(await method.getBody());
    console.log(userName);
    try{
        const data = await executeSQL(`SELECT user_name FROM user_table WHERE user_name = '${userName}'`);
        if(data[0]){
            console.log("USER exisits");
            return new Send406();
        }
        else{
            console.log("newUSER");
            const hashedPassword = await hash(password,10);
            console.log("newUSER", hashedPassword);
            const data = await executeSQL(`INSERT INTO user_table VALUES ('${userName}','${userType}','${hashedPassword}')`);
        }
    }catch(e){
        return new Send500(e);
        
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

const getUser = (token)=>{
    const sessionID = getUserID(token);
    if(sessionID){
        const user = users.get(sessionID); //should check db also if user is null
        return user;
    }
    else{
        return null;
    }
}

module.exports = {
    addUser,
    authUser,
    getUser,
    signup,
};