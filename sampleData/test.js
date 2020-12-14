var mysql = require('mysql');
const {dbConfig} = require('../setting');
function test(){
    
    var pool  = mysql.createPool(dbConfig);
    
    pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    
    // Use the connection
    connection.query("SELECT division_no AS divi,assignedno_of_workers AS cnt,vehicle AS v FROM division_table", function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();
    
        // Handle error after the release.
        if (error) throw error;
        console.log(results);
        // Don't use the connection here, it has been returned to the pool.
    });
    });
}



  module.exports = {test}