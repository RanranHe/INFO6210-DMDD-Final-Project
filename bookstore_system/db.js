var mysql = require('mysql');
var config = require('./config');
var con = mysql.createConnection(config);

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = 'SELECT * FROM customer';
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});

module.exports = {
    con
};
