function viewEmployee() {
  var xhttp = new XMLHttpRequest();
  var url =
    "http://localhost:8000/api/employees/all?empid=" +
    document.getElementById("idnum").value;
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
  document.getElementById("empName").innerHTML = "Name  : " + data[0].name;
  document.getElementById("empID").innerHTML =
    "Employee ID  : " + data[0].employee_id;
  document.getElementById("empSalID").innerHTML =
    "Salary ID  : " + data[0].salary_id;
  document.getElementById("empGender").innerHTML =
    "Gender  : " + data[0].gender;
  document.getElementById("empType").innerHTML =
    "Employee Type  : " + data[0].employee_type;
}
