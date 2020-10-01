getDivList();

async function getDivList(){
  var selOp = "<option> ----SELECT DIVISION----</option>";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var divisions=JSON.parse(this.responseText);
      //console.log(divisions);
      for(i=0;i<divisions.length;i++){
        selOp+= "<option>" + divisions[i].division_no + "-"+divisions[i].division_name + "</option>"  ;
      }
      //console.log(selOp);
      console.log(document.getElementById("divsel2"));
      document.getElementById("divsel2").innerHTML = selOp;
    }
  };
  xhttp.open("GET", `http://localhost:8000/api/division/divno&divName`, true);
  xhttp.send();
}

function viewattendence() {
  var xhttp = new XMLHttpRequest();
  var url ="http://localhost:8000/report/dAttendence?date='" + document.getElementById("inpdate").value+"'";
  console.log(url);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var empdetails = JSON.parse(this.responseText);
      console.log((empdetails));
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


