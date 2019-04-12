const express = require('express');
const router = express.Router();
const customer = require('../server/customer_server');

// get all customers
router.get('/customers', customer.getAllCustomers);
// create customer
router.post('/customer', customer.createCustomer);
// delete customer
router.delete('/customer/:customerId', customer.checkCustomerId, customer.deleteCustomer);
// get customer
router.get('/customer/:customerId',customer.checkCustomerId, customer.getCustomer);
// update customer
router.put('/customer/:customerId',customer.checkCustomerId, customer.updateCustomer);

module.exports = router;