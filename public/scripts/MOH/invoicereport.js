function getinvoicegarbageout() {
    var invoice_num = document.getElementById("invoicenum").value;
    var xhttp = new XMLHttpRequest();
    var url ="http://localhost:8000/api/gout/all?invoice=" +invoice_num;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var empdetails = JSON.parse(this.responseText);
            rendergarbageout(empdetails);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function rendergarbageout(arr){
    console.log(arr);
    document.getElementById("myModal2").style.display ="block";
    document.getElementById("invoice2").innerHTML = arr[0].invoice_no;
    document.getElementById("date2").innerHTML = arr[0].out_date;
    document.getElementById("time2").innerHTML = arr[0].out_time;
    document.getElementById("gartype2").innerHTML = arr[0].waste_type;
    document.getElementById("wght2").innerHTML = arr[0].weight;
}

function getinvoicegarbagein() {
    var invoice_num = document.getElementById("invoicenum").value;
    var xhttp = new XMLHttpRequest();
    var url ="http://localhost:8000/api/ginbill/all?invoice=" +invoice_num;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var empdetails = JSON.parse(this.responseText);
            rendergarbagein(empdetails);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function rendergarbagein(arr){
    console.log(arr[0]);
    document.getElementById("myModal1").style.display ="block";
    document.getElementById("invoice1").innerHTML = arr[0].invoice_no;
    document.getElementById("date1").innerHTML = arr[0].in_date;
    document.getElementById("time1").innerHTML = arr[0].in_time;
    document.getElementById("gartype1").innerHTML = arr[0].g_type;
    document.getElementById("wght1").innerHTML = arr[0].in_weight;
    document.getElementById("amnt1").innerHTML = arr[0].bill_amount;
}

function getinvoicecompost() {
    var invoice_num = document.getElementById("invoicenum").value;
    var xhttp = new XMLHttpRequest();
    var url ="http://localhost:8000/api/compout/all?invoice=" +invoice_num;
    console.log(url);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var empdetails = JSON.parse(this.responseText);
            rendercompost(empdetails);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function rendercompost(arr){
    console.log(arr[0]);
    document.getElementById("myModal3").style.display ="block";
    document.getElementById("invoice3").innerHTML = arr[0].invoice_no;
    document.getElementById("date3").innerHTML = arr[0].out_date;
    document.getElementById("time3").innerHTML = arr[0].out_time;
    document.getElementById("pct3").innerHTML = arr[0].pct_solid;
    document.getElementById("amnt3").innerHTML = arr[0].bill_amount;
}
