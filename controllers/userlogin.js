const Users = require('../models/user');

exports.createUserlogin = async (req, res, next) => {
    const Email = req.body.email;
    const Password = req.body.password;
    try {
        const existingUser = await Users.findOne({ where: { email: Email } });

        if (existingUser) {
            const samepassword= await Users.findOne({where:{password:Password}})
                if (samepassword){
                    return res.status(200).json({ alert: 'User is logged in sucessfully' });
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
