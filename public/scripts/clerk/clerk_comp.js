var d = new Date();
var date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
var time = new Date().toTimeString().split(" ")[0];
 
//add compin data to database
async function compIn(){
    var pct_produce = parseInt(document.getElementById('compct').value);
    var compInObj = {
        inday   :   date,
        time    :   time,
        pctin    :   pct_produce
    }; 
    console.log(compInObj);
    try{
        await apiCall("POST",'http://localhost:8000/api/compin',compInObj);
        if(!alert("Produced compost packet details added successfully..")){window.location.reload();}
    }catch(e){
        console.log(e);
    }
}

async function getPctPrice(){
    try{
        compPrice = await apiCall('GET', 'http://localhost:8000/api/gdetail/unitp?gtype="Compost"');
        console.log(compPrice);
        document.getElementById("priceperpct").innerHTML = compPrice[0].unit_price;
    }catch(e){
        console.log(e);
    }
}

async function getDetail(){
    try{
        crntID = await apiCall('GET', 'http://localhost:8000/api/compout/maxid');
        var currentID= crntID[0].pr;
        if (!currentID){nextID = 50000;}//This is the starting invoice no
        else{ nextID=currentID+1;}
    }catch(e){
        console.log(e);
    }
    var cout_pcts = parseInt(document.getElementById('nofpct').value);
    var cout_bill = parseInt(document.getElementById('amount').value);

    return {nextID,cout_pcts,cout_bill};
}
//get the invoice data
async function getData(){
    var arrD = await getDetail();
    console.log(arrD);
    document.getElementById("invoice").innerHTML = arrD.nextID;
    document.getElementById("date").innerHTML = date;
    document.getElementById("time").innerHTML = time;
    document.getElementById("pct").innerHTML = arrD.cout_pcts;
    document.getElementById("amnt").innerHTML = "Rs. " + arrD.cout_bill
}
async function compOut(){
    var arr = await getDetail();
    var compOutObj = {
        invoice :   arr.nextID,
        oday    :   date,
        otime   :   time,
        pctout  :   arr.cout_pcts,
        amnt    :   arr.cout_bill
    }; 
    console.log(compOutObj);
    try{
        await apiCall("POST",'http://localhost:8000/api/compout',compOutObj);
        if(!alert("Sold compost packet details added successfully..")){
            printDiv("myModal");
            window.location.reload();
        }
    }catch(e){
        console.log(e);
    }
}