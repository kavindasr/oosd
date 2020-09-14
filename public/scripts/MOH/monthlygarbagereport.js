var d = new Date();
var year= d.getFullYear();

monthlyginunbilled("09",30);
monthlyginbilledweight("09",30);
goutweightchart();

//to draw chart 1
async function monthlyginunbilled(month,days) {
    try{
        var url=`${domain}/report/dRange/unbilled?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chart1data = await apiCall('GET', url);
        console.log(chart1data);
        ginunbilledchart(chart1data)
    }catch(e){
        console.log(e);
    }        
}  
function ginunbilledchart(chartdata){
    chartdata.unshift(["Date","Degradable","Non-Degradable"]);
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        
      var data = google.visualization.arrayToDataTable(chartdata);

      var options = {
          chart: {
              title: 'UnBilled Garbage In Summary',
              subtitle: 'Degradable, Non-Degradable: Monthly Report',
          },
          chartArea: {
              backgroundColor: {
              fill: '#79e0c1',
              //fillOpacity: 0.1
              },
          },
          backgroundColor: {
              fill: '#d6e0f0', // this is the background colour of chart area
          },
      };

      var chart = new google.charts.Bar(document.getElementById('ginunbilled'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}

//To draw chart2
async function monthlyginbilledweight(month,days) {
    try{
        var url=`${domain}/report/dRange/billed?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        ginbilledchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}
function ginbilledchart(chartdata){
    chartdata.unshift(["Date","Degradable","Non-Degradable"]);
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        
      var data = google.visualization.arrayToDataTable(chartdata);

      var options = {
          chart: {
              title: 'Billed Garbage In Summary',
              subtitle: 'Degradable, Non-Degradable: Monthly Report',
          },
          chartArea: {
              backgroundColor: {
              fill: '#52afd7',
              //fillOpacity: 0.1
              },
          },
          backgroundColor: {
              fill: '#d6e0f0',
          },
      };

      var chart = new google.charts.Bar(document.getElementById('ginbilledweight'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}
//function to draw a stack chart for garbage out weight and income
function goutweightchart(){
    google.charts.load('current', {packages: ['corechart']}); 
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // Define the chart to be drawn.
        var data = google.visualization.arrayToDataTable([
           ['Date', 'Metal','Cardboard','Plastic', 'Glassbin','Paper','Copper','Aluminium'],
           ['2020-12-12',  900,120,665,0,222,123,390],
           ['2020-09-09',  1000,344,400,122,654,32,333],
           ['2020-09-08',  1530,677,540,123,67,89,23]
        ]);

        var options = {title: 'Garbage Out Weight Summary', isStacked:true};  

        // Instantiate and draw the chart.
        var chart = new google.visualization.BarChart(document.getElementById('goutweight'));
        chart.draw(data, options);
     }
    
}
