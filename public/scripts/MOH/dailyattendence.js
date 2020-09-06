function viewEmployee() {
  var xhttp = new XMLHttpRequest();
  var url =
    'http://localhost:8000/api/attendance/all?date="' +
    document.getElementById("inpdate").value +
    '"';
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var empdetails = JSON.parse(this.responseText);
      renderHtml(empdetails);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function renderHtml(data) {
  document.getElementById("empID").innerHTML =
    "Employee ID  : " + data[0].employee_id;
  document.getElementById("empdiv").innerHTML =
    "Division  : " + data[0].division;
  document.getElementById("entdate").innerHTML = "date  : " + data[0].tdate;
  document.getElementById("vehiclewalk").innerHTML =
    "vehiclewalk  : " + data[0].vehiclewalk;
}
