const { getTable, getConditon, getField } = require("../services/api-map");
const { executeSQL } = require("../db/db");
const { Send500, SendJson, Send200, Send405, Send400 } = require("../responses/response");

class ApiMethod {
    constructor(method) {
        this.query = null;
        this.method = method;
        this.isQueryValid = true;
    }
    get getQuery() {
        return this.query;
    }
    setFields(feilds,table) {
        const fieldsList = feilds.split("&");
        var arr = [];
        for (var element of fieldsList) {
            var field = getField(element);
            if(!field){
                this.isQueryValid = false;
            }
            //This if else id added to avoid the error in this garbage_out.MAX(invoice_no)
            if(field=="MAX(invoice_no) AS pr"){
                arr.push(field);
            }else{
                arr.push(table+"."+field);
            }
          
        }
        return arr.join();
    }

    setConditions() {
        var conditionQ = [];
        var part = "";
        this.method.url.searchParams.forEach((value, name, searchParams) => {
            if(!value || !name){
                this.isQueryValid = false;
            }
            part = `${getConditon(name)}="${value}"`;
            conditionQ.push(part);
        });
        return conditionQ.join(" AND ");
        //console.log(conditionQ.join());
    }
    async jsBody() {
        const reqBody = await this.method.getBody();
        var fieldStr = "", valueStr = "", valueFinal = "";
        var dataList = [];
        var data = JSON.parse(reqBody);

        if (Array.isArray(data)){
            dataList = data;
        }else{
            dataList.push(data);
        }

        for (let key in dataList[0]) {
            var field = getField(key);
            if(!field){
                this.isQueryValid = false;
            }
            fieldStr = fieldStr + field + ",";
        }

        dataList.forEach(doThis);

        function doThis(data){
            valueStr = "";
            for (let key in data) {
                valueStr = valueStr + getReqType(data[key]) + ",";
            }
            valueStr = "(" + valueStr.slice(0, -1) + ")"  ;
            valueFinal = valueFinal + valueStr + "," ;
        }
        
        return { field: fieldStr.slice(0, -1), val: valueFinal.slice(0, -1) };
    }
    async execute(isVaild) {
        if(!isVaild){
            return new Send405();
        }
        if(!this.isQueryValid){
            return new Send400();
        }
        try {
            const data = await executeSQL(this.query);
            if(this.method.type == 'GET'){
                return new SendJson(JSON.stringify(data));
            }
            else{
                if(this.method.type == 'HEAD' && data.length == 0){
                    return new Send400();
                }
                return new Send200();
            }
            
        } 
        catch (e) {
            return new Send500();
        }
    }
}

class ApiGet extends ApiMethod {
    constructor(method) {
        super(method);
    }
    setQuery() {
        var fields,table,condition;
        if(this.method.getPath(3) == 'join'){
            ({table,fields,condition} = this.join());
        }
        else{
            table = getTable(this.method.getPath(2));
            fields = this.setFields(this.method.getPath(3),table);
            condition = this.setConditions();
        }
        
        if (condition) {
            this.query = `SELECT ${fields} FROM ${table} WHERE ${condition}`;
        } 
        else {
            this.query = `SELECT ${fields} FROM ${table}`;
        }
    }
    join(){
        var table1,table2,t1f1,t2f2,type,fieldsT1,fieldsT2;
        type = this.method.getPath(4);
        table1 = getTable(this.method.getPath(2));
        table2 = getTable(this.method.getPath(5));
        t1f1 = getField(this.method.getPath(6));
        t2f2 = getField(this.method.getPath(7));
        if(!table1 || !table2 || !t1f1 || !t2f2){
            this.isQueryValid = false;
        }
        fieldsT1 = this.setFields(this.method.getPath(8),table1);
        fieldsT2 = this.setFields(this.method.getPath(9),table2);
        const mid = `${table1} ${type} JOIN ${table2} ON ${table1}.${t1f1} = ${table2}.${t2f2}`;
        var end,cond;
        end = `${fieldsT1},${fieldsT2}`;
        if(type == 'inner'){
            cond = this.setConditions();
        }
        else{
            cond = getConditon(this.method.searchURL('where'));
        }
        return {table:mid,fields:end,condition:cond};
    }
}

class ApiPost extends ApiMethod {
    constructor(method) {
        super(method);
    }
    async setQuery() {
        const StrComp = await this.jsBody();
        const fields = StrComp["field"];
        const values = StrComp["val"];

        this.query = `INSERT INTO ${getTable(this.method.getPath(2))} (${fields}) VALUES ${values}`;
        return true;
    }
}

class ApiPut extends ApiMethod {
    constructor(method) {
        super(method);
    }
    async setQuery() {
        const StrComp = await this.jsBody();
        const Fields = StrComp["field"].split(",");
        const Values = StrComp["val"].slice(1,-1).split(",");
        const condition = this.setConditions();

        var fieldsQ = [];
        for (var i = 0; i < Fields.length; i++) {
            var fieldStr = `${Fields[i]}=${Values[i]}`;
            fieldsQ.push(fieldStr);
        }

        const fieldstr = fieldsQ.join(",");
        this.query = `UPDATE ${getTable(this.method.getPath(2))} SET ${fieldstr} WHERE ${condition}`;
    }
}

class ApiDelete extends ApiMethod {
    constructor(method) {
        super(method);
    }

    async setQuery() {
        const condition = this.setConditions();
        this.query = `DELETE FROM ${getTable(this.method.getPath(2))} WHERE ${condition}`;
    }
}

class ApiHead extends ApiMethod {
    constructor(method) {
        super(method);
    }
    setQuery() {
        const table = getTable(this.method.getPath(2));
        if(!table){
            this.isQueryValid = false;
        }
        const fields = this.setFields(this.method.getPath(3),table);
        const condition = this.setConditions();
        this.query = `SELECT ${fields} FROM ${table} WHERE ${condition}`;
    }
}

function getReqType(value){
    if (typeof value == "number" || value == null){
        return (value);
    }else{
        return ("'" + value + "'");
    }
}

module.exports = { ApiGet, ApiPost, ApiPut, ApiDelete, ApiHead };
