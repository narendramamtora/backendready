const express = require('express');
const PurchaseController= require('../controllers/purchase');
const Auth=require('../middleware/auth');
const router=express.Router();
router.get('/purchase/premiummember',Auth,PurchaseController.PurchasePre);
router.post('/purchase/updatetransactionstatus',Auth,PurchaseController.UpdateTransaction);
module.exports=router;