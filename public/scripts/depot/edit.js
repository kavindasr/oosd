var divList;
console.log(JSON.stringify(oosd_data.attendance));
(async ()=>{
    document.getElementById("submit").disabled = oosd_data.submitted;

    try{
        divList = await apiCall('GET', `${domain}/api/division/all`);
    }
    catch(e){
        console.log("Server error");
    }
    const container = document.getElementById("container");
    for(var i=0; i<21 ; i++){
        const div = document.createElement("div");
        div.innerHTML = `<div class="card border-info mb-3" style="width: 20rem; margin:10px">
                            <div class="card-header">${divList[i].division_no} : ${divList[i].division_name}</div>
                            <div class="card-body text-info">
                                <div class="card-text flex-container" id="flex-container${i}"></div>
                            </div>
                        </div>`
        container.appendChild(div);
    }
              
    oosd_data.attendance.forEach(emp=>{
        updateView(emp.empId,emp.div-1);
    });

})();

function updateView(empId,divNum){
    const para = document.createElement("div");
    const node = document.createTextNode(empId);
    para.appendChild(node);
    const element = document.getElementById(`flex-container${divNum}`);
    element.appendChild(para);
}

function change(){
    const empId = document.getElementById("empId").value;
    const divNo = document.getElementById("divNo").value;
    const emp = oosd_data.attendance.find(e=>e.empId == empId);
    if(emp){
        if(divNo>0 && divNo<22){
            emp.div = divNo;
            emp.mode = 1;
            updateAll();
        }
        else{
            alert("Invaild division number");
        }
    }
    else{
        alert("Invaild Employee ID");
    }
    save();
}

function updateAll(){
    const divs = document.getElementsByClassName('flex-container');
    for(var i=0 ; i<21 ; i++){
        divs[i].innerHTML = "";
    }
    oosd_data.attendance.forEach(emp=>{
        updateView(emp.empId,emp.div-1);
    });
}

async function submit(){
    cnfm = confirm("Do you want to submit attendance?");
    if(cnfm){
        console.log(oosd_data.attendance);
        //post req
        try{
            await apiCall("POST",`${domain}/api/attendance`,oosd_data.attendance);
            oosd_data.submitted = true;
            save();
            document.getElementById("submit").disabled = true;   
            
        }
        catch(e){
            alert("Something went wrong try again");
        }
        try{
            await apiCall("POST",`${domain}/api/vehicleout`,oosd_data.vehiList);
        }catch(e){
            alert("vehicle report error");
        }
        alert("Submitted succussfully"); 
    }
}