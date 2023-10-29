const express =require('express');
const router =express.Router();
const controller= require('../controllers/userlogin')
router.post('/login', controller.createUserlogin);
module.exports=router;