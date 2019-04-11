var mysql = require('mysql');
var config = require('./config');
var con = mysql.createConnection(config);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});

module.exports = {
    con
};
