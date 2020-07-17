require('dotenv').config();

const host = process.env.HOST;
const webport = process.env.WEBPORT;
const protocol = process.env.PROTOCOL;
const connectionLimit = process.env.CONNECTIONLIMIT;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;


exports.webSettings  = {
    webport,
    protocol,
    host,
}

exports.dbConfig ={
    connectionLimit,
    user,
    password,
    host,
    database, 
};