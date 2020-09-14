var d = new Date();
var date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
var time = new Date().toTimeString().split(" ")[0];
 
//add compin data to database
async function compIn(){
    var pct_produce = document.getElementById('compct').value;
    if (pct_produce==""){
        if(!alert("Required Fields are null. \nTry again..")){
            window.location.reload();
        }
        return;
    }else{
        var compInObj = {
            inday   :   date,
            time    :   time,
            pctin   :   parseInt(pct_produce)
        }; 
        console.log(compInObj);
        try{
            await apiCall("POST",`${domain}/api/compin`,compInObj);
            if(!alert("Produced compost packet details added successfully..")){window.location.reload();}
        }catch(e){
            console.log(e);
            alert("Error occured. Try Again");
        }
    }
}

async function getPctPrice(){
    try{
        compPrice = await apiCall('GET', `${domain}/api/gdetail/unitp?gtype=Compost`);
        console.log(compPrice);
        document.getElementById("priceperpct").innerHTML = compPrice[0].unit_price;
    }catch(e){
        console.log(e);
    }
}

async function getDetail(){
    var cout_pcts = document.getElementById('nofpct').value;
    var cout_bill = document.getElementById('amount').value;
    if (cout_pcts==""||cout_bill==""){
        if(!alert("Required Fields are null. \nTry again..")){
            window.location.reload();
        }
        return;
    }else{
        try{
            crntID = await apiCall('GET', `${domain}/api/compout/maxid`);
            var currentID= crntID[0].pr;
            if (!currentID){nextID = 50000;}//This is the starting invoice no
            else{ nextID=currentID+1;}
        }catch(e){
            console.log(e);
            alert("Error occured. Try Again");
        }
        return {nextID,cout_pcts,cout_bill};
    }    
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
        await apiCall("POST",`${domain}/api/compout`,compOutObj);
        if(!alert("Sold compost packet details added successfully..")){
            printDiv("myModal");
            window.location.reload();
        }
    }catch(e){
        console.log(e);
    }
}