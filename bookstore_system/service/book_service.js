const DB = require('../db');
const con = DB.con;

function getAllBooks() {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM book_info;";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW BOOKS ERROR]: " + err);
                throw err;
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    getAllBooks
};