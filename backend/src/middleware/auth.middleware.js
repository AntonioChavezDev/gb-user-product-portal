import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Secret key for JWT

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid, authorization denied.' });
        }

        req.body.user = decoded;
        next();
    });
};

export default authMiddleware;
