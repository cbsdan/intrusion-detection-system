const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, isAdmin } = require('../middleware/auth'); 

const {
    newLog,
    getLogByParam,
    getAllLogs,
    getMultiClassTypeCounts,
    getBinaryClassTypeCounts
} = require('../controllers/logController');


// Log routes
router.post('/log', isAuthenticatedUser, newLog); 
router.get('/log', isAdmin, getLogByParam); 
router.get('/logs-all', isAdmin, getAllLogs); 

// Dashboard routes
router.get('/multi-class-type-counts', isAdmin, getMultiClassTypeCounts);
router.get('/binary-class-type-counts', isAdmin, getBinaryClassTypeCounts);

module.exports = router;

// Explanation:
// Log Routes:
// POST /log: Calls the newLog function to create a new log entry.
// GET /log/:param: Calls the getLogByParam function to retrieve a specific log entry by its parameter (ID).
// GET /log: Calls the getAllLogs function to retrieve all log entries.
// Dashboard Routes:
// GET /dashboard/multi-class-type-counts: Calls the getMultiClassTypeCounts function to get counts of multi-class types.
// GET /dashboard/binary-class-type-counts: Calls the getBinaryClassTypeCounts function to get counts of binary class types.
// Make sure to integrate this routes file into your main application file (e.g., app.js or server.js) to ensure that these routes are accessible.