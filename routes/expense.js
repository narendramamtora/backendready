
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');

router.get('/add-expense', expenseController.getAddExpense);
router.post('/add-expense', expenseController.postAddExpense);
router.delete('/delete-expense/:expeId', expenseController.postDeleteExpense);
// router.get('/edit-expense/:expeId', expenseController.getEditExpense);
// router.post('/edit-expense/:expeId', expenseController.postEditExpense);
router.get('/expenses', expenseController.getExpenses);

router.get('/all-expenses', expenseController.getAllExpenses);
module.exports = router;

