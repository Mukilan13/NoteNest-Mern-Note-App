import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } else {
            res.status(401).json({ error: 'Not authorized, invalid token' })
        }
    } catch (error) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    }
}

export { protect }