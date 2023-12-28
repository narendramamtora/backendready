const { sendResetEmail, linkid } = require('../index.js')
const User = require('../models/user');
const ForgotPasswordRequests= require('../models/fpassword.js');

exports.ForgotPasswordCon = async (req, res, next) => {
  const Email=req.body.email;
  console.log('12',Email);

  try {
    console.log('you are in the  forgot password controller');
    const user = await User.findOne({ where: { email: Email } });
    if (user) {
      
      console.log('from forgotpass controllers',linkid);
     await ForgotPasswordRequests.create({
      id:linkid,
      userId:user.id,
      isactive: true,
     })
    
     const EEmail=user.email
      console.log('sdf',EEmail);
      console.log('we had found the user');
      await sendResetEmail(EEmail);
      return res.status(200).json({ message: 'User found', user }); 
    } else {
      console.log('User not found');
      return res.status(203).json({ message: 'User not found' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Fetching failed.' });
  }
};
