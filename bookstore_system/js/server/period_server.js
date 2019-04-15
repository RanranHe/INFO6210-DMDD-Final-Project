const periodService = require('../service/period_service');
const uuid = require('uuid/v1');

function getAllPeriods(req, res) {
    periodService.getAllPeriods()
        .then(function (data) {
            res.status(200).send({"periods": data});
        })
}

function createPeriod(req, res) {
    const data = req.body;
    const id = uuid();
    periodService.createPeriod(id, data.timesheetId, data.start, data.end)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Period created successfully.",
                    "periodId": id, "timesheetId": data.timesheetId, "start": data.start, "end": data.end
                });
            } else {
                res.status(400).send({"message": "Failed to create period."});
            }
        })
}

function checkPeriodId(req, res, next) {
    const id = req.params.periodId;
    periodService.checkPeriodId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                res.status(400).send({"message": "Period doesn't exist"});
            }
        })
}

function deletePeriod(req, res) {
    const id = req.params.periodId;
    periodService.deletePeriod(id)
        .then(function (check) {
            if (check) {
                res.status(200).send({"message": "Period deleted successfully"});
            } else {
                res.status(400).send({"message": "Failed to delete period. The period is related to books."});
            }
        })
}

function getPeriod(req, res) {
    const id = req.params.periodId;
    periodService.getPeriod(id)
        .then(function (data) {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({"message": "Read data error"});
            }
        })
}

function updatePeriod(req, res) {
    const id = req.params.periodId;
    const data = req.body;
    periodService.updatePeriod(id, data.start, data.end)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Update period successfully", "periodId": id,
                    "start": data.start, "end": data.end
                });
            } else {
                res.status(400).send({"message": "Failed to update period"});
            }
        })
}

module.exports = {
    getAllPeriods,
    createPeriod,
    checkPeriodId,
    deletePeriod,
    getPeriod,
    updatePeriod
};