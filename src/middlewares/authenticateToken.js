const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // If the token is valid, you can access the user ID from 'decoded.userId' and perform additional checks if needed.
        req.userId = decoded.userId;
        next();
    });
}

module.exports = authenticateToken;
