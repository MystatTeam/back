import studentService from '../services/studentService';
import { StudentModel } from '../models/StudentModel';
const jwt = require('jsonwebtoken');
import { Request, Response } from "express";

export const handleRefreshToken = async (req: Request, res: Response) => {
    
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await StudentModel.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err: any, decoded: { username: string; }) => {
            if (err || foundUser.login !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = await studentService.signAccessToken(decoded.username, roles)
            res.json({accessToken })
        }
    );
}

