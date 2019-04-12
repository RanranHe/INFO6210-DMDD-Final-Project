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
router.post('/order/:orderId/item', order.checkOrderId, order.createItem);
// delete an item
router.delete('/order/item/:itemId', order.checkItemId, order.deleteItem);
// delete an order and related items
router.delete('/order/:orderId', order.checkOrderId, order.deleteOrder);
// update stock after place order
router.put('/order/:orderId', order.checkOrderId, order.updateStock);

module.exports = router;
