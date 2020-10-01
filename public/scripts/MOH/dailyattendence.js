async function showattenence(empdtl){
  arr=[]
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var divisions=JSON.parse(this.responseText);
      for(i=0;i<divisions.length;i++){
        arr[i]= '["'+divisions[i].division_no + '","'+divisions[i].division_name +'","'+empdtl[0][i]+'","'+empdtl[0][i].length+'"]';
        console.log(arr[i]);
      }
      drawchart1(arr)
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
      showattenence(empdetails)
      console.log((empdetails));
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function drawchart1(arr){
  console.log(arr[0]);
  new gridjs.Grid({
    columns: ["Number", "Division", "workers", "Total"],
    pagination:true,
    sort:true,
    data: [
      ['1','Gattuwana','233,258,361,525,910','5'],
      ['8','Negombo Road','476,531','2'],
    ]
}).render(document.getElementById("wrapper"));
}
