document.getElementById("userName").innerHTML = sessionStorage.getItem("OOSD_session"); // insert this line to get user name in navbar

function compIn(){
    var d = new Date();
    var cin_date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
    var cin_time = new Date().toTimeString().split(" ")[0];
    var pct_produce = parseInt(document.getElementById('compct').value);

    var compInObj = {
        inday   :   `'${cin_date}'`,
        time    :   `'${cin_time}'`,
        pctin    :   pct_produce
    }; 

    console.log(compInObj);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(!alert("Produced compost packet details added successfully..")){window.location.reload();}

        }
    };
    xhttp.open("POST", "http://localhost:8000/api/compin", true);
    xhttp.send(JSON.stringify(compInObj))

}

function getPctPrice(){
    var xhttp = new XMLHttpRequest();
        var url =   'http://localhost:8000/api/gdetail/unitp?gtype="compost"';
        console.log(url);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                    var compPrice = JSON.parse(this.responseText);
                    console.log(compPrice);
                    document.getElementById("priceperpct").innerHTML = compPrice[0].unit_price;
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    
}

function calculate(){
    var unitp = document.getElementById("priceperpct").innerHTML;
    var pcts = document.getElementById("nofpct").value;
    document.getElementById("amount").value = unitp*pcts;

}
//get the invoice data
function getData(){
    var d = new Date();
    var cout_date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
    var cout_time = new Date().toTimeString().split(" ")[0];
    var cout_pcts = parseInt(document.getElementById('nofpct').value);
    var cout_bill = parseInt(document.getElementById('amount').value);

    document.getElementById("date").innerHTML = cout_date;
    document.getElementById("time").innerHTML = cout_time;
    document.getElementById("pct").innerHTML = cout_pcts;
    document.getElementById("amnt").innerHTML = "Rs. " + cout_bill

}
function compOut(){
    var d = new Date();
    var cout_date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
    var cout_time = new Date().toTimeString().split(" ")[0];
    var cout_pcts = parseInt(document.getElementById('nofpct').value);
    var cout_bill = parseInt(document.getElementById('amount').value);

    var compOutObj = {
        oday   :   `'${cout_date}'`,
        otime    :   `'${cout_time}'`,
        pctout    :   cout_pcts,
        amnt    :   cout_bill
    }; 

    console.log(compOutObj);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(!alert("Sold compost packet details added successfully..")){window.location.reload();}

        }
    };
    xhttp.open("POST", "http://localhost:8000/api/compout", true);
    xhttp.send(JSON.stringify(compOutObj))

}