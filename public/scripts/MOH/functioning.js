function addemployeeFunction() {
    var x = document.getElementById("addemployeefile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("removeemployeefile").style.display="none";
      document.getElementById("employeedetailfile").style.display="none";
      document.getElementById("dailyattendencefile").style.display="none";
      document.getElementById("garbageReportfile").style.display="none";
      document.getElementById("addUserfile").style.display="none";
      document.getElementById("removeUserfile").style.display="none";
      document.getElementById("vehicleReportfile").style.display="none";
    }
  }

  function removeemployeeFunction() {
    var x = document.getElementById("removeemployeefile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("addemployeefile").style.display="none";
      document.getElementById("employeedetailfile").style.display="none";
      document.getElementById("dailyattendencefile").style.display="none";
      document.getElementById("addUserfile").style.display="none";
      document.getElementById("garbageReportfile").style.display="none";
      document.getElementById("removeUserfile").style.display="none";
      document.getElementById("vehicleReportfile").style.display="none";
    }
  }

  function employeedetailFunction() {
    var x = document.getElementById("employeedetailfile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("addemployeefile").style.display="none";
      document.getElementById("removeemployeefile").style.display="none";
      document.getElementById("dailyattendencefile").style.display="none";
      document.getElementById("addUserfile").style.display="none";
      document.getElementById("garbageReportfile").style.display="none";
      document.getElementById("removeUserfile").style.display="none";
      document.getElementById("vehicleReportfile").style.display="none";
    }
  }

  function dailyattendenceFunction() {
    var x = document.getElementById("dailyattendencefile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("addemployeefile").style.display="none";
      document.getElementById("removeemployeefile").style.display="none";
      document.getElementById("employeedetailfile").style.display="none";
      document.getElementById("addUserfile").style.display="none";
      document.getElementById("removeUserfile").style.display="none";
      document.getElementById("vehicleReportfile").style.display="none";
      document.getElementById("garbageReportfile").style.display="none";
    }
    var xhttp = new XMLHttpRequest();
    var url =`http://localhost:8000/api/division/all`;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        var htmlPart = "<option> ----SELECT TYPE----</option>";
        for(i=0;i<data.length;i++){
          htmlPart += "<option>" + data[i].division_no +"- "+ data[i].division_name + "</option>"  ;
        }
        document.getElementById("divsel2").innerHTML = htmlPart;
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
    }

  function addUserFunction() {
    var x = document.getElementById("addUserfile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("addemployeefile").style.display="none";
      document.getElementById("removeemployeefile").style.display="none";
      document.getElementById("employeedetailfile").style.display="none";
      document.getElementById("dailyattendencefile").style.display="none";
      document.getElementById("removeUserfile").style.display="none";
      document.getElementById("vehicleReportfile").style.display="none";
      document.getElementById("garbageReportfile").style.display="none";
    }
  }

  function removeUserFunction() {
    var x = document.getElementById("removeUserfile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("addemployeefile").style.display="none";
      document.getElementById("removeemployeefile").style.display="none";
      document.getElementById("employeedetailfile").style.display="none";
      document.getElementById("dailyattendencefile").style.display="none";
      document.getElementById("addUserfile").style.display="none";
      document.getElementById("vehicleReportfile").style.display="none";
      document.getElementById("garbageReportfile").style.display="none";
    }
  }

  function vehicleReportFunction() {
    var x = document.getElementById("vehicleReportfile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("addemployeefile").style.display="none";
      document.getElementById("removeemployeefile").style.display="none";
      document.getElementById("employeedetailfile").style.display="none";
      document.getElementById("dailyattendencefile").style.display="none";
      document.getElementById("addUserfile").style.display="none";
      document.getElementById("removeUserfile").style.display="none";
      document.getElementById("garbageReportfile").style.display="none";
    }
  }

    function garbageReportFunction() {
      var x = document.getElementById("garbageReportfile");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
        document.getElementById("addemployeefile").style.display="none";
        document.getElementById("removeemployeefile").style.display="none";
        document.getElementById("employeedetailfile").style.display="none";
        document.getElementById("dailyattendencefile").style.display="none";
        document.getElementById("addUserfile").style.display="none";
        document.getElementById("removeUserfile").style.display="none";
        document.getElementById("vehicleReportfile").style.display="none";
      }
    }

    function homeFunction(){
      document.getElementById("garbageReportfile").style.display="none";
      document.getElementById("addemployeefile").style.display="none";
        document.getElementById("removeemployeefile").style.display="none";
        document.getElementById("employeedetailfile").style.display="none";
        document.getElementById("dailyattendencefile").style.display="none";
        document.getElementById("addUserfile").style.display="none";
        document.getElementById("removeUserfile").style.display="none";
        document.getElementById("vehicleReportfile").style.display="none";
    }
  
