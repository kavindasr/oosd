const  {getTable,getConditon,getField} = require('../services/api-map');
const {executeSQL} = require('../db/db');
const {Send500,SendJson} = require('../responses/response');

class ApiMethod{ 
    constructor(method){
        this.query = null ;
        this.method = method;
    }
    get getQuery(){
        return this.query;
    }
    setFeilds(){
        const fieldsList = this.method.getPath(3).split('&');
        var arr = [];
        for (var element of fieldsList){
            arr.push(getField(element));
        }
        return arr.join();
    }

    setConditions(){
        var conditionQ=[];
        var part ="";
        this.method.url.searchParams.forEach((value, name, searchParams) => {
            part = `${getConditon(name)}="${value}"`
            conditionQ.push(part);
        });
        return conditionQ.join(" AND ");
        //console.log(conditionQ.join());
    }
    async jsBody(){
        const reqBody = await this.method.getBody();
        var datString="";
        var data = JSON.parse(reqBody);
        for (let key in data){
            datString=datString  + getFields(key) + "=" + data[key] + ",";
        }
        return(datString.slice(0,-1));
    }
    async execute(){
        try{
            const data = await executeSQL(this.getQuery);
            return new SendJson(JSON.stringify(data));
        }catch(e){
            return new Send500(e);
        }
    }

}

class ApiGet extends ApiMethod{
    constructor(method){
        super(method);
    }
    setQuery(){
        const fields = this.setFeilds();
        const condition = this.setConditions();
        if(condition){
            this.query = `SELECT ${fields} FROM ${getTable(this.method.getPath(2))} WHERE ${condition}`;
        }
        else{
            this.query = `SELECT ${fields} FROM ${getTable(this.method.getPath(2))}`;
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