function removeuserdb() {
  console.log("hiii");
  var url =
    "http://localhost:8000/api/user?userName=" +
    document.getElementById("USERremove").value;
  console.log(url);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("employee removed successfully");
    }
  };
  xhttp.open("DELETE", url, true);
  xhttp.send();
}
