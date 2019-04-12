const DB = require('../db');
const con = DB.con;

function getAllCustomers() {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`customer`;";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW CUSTOMERS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function createCustomer(id, name, phone, email) {
    return new Promise(function (resolve) {
        let sql = "INSERT INTO `db_final`.`customer` (`customer_id`, `customer_name`, `customer_phone`, `customer_email`) " +
            "VALUES ('" + id + "', '" + name + "', '" + phone + "', '" + email + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[INSERT CUSTOMERS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function checkCustomerId(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`customer` WHERE customer_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK CUSTOMER ID ERROR]: " + err);
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH CUSTOMER`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteCustomer(id) {
    return new Promise(function (resolve) {
        let sql = "DELETE FROM `db_final`.`customer` WHERE customer_id='" + id + "'";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE CUSTOMER ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getCustomer(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`customer` WHERE customer_id='" + id + "';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW CUSTOMER DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function updateCustomer(id, name, phone, email) {
    return new Promise(function (resolve) {
        let sql = "UPDATE `db_final`.`customer` SET `customer_name`='" + name +"', `customer_phone`='"+
            phone +"', `customer_email`='"+ email +"' WHERE customer_id='" + id + "'";
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

module.exports = {
    getAllCustomers,
    createCustomer,
    checkCustomerId,
    deleteCustomer,
    getCustomer,
    updateCustomer
};