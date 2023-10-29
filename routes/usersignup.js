const express =require('express');
const router =express.Router();
const controller= require('../controllers/usersignup')
router.post('/signup', controller.createUser);
module.exports=router;