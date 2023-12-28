const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const { v4: uuidv4 } = require('uuid');

const ForgotPasswordRequest=sequelize.define('forgotpasswordrequest',{
    id:{
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(), 
        allowNull: false,
        primaryKey: true
     },                                                
     isactive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true 
    },
})
module.exports=ForgotPasswordRequest;