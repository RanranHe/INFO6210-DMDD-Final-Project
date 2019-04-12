const bookService = require('../service/book_service');
const uuid = require('uuid/v1');

function getAllBooks(req, res) {
    bookService.getAllBooks()
        .then(function (data) {
            res.status(200).send({"books": data});
        })
}

function createBook(req, res) {
    const data = req.body;
    const id = uuid();
    bookService.createBook(id, data.price, data.locationId, data.stock, data.bookName,
        data.publisherId, data.authorId, data.publishDate, data.description, data.categoryId)
        .then(function (result) {
            if (result) {
                res.status(200).send({"message": "Book created successfully.",
                    "bookId": id, "price": data.price, "locationId": data.locationId, "stock": data.stock,
                    "bookName": data.bookName, "publisherId": data.publisherId, "authorId": data.authorId,
                    "publishDate": data.publishDate, "description": data.description, "categoryId": data.categoryId
                });
            } else {
                res.status(400).send({"message": "Failed to create order."});
            }
        })
}

function checkBookId(req, res, next) {
    const id = req.params.bookId;
    bookService.checkBookId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                res.status(400).send({"message": "Book doesn't exist"});
            }
        })
}

function getBookDetails(req, res) {
    const id = req.params.bookId;
    bookService.getBookDetails(id)
        .then(function (data) {
            res.status(200).send(data);
        })
}

module.exports = {
    getAllBooks,
    createBook,
    checkBookId,
    getBookDetails
};