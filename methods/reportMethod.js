const {executeSQL} = require("../db/db");
const {SendJson} = require("../responses/response");

class reportMethod{
    constructor(method){
        this.method = method;
    }
    async absenteeCal(){
        const empID = this.method.searchURL("empID");
        const givenMonth = this.method.searchURL("month");
        const currMonth = new Date().getMonth() + 1 ;
        const currYear = new Date().getFullYear();
        const data = (await executeSQL(`SELECT * FROM daily_attendance WHERE month(tdate) = ${givenMonth} and YEAR(tdate) = ${currYear} and employee_id = ${empID}`)).length ;

        return (data);
    }
    async getdRange(reqType){
        const sDate = this.method.searchURL("sDate");
        const eDate = this.method.searchURL("eDate");
        var amStr="",prStr="";
        var data={}; 
        var summ={};
        if (reqType=="unbilled"){
            data = await executeSQL(`SELECT * FROM gin_unbilled WHERE in_date >= ${sDate} AND in_date <= ${eDate}`) ;
            summ = sumFind(data,"in_weight","bill_amount","g_type");
        }else if (reqType=="billed"){
            data = await executeSQL(`SELECT * FROM gin_billed WHERE in_date >= ${sDate} AND in_date <= ${eDate}`) ;
            summ = sumFind(data,"in_weight","bill_amount","g_type");
        }else if (reqType=="gOut"){
            data = await executeSQL(`SELECT * FROM garbage_out WHERE out_date >= ${sDate} AND out_date <= ${eDate}`) ;
            summ = sumFind(data,"weight","bill_amount","waste_type");
        }else if (reqType=="cOut"){
            data = await executeSQL(`SELECT * FROM compost_out WHERE out_date >= ${sDate} AND out_date <= ${eDate}`) ;
            summ = sumFind(data,"pct_sold","bill_amount");
        }else{
            data = {"error":"cant take action"};
            summ = {"error":"cant take action"};
        }
        
        return({'data':data,'summary':summ});
    }

    async execute(type){
        
        var res = "Cannot access this type of report";
        
        if(this.method.getPath(2)=="absentee" && type == 'moh'){
            res = await this.absenteeCal();
        }else if (this.method.getPath(2) == "dRange" && type == 'clerk'){
            res = await this.getdRange(this.method.getPath(3));
        }
        return new SendJson(JSON.stringify(res));

    }
}

function sumFind(dataList,amStr,prStr,type){
    var summ = {};
    var sum = {"cSold":{"amount":0,"price":0}};

    dataList.forEach(handleSummary);

    function handleSummary(data){
        var amount = 0, price = 0;
        if (type){
            const gType = data[type];
            try{
                var value = summ[gType];
                amount = value.amount + data[amStr];
                price = value.price + data[prStr];
            }catch(e){
                amount = amount + data[amStr];
                price = price + data[prStr];
            }
            summ[gType]={'amount':amount,'price':price};
        }else{
            amount = sum["cSold"].amount + data[amStr];
            price = sum["cSold"].price + data[prStr];
            sum["cSold"]={'amount':amount,'price':price};
            
        }
        
            
    }
    if (type){
        return(summ);
    }else{
        return(sum);
    }
    
}

module.exports = {reportMethod};