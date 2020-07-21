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
    setQuery(fields,table,conditions){
        if(conditions){
            this.query = `SELECT ${fields} FROM ${table} WHERE ${conditions}`;
        }
        else{
            this.query = `SELECT ${fields} FROM ${table}`;
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