
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const validateJWT = async (req = Request, res = Response, next) => {
    const token = req.header('x-token');
    // req.header('Bearer Token'); 
    if (!token) {
        return res.status(401).json({
            msg: 'Unauthorized - Not token in request'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_TOKEN_KEY_DEV);

        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({
                msg: 'Unauthorized - User undefined'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Unauthorized - Inactive User'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Unauthorized - Invalid token'
        })
    }
}

export {
    validateJWT
}