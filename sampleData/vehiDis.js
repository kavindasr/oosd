const {executeSQL} = require("../db/db")

async function vehiData(month, lim){
    var drivers;
    var divisions;
    var vehicles;
    try{
        drivers = await executeSQL("SELECT name FROM driver_table ORDER BY RAND() LIMIT 13;");
    }
    catch(e){
        console.log("ERROR 1");
    }
    try{
        divisions= await executeSQL("SELECT division_no FROM division_table WHERE vehicle=1");
    }
    catch(e){
        console.log("ERROR 2");
    }
    try{
        vehicles = await executeSQL("SELECT index_no FROM vehicle_detail;");
    }
    catch(e){
        console.log("ERROR 3");
    }
    for(var j=1 ; j<=lim ; j++){
        var vals = [];
        for(var i=0 ; i<divisions.length ; i++){
            vals.push(`('${month}-${j}',${divisions[i].division_no},${vehicles[i].index_no},'${drivers[i].name}')`) 
        }
        //console.log(`INSERT INTO vehicle_distribution VALUES ${vals.join()}`);
        try{
            const data = await executeSQL(`INSERT INTO vehicle_distribution VALUES ${vals.join()}`);
            console.log(j,i);
        }
        catch(e){
            console.log("ERROR 4",j,i);
        }
    }
    
}

module.exports = {vehiData}