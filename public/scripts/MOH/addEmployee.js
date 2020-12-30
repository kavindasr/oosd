async function submitAttendance() {
  var emp_Name = document.getElementById("name").value;
  var emp_id = parseInt(document.getElementById("id").value);
  var sal_id = parseInt(document.getElementById("salid").value);
  var emp_dob = document.getElementById("dob").value;
  var emp_gen = document.getElementById("selection").value;
  var emp_type = parseInt(document.getElementById("emtype").value);

  var empObj = {
    empId: emp_id,
    salId: sal_id,
    empName: emp_Name,
    bdate: emp_dob,
    empType: emp_type,
    sex: emp_gen,
  };

  try{
    await apiCall("POST",`${domain}/api/employee`,empObj);
    alert("Employee Added Successfully..");
    window.location.reload();
  }
  catch(e){
    alert("Check the details again !!!")
  } 
}

