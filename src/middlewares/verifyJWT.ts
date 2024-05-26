import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
    username: String;
    roles: any;
    token: string | JwtPayload;
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    jwt.verify(
        token as string,
        process.env.ACCESS_TOKEN_SECRET as string, (err: any, decoded: any) => {
            if (err) return res.status(403).json({'error': 'Token expired'}); //invalid token
            (req as CustomRequest).username = decoded.username;
            (req as CustomRequest).roles = decoded.roles;
            next();
        }
    );
}

export default verifyJWT;