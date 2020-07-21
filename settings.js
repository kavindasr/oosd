// change credentials before run the server
const ksr = {
                connectionLimit : 10,
                user: 'ksr',
                password: 'ksr199841',
                host: 'localhost',
                database: 'oosd2', 
            } ;

exports.dbConfig =ksr;

exports.webSettings  = {
    webport:8000,
    protocol: 'http',
    host: 'localhost',
}