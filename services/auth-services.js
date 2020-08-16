const {sign, verify} = require("jsonwebtoken");

const ACCESS_TOKEN_SECRECT = "ksr";

const getAccessToken = (data)=>{
    token = sign(data, ACCESS_TOKEN_SECRECT,{expiresIn:"50m"});
    //console.log(token);
    return token;
};

const getUserID = (token)=>{
    try{
        const {sessionID} = verify(token,ACCESS_TOKEN_SECRECT);
        if(sessionID){
            return sessionID;
        }
        return null;
    }
    catch(err){
        console.log("Invaild token"); //when token expires
        return null;
    }
    
    
}

module.exports = {
    getAccessToken,
    getUserID,
}