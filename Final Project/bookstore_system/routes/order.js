const express = require('express');
const router = express.Router();
const order = require('../server/order_server');

// get all orders listed
router.get('/orders', order.getAllOrders);

// get a order's items details
router.get('/order/:orderId', order.checkOrderId, order.getOrderDetails);

// create a order, prepare for adding items into it
router.post('/order', order.createOrder);

// If book already exists in this order, then update the quantity. Otherwise, create a new item
// ***** THIS ACTION WILL CAUSE BOOK STOCK UPDATES *******
// ***** USE FOR ORDER UPDATE *******
router.post('/order/:orderId/item', order.checkOrderId, order.createItem);

// delete item with stock updates
// ***** THIS ACTION WILL CAUSE BOOK STOCK UPDATES *******
// ***** USE FOR ORDER CANCEL CERTAIN ITEM *******
router.delete('/order/:orderId/item/:itemId', order.checkOrderId, order.checkItemId, order.deleteItem);

// update item with stock updates
// ***** THIS ACTION WILL CAUSE BOOK STOCK UPDATES *******
// ***** USE FOR ORDER CANCEL CERTAIN ITEM *******
router.put('/order/:orderId/item/:itemId', order.checkOrderId, order.checkItemId, order.updateItem);

// delete an order and related items
// ***** THIS ACTION WILL CAUSE BOOK STOCK UPDATES *******
// ***** USE FOR CANCEL THE WHOLE ORDER *******
router.delete('/order/:orderId', order.checkOrderId, order.deleteOrder);

// update stock after place order
// ***** FOR PLACING ORDER: *******
// ***** 1. CREATE ORDER *******
// ***** 2. ADD ITEMS INTO ORDER *******
// ***** 3. UPDATE STOCK WITH THIS API *******
router.put('/order/:orderId', order.checkOrderId, order.updateStockByOrderId);

module.exports = router;
