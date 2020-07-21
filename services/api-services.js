const getGetQD = (method)=>{
    if(method.getPath(2) == "employee"){
        if(method.searchURL('id')){
            return {fields:"*",table:"employee_table",conditions:`employee_id=${method.searchURL('id')}`};
        }
        return {fields:"*",table:"employee_table",conditions:null};
    }
    else if(method.getPath(2) == "attendance"){
        //complete the code
    }
}

module.exports = {getGetQD}