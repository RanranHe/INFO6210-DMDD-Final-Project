const DB = require('../db');
const con = DB.con;

function getTotalPrice(orderId){
    return new Promise(function (resolve) {
        let sql = `CALL calculus_total_price('` + orderId + `', @a, @b);`;
        console.log(sql);
        con.query(sql, function (err, rows) {
            if (err) {
                console.log("[GET TOTAL PRICE ERROR]: " + err);
                throw err;
            }
            let row = rows[0][0];
            if (row) {
                console.log("Total price: " + row.total + " Total item count: " + row.item_count);
                resolve(row);
            } else {
                console.log("NO total price");
            }
        });
    });
}

function checkOrderId(orderId) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`order` WHERE order_id='" + orderId + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK ORDER ID ERROR]: " + err);
                throw err;
            }
            if (result[0] == null || result[0]===undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH ORDER`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getAllOrders() {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM order_view;";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW ORDERS ERROR]: " + err);
                throw err;
            } else {
                resolve(result);
            }
        });
    });
}

function getOrderDetails(orderId) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM order_details_view WHERE order_id='" + orderId+"';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW ORDERS ERROR]: " + err);
                throw err;
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
}

module.exports = {
    getTotalPrice,
    checkOrderId,
    getAllOrders,
    getOrderDetails
};

