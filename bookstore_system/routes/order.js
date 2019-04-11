const express = require('express');
const router = express.Router();
const order = require('../server/order_server');

router.get('/order/total/:orderId', order.getTotalPrice);
router.get('/orders', order.getAllOrders);

module.exports = router;
