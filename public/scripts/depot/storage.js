const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

var oosd_data = JSON.parse(localStorage.getItem('OOSD_STORAGE'));
if(!oosd_data || oosd_data.date != today){
    oosd_data = {
        date: today,
        attendance: [],
        submitted:false,
        vehiList: []
    }
    localStorage.setItem("OOSD_STORAGE", JSON.stringify(oosd_data));
}

function save(){
    localStorage.setItem("OOSD_STORAGE", JSON.stringify(oosd_data));
}

