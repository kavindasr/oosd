
function logout(){
    try{
        vehicles = await apiCall("GET", `${domain}/logOut`);
        alert("Successfully logged out !!!");
    }
    catch(e){
        alert("Reload and try again!");
    } 
}