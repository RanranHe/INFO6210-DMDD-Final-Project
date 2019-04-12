const express = require('express');
const router = express.Router();
const publisher = require('../server/publisher_server');

// get all publishers
router.get('/publishers', publisher.getAllPublishers);
// create publisher
router.post('/publisher', publisher.createPublisher);
// delete publisher
router.delete('/publisher/:publisherId', publisher.checkPublisherId, publisher.deletePublisher);
// get publisher
router.get('/publisher/:publisherId',publisher.checkPublisherId, publisher.getPublisher);
// update publisher
router.put('/publisher/:publisherId',publisher.checkPublisherId, publisher.updatePublisher);

module.exports = router;