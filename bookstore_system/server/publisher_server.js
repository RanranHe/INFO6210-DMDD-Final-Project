const publisherService = require('../service/publisher_service');
const uuid = require('uuid/v1');

function getAllPublishers(req, res) {
    publisherService.getAllPublishers()
        .then(function (data) {
            res.status(200).send({"publishers": data});
        })
}

function createPublisher(req, res) {
    const data = req.body;
    const id = uuid();
    publisherService.createPublisher(id, data.publisherName, data.country, data.city)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Publisher created successfully.", "publisherId": id,
                    "publisherName": data.publisherName, "country": data.country, "city": data.city
                });
            } else {
                res.status(400).send({"message": "Failed to create publisher."});
            }
        })
}

function checkPublisherId(req, res, next) {
    const id = req.params.publisherId;
    publisherService.checkPublisherId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                res.status(400).send({"message": "Publisher doesn't exist"});
            }
        })
}

function deletePublisher(req, res) {
    const id = req.params.publisherId;
    publisherService.deletePublisher(id)
        .then(function (check) {
            if (check) {
                res.status(200).send({"message": "Publisher deleted successfully"});
            } else {
                res.status(400).send({"message": "Failed to delete publisher. The publisher is related to books."});
            }
        })
}

function getPublisher(req, res) {
    const id = req.params.publisherId;
    publisherService.getPublisher(id)
        .then(function (data) {
            console.log(data);
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({"message": "Read data error"});
            }
        })
}

function updatePublisher(req, res) {
    const id = req.params.publisherId;
    const data = req.body;
    publisherService.updatePublisher(id, data.publisherName, data.country, data.city)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Update publisher successfully", "publisherId": id,
                    "publisherName": data.publisherName
                });
            } else {
                res.status(400).send({"message": "Failed to update publisher"});
            }
        })
}

module.exports = {
    getAllPublishers,
    createPublisher,
    checkPublisherId,
    deletePublisher,
    getPublisher,
    updatePublisher
};