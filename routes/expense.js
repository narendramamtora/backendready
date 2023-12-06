
const express = require('express');
const router = express.Router();
const UserAuth =require('../middleware/auth');
const expenseController = require('../controllers/expense');

router.post('/add-expense', UserAuth, expenseController.postAddExpense);
router.get('/all-expenses', UserAuth ,expenseController.getAllExpenses);
router.delete('/delete-expense/:expeId', UserAuth ,expenseController.postDeleteExpense);
router.get('/premium-status', UserAuth, expenseController.getPremiumStatus);
module.exports = router;

