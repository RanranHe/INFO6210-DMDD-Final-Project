const DB = require('../db');
const con = DB.con;

function getAllPublishers() {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`publisher`;";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW PUBLISHERS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function createPublisher(id, name, country, city) {
    return new Promise(function (resolve) {
        let sql = "INSERT INTO `db_final`.`publisher` (`publisher_id`, `publisher_name`, `country`, `city`) " +
            "VALUES ('" + id + "', '" + name + "', '" + country + "', '" + city + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[INSERT PUBLISHER ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function checkPublisherId(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`publisher` WHERE publisher_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK PUBLISHER ID ERROR]: " + err);
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH PUBLISHER`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deletePublisher(id) {
    return new Promise(function (resolve) {
        let sql = "DELETE FROM `db_final`.`publisher` WHERE publisher_id='" + id + "'";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE PUBLISHER ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getPublisher(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`publisher` WHERE publisher_id='" + id + "';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW PUBLISHER DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function updatePublisher(id, name, country, city) {
    return new Promise(function (resolve) {
        let sql = "UPDATE `db_final`.`publisher` SET `publisher_name`='" + name + "', `country`='" +
            country + "', `city`='" + city + "' WHERE publisher_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[UPDATE PUBLISHER ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = {
    getAllPublishers,
    createPublisher,
    checkPublisherId,
    deletePublisher,
    getPublisher,
    updatePublisher
};