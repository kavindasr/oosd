function addusernew() {
    var emp_Name = document.getElementById("addusername").value;
    var emp_type = (document.getElementById("adduserselection").value);
    var pswd1 = (document.getElementById("adduserpassword12").value);
    var pswd2 = (document.getElementById("adduserpassword34").value);

     console.log(emp_Name,emp_type,pswd1,pswd2);
    var userObj = {
        password: pswd1,
        userName: emp_Name,
        userType: emp_type,
    };

    if (emp_Name!="" && pswd1!=""){
        if (pswd1==pswd2){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    alert("User Added Successfully..");
                    window.location.reload();
                }else{
                    alert("Username alreafy exist")
                    window.location.reload();
                }
            };
            xhttp.open("POST", "http://localhost:8000/signup", true);
            xhttp.send(JSON.stringify(userObj));
        }else{
            alert("Passwords doesn't match!!")
        }
    }
    else{
        alert("Please fill all the fields!!!");
    }
    
}

function showPass() {
    var x = document.getElementById("adduserpassword12");
    var y = document.getElementById("adduserpassword34");
    if (x.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  }
