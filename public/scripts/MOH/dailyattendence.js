async function table1(empdtl){
  arr=[];
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var divisions=JSON.parse(this.responseText);
      for(i=0;i<empdtl[0].length;i++){
        if(empdtl[0][i]!=null){
          arr[i]= [divisions[i].division_no ,divisions[i].division_name ,empdtl[0][i] , empdtl[0][i].length];
        }
      }
      drawchart1(arr)
    }
  };
  xhttp.open("GET", `http://localhost:8000/api/division/divno&divName`, true);
  xhttp.send();
}

async function table2(empdtl){
  arrV=[];
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var divisions=JSON.parse(this.responseText);
      for(i=0;i<empdtl[1].length;i++){
        if(empdtl[1][i]!=null){
          arrV[i]= [divisions[i].division_no ,divisions[i].division_name ,empdtl[1][i].vehicle ,empdtl[1][i].driver,empdtl[1][i].employees,  empdtl[1][i].employees.length];
        }
      }
      drawchart2(arrV)
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
      console.log(empdetails);
      if (empdetails== "error, cant take action"){
        alert("No data in the database");
        document.getElementById("wrapper1").innerHTML = ""
        document.getElementById("wrapper2").innerHTML = ""
      }else{
        table1(empdetails);
        table2(empdetails);
        console.log((empdetails));
      } 
    }
  };

  xhttp.open("GET", url, true);
  xhttp.send();
}

function drawchart1(arr){
  var table = document.createElement("TABLE");
        table.border = "1";
 
      
        var columnCount = 4;
 
        //Add the header row.
        var row = table.insertRow(-1);
        headtitle=["Division","Name","Number of Workers","Total"]
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = headtitle[i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (var i = 0; i < arr.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                if (arr[i]!=null){
                  var cell = row.insertCell(-1);
                  cell.innerHTML = arr[i][j];
                }
            }
        }
 
        var dvTable = document.getElementById("wrapper1");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);
}

function drawchart2(arr1){
  var table = document.createElement("TABLE");
        table.border = "1";

        //Get the count of columns.
        var columnCount = 6;
 
        //Add the header row.
        var row = table.insertRow(-1);
        headtitle=["Division","Name","Vehicle","Driver","Number of Workers","Total"]
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML =  headtitle[i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (var i = 1; i < arr1.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                if (arr1[i]!=null){
                  var cell = row.insertCell(-1);
                  cell.innerHTML = arr1[i][j];
                }
                
            }
        }
 
        var dvTable = document.getElementById("wrapper2");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);
}
