function viewEmployee() {
  var xhttp = new XMLHttpRequest();
  console.log("hiiii");
  var url =
    'http://localhost:8000/api/attendance/all?date="' +
    document.getElementById("inpdate").value +
    '"';
  console.log(url);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var empdetails = JSON.parse(this.responseText);
      console.log(empdetails);
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
