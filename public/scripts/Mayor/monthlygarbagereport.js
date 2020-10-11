var d = new Date();
var year= d.getFullYear();
month=d.getMonth()
days=30




//to draw chart 1
async function monthlyginunbilled(month,days) {
    try{
        console.log(month);
        var url=`${domain}/report/dRange/unbilled?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chart1data = await apiCall('GET', url);
        console.log(chart1data);
        ginunbilledchart(chart1data)
    }catch(e){
        console.log(e);
    }        
}  

async function anymonthlyginunbilled(month,days) {
    try{
        month1=document.getElementById("monthselect").value.slice(-2,);
        console.log(month1);
        var url=`${domain}/report/dRange/unbilled?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
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

async function anymonthlyginbilledweight(month,days) {
    try{
        month1=document.getElementById("monthselect").value.slice(-2,);
        var url=`${domain}/report/dRange/billed?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
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
              title: 'Billed Garbage In Weight Summary',
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

async function monthlyginbilledPrice(month,days) {
    try{
        var url=`${domain}/report/dRange/billedAmount?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        ginbilledPricechart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlyginbilledPrice(month,days) {
    try{
        month1=document.getElementById("monthselect").value.slice(-2,);
        var url=`${domain}/report/dRange/billedAmount?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        ginbilledPricechart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

function ginbilledPricechart(chartdata){
    chartdata.unshift(["Date","Degradable","Non-Degradable"]);
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        
      var data = google.visualization.arrayToDataTable(chartdata);

      var options = {
          chart: {
              title: 'Billed Garbage In Price Summary',
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

      var chart = new google.charts.Bar(document.getElementById('ginbilledprice'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}


//compost
async function monthlycompost(month,days) {
    try{
        var url=`${domain}/report/dRange/cOut?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        compostweightchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlycompost(month,days) {
    try{
        month1=document.getElementById("monthselect").value.slice(-2,);
        var url=`${domain}/report/dRange/cOut?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        compostweightchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

function compostweightchart(chartdata){
    chartdata.unshift(["Date","Compost Weight",]);
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        
      var data = google.visualization.arrayToDataTable(chartdata);

      var options = {
          chart: {
              title: 'Compost Weight Summary',
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

      var chart = new google.charts.Bar(document.getElementById('compostpackets'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}


async function monthlycomprice(month,days) {
    try{
        var url=`${domain}/report/dRange/cOutPrice?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        compostpricechart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlycomprice(month,days) {
    try{
        month1=document.getElementById("monthselect").value.slice(-2,);
        var url=`${domain}/report/dRange/cOutPrice?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        compostpricechart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

function compostpricechart(chartdata){
    chartdata.unshift(["Date","Compost Price"]);
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        
      var data = google.visualization.arrayToDataTable(chartdata);

      var options = {
          chart: {
              title: 'Compost Price Summary',
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

      var chart = new google.charts.Bar(document.getElementById('compostprice'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}

async function monthcomin(month,days) {
    try{
        var url=`${domain}/report/dRange/cin?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        compinchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthcomin(month,days) {
    try{
        month1=document.getElementById("monthselect").value.slice(-2,);
        var url=`${domain}/report/dRange/cin?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        compinchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

function compinchart(chartdata){
    chartdata.unshift(["Date","Compost In"]);
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        
      var data = google.visualization.arrayToDataTable(chartdata);

      var options = {
          chart: {
              title: 'Compost In Summary',
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

      var chart = new google.charts.Bar(document.getElementById('compin'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}




















//function to draw a stack chart for garbage out weight and income
async function monthlygoutweight(month,days) {
    try{
        console.log(month);
        var url=`${domain}/report/dRange/gOut?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        goutweightchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlygoutweight(month,days) {
    try{
        month1=document.getElementById("monthselect").value.slice(-2,);
        var url=`${domain}/report/dRange/gOutPrice?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        goutweightchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}
function goutweightchart(chartdata){
    chartdata.unshift(['Date', 'Metal','Cardboard','Plastic', 'Glassbin','Paper','Copper','Aluminium']);
    google.charts.load('current', {packages: ['corechart']}); 
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // Define the chart to be drawn.
        var data = google.visualization.arrayToDataTable(chartdata);
 

      var options = {
          chart: {
              title: 'Garbage Out Weight Summary',
              subtitle: 'Date,Metal,Cardboard,Plastic,Glassbin,Paper,Copper,Aluminium',
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
          isStacked: true,

      };

        // Instantiate and draw the chart.
        var chart = new google.visualization.BarChart(document.getElementById('goutweight'));
        chart.draw(data, options);
     }
    
}



async function monthlygoutPrice(month,days) {
    try{
        console.log(month);
        var url=`${domain}/report/dRange/gOutPrice?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        console.log(url);
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        goutpricechart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlygoutPrice(month,days) {
    try{
        month1=document.getElementById("monthselect").value.slice(-2,);
        var url=`${domain}/report/dRange/gOutPrice?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        console.log(url);
        chartdata = await apiCall('GET', url);
        console.log(chartdata);
        goutpricechart(chartdata)
    }catch(e){
        console.log(e);
    }        
}
function goutpricechart(chartdata){
    chartdata.unshift(['Date', 'Metal','Cardboard','Plastic', 'Glassbin','Paper','Copper','Aluminium']);
    google.charts.load('current', {packages: ['corechart']}); 
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        
      var data = google.visualization.arrayToDataTable(chartdata);

      var options = {
          chart: {
              title: 'Garbage Out Price Summary',
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
          isStacked: true,
      };

        var chart = new google.visualization.BarChart(document.getElementById('goutprice'));
        chart.draw(data, options);
    }
    
}
