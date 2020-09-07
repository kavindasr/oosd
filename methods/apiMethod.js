const { getTable, getConditon, getField } = require("../services/api-map");
const { executeSQL } = require("../db/db");
const { Send500, SendJson, Send200, Send405, Send400 } = require("../responses/response");

class ApiMethod {
    constructor(method) {
        this.query = null;
        this.method = method;
    }
    get getQuery() {
        return this.query;
    }
    setFeilds() {
        const fieldsList = this.method.getPath(3).split("&");
        var arr = [];
        for (var element of fieldsList) {
            arr.push(getField(element));
        }
        return arr.join();
    }

    setConditions() {
        var conditionQ = [];
        var part = "";
        this.method.url.searchParams.forEach((value, name, searchParams) => {
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
            fieldStr = fieldStr + getField(key) + ",";
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
        const fields = this.setFeilds();
        const condition = this.setConditions();
        if (condition) {
            this.query = `SELECT ${fields} FROM ${getTable(this.method.getPath(2))} WHERE ${condition}`;
        } 
        else {
            this.query = `SELECT ${fields} FROM ${getTable(this.method.getPath(2))}`;
        }
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
        const Values = StrComp["val"].slice(1, -1).split(",");
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
        const fields = this.setFeilds();
        const condition = this.setConditions();
        this.query = `SELECT ${fields} FROM ${getTable(this.method.getPath(2))} WHERE ${condition}`;
    }
}

function getReqType(value){
    if (typeof value == "number"){
        return (value);
    }else{
        return ("'" + value + "'");
    }
}

module.exports = { ApiGet, ApiPost, ApiPut, ApiDelete, ApiHead };
