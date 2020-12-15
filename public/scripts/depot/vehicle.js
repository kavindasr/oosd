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
  var returnDate = document.getElementById("returnDate").value;
  const other = document.getElementById("other").value;
  const vehiId = availableVehicles.find(v=>v.vehicle_num == vehicle);
  if(returnDate == ""){
    returnDate = null;
  }
  var data;
  try{
    data = {
      vehicleid :  vehiId.index_no,
      repin     :  serviceDate,
      repout    :  returnDate,
      replace   :  other
    }
  }
  catch{
    alert('Select vehicle');
    return false;
  }
  
  if(Date.parse(returnDate)-Date.parse(serviceDate)<0){
    alert("Invaild return date");
    return false;
  }
  try{
    await apiCall('POST',`${domain}/api/repair`,data)
  }
  catch(e){
    alert("Service data can not be empty");
    return false;
  }
}

async function addNewVehi(){
  const num = document.getElementById('vehicle_number').value;
  console.log(num);
  if(num){
    const data = {vehi_num : num};
    try{
      const done = await apiCall('POST',`${domain}/api/vehicle`,data);
      document.getElementById('output_alert').innerHTML = "Successfully added";
      document.getElementById('output_alert').className = "alert alert-primary";
    }
    catch(e){
      document.getElementById('output_alert').innerHTML = "Error occured";
      document.getElementById('output_alert').className = "alert alert-danger";
    }
  }
}