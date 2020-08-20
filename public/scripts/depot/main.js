var type = 1;
var divNo = null;

function setType(i){
    type = i;
    const element = document.getElementById(`flexBoxDiv${type}`);
    element.innerHTML = "";
    oosd_data.attendance.forEach(emp=>{
        if(emp.div == divNo && emp.mode == type){
            updateView(emp.empId);
        }
    })
    console.log(type);
}

async function getDiv(){
    divNo = document.getElementById("divNo").value;
    try{
        const divName = await apiCall('GET', `http://localhost:8000/api/division/all?divno=${divNo}`);
        document.getElementById('division_name').innerHTML = 'Division name: '+divName[0].division_name;
        document.getElementById('addBtn').disabled = false;
        document.getElementById('removeBtn').disabled = false;
        document.getElementById('inpEmpId').disabled = false;
    }catch(e){
        console.log(e);
    }
    setType(type);
}

function addEmp(){
    const empId = document.getElementById("inpEmpId").value;
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
    console.log(oosd_data);
}

function removeEmp(){
    const empId = document.getElementById("inpEmpId").value;
    const emp = oosd_data.attendance.find(e=>e.empId == empId);
    const index = oosd_data.attendance.indexOf(emp);
    if (index > -1) {
        oosd_data.attendance.splice(index, 1);
    }
    setType(type);
    console.log(oosd_data);
}

function save(){
    localStorage.setItem("OOSD_STORAGE", JSON.stringify(oosd_data));
}

function updateView(empId){
    const para = document.createElement("div");
    const node = document.createTextNode(empId);
    para.appendChild(node);
    const element = document.getElementById(`flexBoxDiv${type}`);
    element.appendChild(para);
}