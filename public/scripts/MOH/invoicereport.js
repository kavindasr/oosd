function getinvoicegarbageout() {
    var invoice_num = document.getElementById("invoicenum").value;
    var xhttp = new XMLHttpRequest();
    var url ="http://localhost:8000/api/gout/all?invoice=" +invoice_num;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var empdetails = JSON.parse(this.responseText);
            console.log(empdetails);
            rendergarbageout(empdetails);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function rendergarbageout(arr){
    document.getElementById("invoice").innerHTML = arr.nextID;
    document.getElementById("date").innerHTML = arr.date;
    document.getElementById("time").innerHTML = arr.time;
    document.getElementById("gartype").innerHTML = arr.gout_type;
    document.getElementById("wght").innerHTML = arr.gout_weight;
    document.getElementById("amnt").innerHTML = "Rs. " + arr.gout_bill
}
