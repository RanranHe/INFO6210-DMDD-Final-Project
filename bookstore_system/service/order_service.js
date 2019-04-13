const DB = require('../db');
const con = DB.con;

function getTotalPrice(orderId) {
    return new Promise(function (resolve) {
        let sql = `CALL calculus_total_price('` + orderId + `', @a, @b);`;
        console.log(sql);
        con.query(sql, function (err, rows) {
            if (err) {
                console.log("[GET TOTAL PRICE ERROR]: " + err);
                resolve(false);
            }
            let row = rows[0][0];
            if (row) {
                console.log("Total price: " + row.total + " Total item count: " + row.item_count);
                resolve(row);
            } else {
                resolve(false);
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
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
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
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function getOrderItems(orderId) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM order_details_view WHERE order_id='" + orderId + "';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW ORDER ITEMS DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function getOrderDetails(orderId) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`order` WHERE order_id='" + orderId + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW ORDER DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function createOrder(order_id, customer_id, order_date, employee_id) {
    return new Promise(function (resolve) {
        let sql = "INSERT INTO `db_final`.`order` (`order_id`, `customer_id`, `order_date`, `employee_id`) " +
            "VALUES ('" + order_id + "', '" + customer_id + "', '" + order_date + "', '" + employee_id + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[INSERT ORDER ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function createItem(item_id, order_id, quantity, book_id) {
    return new Promise(function (resolve) {
        let sql = "CALL add_item('" + item_id + "', '" + order_id + "', '" + quantity + "', '" +
            book_id + "', @a, @b, @c, @d);";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[INSERT ITEM ERROR]: " + err);
                resolve(false);
            } else {
                console.log(result[0][0]);
                resolve(result[0][0]);
            }
        });
    });
}

function updateStockByOrderId(orderId) {
    return new Promise(function (resolve) {
        let sql = "CALL update_stock_while_placing_order('" + orderId + "', @a);";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[UPDATE STOCK ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0][0]);
            }
        });
    });
}

function checkItemId(item_id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`item` WHERE item_id='" + item_id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK ITEM ID ERROR]: " + err);
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH ITEM`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteItem(item_id) {
    return new Promise(function (resolve) {
        let sql = "call delete_item('" + item_id + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE ITEM ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteOrder(order_id) {
    return new Promise(function (resolve) {
        let sql = "CALL delete_order('" + order_id + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE ORDER ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function updateItem(item_id, quantity) {
    return new Promise(function (resolve) {
        let sql = "call update_item('" + item_id + "', " + quantity + ")";
        con.query(sql, function (err) {
            if (err) {
                console.log("[UPDATE ITEM ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = {
    getTotalPrice,
    checkOrderId,
    getAllOrders,
    getOrderItems,
    getOrderDetails,
    createOrder,
    createItem,
    updateStockByOrderId,
    checkItemId,
    deleteItem,
    deleteOrder,
    updateItem
};

