const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const { sendResetEmail, linkid } = require('../index.js')
const bcrypt = require("bcrypt");
const ForgotPassword = require('../models/fpassword');
exports.ResetPasswordCon = async (req, res, next) => {
  const reqid = req.params.id;
  console.log('Received reqid:', reqid);
  try {
    console.log('you are in the controller/resetpassword');

    const ResetPass = await ForgotPassword.findOne({ 
      where: {
        id: reqid,
        isactive: true,
      }
    });
    console.log('After querying the database');
    if(ResetPass){
      console.log('ResetPass01:', ResetPass.id);  
      console.log('Sending resetpassword.html');
      const filePath = path.join(__dirname, '../frontend/resetpassword.html');
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      res.send(htmlContent);
    } else {
      console.log('ResetPass not found');
      return res.status(404).json({ message: ' id did not matched' });
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    return res.status(500).json({ message: 'Fetching failed.' });
  }
};


exports.updatePassword = async (req, res, next) => {
  try {
    const requestId = req.headers.referer.split('/').pop();
    const password = req.body.password;

    const resetRequest = await ForgotPassword.findOne({
      where: { id: requestId, isActive: true },
    });

    if (resetRequest) {
      await ForgotPassword.update({ isActive: false }, { where: { id: requestId } });
      const newPassword = await bcrypt.hash(password, 10);
      await User.update({ password: newPassword }, { where: { id: resetRequest.userId } });
      return res.status(200).json({ message: 'Successfully changed password' });
    } else {
      // Invalid or expired reset request
      res.status(404).json({ message: 'Invalid or expired reset request' });
    }
  } catch (err) {
    console.log(err);
    return res.status(409).json({ message: 'Failed to change password' });
  }
};
