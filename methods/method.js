const {URL}= require('url');
const {webSettings} = require("../setting");
const Cookies = require("cookies");
const {ApiGet,ApiPost,ApiPut,ApiDelete,ApiHead} = require("./apiMethod");
const keys = ['oosd'];

function  getBODY(req){
    return new Promise((resolve,reject)=>{
        var reqBody ='';
        req.on("data",(data)=>{
            reqBody += data;
            if(reqBody.length>1e7){
                reject({err:"Can't handle the request"});
            }
        });
    req.on("end", ()=>{
        //console.log(reqBody);
        resolve(reqBody); 
    });
    
    });
}
class Method{ 
    constructor(req,res){
        this.req = req;
        this.res = res;
        this.type = req.method;
        this.url = new URL(webSettings.protocol+"://"+webSettings.host+":"+webSettings.webport+req.url);
        this.seperator = req.url.split(/[/,?]/);
        this.user=null;
    }
    getPath(ind){
        return this.seperator[ind];
    }

    searchURL(query){
        return this.url.searchParams.get(query);
    }
    getToken(){
        var cookies = new Cookies(this.req, this.res, { keys: keys });
        var token = cookies.get("OOSD_TOKEN",{signed:true});
        return token;
    }

    setToken(token,httpOnly,time){
        var cookies = new Cookies(this.req, this.res, { keys: keys });
        cookies.set('OOSD_TOKEN', token, { signed: true, maxAge:time,httpOnly:httpOnly});
    }

    setUser(user){
        this.user=user;
    }

}

class Get extends Method{
    constructor(req,res){
        super(req,res);
    }
    getApiMethod(){
        return new ApiGet(this);
    }
}

class Post extends Method{
    constructor(req,res){
        super(req,res);
        this.body = null;
    }

    async getBody(){
        this.body = await getBODY(this.req);
        return this.body;
    }

    getApiMethod(){
        return new ApiPost(this);
    }
}

class Put extends Method{
    constructor(req,res){
        super(req,res);
        this.body = null;
    }
    
    async getBody(){
        this.body = await getBODY(this.req);
        return this.body;
    }

    getApiMethod(){
        return new ApiPut(this);
    }
}

class Delete extends Method{
    constructor(req,res){
        super(req,res);
        this.body = null;
    }
    
    async getBody(){
        this.body = await getBODY(this.req);
        return this.body;
    }

    getApiMethod(){
        return new ApiDelete(this);
    }
}

class Head extends Method{
    constructor(req,res){
        super(req,res);
    }
    getApiMethod(){
        return new ApiHead(this);
    }
}

module.exports = {Get,Post,Put,Delete,Head};