const sequelize=require('../util/database');
const Expense = require('../models/expense');
const User = require('../models/user');
const e=require ('express');

exports.getAllExpenses = async (req, res, next) => {
  try {
    console.log('you are in the get all expenses controller/premium');
    const userId = req.user.name;
    console.log('under try control', userId);

    // Fetch expenses with user information using a join
    const expenses = await Expense.findAll();
    const users= await User.findAll();

    res.status(200).json({expenses,users});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fetching failed.' });
  }
};
