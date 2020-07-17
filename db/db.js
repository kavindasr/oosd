var mysql = require('mysql');
const {dbConfig} = require('../settings');
var pool  = mysql.createPool(dbConfig);
 
exports.executeSQL = (sql)=>{
    return new Promise((res,rej)=>{
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
           
            // Use the connection
            connection.query('SELECT something FROM sometable', function (error, results, fields) {

                // When done with the connection, release it.
                connection.release();
            
                // Handle error after the release.
                if (error){
                    rej({error});
                }
                res(results);
            
                // Don't use the connection here, it has been returned to the pool.
            });
          });
    });
}