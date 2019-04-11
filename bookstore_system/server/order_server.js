const orderService = require('../service/order_service');

function getTotalPrice(req, res) {
    const id = req.params.orderId;
    const orderExists = orderService.checkOrderId(id);
    orderExists.then(function(check) {
        if (check) {
            const price = orderService.getTotalPrice(id);
            price.then(function (data) {
                if (data != null) {
                    res.status(200).send({"OrderId": id, "Total Price": data});
                } else {
                    res.status(400).send({"Message": "Error"});
                }
            });
        } else {
            res.status(400).send({"Message": "Order doesn't exist."});
        }
    })
}

function getAllOrders(req, res) {
    orderService.getAllOrders().then(function(data) {
        res.status(200).send({"Orders": data});
    })
}

module.exports = {
    getTotalPrice,
    getAllOrders
};