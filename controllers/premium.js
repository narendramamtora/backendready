const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize=require('../util/database');
exports.getAllExpenses = async (req, res, next) => {
  try {
    console.log('you are in the get all expenses controller/premium');
    const users= await User.findAll({
      attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.expamount')),'total cost']],
      include: [{
        model:Expense,
        attributes:[]
      }],
      group:['user.id'],
      order: [['total cost', 'DESC']]
    });
    res.status(200).json({users});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fetching failed.' });
  }
};
