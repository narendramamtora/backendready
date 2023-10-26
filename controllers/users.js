const Users = require('../models/users');
exports.createUser=(req, res,next) => {
    const Name=req.body.name;
    const Email=req.body.email;
    const Password=req.body.password;
    Users.findOne({ where: { email: Email } })
    .then(existingUser => {
        if (existingUser) {
             res.status(403).json({ error: 'Email already in use' });
        } else {
            Users.create({
                name: Name,
                email: Email,
                password: Password
            })
                .then(() => {
                    res.sendStatus(200);
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                });
        }
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
}