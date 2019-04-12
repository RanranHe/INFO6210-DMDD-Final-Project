const express = require('express');
const router = express.Router();
const period = require('../server/period_server');

// get all periods
router.get('/periods', period.getAllPeriods);
// create period
router.post('/period', period.createPeriod);
// delete period
router.delete('/period/:periodId', period.checkPeriodId, period.deletePeriod);
// get period
router.get('/period/:periodId',period.checkPeriodId, period.getPeriod);
// update period
router.put('/period/:periodId',period.checkPeriodId, period.updatePeriod);

module.exports = router;