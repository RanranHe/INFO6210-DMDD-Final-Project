const orderService = require('../service/order_service');
const uuid = require('uuid/v1');

function getTotalPrice(req, res) {
    const id = req.params.orderId;
    orderService.getTotalPrice(id)
        .then(function (data) {
            if (data) {
                res.status(200).send({"orderId": id, "itemCount": data.item_count, "totalPrice": data.total});
            } else {
                res.status(400).send({"message": "Error"});
            }
        });
}

function checkOrderId(req, res, next) {
    const id = req.params.orderId;
    orderService.checkOrderId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                return res.status(400).send({"message": "Order doesn't exist.", "orderId": id});
            }
        })
}

function getAllOrders(req, res) {
    orderService.getAllOrders()
        .then(function (data) {
            res.status(200).send({"orders": data});
        })
}

function getOrderDetails(req, res) {
    const id = req.params.orderId;
    orderService.getOrderDetails(id)
        .then(function (data) {
            res.status(200).send({"items": data});
        })
}

function createOrder(req, res) {
    const data = req.body;
    const id = uuid();
    orderService.createOrder(id, data.customerId, data.orderDate, data.employeeId)
        .then(function (result) {
            if (result) {
                res.status(200).send({"message": "Order created successfully.",
                    "orderId": id, "customerId": data.customerId,
                    "orderDate": data.orderDate, "employeeId": data.employeeId
                });
            } else {
                res.status(400).send({"message": "Failed to create order."});
            }
        })
}

// If book already exists in this order, then update the quantity
// otherwise, create a new item
function createItem(req, res) {
    const orderId = req.params.orderId;
    const data = req.body;
    const id = uuid();
    orderService.createItem(id, orderId, data.quantity, data.bookId)
        .then(function (result) {
            if (result) {
                res.status(200).send({"message": "Item added/updated successfully.",
                    "itemId": result.new_itemId, "orderId": result.new_orderId,
                    "quantity": result.new_qua, "bookId": result.new_bookId
                });
            } else {
                res.status(400).send({"message": "Failed to create item."});
            }
        })
}

function checkItemId(req, res, next) {
    const id = req.params.itemId;
    orderService.checkItemId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                res.status(400).send({"message": "Item doesn't exist"});
            }
        })
}


function deleteItem(req, res) {
    const id = req.params.itemId;
    orderService.deleteItem(id)
        .then(function (result) {
            if (result) {
                res.status(200).send({"message": "Item deleted.", "itemId": id});
            } else {
                res.status(400).send({"message": "Failed to delete item.", "itemId": id});
            }
        })
}

function deleteOrder(req, res) {
    const id = req.params.orderId;
    orderService.deleteOrder(id)
        .then(function (result) {
            if (result) {
                res.status(200).send({"message": "Order deleted.", "orderId": id});
            } else {
                res.status(400).send({"message": "Failed to delete order.", "orderId": id});
            }
        })
}

module.exports = {
    getTotalPrice,
    checkOrderId,
    getAllOrders,
    getOrderDetails,
    createOrder,
    createItem,
    checkItemId,
    deleteItem,
    deleteOrder
};