require('dotenv').config();
const fs=require('fs')
const path=require('path')
const express = require('express');
const helmet = require('helmet');
const Compression = require('compression');
const Morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT= process.env.PORT


//const mongoose = require('mongoose');
//  const session = require('express-session');
//const MongoDBStore = require('connect-mongodb-session')(session);
// const csrf = require('csurf');
// const flash = require('connect-flash');

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

//   const store = new MongoDBStore({
//     uri: MONGODB_URI,
//     collection: 'sessions'
//   });
  // const csrfProtection = csrf();

const accessLogStream =fs.createWriteStream(
    path.join(__dirname,'access.log'),  
    {flags:'a'}    
);
const ReportRoute=require('./routes/report.js');
app.use(cors());
app.use(helmet());
app.use(Compression());
app.use(Morgan('combined',{stream:accessLogStream}));
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

// app.use(csrfProtection);
// app.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });
// app.use(
//     session({
//       secret: 'my secret',
//       resave: false,
//       saveUninitialized: false,
//       store: store
//     })
//   );
// app.use(flash());
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
//.sync({force:true})
.then(result =>{
    app.listen(PORT)
})
.catch(err=>console.log(err))


// mongoose
//   .connect(MONGODB_URI)
//   .then(result => {
//     app.listen(process.env.PORT || 3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
