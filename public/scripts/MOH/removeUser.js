async function removeuserdb() {
    var url = "http://localhost:8000/api/user?userName=" + document.getElementById("USERremove").value ;
    var url2 = "http://localhost:8000/api/user/all?userName=" + document.getElementById("USERremove").value ;

    const data = await apiCall("GET",url2);
    console.log(data);
    if (data.length!=0){
        const data = await apiCall("DELETE",url);
        alert("User removed successfully");
        window.location.reload();
    }else{
        alert("User doesn't exist");
        window.location.reload();
    }
     
}


