const DB = require('../db');
const con = DB.con;

function getAllBooks() {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM book_info;";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW BOOKS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function createBook(id, price, locationId, stock, book_name, publisher_id, author_id, publisher_date,
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
            } else {
                resolve(true);
            }
        });
    });
}

function checkBookId(bookId) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`book` WHERE book_id='" + bookId + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK BOOK ID ERROR]: " + err);
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH BOOK`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getBookDetails(bookId) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM book_info WHERE book_id='" + bookId + "';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW BOOK DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function updateBook(id, price, locationId, stock, book_name, publisher_id, author_id, publisher_date,
                    description, category_id) {
    return new Promise(function (resolve) {
        let sql = "UPDATE `db_final`.`book` SET `price`='" + price + "', `location_id`='" + locationId +
            "', `stock`='" + stock + "', `book_name`='" + book_name + "', `publisher_id`='" + publisher_id +
            "', `author_id`='" + author_id + "', `publisher_date`='" + publisher_date + "', `description`='"
            + description + "', `category_id`='" + category_id + "' WHERE book_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[UPDATE BOOK ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteBook(id) {
    return new Promise(function (resolve) {
        let sql = "DELETE FROM `db_final`.`book` WHERE book_id='" + id + "'";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE BOOK ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function searchBook(id, keyword) {
    return new Promise(function (resolve) {
        let sql = "CALL search('" + id + "', '" + keyword + "', @a)";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[SEARCH BOOK ERROR]: " + err);
                resolve(false);
            }
            console.log(result[0][0].result);
            if(result[0][0].result===1) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

module.exports = {
    getAllBooks,
    createBook,
    checkBookId,
    getBookDetails,
    updateBook,
    deleteBook,
    searchBook
};