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

module.exports = {
    getAllUsers
};

