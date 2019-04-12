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
/*
// get a order's items details
router.get('/order/:orderId', order.checkOrderId, order.getOrderDetails);
// create a order, prepare for adding items into it
router.post('/order', order.createOrder);
// If book already exists in this order, then update the quantity. Otherwise, create a new item
router.post('/order/:orderId/item', order.checkOrderId, order.createItem);
// delete an item
router.delete('/order/item/:itemId', order.checkItemId, order.deleteItem);
// delete an order and related items
router.delete('/order/:orderId', order.checkOrderId, order.deleteOrder);
*/

module.exports = router;
