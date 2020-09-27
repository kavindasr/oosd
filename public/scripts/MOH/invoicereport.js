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
    document.getElementById("invoice1").innerHTML = arr[0].invoice_no;
    console.log(arr[0]);
    document.getElementById("date1").innerHTML = arr[0].out_date;
    console.log(arr.date);
    document.getElementById("time1").innerHTML = arr[0].out_time;
    document.getElementById("gartype1").innerHTML = arr[0].waste_type;
    document.getElementById("wght1").innerHTML = arr[0].weight;
}
