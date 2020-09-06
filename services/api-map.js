
const table = new Map(
    [
        ['employee', 'employee_table'],
        ['attendance', 'daily_attendance'],
        ['division', 'division_table'],
        ['vehicle', 'vehicle_detail'],
        ['session', 'session_table'],
        ['gunbill', 'gin_unbilled'],
        ['ginbill', 'gin_billed'],
        ['gdetail', 'gtype_detail'],
        ['gout', 'garbage_out'],
        ['compin', 'compost_in'],
        ['compout', 'compost_out'],
        ['user', 'user_table']
    ]
);

const condition = new Map(
    [
        ['empid', 'employee_id'], //id to empid
        ['date', 'tdate'],
        ['div', 'division'],
        ['divno', 'division_no'],
        ['gtype', 'waste_type'],
        ['salid', 'salary_id'],
        ['gID', 'gindex'],
        ['userName', 'user_name']
    ]
);

const field = new Map(
    [
        ['all', '*'],
        ['empId', 'employee_id'],
        ['salId', 'salary_id'],
        ['empName', 'name'],
        ['bdate', 'dob'],
        ['empType', 'employee_type'],
        ['sex', 'gender'],
        ['date', 'tdate'],
        ['div', 'division'],
        ['divName', 'division_name'],
        ['mode', 'vehiclewalk'],
        ['gID', 'gindex'],
        ['gtype', 'waste_type'],
        ['unitp', 'unit_price'],
        //ginbill
        ['inday', 'in_date'],
        ['time', 'in_time'],
        ['gtypo', 'g_type'],
        ['weight', 'in_weight'],
        ['amnt', 'bill_amount'],
        //gout
        ['oday', 'out_date'],
        ['otime', 'out_time'],
        ['oweight', 'weight'],
        ['invoice', 'invoice_no'],
        //compost
        ['pctin', 'pct_produced'],
        ['pctout', 'pct_sold'],
        ['maxid', 'MAX(invoice_no) AS pr']
        //add unique key to represnt different combinations of fields
    ]
);

const getTable = (key) => {
    return table.get(key);
}
const getConditon = (key) => {
    return condition.get(key);
}
const getField = (key) => {
    return field.get(key);
}

module.exports = { getTable, getConditon, getField };