const jwt = require('jsonwebtoken');
//const {cookies} =  require('../controllers/UsersController') ;
let Cookies = require('cookies');

// create a middleware function to pass to route to verify the user's token
 module.exports =  async function (req, res, next){
    const token = Cookies.get('access_token');
    if(!token) return res.status(401).send('Accès interdit');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    }catch(err){
        res.status(400).send('Token inconnu');

    }

};

