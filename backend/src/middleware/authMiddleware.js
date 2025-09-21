const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('AuthMiddleware: Incoming token:', token);

    if (!token) {
        console.log('AuthMiddleware: No token provided');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('AuthMiddleware: JWT verification error:', error.message);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;