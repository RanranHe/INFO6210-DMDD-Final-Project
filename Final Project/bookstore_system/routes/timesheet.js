const express = require('express');
const router = express.Router();
const timesheet = require('../server/timesheet_server');

// get all timesheets
router.get('/timesheets', timesheet.getAllTimesheets);
// create timesheet
router.post('/timesheet', timesheet.createTimesheet);
// delete timesheet
router.delete('/timesheet/:timesheetId', timesheet.checkTimesheetId, timesheet.deleteTimesheet);
// get timesheet
router.get('/timesheet/:timesheetId',timesheet.checkTimesheetId, timesheet.getTimesheet);
// update timesheet
router.put('/timesheet/:timesheetId',timesheet.checkTimesheetId, timesheet.updateTimesheet);

module.exports = router;