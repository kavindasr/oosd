var d = new Date();

function viewEmployee() {
  var xhttp = new XMLHttpRequest();
  var url ="http://localhost:8000/api/employee/all?empid=" +document.getElementById("idnum").value;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var empdetails = JSON.parse(this.responseText);
      renderHtml(empdetails);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function workingdays() {
  console.log("hiiii");
  var xhttp = new XMLHttpRequest();
  var url ="http://localhost:8000/report/absentee?empID='" +document.getElementById("idnum").value+"'&month="+(d.getMonth()+1);
  console.log(url);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var empdetails = JSON.parse(this.responseText);
      document.getElementById("numdays").innerHTML = "Has worked " + empdetails + " days in this month";
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function renderHtml(data) {
  document.getElementById("detail").style.display="block";
  document.getElementById("empName").innerHTML = data[0].name;
  document.getElementById("empID").innerHTML =
    "Employee ID  : " + data[0].employee_id;
  document.getElementById("empSalID").innerHTML =
    "Salary ID  : " + data[0].salary_id;
  document.getElementById("empGender").innerHTML =
    "Gender  : " + data[0].gender;
  document.getElementById("empType").innerHTML =
    "Employee Type  : " + data[0].employee_type;
}
