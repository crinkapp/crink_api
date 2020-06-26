const jwt = require('jsonwebtoken');
const Cookies = require('cookies');
const { User } = require('../sequelize');

// create a middleware function to pass to route to verify the user's token
module.exports =  async function (req, res, next) {
    const token = new Cookies(req,res).get('access_token');
    if(!token) return res.status(401).send('Forbidden access');
    try {
        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            res.locals.id_user = decoded._id;
            next();
        });
    } catch(err) {
        res.status(400).send('Unknow token');
    }
};

