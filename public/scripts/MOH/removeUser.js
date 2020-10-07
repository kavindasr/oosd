async function removeuserdb() {
    var url = "http://localhost:8000/api/user?userName=" + document.getElementById("USERremove").value ;
    var url2 = "http://localhost:8000/api/user/all?userName=" + document.getElementById("USERremove").value ;
    // console.log(url);
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("employee removed successfully");
    //     }else{
    //         alert("Invalid Username");
    //         window.location.reload();
    //     }
    // };
    // xhttp.open("DELETE", url, true);
    // xhttp.send();
    const data = await apiCall("GET",url2);
    console.log(data);
    if (data.length!=0){
        const data = await apiCall("DELETE",url);
        alert("User removed successfully");
    }else{
        alert("User doesn't exist");
        window.location.reload();
    }
     
}


