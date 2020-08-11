const {hash,compare} = require("bcryptjs");
const {getUserID} = require('./auth-services');
const user = require("../users/user");
const {executeSQL} = require("../db/db");
const users = new Map();

const addUser = async (user)=>{
    users.set(user.sessionID,user); // should be added to db

}

const signup = async (method) =>{
    const {userName,userType,password} = JSON.parse(await method.getBody());
    try{
        const data = executeSQL(`SELECT user_name FROM user_table WHERE user_name = ${userName}`);
        console.log(data);
    }catch(e){
        console.log(e);
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