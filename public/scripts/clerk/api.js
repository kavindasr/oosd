function apiCall(method,url,data){
    return new Promise((res,rej)=>{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if(method == 'GET'){
                    var data = JSON.parse(this.responseText);
                    res(data);
                }
                else{
                    res("Ok");
                }
            }else if(this.readyState == 4 && (this.status == 405 || this.status == 400 || this.status == 500)){
                rej("Error");
            }
        };
        xhttp.open(method, url, true);
        if(data){
            xhttp.send(JSON.stringify(data)); 
        }
        else{
            xhttp.send();
        }
    });
}

function printDiv(divName) {
    document.getElementById("footer").style.display="none";
    document.getElementById("btn-close").style.display="none";
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
