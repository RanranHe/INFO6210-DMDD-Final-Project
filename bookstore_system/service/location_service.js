const DB = require('../db');
const con = DB.con;

function getAllLocations() {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`location`;";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW LOCATIONS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function createLocation(id, shelfNo, row, column) {
    return new Promise(function (resolve) {
        let sql = "INSERT INTO `db_final`.`location` (`location_id`, `shelf_no`, `row`, `column`) " +
            "VALUES ('" + id + "', '" + shelfNo + "', '" + row + "', '" + column + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[INSERT LOCATIONS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function checkLocationId(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`location` WHERE location_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK LOCATION ID ERROR]: " + err);
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH LOCATION`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteLocation(id) {
    return new Promise(function (resolve) {
        let sql = "DELETE FROM `db_final`.`location` WHERE location_id='" + id + "'";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE LOCATION ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getLocation(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`location` WHERE location_id='" + id + "';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW LOCATION DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function updateLocation(id, shelfNo, row, column) {
    return new Promise(function (resolve) {
        let sql = "UPDATE `db_final`.`location` SET `shelf_no`='" + shelfNo +"', `row`='"+
            row +"', `column`='"+ column +"' WHERE location_id='" + id + "'";
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
    getAllLocations,
    createLocation,
    checkLocationId,
    deleteLocation,
    getLocation,
    updateLocation
};