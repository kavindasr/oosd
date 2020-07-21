// change credentials before run the server
const ksr = {
                connectionLimit : 10,
                user: 'ksr',
                password: 'ksr199841',
                host: 'localhost',
                database: 'oosd2', 
            } ;

const rnj = {
                connectionLimit : 10,
                user: 'root',
                password: 'Roshi#@97324',
                host: 'localhost',
                database: 'oosd', 
            } ;
exports.dbConfig =rnj;

exports.webSettings  = {
    webport:8000,
    protocol: 'http',
    host: 'localhost',
}