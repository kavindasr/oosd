function viewattendence() {
  var xhttp = new XMLHttpRequest();
  var url ='http://localhost:8000/api/attendance/all?date=' +document.getElementById("inpdate").value+"&"+"div="+document.getElementById("divsel2").value;
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

function divList(){
  console.log("hiiii");
  data=[]
  var xhttp = new XMLHttpRequest();
  var url =`http://localhost:8000/api/${tablename}/gID&gtype`;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
  var htmlPart = "<option> ----SELECT TYPE----</option>";
  for(i=0;i<data.length;i++){
    htmlPart += "<option>" + data[i].gindex +"- "+ data[i].waste_type + "</option>"  ;
  }
  document.getElementById("divsel2").innerHTML = htmlPart;
}


