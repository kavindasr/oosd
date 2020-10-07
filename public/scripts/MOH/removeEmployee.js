async function removeemp(){
    
    var empid = document.getElementById("removeid").value;

    const url = "http://localhost:8000/api/employee?empid=" + empid;
    const url2 = "http://localhost:8000/api/employee/all?empid=" + empid;

    const data = await apiCall("GET",url2);
    console.log(data);
    if (data.length!=0){
        const data = await apiCall("DELETE",url);
        alert("Employee removed successfully");
        window.location.reload();
    }else{
        alert("Employee doesn't exist");
        window.location.reload();
    }
}