const jwt = require('jsonwebtoken');

// create a middleware function to pass to route to verify the user's token
 module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Accès interdit');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        //if verified, return id
        next();

    }catch(err){
        res.status(400).send('Token inconnu');

    }

};
