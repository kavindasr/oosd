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
        var arr=[];
        var data={}; 
        var summ={};
        if (reqType=="unbilled"){
            data = await executeSQL(`SELECT in_date, g_type,SUM(in_weight) AS "total_weight" FROM gin_unbilled WHERE in_date>=${sDate} AND in_date<=${eDate}GROUP BY in_date,g_type;`)
            // data = await executeSQL(`SELECT * FROM gin_unbilled WHERE in_date >= ${sDate} AND in_date <= ${eDate}`) ;
            // summ = sumFind(data,"in_weight","bill_amount","g_type");
        }else if (reqType=="billed"){
            data=await executeSQL(`SELECT in_date,g_type, SUM(bill_amount) AS "total_bill",SUM(in_weight) AS
             "total_weight" FROM gin_billed WHERE in_date>=${sDate} AND in_date<=${eDate} GROUP BY in_date,g_type ORDER BY in_date,g_type`);
            
            for(var i=0;i<data.length-1;i++){
                var obj;
                if(data[i].in_date == data[i+1].in_date){
                    obj = {
                        date: data[i].in_date,
                        deg: data[i].total_weight,
                        nondeg:data[i+1].total_weight
                    }
                }
                else if(data[i].g_type == 1){
                    obj = {
                        date:data[i].in_date,
                        deg:data[i].total_weight,
                        nondeg:0
                    }
                }
                else if(data[i].g_type == 2){
                    obj = {
                        date: data[i].in_date,
                        deg:0,
                        nondeg:data[i].total_weight
                    }
                }
                arr.push(obj);
            }
            
            //data = await executeSQL(`SELECT * FROM gin_billed WHERE in_date >= ${sDate} AND in_date <= ${eDate}`) ;
            //console.log(data);
            //summ = sumFind(data,"in_weight","bill_amount","g_type");
        }else if (reqType=="gOut"){
            data=await executeSQL(`SELECT out_date,g_type, SUM(bill_amount) AS "Total bill",SUM(in_weight) AS
             "Total weight" FROM gin_billed WHERE in_date>=${sDate} AND in_date<=${eDate} GROUP BY in_date,g_type`);
            //data = await executeSQL(`SELECT * FROM garbage_out WHERE out_date >= ${sDate} AND out_date <= ${eDate}`) ;
            //summ = sumFind(data,"weight","bill_amount","waste_type");
        }else if (reqType=="cOut"){
            data = await executeSQL(`SELECT out_date, SUM(pct_sold) AS "Total pct",SUM(bill_amount) AS "Total bill" FROM 
            compost_out WHERE out_date>=${sDate} AND out_date<=${eDate} GROUP BY out_date;`)
            // data = await executeSQL(`SELECT * FROM compost_out WHERE out_date >= ${sDate} AND out_date <= ${eDate}`) ;
            // summ = sumFind(data,"pct_sold","bill_amount");
        }else if (reqType=="cin"){
            data = await executeSQL(`SELECT in_date, SUM(pct_produced) AS "Total pct" FROM compost_in WHERE 
            in_date>=${sDate} AND in_date<=${eDate} GROUP BY in_date;`)
        }else{
            data = {"error":"cant take action"};
            //summ = {"error":"cant take action"};
        }
        
        return(arr);
    }

    async execute(type){
        
        var res = "Cannot access this type of report";
        
        if(this.method.getPath(2)=="absentee" && type == 'moh'){
            res = await this.absenteeCal();
        }else if (this.method.getPath(2) == "dRange" && type == 'moh'){
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