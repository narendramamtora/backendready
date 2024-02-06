//the purpose of this code is to verify the secretkey and user info
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const TOKEN_SECRET=process.env.TOKEN_SECRET

const authenticate = async (req, res, next) => {
    try {
//        console.log('this is the req in the auth', req.body);
//        console.log('this is the req header', req.headers);
        const token = req.header('Authorization');
//        console.log("this is my token ",token);
        const userPayload = jwt.verify(token, TOKEN_SECRET);
        console.log('user Id  >>>> ', userPayload);
        const user = await User.findByPk(userPayload.userId);
//        console.log('stringify',JSON.stringify(user));
        req.user = user;

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false });
    }
};

module.exports = authenticate;
