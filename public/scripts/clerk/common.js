//get the list of garbegs from the database i and out
async function getGarbageList(tablename){
    try{
        gdetails = await apiCall('GET', `${domain}/api/${tablename}/gID&gtype`);
        console.log(gdetails);
        renderHtmlGtype(gdetails);
    }catch(e){
        console.log(e);
    }
}
//calculate the bill amount
function calculate(element1,element2,show){
    var unitp = document.getElementById(element1).innerHTML;
    var num = document.getElementById(element2).value;
    document.getElementById(show).value = (unitp*num).toFixed(2);
}
//printing the bill
function printDiv(divName) {
    document.getElementById("footer").style.display="none";
    document.getElementById("btn-close").style.display="none";
    document.getElementById("modelbody").style.border="double";
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
//price of in and out
async function getPrice(table){
    var sel = document.getElementById("selbox1");
    var text= (sel.options[sel.selectedIndex].text).split("-")[0];
    try{
        gprice = await apiCall('GET', `${domain}/api/${table}/unitp?gID=${text}`);
        console.log(gprice);
        document.getElementById("priceperkg").innerHTML = gprice[0].unit_price;
    }catch(e){
        console.log(e);
    }
}
