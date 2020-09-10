var closebtns = document.getElementsByClassName("close");
var i;
var repairing;
var availableVehicles;
(async ()=>{
  try{
    availableVehicles = await apiCall('GET',`${domain}/api/vehicle/join/left/repair/vehicleId/repairVehicleId/all/all?where=getAvailableVehicles`);
    availableVehicles.forEach(v=>{
      const ul = document.getElementById("available");
      const select = document.getElementById("selectVehicle");
      const li = document.createElement("li");
      const op = document.createElement("option");
      op.innerHTML = v.vehicle_num;
      li.className = "list-group-item";
      li.appendChild(document.createTextNode(v.vehicle_num));
      ul.appendChild(li);
      select.appendChild(op);
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
      li.innerHTML = `${v.vehicle_num} <span class="close fa fa-times"></span>`;
      ul.appendChild(li);
    });
  }
  catch(e){
    alert("Something went wrong!");
  }
  for (i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", async function() {
      const v = repairing.find(v=>v.vehicle_num == this.parentElement.innerHTML.split(" ")[0]);
      this.parentElement.style.display = 'none';
      try{
        const msg = await apiCall('DELETE',`${domain}/api/repair?repairVehicleId=${v.index_no}`);
        console.log(msg);
      }
      catch(e){
        console.log(e);
      } 
      location.reload();
    });
  }
})();

async function addToDB(){
  const vehiList = document.getElementById("selectVehicle");
  const vehicle = vehiList.options[vehiList.selectedIndex].value;
  const serviceDate = document.getElementById("serviceDate").value;
  const returnDate = document.getElementById("returnDate").value;
  const other = document.getElementById("other").value;
  const vehiId = availableVehicles.find(v=>v.vehicle_num == vehicle);
  const data = {
    vehicleid :  vehiId.index_no,
    repin     :  serviceDate,
    repout    :  returnDate,
    replace   :  other
  }
  try{
    await apiCall('POST',`${domain}/api/repair`,data)
  }
  catch(e){
    alert("try again");
  }
}