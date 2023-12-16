const express = require('express');
const router = express.Router();
const ForgotPassword = require('../controllers/forgotpass');

router.post('/password/forgotpassword', ForgotPassword.ForgotPasswordCon);

module.exports = router;
