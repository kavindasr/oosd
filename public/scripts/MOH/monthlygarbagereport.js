var d = new Date();
var year= d.getFullYear();
month=d.getMonth() +1;
days=27

monthlyginunbilled(month,days);
monthlyginbilledweight(month,days);
monthlyginbilledPrice(month,days);
monthlycompost(month,days);
monthlycomprice(month,days);
monthcomin(month,days);
monthlygoutweight(month,days);
monthlygoutPrice(month,days);

//to draw chart 1
async function monthlyginunbilled(month,days) {
    try{
        var url=`${domain}/report/dRange/unbilled?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chart1data = await apiCall('GET', url);
        ginunbilledchart(chart1data)
    }catch(e){
        console.log(e);
    }        
}  

async function anymonthlyginunbilled() {
    console.log(month)
    try{
        month1=document.getElementById("monthselect1").value.slice(-2,);
        var url=`${domain}/report/dRange/unbilled?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chart1data = await apiCall('GET', url);
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
        ginbilledchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlyginbilledweight() {
    try{
        month1=document.getElementById("monthselect2").value.slice(-2,);
        var url=`${domain}/report/dRange/billed?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
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
        ginbilledPricechart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlyginbilledPrice() {
    try{
        month1=document.getElementById("monthselect3").value.slice(-2,);
        var url=`${domain}/report/dRange/billedAmount?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
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
        compostweightchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlycompost() {
    try{
        month1=document.getElementById("monthselect7").value.slice(-2,);
        var url=`${domain}/report/dRange/cOut?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
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
        compostpricechart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlycomprice() {
    try{
        month1=document.getElementById("monthselect8").value.slice(-2,);
        var url=`${domain}/report/dRange/cOutPrice?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
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
        compinchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthcomin() {
    try{
        month1=document.getElementById("monthselect6").value.slice(-2,);
        var url=`${domain}/report/dRange/cin?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
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
        var url=`${domain}/report/dRange/gOut?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chartdata = await apiCall('GET', url);
        goutweightchart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlygoutweight() {
    try{
        month1=document.getElementById("monthselect4").value.slice(-2,);
        var url=`${domain}/report/dRange/gOut?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
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
        var url=`${domain}/report/dRange/gOutPrice?sDate='${year}-${month}-01'&eDate='${year}-${month}-${days}'`;
        chartdata = await apiCall('GET', url);
        goutpricechart(chartdata)
    }catch(e){
        console.log(e);
    }        
}

async function anymonthlygoutPrice() {
    try{
        month1=document.getElementById("monthselect5").value.slice(-2,);
        var url=`${domain}/report/dRange/gOutPrice?sDate='${year}-${month1}-01'&eDate='${year}-${month1}-${days}'`;
        chartdata = await apiCall('GET', url);
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
