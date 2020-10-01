var closebtns = document.getElementsByClassName("close");
var i;
var repairing;
var availableVehicles;
(async ()=>{
  try{
    availableVehicles = await apiCall('GET',`${domain}/api/vehicle/join/left/repair/vehicleId/repairVehicleId/all/all?where=getAvailableVehicles`);
    console.log(availableVehicles);
    availableVehicles.forEach(v=>{
      const ul = document.getElementById("available");
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `${v.vehicle_num}`;
      ul.appendChild(li);
    });
  }catch(e){
    alert("Reload page!");
  }

  try{
    repairing = await apiCall('GET', `${domain}/api/vehicle/join/inner/repair/vehicleId/repairVehicleId/all/all`);
    repairing.forEach(v=>{
      const ul = document.getElementById("garage");
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `${v.vehicle_num}`;
      ul.appendChild(li);
    });
  }
  catch(e){
    alert("Something went wrong!");
  }
})();

