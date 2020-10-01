async function table1(empdtl){
  arr=[]
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var divisions=JSON.parse(this.responseText);
      for(i=0;i<divisions.length;i++){
        arr[i]= [divisions[i].division_no ,divisions[i].division_name ,empdtl[0][i] , empdtl[0][i].length];
      }
      drawchart1(arr)
    }
  };
  xhttp.open("GET", `http://localhost:8000/api/division/divno&divName`, true);
  xhttp.send();
}

async function table2(empdtl){
  arr1=[]
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    console.log(empdtl[1][1].vehicle);
    if (this.readyState == 4 && this.status == 200) {
      var divisions=JSON.parse(this.responseText);

      for(i=0;i<divisions.length;i++){
        try{

          arr1[i]= [divisions[i].division_no ,divisions[i].division_name ,empdtl[1][i].vehicle , empdtl[1][i].driver  , empdtl[1][i].employees.length];
          console.log(arr1[i]);
        }catch(e){
          console.log(arr1[i]);
        }
      };
      drawchart1(arr1)
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
      table1(empdetails);
      table2(empdetails);
      console.log((empdetails));
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function drawchart1(arr){
  document.getElementById("dailyattendencefile").style.display="none";
  new gridjs.Grid({
    columns: ["Number", "Division", "workers", "Total"],
    sort:true,
    data: arr,
    
    
  }).render(document.getElementById("wrapper1"));
}

function drawchart2(arr1){
  new gridjs.Grid2({
    columns: ["Number", "Division","Vehicle","Driver", "Total"],
    sort:true,
    data: arr1,
    
    
  }).render(document.getElementById("wrapper2"));
}
