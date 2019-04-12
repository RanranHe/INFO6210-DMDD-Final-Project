const express = require('express');
const router = express.Router();
const book = require('../server/book_server');

// get all books listed
router.get('/books', book.getAllBooks);
// create new book
router.post('/book', book.createBook);
// get book info
router.get('/book/:bookId', book.checkBookId, book.getBookDetails);
// update book info
router.put('/book/:bookId', book.checkBookId, book.updateBook);
// delete book
router.delete('/book/:bookId', book.checkBookId, book.deleteBook);

module.exports = router;
