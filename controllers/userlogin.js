const Users = require('../models/user');
const bcrypt = require('bcrypt');
const Jwt=require('jsonwebtoken');

exports.createUserlogin = async (req, res, next) => {
    const Email = req.body.email;
    const Password = req.body.password;
    console.log(Email);
    function generateToken(id,name){
        return Jwt.sign({userId:id,name:name}, 'secretkey')
    }
    try {
        const existingUser = await Users.findOne({ where: { email: Email } });

        if (existingUser) {
            const samepassword= await bcrypt.compare(Password, existingUser.password);
                if (samepassword){
                    return res.status(200).json({ alert: 'User is logged in sucessfully', token:generateToken(existingUser.id, existingUser.name)});
                }else{
                    return res.status(203).json({ message: 'Password is not correct 404 status code' });
                }
        } else {
            console.log('email created in controllers 203');
            return res.status(204).json({ message: 'user not found 404 status code' });
        }
    } catch (err) {
        console.error(err);
        console.log('you are in the console of controller 500');
        return res.status(500).json({ error: 'controller error' });
    }
};
