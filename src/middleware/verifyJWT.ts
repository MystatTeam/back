const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
    username: String;
    token: string | JwtPayload;
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: any, decoded: { username: String; }) => {
            if (err) return res.status(403).json({'error': 'Token expired'}); //invalid token
            (req as CustomRequest).username = decoded.username;
            // req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT