const express = require('express');
const router = express.Router();
const employee = require('../server/employee_server');

// get all employees
router.get('/employees', employee.getAllEmployees);
// create employee
router.post('/employee', employee.createEmployee);
// delete employee
router.delete('/employee/:employeeId', employee.checkEmployeeId, employee.deleteEmployee);
// get employee
router.get('/employee/:employeeId',employee.checkEmployeeId, employee.getEmployee);
// update employee
router.put('/employee/:employeeId',employee.checkEmployeeId, employee.updateEmployee);

module.exports = router;