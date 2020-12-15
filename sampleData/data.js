const { executeSQL } = require("../db/db");

async function setData(month,lim){
    var d,divs;
    try{
        divs = await executeSQL("SELECT division_no AS divi,assignedno_of_workers AS cnt,vehicle AS v FROM division_table");
        // console.log(d);
        // console.log(divs);
    }
    catch(e){
        console.log("error");
    }
    for(var i=1 ; i<= lim ; i++){
        try{
            d = await executeSQL("SELECT employee_id FROM employee_table ORDER BY RAND() LIMIT 130");
        }catch(e){
            console.log("Error 2");
        }
        
        //console.log(divs);
        var j = 0;
        const date = `${month}-${i}`;
        
        for(var x=0 ; x<divs.length ; x++){
            val = []
            var k = 0;
            if(divs[x].v == 1){
                while(k<divs[x].cnt && k<3){
                    val.push(`('${date}',${divs[x].divi},${d[j].employee_id},2)`)
                    j++;
                    k++;
                    
                }
            }
            while(k<divs[x].cnt){
                val.push(`('${date}',${divs[x].divi},${d[j].employee_id},1)`);
                j++;
                k++;
                
            }
            const values = val.join();
            //console.log(`INSERT INTO daily_attendance VALUE ${values}`);
            try{
                const done =  await executeSQL(`INSERT INTO daily_attendance VALUE ${values}`);
                console.log("DONE",i,x);
            }
            catch(e){
                console.log("ERROR 4");
            }
        };  
    }
}

module.exports = {setData}