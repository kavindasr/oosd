function removeemp() {
  console.log("hiiii");
  var url ='http://localhost:8000/api/employee?empid=' +document.getElementById("removeid").value;
  console.log(url);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert("employee removed successfully");
      window.location.reload();
    }
  };
  xhttp.open("DELETE", url, true);
  xhttp.send();
}