const Users = require('../models/user');

exports.createUser = async (req, res, next) => {
    const Name = req.body.name;
    const Email = req.body.email;
    const Password = req.body.password;

    try {
        const existingUser = await Users.findOne({ where: { email: Email } });

        if (existingUser) {
            return res.status(201).json({ error: 'Email already in use status code 403' });
        } else {
            await Users.create({
                name: Name,
                email: Email,
                password: Password
            });
            console.log('email created in controllers 200');
            return res.status(200).json({ message: 'Email sent successfully of control 200' });
        }
    } catch (err) {
        console.error(err);
        console.log('you are in the console of controller 500');
        return res.status(500).json({ error: 'controller error' });
    }
};
