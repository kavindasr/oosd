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

const domain = `http://localhost:8000`; //to reduce redundancy
