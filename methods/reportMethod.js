const {executeSQL} = require("../db/db");
const {SendJson} = require("../responses/response");

class reportMethod{
    constructor(method){
        this.method = method;
        this.queryType={
            unbilled:{coloumn:"in_date,g_type",field:"in_weight",table:"gin_unbilled",finLength:3,redLength:0},
            billed:{coloumn:"in_date,g_type",field:"in_weight",table:"gin_billed",finLength:3,redLength:0},
            billedAmount:{coloumn:"in_date,g_type",field:"bill_amount",table:"gin_billed",finLength:3,redLength:0},
            gOut:{coloumn:"out_date,waste_type",field:"weight",table:"garbage_out",finLength:8,redLength:9},
            gOutPrice:{coloumn:"out_date,waste_type",field:"bill_amount",table:"garbage_out",finLength:8,redLength:9},
            cOut:{coloumn:"out_date",field:"pct_sold",table:"compost_out",finLength:2,redLength:0},
            cOutPrice:{coloumn:"out_date",field:"bill_amount",table:"compost_out",finLength:2,redLength:0},
            cin:{coloumn:"in_date",field:"pct_produced",table:"compost_in",finLength:2,redLength:0}

        };
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
        var arr=[];
        var data={}; 
        if (reqType=="unbilled"){//monthly gin unbilled
            arr = getArray(this.queryType[reqType],sDate,eDate);
        }
        else if (reqType=="billed"){//monthly gin billed weight
            arr = getArray(this.queryType[reqType],sDate,eDate);
        }
        else if(reqType=="billedAmount"){//monthly gin billed price
            arr = getArray(this.queryType[reqType],sDate,eDate);
        }
        else if (reqType=="gOut"){//monthly garbage out weight
            arr = getArray(this.queryType[reqType],sDate,eDate);
        }
        else if (reqType=="gOutPrice"){//monthly garbage out price
            arr = getArray(this.queryType[reqType],sDate,eDate);
        }
        else if (reqType=="cOut"){//monthly compost no of packets
            arr = getArray(this.queryType[reqType],sDate,eDate);
        }
        else if (reqType=="cOutPrice"){//monthly compost packet total price
            arr = getArray(this.queryType[reqType],sDate,eDate);
        }
        else if (reqType=="cin"){//monthly compost in total packets
            arr = getArray(this.queryType[reqType],sDate,eDate);
        }else{
            data = {"error":"cant take action"};
        }
        
        return(arr);
    }

    async dailyAttendence(){
        const data = (await executeSQL(`SELECT * FROM daily_attendance WHERE tdate=${this.method.searchURL("date")}`));
        const data2 = (await executeSQL(`SELECT * FROM vehicle_distribution INNER JOIN vehicle_detail on vehicle_distribution.vehicle_index = vehicle_detail.index_no WHERE tdate=${this.method.searchURL("date")}`));
        
        var ATTarr = new Array();
        var VEHarr = new Array();

        await data2.forEach(data => {
            
            var obj = {};
            obj["vehicle"] = data.vehicle_num;
            obj["driver"]= data.driver;
            obj["employees"] = [];
            VEHarr[data.division-1] = obj;
             
        });


        if (VEHarr.length>0 && data.length>0){
            data.forEach(data =>{
                if (ATTarr[data.division-1]==null){
                    var obj = [];
                    obj.push(data.employee_id);
                    ATTarr[data.division-1] = obj;
                }else{
                    ATTarr[data.division-1].push(data.employee_id);
                } 
    
                if(data.vehiclewalk==2){
                    VEHarr[data.division-1]["employees"].push(data.employee_id);
                }
    
            });

            var ar = new Array();
            ar.push(ATTarr);
            ar.push(VEHarr);
            return (ar);
            
        }else{
            return("error, cant take action");
        }
         
    }

    async execute(type){
        
        var res = "Cannot access this type of report";
        
        if(this.method.getPath(2)=="absentee" && type == 'moh'){
            res = await this.absenteeCal();
        }else if (this.method.getPath(2) == "dRange" && (type == 'moh' || type == 'mayor')){
            res = await this.getdRange(this.method.getPath(3));
        }
        else if(this.method.getPath(2) == "vehicleDistribution" && type=="depot"){
            res = await todayVehicleDistribution(this.method.searchURL('date'));
        }
        else if(this.method.getPath(2) == "dAttendence" && (type == 'moh' || type == 'mayor')){
            res = await this.dailyAttendence();
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

async function getArray(qType,sDate,eDate){
     
    var arr = [];
    var arr0 = new Array(parseInt(qType.finLength)).fill(0);
    arr.push(arr0);
    var data = await executeSQL(`SELECT ${qType["coloumn"]}, SUM(${qType["field"]}) AS "total" FROM ${qType["table"]} WHERE ${qType["coloumn"].split(",")[0]}>=${sDate} AND  ${qType["coloumn"].split(",")[0]}<=${eDate} GROUP BY ${qType["coloumn"]} ORDER BY ${qType["coloumn"]}`);   
    
    data.forEach(data => {

        var date = qType["coloumn"].split(",")[0];
        var type = qType["coloumn"].split(",")[1];
        var index=0;

        const dat = data[date].toLocaleString().split("/"); // converting the time zone
        
        var usableDate = "";  // Extractig the required parts

        if(dat[0].length==1){
            usableDate = "0" + dat[0];
        }else{
            usableDate = dat[0];
        }

        if(dat[1].length==1){
            usableDate = usableDate + "- 0" + dat[1];
        }else{
            usableDate = usableDate + "- " + dat[1];
        }

        if(type){
            index = data[type]-qType.redLength;
        }else{
            index = 1;
        }
        
        if (String(arr[arr.length-1][0])==usableDate){//JSON.stringify(data[date]).slice(6,11)){
            arr[arr.length-1][index] = data.total;
        }else{
            var obj = new Array(parseInt(qType.finLength)).fill(0);;
            obj[0] = usableDate;//JSON.stringify(data[date]).slice(6,11);
            obj[index]=data.total;
            arr.push(obj);
        }
        
    });

    return (arr.slice(1));
}


module.exports = {reportMethod};