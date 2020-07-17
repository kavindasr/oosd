// change credentials before run the server

exports.dbConfig ={
    connectionLimit : 10,
    user: 'root',
    password: 'Meelan@37562',
    host: 'localhost',
    database: 'mcDB', 
};

exports.webSettings  = {
    webport:8000,
    protocol: 'http',
    host: 'localhost',
}