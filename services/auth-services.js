const {sign, verify} = require("jsonwebtoken");

const ACCESS_TOKEN_SECRECT = "ksr";
const getAccessToken = (userID)=>{
    token = sign({userID}, ACCESS_TOKEN_SECRECT,{expiresIn:"5m"});
    console.log(token);
    return token;
};

const getUserID = (token)=>{
    const {sessionID} = verify(token,ACCESS_TOKEN_SECRECT);
    if(sessionID>=0){
        return sessionID;
    }
    return null;
}

module.exports = {
    getAccessToken,
    getUserID,
}