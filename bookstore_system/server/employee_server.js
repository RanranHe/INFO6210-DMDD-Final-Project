const employeeService = require('../service/employee_service');
const uuid = require('uuid/v1');

function getAllEmployees(req, res) {
    employeeService.getAllEmployees()
        .then(function (data) {
            res.status(200).send({"employees": data});
        })
}

function createEmployee(req, res) {
    const data = req.body;
    const id = uuid();
    employeeService.createEmployee(id, data.username, data.password, data.name, data.phone, data.salary)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Employee created successfully.",
                    "employeeId": id, "name": data.name, "phone": data.phone, "salary": data.salary
                });
            } else {
                res.status(400).send({"message": "Failed to create employee."});
            }
        })
}

function checkEmployeeId(req, res, next) {
    const id = req.params.employeeId;
    employeeService.checkEmployeeId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                res.status(400).send({"message": "Employee doesn't exist"});
            }
        })
}

function deleteEmployee(req, res) {
    const id = req.params.employeeId;
    employeeService.deleteEmployee(id)
        .then(function (check) {
            if (check) {
                res.status(200).send({"message": "Employee deleted successfully"});
            } else {
                res.status(400).send({"message": "Failed to delete employee. The employee is related to books."});
            }
        })
}

function getEmployee(req, res) {
    const id = req.params.employeeId;
    employeeService.getEmployee(id)
        .then(function (data) {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({"message": "Read data error"});
            }
        })
}

function updateEmployee(req, res) {
    const id = req.params.employeeId;
    const data = req.body;
    employeeService.updateEmployee(id, data.name, data.phone, data.salary)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Update employee successfully", "employeeId": id,
                    "name": data.name, "phone": data.phone, "salary": data.salary
                });
            } else {
                res.status(400).send({"message": "Failed to update employee"});
            }
        })
}

function login(req, res) {
    const data = req.body;
    employeeService.login(data.username, data.password)
        .then(function (result) {
            if (result) {
                res.status(200).send({"message": "login successfully"});
            } else {
                res.status(400).send({"message": "Failed to login"});
            }
        })
}

module.exports = {
    getAllEmployees,
    createEmployee,
    checkEmployeeId,
    deleteEmployee,
    getEmployee,
    updateEmployee,
    login
};