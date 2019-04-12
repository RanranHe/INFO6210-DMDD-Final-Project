const DB = require('../db');
const con = DB.con;

function createCategory(id, name) {
    return new Promise(function (resolve) {
        let sql = "INSERT INTO `db_final`.`category` (`category_id`, `category_name`) " +
            "VALUES ('" + id + "', '" + name + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[INSERT CATEGORY ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function checkCategoryId(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`category` WHERE category_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK CATEGORY ID ERROR]: " + err);
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH CATEGORY`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteCategory(id) {
    return new Promise(function (resolve) {
        let sql = "DELETE FROM `db_final`.`category` WHERE category_id='" + id + "'";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE CATEGORY ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getCategory(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`category` WHERE category_id='" + id + "';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW CATEGORY DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function updateCategory(id, name) {
    return new Promise(function (resolve) {
        let sql = "UPDATE `db_final`.`category` SET `category_name`='" + name + "' WHERE category_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[UPDATE CATEGORY ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = {
    createCategory,
    checkCategoryId,
    deleteCategory,
    getCategory,
    updateCategory
};