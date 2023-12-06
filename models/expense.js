const Sequelize=require('sequelize');
const User = require('./user');
const sequelize=require('../util/database');

const Expense= sequelize.define('expense',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    expamount:Sequelize.INTEGER,
    description:Sequelize.STRING,
    select:Sequelize.STRING
});
Expense.belongsTo(User);    
module.exports=Expense;