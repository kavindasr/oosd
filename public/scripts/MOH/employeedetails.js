var d = new Date();

async function checkEmployee(){
  const empId = document.getElementById("idnum").value;
    var validate;
    try{
        validate = await apiCall("HEAD",`http://localhost:8000/api/employee/all?empid=${empId}`);
    }
    catch(e){
        validate = e ;
    }
    if(validate == "Ok"){
      viewEmployee()
    }
    else{
        alert("Invalid employee ID");
        window.location.reload();
    }
}

async function viewEmployee() {
  var xhttp = new XMLHttpRequest();
  var url ="http://localhost:8000/api/employee/all?empid=" +document.getElementById("idnum").value;
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

async function workingdays() {
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
  if(data!=null){
    console.log("hiii");
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
  }else{
    alert("Wrong Employee ID");
  }
}
