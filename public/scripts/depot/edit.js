document.getElementById("userName").innerHTML = sessionStorage.getItem("OOSD_session"); // insert this line to get user name in navbar
var divList;

(async ()=>{
    document.getElementById("submit").disabled = oosd_data.submitted;

    try{
        divList = await apiCall('GET', `http://localhost:8000/api/division/all`);
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
        //await apiCall("POST",'http://localhost:8000/api/attendance',oosd_data.attendance);
        oosd_data.submitted = true;
        save();
        document.getElementById("submit").disabled = true;
        
    }
}
