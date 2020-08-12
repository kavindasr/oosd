
const table = new Map(
    [
        ['employee','employee_table'],
        ['attendance','daily_attendance'],
        ['division','division_table'],
        ['vehicle','vehicle_detail'],
        ['session','session_table'],
        ['ginbill','gin_billed'],
        ['gdetail','gtype_detail']
    ]
);

const condition = new Map(
    [
        ['empid','employee_id'], //id to empid
        ['date','tdate'],
        ['div','division'],
        ['divno','division_no'],
        ['gtype','waste_type']
    ]
);

const field = new Map(
    [
        ['all','*'],
        ['empId','employee_id'],
        ['salId','salary_id'],
        ['empName','name'],
        ['bdate', 'dob'],
        ['empType', 'employee_type'],
        ['sex','gender'],
        ['date','tdate'],
        ['div', 'division'],
        ['mode','vehiclewalk'],
        ['gID','gindex'],
        ['gtype','waste_type'],
        ['unitp','unit_price']

        //add unique key to represnt different combinations of fields
    ]
);

const getTable = (key)=>{
    return table.get(key);
}
const getConditon = (key)=>{
    return condition.get(key);
}
const getField = (key)=>{
    return field.get(key);
}

module.exports = {getTable,getConditon,getField};