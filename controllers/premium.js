const User = require('../models/user');
exports.getAllExpenses = async (req, res, next) => {
  try {
    console.log('you are in the get all expenses controller/premium');
    const users= await User.findAll({
      attributes:['id','name','totalExpense'],
      order: [['totalExpense', 'DESC']]
    });
    res.status(200).json({users});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fetching failed.' });
  }
};
