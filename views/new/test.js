function run(){
    document.getElementById("small").style.display = "none";
    document.getElementById("full").style.display = "block";
    document.getElementById("icons").className = "col-md-6";
    document.getElementById("view").className = "col-md-6";
    document.getElementById("view").style.display = "block";
}

function back(){
    document.getElementById("view").style.display = "none";
    document.getElementById("icons").style.display = "block";
    document.getElementById("icons").className = "col-md-12";
}

function full(){
    document.getElementById("icons").style.display = "none";
    document.getElementById("view").className = "col-md-12";
    document.getElementById("full").style.display = "none";
    document.getElementById("small").style.display = "block";
}

function small(){
    document.getElementById("view").className = "col-md-6";
    document.getElementById("view").className = "col-md-6";
    document.getElementById("icons").style.display = "block";
    document.getElementById("small").style.display = "none";
    document.getElementById("full").style.display = "block";
}
