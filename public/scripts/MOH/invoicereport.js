function addusernew() {
    var invoice_num = document.getElementById("invoicenum").value;
    var invoice_type = (document.getElementById("invoiceselection").value);

    var xhttp = new XMLHttpRequest();
    var url ="http://localhost:8000/api/'"+invoice_type+"'/all?invoice='" +invoice_num+"'";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var empdetails = JSON.parse(this.responseText);
            console.log(empdetails);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
