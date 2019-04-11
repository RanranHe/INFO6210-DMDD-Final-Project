const orderService = require('../service/order_service');

function getTotalPrice(req, res) {
    const id = req.params.orderId;
    const orderExists = orderService.checkOrderId(id);
    orderExists.then(function(check) {
        if (check) {
            const price = orderService.getTotalPrice(id);
            price.then(function (data) {
                if (data != null) {
                    res.status(200).send({"orderId": id, "itemCount": data.item_count, "totalPrice": data.total});
                } else {
                    res.status(400).send({"Message": "Error"});
                }
            });
        } else {
            res.status(400).send({"Message": "Order doesn't exist."});
        }
    })
}

function checkOrderId(req, res, next) {
    const id = req.params.orderId;
    orderService.checkOrderId(id).then(function(check) {
        if (check) {
            return next();
        } else {
            return res.status(400).send({"Message": "Order doesn't exist."});
        }
    })
}

function getAllOrders(req, res) {
    orderService.getAllOrders().then(function(data) {
        res.status(200).send({"Orders": data});
    })
}

function getOrderDetails(req, res) {
    const id = req.params.orderId;
    orderService.getOrderDetails(id).then(function(data) {
        res.status(200).send({"Items": data});
    })
}

module.exports = {
    getTotalPrice,
    checkOrderId,
    getAllOrders,
    getOrderDetails
};