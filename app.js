require('dotenv').config();
const fs=require('fs')
const path=require('path')
const express = require('express');
const helmet = require('helmet');
const Compression = require('compression');
const bodyParser = require('body-parser');
const PORT=process.env.PORT;


const cors = require('cors');
const ModelSignup= require('./models/user');
const ModelExpense=require('./models/expense');
const ModelOrder=require('./models/orders');
const ModelDownloadList=require('./models/downloadlist');
const ForgotPasswordRequest=require('./models/fpassword');
const sequelize=require('./util/database');
const app = express();
const ExpenseRoute=require('./routes/expense');
const UsersignupRoute=require('./routes/usersignup');
const UserloginRoute=require('./routes/userlogin');
const PurchaseRoute=require('./routes/purchase');
const ForgotPasswordRoute=require('./routes/forgotpassword');
const ResetPasswordRoute=require('./routes/ResetPassword');
const ShowLeaderBoeardRoute=require('./routes/premium/showleaderboard');

const MONGODB_URI =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ntrwp.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const ReportRoute=require('./routes/report.js');
app.use(cors());
app.use(helmet());
app.use(Compression());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user',UsersignupRoute);
app.use('/user',UserloginRoute);
app.use('/expense',ExpenseRoute);
app.use('/premium',ShowLeaderBoeardRoute );
app.use(ForgotPasswordRoute)
app.use(ResetPasswordRoute)
app.use(PurchaseRoute);
app.use('/reportexp',ReportRoute);

app.get('/user/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/login.html'));
});

ModelSignup.hasMany(ModelExpense);
ModelExpense.belongsTo(ModelSignup);
ModelSignup.hasMany(ModelDownloadList);
ModelDownloadList.belongsTo(ModelSignup);
ModelSignup.hasMany(ModelOrder);
ModelOrder.belongsTo(ModelSignup)
ModelSignup.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(ModelSignup);

sequelize
.sync()
.then(result =>{
  app.listen(PORT)
})
.catch(err=>console.log(err))
