const DB = require('../db');
const con = DB.con;

function getAllTimesheets() {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`timesheet_details`;";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW TIMESHEETS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function createTimesheet(id, employeeId, year, month) {
    return new Promise(function (resolve) {
        let sql = "INSERT INTO `db_final`.`timesheet` (`timesheet_id`, `employee_id`, `year`, `month`) " +
            "VALUES ('" + id + "', '" + employeeId + "', '" + year + "', '" + month + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[INSERT TIMESHEETS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function checkTimesheetId(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`timesheet` WHERE timesheet_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK TIMESHEET ID ERROR]: " + err);
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH TIMESHEET`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteTimesheet(id) {
    return new Promise(function (resolve) {
        let sql = "DELETE FROM `db_final`.`timesheet` WHERE timesheet_id='" + id + "'";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE TIMESHEET ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getTimesheet(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`timesheet` WHERE timesheet_id='" + id + "';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW TIMESHEET DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function updateTimesheet(id, year, month) {
    return new Promise(function (resolve) {
        let sql = "UPDATE `db_final`.`timesheet` SET `year`='" + year +"', `month`='"+
            month + "' WHERE timesheet_id='" + id + "'";
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
    getAllTimesheets,
    createTimesheet,
    checkTimesheetId,
    deleteTimesheet,
    getTimesheet,
    updateTimesheet
};