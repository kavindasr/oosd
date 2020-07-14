const {URL,URLSearchParams}= require('url');
const {webSettings} = require("../settings");

const keys = ['oosd'];
function  getBody(req){
    var reqBody ='';
    req.on("data",(data)=>{
        reqBody += data;
        // if(reqBody.length>1e7){
        //     httpMsgs.send413(req,res);
        // }
    });
    req.on("end", ()=>{
        return JSON.parse(reqBody);
    });
    
}
class Method{ 
    constructor(req,res){
        this.req = req;
        this.res = res;
        this.type = req.method;
        this.url = new URL(webSettings.protocol+"://"+webSettings.host+":"+webSettings.webport+req.url);
        this.seperator = req.url.split('/');
    }
    getPath(ind){
        return this.seperator[ind];
    }
    getURL(){
        return this.url;
    }

    searchURL(query){
        return this.url.searchParams.get(query);
    }
    getUser(){
        
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
        this.body = getBody(this.req);    
    }
}

class Put extends Method{
    constructor(req,res){
        super(req,res);
        this.body = getBody(this.req);
    }
}

class Delete extends Method{
    constructor(req,res){
        super(req,res);
        this.body = getBody(this.req);
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