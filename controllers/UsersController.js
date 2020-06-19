const { User } = require('../sequelize');
const  { sendEmail } = require('../controllers/NewslettersController');
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
    const user = await User.build({
        email_user: req.body.email_user,
        username_user: req.body.username_user,
        password_user: req.body.password_user
    });
    user.save();
    if (req.body.newsletter_user) {
        const mail = req.body.email_user;
        try {
            sendEmail(mail, res);
        } catch(err) {
            return res.json('Vous êtes déjà inscrit à la newsletter…');
        }
    } else {
        return res.json(user);
    }
}

async function removeUser(req, res) {
    const idUser = req.body.id_user;
    try {
        await User.destroy({
            where: {
                id: idUser
            }
        });
        return res.json('Successfully removed user')

    } catch (err) {
        return res.json(err)
    }
}

async function getUser(req, res) {
    const email = req.body.email_user;
    const password = req.body.password_user;
    try {
        const user = await User.findAll({
            where: {
                email_user: email,
                password_user: password
            }
        });
        return res.json(user);
    } catch(err) {
        return res.json(err);
    }
}

module.exports = {
    getAllUsers,
    addUser,
    removeUser,
    getUser
};

