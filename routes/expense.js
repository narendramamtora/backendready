
const express = require('express');
const router = express.Router();
const UserAuth =require('../middleware/auth');
const expenseController = require('../controllers/expense');

router.post('/add-expense', UserAuth, expenseController.postAddExpense);
router.get('/all-expenses', UserAuth ,expenseController.getAllExpenses);
router.delete('/delete-expense/:expeId', UserAuth ,expenseController.postDeleteExpense);

//router.get('/add-expense', expenseController.getAddExpense);
// router.get('/edit-expense/:expeId', expenseController.getEditExpense);
// router.post('/edit-expense/:expeId', expenseController.postEditExpense);
//router.get('/expenses', expenseController.getExpenses);

module.exports = router;

