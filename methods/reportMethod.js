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
            arr = getArray('in_weight','gin_unbilled',sDate,eDate);
        }else if (reqType=="billed"){
            arr = getArray('in_weight','gin_billed',sDate,eDate);
        }
        else if(reqType=="billedAmount"){
            arr = await getArray('bill_amount','gin_billed',sDate,eDate);
            console.log(arr);
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
        else if(this.method.getPath(2) == "vehicleDistribution" && type=="depot"){
            res = await todayVehicleDistribution(this.method.searchURL('date'));
        }
        return new SendJson(JSON.stringify(res));

    }
}

async function todayVehicleDistribution(tdate){
    const data = await executeSQL(`SELECT division_name,vehicle_num,driver FROM ((vehicle_distribution
        INNER JOIN vehicle_detail ON vehicle_distribution.vehicle_index = vehicle_detail.index_no)
        INNER JOIN division_table ON vehicle_distribution.division = division_table.division_no) WHERE tdate='${tdate}';`);
    return data;
}

async function getArray(field,table,sDate,eDate){
    //data=await executeSQL(`SELECT in_date,g_type, SUM(bill_amount) AS "total",SUM(in_weight) AS "total_weight" FROM gin_billed WHERE in_date>=${sDate} AND in_date<=${eDate} GROUP BY in_date,g_type ORDER BY in_date,g_type`); 
    var arr = [];
    var data = await executeSQL(`SELECT in_date,g_type, SUM(${field}) AS "total" FROM ${table} WHERE in_date>=${sDate} AND in_date<=${eDate} GROUP BY in_date,g_type ORDER BY in_date,g_type`);   
    for(var i=0;i<data.length-1;i++){
        var obj;
        if(String(data[i].in_date)== String(data[i+1].in_date)){
            obj = [
                data[i].in_date,
                data[i].total,
                data[i+1].total
            ]
            i++;
        }
        else if(data[i].g_type == 1){
            obj = [
                data[i].in_date,
                data[i].total,
                0
            ]
        }
        else if(data[i].g_type == 2){
            obj = [
                data[i].in_date,
                0,
                data[i].total
            ]
        }
        arr.push(obj);
    }
    return arr;
}

module.exports = {reportMethod};