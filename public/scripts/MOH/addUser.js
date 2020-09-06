function addusernew() {
    var emp_Name = document.getElementById("addusername").value;
    var emp_type = (document.getElementById("adduserselection").value);
    var pswd = (document.getElementById("adduserpassword").value);


    var userObj = {
        password: pswd,
        userName: emp_Name,
        userType: emp_type,
    };

    console.log(userObj);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("User Added Successfully..");
        }
    };
    xhttp.open("POST", "http://localhost:8000/signup", true);
    xhttp.send(JSON.stringify(userObj));
}

