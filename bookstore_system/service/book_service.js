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

function createBook(id, price, locationId, stock, book_name,publisher_id, author_id, publisher_date,
                    description, category_id) {
    return new Promise(function (resolve) {
        let sql = "INSERT INTO `db_final`.`book` (`book_id`, `price`, `location_id`, `stock`, `book_name`, " +
            "`publisher_id`, `author_id`, `publisher_date`, `description`, `category_id`) " +
            "VALUES ('" + id + "', '" + price + "', '" + locationId + "', '" + stock + "', '" + book_name + "', '"
            + publisher_id + "', '" + author_id + "', '" + publisher_date + "', '" + description + "', '" +
            category_id + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[INSERT BOOK ERROR]: " + err);
                resolve(false);
                throw err;
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = {
    getAllBooks,
    createBook
};