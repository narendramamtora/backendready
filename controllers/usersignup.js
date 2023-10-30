const Users = require('../models/user');
const bcrypt=require('bcrypt');

exports.createUser = async (req, res, next) => {
    const Name = req.body.name;
    const Email = req.body.email;
    const Password = req.body.password;

    try {
        const existingUser = await Users.findOne({ where: { email: Email } });

        if (existingUser) {
            return res.status(201).json({ error: 'Email already in use status code 403' });
        } else {
           const saltRounds = 10;
           bcrypt.hash(Password, saltRounds, async (err, hash) => {
           if (err) {
           console.error(err);
           return res.status(500).json({ error: 'Password hashing error' });
                }
            await Users.create({
                name: Name,
                email: Email,
                password: hash
            });
            console.log('email created in controllers 200');
            return res.status(200).json({ message: 'Email sent successfully of control 200' });
        });
      }
    } catch (err) {
        console.error(err);
        console.log('you are in the console of controller 500');
        return res.status(500).json({ error: 'controller error' });
    }
};
