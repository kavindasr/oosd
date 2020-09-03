 // insert this line to get user name in navbar
document.getElementById("userName").innerHTML = sessionStorage.getItem("OOSD_session");
//get the garbage list
getGarbageList();
//date
var d = new Date();
var date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
var time = new Date().toTimeString().split(" ")[0];

//get the list of garbegs from the database
async function getGarbageList(){
    try{
        gdetails = await apiCall('GET', `http://localhost:8000/api/gdetail/gID&gtype`);
        console.log(gdetails);
        renderHtmlGout(gdetails);
    }
    catch(e){
        console.log(e);
    }
}
//render retreived garbage details to the html page
function renderHtmlGout(data){
    var htmlPart = "";
    for(i=0;i<data.length;i++){
        htmlPart += "<option>" + data[i].gindex +"- "+ data[i].waste_type + "</option>"  ;
    }
    document.getElementById("selbox1").innerHTML = htmlPart;
}
//get the price of the selected type
async function getPrice(){
    var sel = document.getElementById("selbox1");
    var text= (sel.options[sel.selectedIndex].text).split("-")[0];
    try{
        gprice = await apiCall('GET', 'http://localhost:8000/api/gdetail/unitp?gID=\"'+text+"\"");
        console.log(gprice);
        document.getElementById("priceperkg").innerHTML = gprice[0].unit_price;
    }
    catch(e){
        console.log(e);
    }
}
//calculate the bill amount
function calculate(){
    var unit = document.getElementById("priceperkg").innerHTML;
    var mass = document.getElementById("weight").value;
    document.getElementById("amount").value = unit*mass;
}
//get the data object
async function getDetail(){
    try{
        crntID = await apiCall('GET', 'http://localhost:8000/api/gout/maxid');
        var currentID= crntID[0].pr;
        if (!currentID){nextID = 1000;}//This is the starting invoice no
        else{ nextID=currentID+1;}
    }catch(e){
        console.log(e);
    }
    var gout_type= document.getElementById('selbox1').value;
    var gout_weight = document.getElementById('weight').value;
    var gout_bill = document.getElementById('amount').value;

    return {nextID,date,time,gout_type,gout_weight,gout_bill};
}
//Invoice details
async function getData(){
    var arr = await getDetail();
    console.log(arr);
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
        oday    :   `'${arr.date}'`,
        otime   :   `'${arr.time}'`,
        gtype   :   arr.gout_type.split("-")[0],
        oweight :   arr.gout_weight ,
        amnt    :   arr.gout_bill
    }; 
    console.log(goutObj);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(!alert("Garbage Out details added successfully..")){window.location.reload();}
        }
    };
    xhttp.open("POST", "http://localhost:8000/api/gout", true);
    xhttp.send(JSON.stringify(goutObj))
}
 