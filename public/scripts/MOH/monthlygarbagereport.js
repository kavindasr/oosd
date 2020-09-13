var d = new Date();

function seperatereports(){
    var month='';
    var days='';
    if(document.getElementById("adduserselection").value=="august"){
        month=08;
        days=31;
    }

    if(document.getElementById("adduserselection").value=="unbilled"){
        monthlyginbilledincome(month,days);
    }
}


function monthlyginbilledincome(month,days) {
    console.log("hiiiii12345");
    var xhttp = new XMLHttpRequest();
    var url ='http://localhost:8000/report/dRange/unbilled?sDate=' +d.getFullYear() +"-" +month+"-"+"01&eDate="+d.getFullYear() +"-" +month+"-"+days;
    console.log(url);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var ginchartdetails = JSON.parse(this.responseText);
        console.log(ginchartdetails);
        renerginbilledchart(ginchartdetails);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }
  
  function renerginbilledchart(ginchartdetails){
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Date', 'Degradable', 'Non-Degradable'],
        ['Monday', 1000, 400],
        ['Tuesday', 200 , 190],
        ['Wednesday', 660, 800],
        ['Thursday', 103, 540],
        ['Friday', 117, 0],
        ['Saturday', 66, 112],
        ['Sunday', 103, 54]
      ]);

      var options = {
          chart: {
              title: 'Garbage Received Unbilled',
              subtitle: 'Degradable, Non-Degradable: Weekly Report',
          },
          chartArea: {
              backgroundColor: {
              fill: '#d6e0f0',
              fillOpacity: 0.1
              },
          },
          backgroundColor: {
              fill: '#d6e0f0',
          },
      };

      var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}
  