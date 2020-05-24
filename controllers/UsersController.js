const { User } = require('../sequelize');
require('dotenv').config();

async function getAllUsers(req, res) {
    try {
        const allUsers =  await User.findAll({raw: true});
        return res.json(allUsers);
    }
    catch(err) {
        return res.json(err)
    }
}

async function addUser(req, res) {
    try {
        const user = await User.build({
            username_user: req.body.username_user,
            email_user: req.body.email_user,
            password_user: req.body.password_user
        })
        await user.save();
        return res.json(user);
    }
    catch(err) {
        return res.json(err)
    }
}

module.exports = {
    getAllUsers,
    addUser
};

