const express = require('express');
const router = express.Router();
const location = require('../server/location_server');

// get all locations
router.get('/locations', location.getAllLocations);
// create location
router.post('/location', location.createLocation);
// delete location
router.delete('/location/:locationId', location.checkLocationId, location.deleteLocation);
// get location
router.get('/location/:locationId',location.checkLocationId, location.getLocation);
// update location
router.put('/location/:locationId',location.checkLocationId, location.updateLocation);

module.exports = router;