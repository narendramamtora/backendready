require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ModelSignup= require('./models/user');
const ModelExpense=require('./models/expense');
const ModelOrder=require('./models/orders');
const sequelize=require('./util/database');
const app = express();
const ExpenseRoute=require('./routes/expense');
const UsersignupRoute=require('./routes/usersignup');
const UserloginRoute=require('./routes/userlogin');
const PurchaseRoute=require('./routes/purchase');
const ForgotPasswordRoute=require('./routes/forgotpassword');
const ShowLeaderBoeardRoute=require('./routes/premium/showleaderboard');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use('/user',UsersignupRoute);
app.use('/user',UserloginRoute);
app.use('/expense',ExpenseRoute);
app.use('/premium',ShowLeaderBoeardRoute );
app.use(ForgotPasswordRoute)
app.use(PurchaseRoute);

ModelSignup.hasMany(ModelExpense); 
ModelExpense.belongsTo(ModelSignup);

ModelSignup.hasMany(ModelOrder);
ModelOrder.belongsTo(ModelSignup)

sequelize
.sync()
//.sync({force:true})
.then(result =>{
    app.listen(3000)
})
.catch(err=>console.log(err))

