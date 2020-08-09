
const table = new Map(
    [
        ['employee','employee_table'],
        ['attendance','daily_attendance'],
        ['division','division_table'],
        ['division','vehicle_detail']
    ]
);

const condition = new Map(
    [
        ['empid','employee_id'], //id to empid
        ['date','tdate'],
        ['div','division']
    ]
);

const field = new Map(
    [
        ['all','*'],
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