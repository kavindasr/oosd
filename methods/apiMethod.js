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
        var fieldStr='';
        var valueStr='';
        var data = JSON.parse(reqBody);

        for (let key in data){

            fieldStr = fieldStr + getField(key) + ",";
            valueStr = valueStr + "'" + data[key] + "'"+ ",";
        } 
        return({"field":fieldStr.slice(0,-1),"val":valueStr.slice(0,-1)});
    }
    async execute(sql){
        try{
            const data =  await executeSQL(sql);
            data.then(function(val){
                return new SendJson(JSON.stringify(val));
            })
            data.catch(console.log("db failed"));
            
        }catch(e){ 
            //return new Send500(e);
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
    async setQuery(){

        const StrComp = await this.jsBody();
        const fields = StrComp["field"];
        const values = StrComp["val"];

        this.query = `INSERT INTO ${getTable(this.method.getPath(2))} (${fields}) VALUES (${values})`;

        return(true);
        
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