const mysql = require('mysql2');

var db_config = {
  host: '127.0.0.1',
  user: 'andreivacariu',
  password: 'mysql password',
  port: '3306',
  database: 'database name'
  };
  
  var connection;
  
  async function handleDisconnect() {
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {             
      if(err) {                                    
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                    
    });                                   
    
    
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();                        
      } else {                                      
        throw err;                                  
      }
    });
  }
  
  handleDisconnect();
  dbConn = connection;
module.exports = dbConn;

