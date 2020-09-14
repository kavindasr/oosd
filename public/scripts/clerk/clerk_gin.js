getGarbageList("gintype");//get the garbage list

var d = new Date();
var date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
var time = new Date().toTimeString().split(" ")[0];

//getting the division list
async function getDivList(){
    try{
        divisions = await apiCall('GET', `${domain}/api/division/divno&divName`);
        console.log(divisions);
        var selOp = "<option> ----SELECT DIVISION----</option>";
        for(i=0;i<divisions.length;i++){
            selOp+= "<option>" + divisions[i].division_no + "-"+divisions[i].division_name + "</option>"  ;
        }
        document.getElementById("selboxdiv").innerHTML = selOp;
    }catch(e){
        console.log(e);
    }
}

//render retreived garbage details to the html page
function renderHtmlGtype(data){
    var htmlPart = "<option> ----SELECT TYPE----</option>";
    for(i=0;i<data.length;i++){
        htmlPart += "<option>" + data[i].gindex +"- "+ data[i].waste_type + "</option>"  ;
    }
    document.getElementById("selbox1").innerHTML = htmlPart;
    document.getElementById("selbox2").innerHTML = htmlPart;
}
//get the details
async function getDetail(){
    var gin_type= document.getElementById('selbox1').value;
    var gin_weight = document.getElementById('weight').value;
    var gin_bill = document.getElementById('amount').value;

    if (gin_type=="----SELECT TYPE----"||gin_weight==""||gin_bill==""){
        if(!alert("Required Fields are null. \nTry again..")){
            window.location.reload();
        }
        return;
    }
    else{
        try{
            crntID = await apiCall('GET', `${domain}/api/ginbill/maxid`);
            var currentID= crntID[0].pr;
            if (!currentID){nextID = 10000;}//This is the starting invoice no
            else{ nextID=currentID+1;}
        }catch(e){
            console.log(e);
        }
        return {nextID,gin_type,gin_weight,gin_bill};
    }
}   
//get the invoice data
async function getData(){
    var arrD = await getDetail();
    console.log(arrD);
    document.getElementById("invoice").innerHTML = arrD.nextID;
    document.getElementById("date").innerHTML = date;
    document.getElementById("time").innerHTML = time;
    document.getElementById("gartype").innerHTML = arrD.gin_type;
    document.getElementById("wght").innerHTML = arrD.gin_weight;
    document.getElementById("amnt").innerHTML = "Rs. " + arrD.gin_bill
}

async function submitGBill(){
    var arr = await getDetail();
    var ginObj = {
        invoice :   arr.nextID,
        inday   :   date,
        time    :   time,
        gtypo   :   parseInt(arr.gin_type.split("-")[0]),
        weight  :   arr.gin_weight, 
        amnt    :   arr.gin_bill 
    };
    console.log(ginObj);
    try{
        await apiCall("POST",`${domain}/api/ginbill`,ginObj);
        if(!alert("Gargabe In details added successfully..")){
            printDiv("myModal");
            window.location.reload();
        }
    }catch(e){
        console.log(e);
        alert("Error. Please Try again..")
    }
}

//submit the data to db
async function submitData(){
    var divid=document.getElementById('selboxdiv').value.split("-")[0];
    var gin_type= document.getElementById('selbox2').value.split("-")[0];
    var gin_weight = document.getElementById('mass').value;
    console.log(divid);

    if (divid==""||gin_type=="----SELECT TYPE----"||gin_weight==""){
        if(!alert("Required Fields are null. \nTry again..")){
            window.location.reload();
        }
        return;
    }
    else{
    var gObj = {
        inday   :   date,
        time    :   time,
        div     :   divid,
        gtypo   :   gin_type,
        weight  :   gin_weight 
    }; 
    console.log(gObj);
    try{
        await apiCall("POST",`${domain}/api/gunbill`,gObj);
        if(!alert("Garbage In details added successfully..")){
            window.location.reload();
        }
    }catch(e){
        console.log(e);
        alert("Error. Please Try again..")
    }
}
}
