const DB = require('../db');
const con = DB.con;

function getAllEmployees() {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`employee`;";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW EMPLOYEES ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function createEmployee(id, username, password, name, phone, salary) {
    return new Promise(function (resolve) {
        let sql = "INSERT INTO `db_final`.`employee` (`employee_id`, `employee_username`, `employee_password`, `employee_name`, `employee_phone`, `salary`) " +
            "VALUES ('" + id + "', '" + username + "', AES_ENCRYPT('" + password + "', UNHEX(SHA2('sweet',512))), '" + name + "', '" + phone + "', '" + salary + "')";
        console.log(sql);
        con.query(sql, function (err) {
            if (err) {
                console.log("[INSERT EMPLOYEES ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function checkEmployeeId(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`employee` WHERE employee_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK EMPLOYEE ID ERROR]: " + err);
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH EMPLOYEE`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteEmployee(id) {
    return new Promise(function (resolve) {
        let sql = "DELETE FROM `db_final`.`employee` WHERE employee_id='" + id + "'";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE EMPLOYEE ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getEmployee(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`employee` WHERE employee_id='" + id + "';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW EMPLOYEE DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function updateEmployee(id, name, phone, salary) {
    return new Promise(function (resolve) {
        let sql = "UPDATE `db_final`.`employee` SET `employee_name`='" + name +"', `employee_phone`='"+
            phone +"', `salary`='"+ salary +"' WHERE employee_id='" + id + "'";
        con.query(sql, function (err) {
            if (err) {
                console.log("[UPDATE COLUMN ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function login(username, password) {
    return new Promise(function (resolve) {
        let sql = "CALL login('" + username + "', '" + password + "', @a)";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[LOGIN ERROR]: " + err);
                resolve(false);
            }
            if (result) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
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