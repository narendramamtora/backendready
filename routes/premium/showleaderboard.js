const express = require('express');
const router = express.Router();
const UserAuth =require('../../middleware/auth');
const PremiumController = require('../../controllers/premium');
router.get('/all-expenses', UserAuth ,PremiumController.getAllExpenses);
module.exports = router;
