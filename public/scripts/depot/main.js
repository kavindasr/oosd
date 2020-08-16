// (function divisions(){
//     var division_container = document.getElementById("division-container");
//     for(var i=0 ; i<21 ; i++){
//         var division = document.createElement("div");
//         var node = document.createTextNode(i+1);
//         division.appendChild(node);
//         division.id = "div"+i;
//         division.addEventListener("click",()=>{
//             console.log("hello "+ Element.get);
//         })
//         division_container.appendChild(division);
//     }
// })();
var type = 1;

function setType(i){
    type = i;
    console.log(type);
}

const User = (empId,type,div)=>{
    this.empId = empId;
    this.type = type;
    this.div = div;
}

function apiCall(method,url,data){
    return new Promise((res,rej)=>{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                res(data);
            }
        };
        xhttp.open(method, url, true);
        if(data){
            xhttp.send(data); 
        }
        else{
            xhttp.send();
        }
    });
}

(async()=>{
    try{
        const test = await apiCall('GET','http://localhost:8000/api/employee/all?empid=178');
        console.log(test);
    }catch(e){
        console.log("Error");
    }
    

})();