
const express = require('express');
const router = express.Router();
const UserAuth =require('../middleware/auth');
const ReportController = require('../controllers/report');
router.get('/all-expenses', UserAuth ,ReportController.getAllExpenses);
router.get('/download', UserAuth ,ReportController.downloadexpense);
router.get('/last-downloaded', UserAuth ,ReportController.lastdownload);
module.exports = router;

