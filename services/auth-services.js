const {sign, verify} = require("jsonwebtoken");

const ACCESS_TOKEN_SECRECT = "ksr";
const getAccessToken = (userID)=>{
    token = sign({userID}, ACCESS_TOKEN_SECRECT,{expiresIn:"5m"});
    console.log(token);
    return token;
};

const isAuth = (req)=>{
    const {accessToken} = req.cookies;
    if(!accessToken){
        return false;
    }
    const {userID} = verify( accessToken,ACCESS_TOKEN_SECRECT);
    if(userID>=0){
        return true;
    }
    return false;
}

module.exports = {
    getAccessToken,
    isAuth,
}