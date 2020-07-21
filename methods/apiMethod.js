const {getGetQD} = require('../services/api-services');
class ApiMethod{ 
    constructor(method){
        this.query = null ;
        this.method = method;
    }
    get getQuery(){
        return this.query;
    }
    send(){
        //send response
    }
}

class ApiGet extends ApiMethod{
    constructor(method){
        super(method);
    }
    setQuery(){
        var qd = getGetQD(this.method);
        if(qd.conditions){
            this.query = `SELECT ${qd.fields} FROM ${qd.table} WHERE ${qd.conditions}`;
        }
        else{
            this.query = `SELECT ${qd.fields} FROM ${qd.table}`;
        }
        
    }
}

class ApiPost extends ApiMethod{
    constructor(method){
        super(method);
    }
    setQuery(table,fields,values){
        this.query = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
    }
}

class ApiPut extends ApiMethod{
    constructor(method){
        super(method);
    }
    setQuery(table,fields,conditions){
        this.query = `UPDATE ${table} SET ${fields} WHERE ${conditions}`;
    }
}

class ApiDelete extends ApiMethod{
    constructor(method){
        super(method);
    }

    setQuery(table,conditions){
        this.query = `DELETE FROM ${table} WHERE ${conditions}`;
    }
}

module.exports = {ApiGet,ApiPost,ApiPut,ApiDelete};