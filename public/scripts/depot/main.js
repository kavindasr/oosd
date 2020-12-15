var type = 1;
var divNo = null;
var vehicles;

(async ()=>{
    try{
        vehicles = await apiCall("GET", `${domain}/api/vehicle/join/left/repair/vehicleId/repairVehicleId/all/all?where=getAvailableVehicles`);
    }
    catch(e){
        alert("Reload and try again!");
    }    
})();

function setType(i){
    type = i;
    const element = document.getElementById(`flexBoxDiv${type}`);
    element.innerHTML = "";
    oosd_data.attendance.forEach(emp=>{
        if(emp.div == divNo && emp.mode == type){
            updateView(emp.empId);
        }
    });
    console.log(type);
}

async function getDiv(){
    divNo = parseInt(document.getElementById("divNo").value);
    if(divNo <1 || divNo>21){
        alert("Invaild division number");
        return;
    }
    try{
        const divName = await apiCall('GET', `${domain}/api/division/all?divno=${divNo}`);
        document.getElementById('division_name').innerHTML = 'Division name: '+divName[0].division_name;
        document.getElementById('addBtn').disabled = false;
        document.getElementById('removeBtn').disabled = false;
        document.getElementById('inpEmpId').disabled = false;
        if(divName[0].vehicle != 0){
            document.getElementById('vehiList').disabled = false;
            document.getElementById('driverName').disabled = false;
            document.getElementById('profile-tab').className = 'nav-link text-light';
            updateVehiList();
        }
        else{
            document.getElementById('driverName').value= '';
            document.getElementById('vehiList').disabled = true;
            document.getElementById('driverName').disabled = true;
        }
    }catch(e){
        alert("Something went wrong!");
    }
    setType(type);
}

async function addEmp(){
    const empId = parseInt(document.getElementById("inpEmpId").value);
    var validate;
    try{
        validate = await apiCall("HEAD",`${domain}/api/employee/all?empid=${empId}`);
    }
    catch(e){
        validate = e ;
    }
    if(validate == "Ok"){
        const emp = oosd_data.attendance.find(e=>e.empId == empId);
        if(!emp){
            oosd_data.attendance.push(
                {
                    date:today,
                    div: divNo,
                    empId: empId,
                    mode: type
                }
            )
            updateView(empId);
        }
        else{
            alert("Already added");
        }
    }
    else{
        alert("Invalid employee ID");
    }
    
    console.log(oosd_data);
}

function removeEmp(){
    const empId = document.getElementById("inpEmpId").value;
    const emp = oosd_data.attendance.find(e=>e.empId == empId);
    if(emp){
        if(emp.div == divNo && emp.mode == type){
            const index = oosd_data.attendance.indexOf(emp);
            if (index > -1) {
                oosd_data.attendance.splice(index, 1);
            }
            setType(type);
        }
        else{
            alert("Employee ID not belongs to this division");
        }
    }
    else{
        alert("This Employee ID is not being added");
    }
    
    console.log(oosd_data);
}

function saveToStorage(){
    var element = document.getElementById('vehiList');
    var vehicle;
    if(!document.getElementById('vehiList').disabled){
        vehicle = element.options[element.selectedIndex].value;
    } 
    const driverName = document.getElementById('driverName').value;
    if(driverName !=''){
        var vehicle_index;
        vehicles.forEach(v=>{
            if(vehicle == v.vehicle_num){
                vehicle_index = v.index_no;
            }
        });
        var up = false;
        oosd_data.vehiList.forEach(e=>{
            if(e.div == divNo){
                e.vehicleid = vehicle_index;
                e.driver = driverName;
                up = true;
            }
        });
        if(!up){
            const obj = {
                date: today,
                div: divNo,
                vehicleid: vehicle_index,
                driver: driverName
            }
            oosd_data.vehiList.push(obj);
        }
    }
    console.log(oosd_data);
    save();
}

function updateView(empId){
    const para = document.createElement("div");
    const node = document.createTextNode(empId);
    para.appendChild(node);
    const element = document.getElementById(`flexBoxDiv${type}`);
    element.appendChild(para);
}

function updateVehiList(){
    const ele = oosd_data.vehiList.find(v=>v.div == divNo);
    if(ele){
        document.getElementById('driverName').value = ele.driver;
    }
    else{
        document.getElementById('driverName').value = "";
    }
    
    vehicles.forEach(v=>{
        const addedBefore = oosd_data.vehiList.find(x=>x.vehicleid == v.index_no);
        
        if(!addedBefore){
            const para = document.createElement("option");
            const node = document.createTextNode(v.vehicle_num);
            para.appendChild(node);
            document.getElementById("vehiList").appendChild(para);
        }
        else{
            if(ele){
                if(ele.vehicleid == v.index_no){
                    const para = document.createElement("option");
                    const node = document.createTextNode(v.vehicle_num);
                    para.appendChild(node);
                    para.selected = true;
                    document.getElementById("vehiList").appendChild(para);
                }
            }
        }
        
    });
}
console.log(oosd_data.vehiList);
