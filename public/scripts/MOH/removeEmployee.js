// function removeemp() {
//   var url ='http://localhost:8000/api/employee?empid=' +document.getElementById("removeid").value;
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       alert("employee removed successfully");
//       window.location.reload();
//     }
//   };s
//   xhttp.open("DELETE", url, true);
//   xhttp.send();
// }

async function removeemp(){
  var empid = document.getElementById("removeid").value;
  var validate;
    try{
        validate = await apiCall("DELETE",`${domain}/api/employee?empid=${empid}`);
        console.log(validate);
    }
    catch(e){
        validate = e ;
    }
    if(validate == "Ok"){
      
        alert("Try Again");

    }
    else{
        alert("Invalid employee ID");
    }
}