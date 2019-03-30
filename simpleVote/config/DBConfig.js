//mysql.js
var mysql = require('mysql2'); 

var connection = mysql.createConnection({
    host: 'localhost', 
    user: 'voter', 
    password: 'voter123', 
    port: '3306',
    database: 'votes', 
});

module.exports = connection;