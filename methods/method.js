const {URL}= require('url');
const {webSettings} = require("../settings");
const Cookies = require("cookies");
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
        this.seperator = req.url.split('/');
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

    setToken(token){
        var cookies = new Cookies(this.req, this.res, { keys: keys });
        cookies.set('OOSD_TOKEN', token, { signed: true, maxAge:500000})
    }

    setUser(user){
        this.user=user;
    }
}

class Get extends Method{
    constructor(req,res){
        super(req,res);
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
}

/*class Method{ 
    constructor(req,res){
        this.query = null ;
        this.req = req;
        this.res = res;
    }
    get getQuery(){
        return this.query;
    }
    send(){
        //send response
    }
}

class Get extends Method{
    constructor(req,res){
        super(req,res);
    }
    setQuery(fields,table,conditions){
        if(conditions){
            this.query = `SELECT ${fields} FROM ${table} WHERE ${conditions}`;
        }
        else{
            this.query = `SELECT ${fields} FROM ${table}`;
        }
        
    }
}

class Post extends Method{
    constructor(req,res){
        super(req,res);   
    }
    setQuery(table,fields,values){
        this.query = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
    }
}

class Update extends Method{
    constructor(req,res){
        super(req,res);
    }
    setQuery(table,fields,conditions){
        this.query = `UPDATE ${table} SET ${fields} WHERE ${conditions}`;
    }
}*/


module.exports = {Get,Post,Put,Delete};