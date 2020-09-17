async function getDivList(){
  try{
      divisions = await apiCall('GET', `http://localhost:8000/api/division/divno&divName`);
      var selOp = "<option> ----SELECT DIVISION----</option>";
      for(i=0;i<divisions.length;i++){
          selOp+= "<option>" + divisions[i].division_no + "-"+divisions[i].division_name + "</option>"  ;
      }
      document.getElementById("divsel2").innerHTML = selOp;
  }catch(e){
      console.log(e);
  }
}

function viewattendence() {
  var xhttp = new XMLHttpRequest();
  var url ='http://localhost:8000/api/attendance/all?date=' +document.getElementById("inpdate").value+"&"+"div="+document.getElementById("divsel2").value;
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


