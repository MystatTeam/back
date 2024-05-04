import { StudentModel } from '../models/StudentModel';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { Request, Response } from "express";

export const handleLogin = async (req: Request, res: Response) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await StudentModel.findOne({ login: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.passwordHash);
    if (match) {
        // const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.login,
                    // "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.login },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

        res.status(201).json({ 'refreshToken': `${refreshToken}` });
        // Send authorization roles and access token to user
        // res.json({ roles, accessToken });

    } else {
        res.sendStatus(401);
    }
}