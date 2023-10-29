const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const modelsignup= require('./models/user');
const sequelize=require('./util/database');
const app = express();
const UsersignupRoute=require('./routes/usersignup');
const UserloginRoute=require('./routes/userlogin');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use('/user',UsersignupRoute);
app.use('/user',UserloginRoute);
sequelize
.sync()
.then(result =>{
    app.listen(3000)
})
.catch(err=>console.log(err))

