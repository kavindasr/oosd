
function logout(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Successfully logged out !!!");
        }
    };
    xhttp.open("GET", "http://localhost:8000/logOut", true);
    xhttp.send();

}