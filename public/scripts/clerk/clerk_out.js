getGarbageList("gdetail");//get the garbage list

var d = new Date();
var date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
var time = new Date().toTimeString().split(" ")[0];

//render retreived garbage details to the html page
function renderHtmlGtype(data){
    var htmlPart = "<option> ----SELECT TYPE----</option>";
    for(i=0;i<data.length;i++){
        htmlPart += "<option>" + data[i].gindex +"- "+ data[i].waste_type + "</option>"  ;
    }
    document.getElementById("selbox1").innerHTML = htmlPart;
}

//get the data object
async function getDetail(){
    var gout_type= document.getElementById('selbox1').value;
    var gout_weight = document.getElementById('weight').value;
    var gout_bill = document.getElementById('amount').value;
    
    if (gout_type=="----SELECT TYPE----"||gout_weight==""||gout_bill==""){
        if(!alert("Required Fields are null. \nTry again..")){
            window.location.reload();
        }
        return;
    }
    else{
        console.log("rrr");
        try{
            crntID = await apiCall('GET', `${domain}/api/gout/maxid`);
            var currentID= crntID[0].pr;
            if (!currentID){nextID = 30000;}//This is the starting invoice no
            else{ nextID=currentID+1;}
        }catch(e){
            console.log(e);
        }
        return {nextID,date,time,gout_type,gout_weight,gout_bill};
    }    
}
//Invoice details
async function getData(){
    var arr = await getDetail();
    document.getElementById("invoice").innerHTML = arr.nextID;
    document.getElementById("date").innerHTML = arr.date;
    document.getElementById("time").innerHTML = arr.time;
    document.getElementById("gartype").innerHTML = arr.gout_type;
    document.getElementById("wght").innerHTML = arr.gout_weight;
    document.getElementById("amnt").innerHTML = "Rs. " + arr.gout_bill
}
//submit the data to db
async function submitGout(){
    var arr = await getDetail();
    var goutObj = {
        invoice :   arr.nextID,
        oday    :   date,
        otime   :   time,
        gtype   :   parseInt(arr.gout_type.split("-")[0]),
        oweight :   arr.gout_weight ,
        amnt    :   arr.gout_bill
    }; 
    console.log(goutObj);
    try{
        await apiCall("POST",`${domain}/api/gout`,goutObj);
        if(!alert("Garbage Out details added successfully..")){
            printDiv("myModal");
            window.location.reload();
        }
    }catch(e){
        console.log(e);
    }
}
 