const {setData} = require("./data");
const {vehiData} = require("./vehiDis")
const {test} = require("./test");
(async ()=>{
    await setData('2020-12',14);
    //await vehiData('2020-11',30);
})();

//test();
