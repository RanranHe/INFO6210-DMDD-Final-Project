const bookService = require('../service/book_service');
const uuid = require('uuid/v1');

function getAllBooks(req, res) {
    bookService.getAllBooks()
        .then(function (data) {
            res.status(200).send({"books": data});
        })
}

module.exports = {
    getAllBooks
};