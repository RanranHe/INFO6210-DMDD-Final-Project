const DB = require('../db');
const con = DB.con;

function getAllPeriods() {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`period`;";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW PERIODS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function createPeriod(id, timesheetId, start, end) {
    return new Promise(function (resolve) {
        let sql = "INSERT INTO `db_final`.`period` (`period_id`, `timesheet_id`, `start_time`, `end_time`) " +
            "VALUES ('" + id + "', '" + timesheetId + "', '" + start + "', '" + end + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[INSERT PERIODS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function checkPeriodId(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`period` WHERE period_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK PERIOD ID ERROR]: " + err);
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH PERIOD`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deletePeriod(id) {
    return new Promise(function (resolve) {
        let sql = "DELETE FROM `db_final`.`period` WHERE period_id='" + id + "'";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE PERIOD ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getPeriod(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`period` WHERE period_id='" + id + "';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW PERIOD DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function updatePeriod(id, start, end) {
    return new Promise(function (resolve) {
        let sql = "UPDATE `db_final`.`period` SET `start_time`='" + start + "', `end_time`='" +
            end + "' WHERE period_id='" + id + "'";
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
    getAllPeriods,
    createPeriod,
    checkPeriodId,
    deletePeriod,
    getPeriod,
    updatePeriod
};