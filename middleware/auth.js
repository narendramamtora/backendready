const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try {
        console.log('this is the req in the auth', req.body);
        console.log('this is the req header', req.header);
        const token = req.header('Authorization');
        console.log("this is my token ",token);
        const userPayload = jwt.verify(token, 'secretkey');
        console.log('user Id  >>>> ', userPayload);
        const user = await User.findByPk(userPayload.userId);
        console.log(JSON.stringify(user));
        req.user = user;
        //console.log('User ID in auth:', req.user.id);

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false });
    }
};

module.exports = authenticate;
