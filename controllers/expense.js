const Expense = require('../models/expense');

exports.getAllExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log('under try control', userId);
    const expenses = await Expense.findAll({ where: { userId } });
//    console.log('User Object in the get all:', req.user);

    res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fetching failed.' });
  }
};

exports.postAddExpense = async (req, res, next) => {
  const expAmount = req.body.expense;
  const description = req.body.descrip;
  const select = req.body.mselect;
  const userId = req.user.id;
  //console.log('in  the postAddExpense',userId);

  console.log('*****',expAmount, description);
  
  try {
    const result = await Expense.create({
      expamount: expAmount,
      description: description,
      select: select,
      userId:userId
     
    });
    console.log('Created expense:', result);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating expense:', err);
  }
};
exports.postDeleteExpense = async (req, res, next) => {
  const expeId = req.params.expeId; // Use req.params.expeId
  try {
    const expense = await Expense.findByPk(expeId);
    if (!expense) {
      return res.status(404).json({ message: ' not found.' });
    }
    const result = await expense.destroy();
    console.log('deleted successfully');
    res.status(200).json({ message: 'deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to delete' });
  }
};
    

    // exports.getExpenses = async (req, res, next) => {
    //   try {
    //     const expenses = await Expense.findAll();
    //     res.render('expense', {
    //       prods: expenses,
    //       pageTitle: 'All Expenses',
    //       path: '/expenses',
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    

// exports.getAddExpense = (req, res, next) => {
//   res.render('expense/edit-expense', {
//     pageTitle: 'Add Expense',
//     path: '/add-expense',
//     editing: false,
//   });
// };