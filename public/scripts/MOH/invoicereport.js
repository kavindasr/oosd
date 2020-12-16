async function getinvoicegarbageout() {
    var invoice_num = document.getElementById("invoicenum").value;

    if (invoice_num.length!=0){
        try{
            validate = await apiCall("GET",`${domain}/api/gout/all?invoice=${invoice_num}`);
            console.log(validate);
            console.log(validate.length);
        }
        catch(e){
            validate = e ;
        }
        if(validate.length<=0 || validate == "Error"){
            alert("Invalid Invoice number!!!");
            
        }
        else{
            rendergarbageout(validate);
        }
    }else{
        alert("Please fill the invoice number!!!")
    }
    
}

function rendergarbageout(arr){
    document.getElementById("myModal2").style.display ="block";
    document.getElementById("invoice2").innerHTML = arr[0].invoice_no;
    document.getElementById("date2").innerHTML = (arr[0].out_date).split("T")[0];
    document.getElementById("time2").innerHTML = arr[0].out_time;
    document.getElementById("gartype2").innerHTML = arr[0].waste_type;
    document.getElementById("wght2").innerHTML = arr[0].weight;
}

async function getinvoicegarbagein() {
    var invoice_num = document.getElementById("invoicenum").value;
    

    if (invoice_num.length!=0){
        try{
            validate = await apiCall("GET",`${domain}/api/ginbill/all?invoice=${invoice_num}`);
            console.log(validate);
            console.log(validate.length);
        }
        catch(e){
            validate = e ;
        }
        if(validate.length<=0 || validate == "Error"){
            alert("Invalid Invoice number!!!");
            
        }
        else{
            rendergarbagein(validate);
        }
    }else{
        alert("Please fill the invoice number!!!")
    }

    
}

function rendergarbagein(arr){
    document.getElementById("myModal1").style.display ="block";
    document.getElementById("invoice1").innerHTML = arr[0].invoice_no;
    document.getElementById("date1").innerHTML = (arr[0].in_date).split("T")[0];
    document.getElementById("time1").innerHTML = arr[0].in_time;
    document.getElementById("gartype1").innerHTML = arr[0].g_type;
    document.getElementById("wght1").innerHTML = arr[0].in_weight;
    document.getElementById("amnt1").innerHTML = arr[0].bill_amount;
}

async function getinvoicecompost() {
    var invoice_num = document.getElementById("invoicenum").value;
    

    if (invoice_num.length!=0){
        try{
            validate = await apiCall("GET",`${domain}/api/compout/all?invoice=${invoice_num}`);
            console.log(validate);
            console.log(validate.length);
        }
        catch(e){
            validate = e ;
        }
        if(validate.length<=0 || validate == "Error"){
            alert("Invalid Invoice number!!!");
            
        }
        else{
            rendercompost(validate);
        }
    }else{
        alert("Please fill the invoice number!!!")
    }

    
}

function rendercompost(arr){
    document.getElementById("myModal3").style.display ="block";
    document.getElementById("invoice3").innerHTML = arr[0].invoice_no;
    document.getElementById("date3").innerHTML = (arr[0].out_date).split("T")[0];
    document.getElementById("time3").innerHTML = arr[0].out_time;
    document.getElementById("pct3").innerHTML = arr[0].pct_sold;
    document.getElementById("amnt3").innerHTML = arr[0].bill_amount;
}

function getback(){
    window.location.reload();
}