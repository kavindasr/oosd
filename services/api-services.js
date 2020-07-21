const getGetQD = (method)=>{
    if(method.getPath(2) == "employee"){
        if(method.searchURL('id')){
            return {fields:"*",table:"employee_table",conditions:`employee_id=${method.searchURL('id')}`};
        }
        return {fields:"*",table:"employee_table",conditions:null};
    }
    else if(method.getPath(2) == "attendance"){
        if(method.searchURL('date')){
            if(method.searchURL('div')){
                return  {fields:"*",table:"daily_attendance",conditions:`tdate=${method.searchURL('date')} AND division=${method.searchURL('div')}`};
            }
            else{
                return {fields:"*",table:"daily_attendance",conditions:`tdate=${method.searchURL('date')}`};
            }   
        }
        else{
            return {fields:"*",table:"daily_attendence",conditions:null};
        }  
    }
    else if (method.getPath(2)=="vehicles"){
        return {fields:"*",table:"vehicle_detail",conditions:null};
    }
    else if (method.getPath(2)=="divisions"){
        if(method.searchURL('id')){
            return {fields:"*",table:"division_table",conditions:`division_no=${method.searchURL('id')}`};
        }
        else{
            return {fields:"*",table:"division_table",conditions:null};
        }  
    }
}

module.exports = {getGetQD}