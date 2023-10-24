const jwt = require('jsonwebtoken');

const validateToken = (async(req, res, next)=>{
    let token;
    // getting token from request headers
    let authHeader = req.heaaders.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded)=>{
            if (error) {
                res.status(401);
            } else {
                req.user = decoded.user;
                next();
            }
        })
    }
    if (!token) {
        res.status(401).json({message: `Invalid token`});
    }
});

module.exports = validateToken;