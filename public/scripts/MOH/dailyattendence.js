async function table1(empdtl){
  arr=[];
  try{
    divisions = await apiCall("GET", `${domain}/api/division/divno&divName`);
    for(i=0;i<empdtl[0].length;i++){
      if(empdtl[0][i]!=null){
        arr[i]= [divisions[i].division_no ,divisions[i].division_name ,empdtl[0][i] , empdtl[0][i].length];
      }
    } 
    drawchart1(arr)
  }
  catch(e){
      alert("Reload and try again!");
  }
}

async function table2(empdtl){
  arrV=[];
  try{
    divisions = await apiCall("GET", `${domain}/api/division/divno&divName`);
    for(i=0;i<empdtl[1].length;i++){
      if(empdtl[1][i]!=null){
        arrV[i]= [divisions[i].division_no ,divisions[i].division_name ,empdtl[1][i].vehicle ,empdtl[1][i].driver,empdtl[1][i].employees,  empdtl[1][i].employees.length];
      }
    }
    drawchart2(arrV)
  }
  catch(e){
      alert("Reload and try again!");
  }
}


async function viewattendence() {
  console.log(document.getElementById("inpdate").value);
  try{
    empdetails = await apiCall("GET", `${domain}/report/dAttendence?date='${document.getElementById("inpdate").value}'`);
    if (empdetails== "error, cant take action"){
      alert("No data in the database");
      document.getElementById("wrapper1").innerHTML = ""
      document.getElementById("wrapper2").innerHTML = ""
    }else{
      table1(empdetails);
      table2(empdetails);
    }

  }
  catch(e){
    alert("No data in the database");
  } 
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
