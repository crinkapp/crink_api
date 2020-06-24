const jwt = require('jsonwebtoken');

// create a middleware function to pass to route to verify the user's token
 module.exports =  async function (req, res, next){
    const token = req.header('Cookie');
    if(!token) return res.status(401).send('Accès interdit');

    try{
        await jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => { console.log(decoded) });

        next();

    }catch(err){
        res.status(400).send('Token inconnu');

    }

};
