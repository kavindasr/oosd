getGarbageList();//get the garbage list
var d = new Date();
var date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
var time = new Date().toTimeString().split(" ")[0];
// insert this line to get user name in navbar
document.getElementById("userName").innerHTML = sessionStorage.getItem("OOSD_session"); 

//get the list of garbegs from the database
async function getGarbageList(){
    try{
        gdetails = await apiCall('GET', `http://localhost:8000/api/gdetail/gID&gtype`);
        console.log(gdetails);
        renderHtmlGtype(gdetails);
    }catch(e){
        console.log(e);
    }
}
//render retreived garbage details to the html page
function renderHtmlGtype(data){
    var htmlPart = "";
    for(i=0;i<data.length;i++){
        htmlPart += "<option>" + data[i].gindex +"- "+ data[i].waste_type + "</option>"  ;
    }
    document.getElementById("selbox1").innerHTML = htmlPart;
    document.getElementById("selbox2").innerHTML = htmlPart;
}
async function getPrice(){
    var sel = document.getElementById("selbox1");
    var text= (sel.options[sel.selectedIndex].text).split("-")[0];
    try{
        gprice = await apiCall('GET', 'http://localhost:8000/api/gdetail/unitp?gID=\"'+text+"\"");
        console.log(gprice);
        document.getElementById("priceperkg").innerHTML = gprice[0].unit_price;
    }catch(e){
        console.log(e);
    }
}
//calculate price
function calculate(){
    var unitp = document.getElementById("priceperkg").innerHTML;
    var weight = document.getElementById("weight").value;
    document.getElementById("amount").value = unitp*weight;
}
//get the details
async function getDetail(){
    try{
        crntID = await apiCall('GET', 'http://localhost:8000/api/ginbill/maxid');
        var currentID= crntID[0].pr;
        if (!currentID){nextID = 10000;}//This is the starting invoice no
        else{ nextID=currentID+1;}
    }catch(e){
        console.log(e);
    }
    var gin_type= document.getElementById('selbox1').value;
    var gin_weight = document.getElementById('weight').value;
    var gin_bill = document.getElementById('amount').value;
    return {nextID,gin_type,gin_weight,gin_bill};
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
        inday   :   `'${date}'`,
        time    :   `'${time}'`,
        gtypo   :   arr.gin_type.split("-")[0],
        weight  :   arr.gin_weight, 
        amnt    :   arr.gin_bill 
    };
    console.log(ginObj);
    try{
        await apiCall("POST",'http://localhost:8000/api/ginbill',ginObj);
        if(!alert("Gargabe In details added successfully..")){
            printDiv("myModal");
            window.location.reload();
        }
    }catch(e){
        console.log(e);
    }
}

//submit the data to db
async function submitData(){
    var gin_type= document.getElementById('selbox2').value.split("-")[0];
    var gin_weight = parseInt(document.getElementById('mass').value);
    console.log("aa");
    var gObj = {
        inday   :   `'${date}'`,
        time    :   `'${time}'`,
        gtypo   :   gin_type,
        weight  :   gin_weight 
    }; 
    console.log(gObj);
    try{
        await apiCall("POST",'http://localhost:8000/api/gunbill',gObj);
        if(!alert("Garbage In details added successfully..")){
            window.location.reload();
        }
    }catch(e){
        console.log(e);
    }
}
