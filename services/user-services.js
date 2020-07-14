const {hash,compare} = require("bcrypt");
const users = [];

const addUser = async (email,password,name)=>{
    const hashedPassword = await hash(password,10)

    if(users.find(u=> u.email === email)){
        throw new Error(`User with email: ${email} already exists`);
    }
    const user = {
        id:users.length,
        email,
        name,
        password: hashedPassword
    };
    users.push(user);
    console.log(user);
}

const authUser = async (email,password)=>{
    const user = users.find(u=>u.email===email);

    if(user ){
        const success = await compare(password,user.password);
        if(success){
            return user;
        }

    }
    return false;
};

module.exports = {
    addUser,
    authUser,
};