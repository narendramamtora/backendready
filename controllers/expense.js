const Expense = require('../models/expense');
const User= require('../models/user');
const sequelize= require('../util/database');


exports.getAllExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const page = req.query.page || 1; // Get the requested page from query parameters
    const itemsPerPage = parseInt(req.query.limit) || 5; // Adjust this based on the desired number of items per page

    const offset = (page - 1) * itemsPerPage;
    const expenses = await Expense.findAndCountAll({
      where: { userId },
      limit: itemsPerPage,
      offset: offset,
    });

    const totalPages = Math.ceil(expenses.count / itemsPerPage);

    // Send back the expenses and pagination information
    res.status(200).json({
      expenses: expenses.rows,
      pagination: {
        currentPage: page,
        hasNextPage: page < totalPages,
        nextPage: page < totalPages ? page + 1 : null,
        hasPreviousPage: page > 1,
        previousPage: page > 1 ? page - 1 : null,
        lastPage: totalPages,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fetching failed.' });
  }
};

exports.postAddExpense = async (req, res, next) => {
  const t= await sequelize.transaction();
  try { 
  const expAmount = parseFloat(req.body.expense);
  const description = req.body.descrip;
  const select = req.body.mselect;
  const userId = req.user.id;
  //console.log('in  the postAddExpense',userId);

  console.log('*****',expAmount, description);
  
    const newExpense = await Expense.create({
      expamount: expAmount,
      description: description,
      select: select,
      userId:userId,
    }, {
      transaction: t,
    });
    const user = await User.findByPk(userId);

    if (user) {
      // Update the totalExpense field for the user
      user.totalExpense = (user.totalExpense || 0) + expAmount;
      await user.save({ transaction: t });
    } else {
      console.log('User not found');
    }
    await t.commit();
    res.status(201).json(newExpense);
  } catch (err) {
    console.log('i am in the catch 13.03');
    await t.rollback();
    console.error('Error creating expense:', err);
    res.status(500).json({ message: 'Error creating expense' });
  }

};
exports.postDeleteExpense = async (req, res, next) => {
  const t= await sequelize.transaction();
  const expeId = req.params.expeId; // Use req.params.expeId
  try {
    const expense = await Expense.findByPk(expeId);
    if (!expense) {
      return res.status(404).json({ message: ' not found.' });
    }

    const expAmount = expense.expamount;
   const result = await expense.destroy();
    const userId = expense.userId;
    const user = await User.findByPk(userId);

    if (user) {
      user.totalExpense = (user.totalExpense || 0) - expAmount;
      await user.save({ transaction: t });
    } else {
      await t.rollback();
      console.error('User not found');
    }
    await t.commit();
    console.log('deleted successfully');
    res.status(200).json({ message: 'deleted successfully' });
  } catch (err) {
    console.log(err);
    await t.rollback();
    res.status(500).json({ message: 'Failed to delete' });
  }
};
    
exports.getPremiumStatus = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      res.json({ isPremiumUser: user.isPremiumUser });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error fetching premium status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};