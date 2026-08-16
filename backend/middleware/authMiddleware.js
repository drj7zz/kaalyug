const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select('_id name email');
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, account no longer exists' });
            }
            
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
            return;
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
