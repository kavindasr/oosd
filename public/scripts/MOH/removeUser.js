function removeuserdb() {
    var url ='http://localhost:8000/api/user?userName=' +document.getElementById("USERremove").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("employee removed successfully");
            window.location.reload();
        }
    };
    xhttp.open("DELETE", url, true);
    xhttp.send();
}