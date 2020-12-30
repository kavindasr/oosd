async function showUsers(){
    try{
        const url = "http://localhost:8000/api/uTable/uName&uType";
        const cUsers = await apiCall("GET",url);
        
        cUsers.forEach(v=>{
          const ul = document.getElementById("cUser");
          const li = document.createElement("li");
          li.className = "list-group-item";
          const cont = v.user_name + "  -  " + (v.user_type).toUpperCase();
          li.innerHTML = cont;
          ul.appendChild(li);
        });
      }catch(e){
        alert("Cannot Load!");
      }
}


async function addusernew() {
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
            try{
                await await apiCall("POST",`${domain}/signup`,userObj);
                alert("User Added Successfully..");
                window.location.reload();
            }
            catch(e){
                alert("Try again")
            } 
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
