const express = require('express');
const router = express.Router();
const ResetPassword = require('../controllers/ResetPassword');
router.get('/password/resetpassword/:id', ResetPassword.ResetPasswordCon);
router.post('/password/updatepassword/:id', ResetPassword.updatePassword);
module.exports = router;