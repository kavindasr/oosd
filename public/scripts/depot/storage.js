//oosdData = {date:'2020-1-2',attendance:[{div:1,empLst:[emp1,emp2]},{div:2,empLst:[emp3,emp4]}]}
const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

var oosd_data = JSON.parse(localStorage.getItem('OOSD_STORAGE'));
if(!oosd_data || oosd_data.date != today){
    oosd_data = {
        date: today,
        attendance: []
    }
}

