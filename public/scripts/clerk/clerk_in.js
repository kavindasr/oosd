function toggle(x){
    if (x==0){
        document.getElementById("bill").style.display="block";
        document.getElementById("price").style.display="block";
    }else{
        document.getElementById("bill").style.display="none";
        document.getElementById("price").style.display="none";
        return;
    }
}

function getPrice(){
    var inptype = document.getElementById("selbox1").value;
    var xhttp = new XMLHttpRequest();
        var url =   'http://localhost:8000/api/gdetail/unitp?gtype=\"'+inptype+"\"";
        console.log(url);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                    var gdetails = JSON.parse(this.responseText);
                    console.log(gdetails);
                    renderHtmlgarbagein(gdetails);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
 

function renderHtmlgarbagein(data) {
    document.getElementById("priceperkg").innerHTML = data[0].unit_price;
}


function calculate(){
    var a = document.getElementById("priceperkg").innerHTML;
    var b = document.getElementById("weight").value;
    document.getElementById("amount").value = a*b;

}

function submitGin(){
    var postUrl = "http://localhost:8000/api/gunbill";
    var d = new Date();
    var gin_date = d.getFullYear() +"-" +(d.getMonth()+1)+"-"+d.getDate();
    var gin_time = new Date().toTimeString().split(" ")[0];
    var gin_type= document.getElementById('selbox1').value;
    var gin_weight = parseInt(document.getElementById('weight').value);
    var gin_bill = document.getElementById('amount').value;

    var ginObj = {
        inday   :   `'${gin_date}'`,
        time    :   `'${gin_time}'`,
        gtypo   :   `'${gin_type}'`,
        weight  :   gin_weight 
        }; 

    if (gin_bill !== ""){
        var gin_amnt = parseInt(document.getElementById('amount').value);
        var ginObj = {
                            inday   :   `'${gin_date}'`,
                            time    :   `'${gin_time}'`,
                            gtypo   :   `'${gin_type}'`,
                            weight  :   gin_weight, 
                            amnt    :   gin_amnt 
                            };
        var postUrl = "http://localhost:8000/api/ginbill";
    };
    console.log(ginObj);
    console.log(postUrl);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Gargabe In details added successfully..");

        }
    };
    xhttp.open("POST", postUrl, true);
    xhttp.send(JSON.stringify(ginObj))
}