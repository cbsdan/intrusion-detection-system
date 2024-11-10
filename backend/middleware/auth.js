const User = require('../models/User');
const jwt = require("jsonwebtoken");

const getUserFromToken = async (req) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        throw new Error('Authorization header is missing. Login first to access this resource.');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        throw new Error('Token is missing. Login first to access this resource.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
        throw new Error('User not found. Login first to access this resource.');
    }

    return user;
};

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        req.user = await getUserFromToken(req); 
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await getUserFromToken(req);
        if (!user.role) {
            return res.status(401).json({message: "You must login first", user})
        }
        
        if (user.role === 'admin') {
            next()
        } else {
            return res.status(401).json({message: "Access Denied! Admin Only!"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}