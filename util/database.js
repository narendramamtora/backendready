const Sequelize= require('sequelize');
const sequelize=new Sequelize('expense','root','password',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;