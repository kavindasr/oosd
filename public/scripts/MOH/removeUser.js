async function removeuserdb() {
    const uName = document.getElementById("USERremove").value;
    var url = "http://localhost:8000/api/user?userName=" + uName ;
    var url2 = "http://localhost:8000/api/user/all?userName=" + uName ;


    if (uName!=""){
        const data = await apiCall("GET",url2);

        if (data.length!=0){
            try{
                const data = await apiCall("DELETE",url);
                alert("User removed successfully");
                window.location.reload();
            }
            catch(e){
                alert("Error Occured");
                window.location.reload();
            }
        }else{
            alert("User doesn't exist");
            window.location.reload();
        }
    }else{
        alert("Please fill the user name!!!")
    }
    
     
}


