const {Get,Post,Put,Delete} = require("../methods/method");

function getMethod(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
   // console.log(myurl.searchParams.get('id'));
    switch (req.method){
        case "GET":
            return(new Get(req,res));
     
        case "POST":
            return(new Post(req,res));

        case "DELETE":
            return(new Delete(req,res));

        case "PUT":
            return(new Put(req,res));

        default:
            console.log("Default");
            //httpMsgs.send405(req,res);
            break;
    }
}

module.exports = {getMethod};