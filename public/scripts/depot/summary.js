var oosd_data = JSON.parse(localStorage.getItem("OOSD_STORAGE"));
var newArr = [...oosd_data.attendance];

newArr.sort((a,b)=>{
    return a.empId - b.empId;
});

if(oosd_data.date != today){
    document.getElementById("all").style.display = false;
}

newArr.forEach(emp=>{
    updateView(emp.empId);
});

function updateView(empId){
    const para = document.createElement("div");
    const node = document.createTextNode(empId);
    para.appendChild(node);
    const element = document.getElementById("attendance");
    element.appendChild(para);
}

document.getElementById("date").innerHTML = today;
document.getElementById("total").innerHTML = newArr.length;
(async ()=>{
    const vehiDis = await apiCall("GET",`${domain}/report/vehicleDistribution?date=${today}`);
    vehiDis.forEach(e=>{
        const row = document.createElement("tr");
        row.innerHTML =`<td>${e.division_name}</td>
                        <td>${e.vehicle_num}</td>
                        <td>${e.driver}</td>`;
        document.getElementById("table").appendChild(row);
    });
})();