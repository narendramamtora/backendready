const path = require('path');

// Function to get the path to resetpassword.html
const getResetPasswordFilePath = () => {
  return path.join(__dirname, '../frontend/resetpassword.html');
};

module.exports =getResetPasswordFilePath ;