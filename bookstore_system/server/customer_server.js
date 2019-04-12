const customerService = require('../service/customer_service');
const uuid = require('uuid/v1');

function getAllCustomers(req, res) {
    customerService.getAllCustomers()
        .then(function (data) {
            res.status(200).send({"customers": data});
        })
}

function createCustomer(req, res) {
    const data = req.body;
    const id = uuid();
    customerService.createCustomer(id, data.name, data.phone, data.email)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Customer created successfully.",
                    "customerId": id, "name": data.name, "phone": data.phone,
                    "email": data.email
                });
            } else {
                res.status(400).send({"message": "Failed to create customer."});
            }
        })
}

function checkCustomerId(req, res, next) {
    const id = req.params.customerId;
    customerService.checkCustomerId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                res.status(400).send({"message": "Customer doesn't exist"});
            }
        })
}

function deleteCustomer(req, res) {
    const id = req.params.customerId;
    customerService.deleteCustomer(id)
        .then(function (check) {
            if (check) {
                res.status(200).send({"message": "Customer deleted successfully"});
            } else {
                res.status(400).send({"message": "Failed to delete customer. The customer is related to orders."});
            }
        })
}

function getCustomer(req, res) {
    const id = req.params.customerId;
    customerService.getCustomer(id)
        .then(function (data) {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({"message": "Read data error"});
            }
        })
}

function updateCustomer(req, res) {
    const id = req.params.customerId;
    const data = req.body;
    customerService.updateCustomer(id, data.name, data.phone, data.email)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Update customer successfully", "customerId": id, "name": data.name,
                    "phone": data.phone, "email": data.email
                });
            } else {
                res.status(400).send({"message": "Failed to update customer"});
            }
        })
}

module.exports = {
    getAllCustomers,
    createCustomer,
    checkCustomerId,
    deleteCustomer,
    getCustomer,
    updateCustomer
};