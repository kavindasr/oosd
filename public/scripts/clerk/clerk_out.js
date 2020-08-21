getGarbageList();


//get the list of garbegs from the database
function getGarbageList(){
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                    var gdetails = JSON.parse(this.responseText);
                    console.log(gdetails);
                    renderHtmlGout(gdetails);
            }
        };
        xhttp.open("GET", 'http://localhost:8000/api/gdetail/gtype', true);
        xhttp.send();
}
//render retreived garbage details to the html page
function renderHtmlGout(data){
    var htmlPart = "";
    for(i=0;i<data.length;i++){
        htmlPart += "<option>" + data[i].waste_type + "</option>"  ;
    }
    document.getElementById("selbox1").innerHTML = htmlPart;
}
//get the price of the selected type
function getPrice(){
    var sel = document.getElementById("selbox1");
    var text= sel.options[sel.selectedIndex].text;
    var xhttp = new XMLHttpRequest();
        var url =   'http://localhost:8000/api/gdetail/unitp?gtype=\"'+text+"\"";
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                    var gprice = JSON.parse(this.responseText);
                    console.log(gprice);
                    document.getElementById("priceperkg").innerHTML = gprice[0].unit_price;
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
}
//calculate the bill amount
function calculate(){
    var unit = document.getElementById("priceperkg").innerHTML;
    var mass = document.getElementById("weight").value;
    document.getElementById("amount").value = unit*mass;

}
//get the invoice data
function getData(){
    var d = new Date();
    var gin_date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
    var gin_time = new Date().toTimeString().split(" ")[0];
    var gin_type= document.getElementById('selbox1').value;
    var gin_weight = parseInt(document.getElementById('weight').value);
    var gin_bill = parseInt(document.getElementById('amount').value);

    document.getElementById("date").innerHTML = gin_date;
    document.getElementById("time").innerHTML = gin_time;
    document.getElementById("gartype").innerHTML = gin_type;
    document.getElementById("wght").innerHTML = gin_weight;
    document.getElementById("amnt").innerHTML = "Rs. " + gin_bill

}

function submitGout(){
    var d = new Date();
    var gout_date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
    var gout_time = new Date().toTimeString().split(" ")[0];
    var gout_type= document.getElementById('selbox1').value;
    var gout_weight = parseInt(document.getElementById('weight').value);
    var gout_bill = parseInt(document.getElementById('amount').value);

    var goutObj = {
        oday   :   `'${gout_date}'`,
        otime    :   `'${gout_time}'`,
        gtype   :   `'${gout_type}'`,
        oweight  :   gout_weight ,
        amnt    :   gout_bill
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
 