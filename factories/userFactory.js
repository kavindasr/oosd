createUser = (userType)=>{
    switch(userType){
        case "depot_supervisor":
            const DS = require("../users/depot_supervisor");
            return new DS();
        case "moh_officer":
            const MO = require("../users/moh_officer");
            return new MO();
        default:
            return null;
    }
}

module.exports = createUser;