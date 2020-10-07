const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

async function change() {
    const oldPass = document.getElementById("oldPass").value;
    const newPass1 = document.getElementById("newPass1").value;
    const newPass2 = document.getElementById("newPass2").value;
    if(newPass1 === newPass2){
        try{
            const req = await apiCall("PUT",`${domain}/changePass?uName='${sessionStorage.getItem("OOSD_session")}'`,{
                "NewPassword" : newPass1,
                "CurrPassword" : oldPass
            });
            document.getElementById("msg").style.color = "#07689f";
            document.getElementById("msg").style.display = "block";
            document.getElementById("msg").innerHTML = "Password changed successfully!";
            setTimeout(()=>{
                location.replace("/");
            },5000);
        }
        catch(e){
            document.getElementById("msg").style.color = "#ff4b5c";
            document.getElementById("msg").style.display = "block";
            document.getElementById("msg").innerHTML = "Please enter current password correctly!"
        }
    }
    else{
        document.getElementById("msg").style.color = "#ff4b5c";
        document.getElementById("msg").style.display = "block";
        document.getElementById("msg").innerHTML = "You have to re-enter new password correctly";
    }
}