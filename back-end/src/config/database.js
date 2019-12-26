const mysql = require('mysql');

const connSQL = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'new_fullcam'
});
  
connSQL.connect(err => {
    if (err) throw err;
    console.log( { sucess:'SQL Conected in server'});
});

module.exports = connSQL;