import { Request, Response, NextFunction } from "express";
import {CustomRequest} from './verifyJWT.js';

const checkRole = (role: string) => {
    const verify = (req: Request, res: Response, next: NextFunction) => {
        console.log((req as CustomRequest).roles);
        if ((req as CustomRequest).roles[role]) {
            return next();
        }
    
        res.status(403).json({message: "not enough roles"})
    }

    return verify;

}

export default checkRole;