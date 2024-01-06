const Expense = require('../models/expense');
const DowloadlistM=require('../models/downloadlist')
const S3Service =require('../backendservice/s3services')
let expenses;
let fileName;


exports.downloadexpense = async (req, res, next) => {
  try {
    const userId = req.user.id;
 // console.log('under try control', userId); 
    expenses = await Expense.findAll({ where: { userId } });

    const stringifiedExpenses = JSON.stringify(expenses);
    fileName = `Expense${userId}/${new Date()}.txt`;
    const list = fileName;
      const newList = await DowloadlistM.create({
        downloadlist: list,
        userId:userId,
      });
    const fileURL = await S3Service.uploadToS3(stringifiedExpenses, fileName);
    console.log('this is file ',fileName);

    res.status(200).json({ newList,fileURL, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

exports.getAllExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log('under try control', userId);
    expenses = await Expense.findAll({ where: { userId } });

    res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fetching failed.' });
  }
};
exports.lastdownload = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log('under try control', userId);
    const Downloadledlist = await DowloadlistM.findAll({ where: { userId } });

    res.status(200).json(Downloadledlist);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fetching failed.' });
  }
};
