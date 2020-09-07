function viewattendence() {
  var xhttp = new XMLHttpRequest();
  var url ='http://localhost:8000/api/attendance/all?date=' +document.getElementById("inpdate").value;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var empdetails = JSON.parse(this.responseText);
      window.location.reload();
      console.log((empdetails));
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


