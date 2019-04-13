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
                res.status(200).send({
                    "message": "Book created successfully.",
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
            if (!data) {
                res.status(400).send({"message": "Read data error"});
            } else {
                res.status(200).send(data);
            }
        })
}

function updateBook(req, res) {
    const id = req.params.bookId;
    const data = req.body;
    bookService.updateBook(id, data.price, data.locationId, data.stock, data.bookName,
        data.publisherId, data.authorId, data.publishDate, data.description, data.categoryId)
        .then(function (data) {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({"message": "Failed to update book"});
            }
        })
}

function deleteBook(req, res) {
    const id = req.params.bookId;
    bookService.deleteBook(id)
        .then(function (check) {
            if (check) {
                res.status(200).send({"message": "Book deleted successfully"});
            } else {
                res.status(400).send({"message": "Failed to delete. The book is related to orders."});
            }
        })
}

function searchBook(req, res) {
    const keyword = req.params.keyword;
    bookService.getAllBooks()
        .then(function (result) {
            const results = [];
            let i;

            for (i = 0; i < result.length; i++) {
                (function (i) {
                    let pro = new Promise(function (resolve) {
                        bookService.searchBook(result[i].book_id, keyword)
                            .then(function (check) {
                                if (check) {
                                    return resolve(result[i]);
                                } else {
                                    resolve(false);
                                }
                            });
                    });
                    pro.then(function (data) {
                        if (data) {
                            results.push(data);
                        }
                        if (i === result.length - 1) {
                            res.status(200).send({"results": results});
                        }
                    });

                })(i);
            }
        })
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