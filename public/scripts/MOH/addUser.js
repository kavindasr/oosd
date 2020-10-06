function addusernew() {
    var emp_Name = document.getElementById("addusername").value;
    var emp_type = (document.getElementById("adduserselection").value);
    var pswd1 = (document.getElementById("adduserpassword12").value);
    var pswd2 = (document.getElementById("adduserpassword34").value);


    var userObj = {
        password: pswd1,
        userName: emp_Name,
        userType: emp_type,
    };

    if (pswd1==pswd2){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("User Added Successfully..");
                window.location.reload();
            }
        };
        xhttp.open("POST", "http://localhost:8000/signup", true);
        xhttp.send(JSON.stringify(userObj));
    }else{
        alert("paswor mismatch")
    }
}
