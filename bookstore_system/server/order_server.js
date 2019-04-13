const orderService = require('../service/order_service');
const uuid = require('uuid/v1');

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
            if (data) {
                res.status(200).send({"orders": data});
            } else {
                res.status(400).send({"message": "Read data error"});
            }
        })
}

function getOrderDetails(req, res) {
    const id = req.params.orderId;
    orderService.getOrderItems(id)
        .then(function (data1) {
            orderService.getOrderDetails(id)
                .then(function (data2) {
                    orderService.getTotalPrice(id)
                        .then(function (data3) {
                            res.status(200).send({
                                "order": data2, "items": data1,
                                "itemCount": data3.item_count, "total": data3.total
                            });
                        })
                })
        })
}

function createOrder(req, res) {
    const data = req.body;
    const id = uuid();
    orderService.createOrder(id, data.customerId, data.orderDate, data.employeeId)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Order created successfully.",
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
                res.status(200).send({
                    "message": "Item added/updated successfully.",
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
                res.status(200).send({"message": "Item deleted."});
            } else {
                res.status(400).send({"message": "Failed to delete item."});
            }
        })
}


function deleteOrder(req, res) {
    const id = req.params.orderId;
    orderService.deleteOrder(id)
        .then(function (result) {
            if (result) {
                res.status(200).send({"message": "Order deleted."});
            } else {
                res.status(400).send({"message": "Failed to delete order."});
            }
        })
}

function updateStockByOrderId(req, res) {
    const id = req.params.orderId;
    orderService.updateStock(id)
        .then(function (result) {
            if (result) {
                res.status(200).send({"message": result.book_updated_count + " books stock updated"});
            } else {
                res.status(400).send({"message": "Failed to update stock."});
            }
        })
}

function updateItem(req, res) {
    const id = req.params.itemId;
    const quantity = req.body.quantity;
    orderService.updateItem(id, quantity)
        .then(function (result) {
            if (result) {
                res.status(200).send({"message": "Item updated."});
            } else {
                res.status(400).send({"message": "Failed to update item."});
            }
        })
}

module.exports = {
    checkOrderId,
    getAllOrders,
    getOrderDetails,
    createOrder,
    createItem,
    checkItemId,
    deleteOrder,
    deleteItem,
    updateStockByOrderId,
    updateItem
};