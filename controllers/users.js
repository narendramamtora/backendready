const Users = require('../models/users');
exports.createUser = (req, res, next) => {
    const Name = req.body.name;
    const Email = req.body.email;
    const Password = req.body.password;
    Users.findOne({ where: { email: Email } })
        .then(existingUser => {
            if (existingUser) {
                console.log('you are in the console of controller 201');
               return res.status(201).json({ error: 'Email already in use' });

            } else {
                   Users.create({
                    name: Name,
                    email: Email,
                    password: Password
                })
                    .then(() => {
                        console.log('email created in controllers 200')
                       return res.status(200).json({ message: 'Email sent successfully of control 200' });
                    })
                    .catch((err) => {
                        console.log(err);
                        console.log('you are in the console of controller 500');
                       return res.status(500).json({ error: 'controller error' });
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: 'controller error' });
        });
}
