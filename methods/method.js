class Method{ 
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
}

module.exports = {Get,Post,Update};