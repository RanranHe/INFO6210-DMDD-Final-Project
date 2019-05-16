const timesheetService = require('../service/timesheet_service');
const uuid = require('uuid/v1');

function getAllTimesheets(req, res) {
    timesheetService.getAllTimesheets()
        .then(function (data) {
            res.status(200).send({"timesheets": data});
        })
}

function createTimesheet(req, res) {
    const data = req.body;
    const id = uuid();
    timesheetService.createTimesheet(id, data.employeeId, data.year, data.month)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Timesheet created successfully.",
                    "timesheetId": id, "employeeId": data.employeeId, "year": data.year, "month": data.month
                });
            } else {
                res.status(400).send({"message": "Failed to create timesheet."});
            }
        })
}

function checkTimesheetId(req, res, next) {
    const id = req.params.timesheetId;
    timesheetService.checkTimesheetId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                res.status(400).send({"message": "Timesheet doesn't exist"});
            }
        })
}

function deleteTimesheet(req, res) {
    const id = req.params.timesheetId;
    timesheetService.deleteTimesheet(id)
        .then(function (check) {
            if (check) {
                res.status(200).send({"message": "Timesheet deleted successfully"});
            } else {
                res.status(400).send({"message": "Failed to delete timesheet. The timesheet is related to books."});
            }
        })
}

function getTimesheet(req, res) {
    const id = req.params.timesheetId;
    timesheetService.getTimesheet(id)
        .then(function (data) {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({"message": "Read data error"});
            }
        })
}

function updateTimesheet(req, res) {
    const id = req.params.timesheetId;
    const data = req.body;
    timesheetService.updateTimesheet(id, data.year, data.month)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Update timesheet successfully", "timesheetId": id,
                    "year": data.year, "column": data.month
                });
            } else {
                res.status(400).send({"message": "Failed to update timesheet"});
            }
        })
}

module.exports = {
    getAllTimesheets,
    createTimesheet,
    checkTimesheetId,
    deleteTimesheet,
    getTimesheet,
    updateTimesheet
};