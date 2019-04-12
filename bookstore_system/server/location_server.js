const locationService = require('../service/location_service');
const uuid = require('uuid/v1');

function getAllLocations(req, res) {
    locationService.getAllLocations()
        .then(function (data) {
            res.status(200).send({"locations": data});
        })
}

function createLocation(req, res) {
    const data = req.body;
    const id = uuid();
    locationService.createLocation(id, data.shelfNo, data.row, data.column)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Location created successfully.",
                    "locationId": id, "shelfNo": data.shelfNo, "row": data.row, "column": data.column
                });
            } else {
                res.status(400).send({"message": "Failed to create location."});
            }
        })
}

function checkLocationId(req, res, next) {
    const id = req.params.locationId;
    locationService.checkLocationId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                res.status(400).send({"message": "Location doesn't exist"});
            }
        })
}

function deleteLocation(req, res) {
    const id = req.params.locationId;
    locationService.deleteLocation(id)
        .then(function (check) {
            if (check) {
                res.status(200).send({"message": "Location deleted successfully"});
            } else {
                res.status(400).send({"message": "Failed to delete location. The location is related to books."});
            }
        })
}

function getLocation(req, res) {
    const id = req.params.locationId;
    locationService.getLocation(id)
        .then(function (data) {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({"message": "Read data error"});
            }
        })
}

function updateLocation(req, res) {
    const id = req.params.locationId;
    const data = req.body;
    locationService.updateLocation(id, data.shelfNo, data.row, data.column)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Update location successfully", "locationId": id,
                    "shelfNo": data.shelfNo, "row": data.row, "column": data.column
                });
            } else {
                res.status(400).send({"message": "Failed to update location"});
            }
        })
}

module.exports = {
    getAllLocations,
    createLocation,
    checkLocationId,
    deleteLocation,
    getLocation,
    updateLocation
};