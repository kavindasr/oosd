const {hash,compare} = require("bcrypt");
const {getUserID} = require('./auth-services');
const user = require("../users/user");
const users = new Map();

const addUser = async (user)=>{
    users.set(user.sessionID,user); // should be added to db
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

const getUser = async (token)=>{
    const sessionID = getUserID(token);
    if(sessionID){
        user = users.get(sessionID); //should check db also if user is null
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
};