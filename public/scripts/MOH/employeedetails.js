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
  try{
    empdetails = await apiCall("GET", `${domain}/api/employee/all?empid=${document.getElementById("idnum").value}`);
    renderHtml(empdetails);
  }
  catch(e){
    alert("Reload and try again!");
  } 
}

async function workingdays() {
  try{
    empdetails = await apiCall("GET", `${domain}/report/absentee?empID=${document.getElementById("idnum").value}&month=${(d.getMonth()+1)}`);
    document.getElementById("numdays").innerHTML = "Has worked " + empdetails + " days in this month";
  }
  catch(e){
    alert("Reload and try again!");
  } 
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
