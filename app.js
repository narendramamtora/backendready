const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models= require('./models/users');
const sequelize=require('./util/database');
const app = express();
const UserRoute=require('./routes/users');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use('/user',UserRoute);
sequelize
.sync()
.then(result =>{
    app.listen(3000)
})
.catch(err=>console.log(err))

