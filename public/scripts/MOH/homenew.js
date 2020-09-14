function run(page){
    document.getElementById("content").innerHTML=`<object type="text/html" data="${page}" ></object>`;
    document.getElementById("icons").className = "col-lg-3";
    document.getElementById("view").className = "col-lg-9";
    document.getElementById("small").style.display = "none";
    document.getElementById("full").style.display = "block";
    setTimeout(()=>{
        document.getElementById("view").style.display = "block";
    },500);
    
}

function back(){
    document.getElementById("view").style.display = "none";
    document.getElementById("icons").style.display = "block";
    document.getElementById("icons").className = "col-lg-12";
    document.getElementById("content").style.height = "100%";
}

function full(){
    document.getElementById("icons").style.display = "none";
    document.getElementById("view").className = "col-lg-12";
    document.getElementById("full").style.display = "none";
    document.getElementById("small").style.display = "block";
    document.getElementById("content").style.height = "90vh";
}

function small(){
    document.getElementById("view").className = "col-lg-9";
    document.getElementById("icons").className = "col-lg-3";
    document.getElementById("icons").style.display = "block";
    document.getElementById("small").style.display = "none";
    document.getElementById("full").style.display = "block";
    document.getElementById("content").style.height = "100%";
}
