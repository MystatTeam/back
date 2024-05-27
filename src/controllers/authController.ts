import studentService from '../services/studentService';
import { StudentModel } from '../models/StudentModel';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
import { TeacherModel } from '../models/TeacherModel';
import teacherService from '../services/teacherService';

export const handleStudentLogin = async (req: Request, res: Response) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await StudentModel.findOne({ login: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.passwordHash);
    if (match) {
        // const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = await studentService.signAccessToken(foundUser.login)
        const refreshToken = await studentService.signRefreshToken(foundUser.login)
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }
}
export const handleTeacherLogin = async (req: Request, res: Response) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await TeacherModel.findOne({ login: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.passwordHash);
    if (match) {
        // const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = await teacherService.signAccessToken(foundUser.login, foundUser.roles)
        const refreshToken = await teacherService.signRefreshToken(foundUser.login, foundUser.roles)
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }
}

export const grantRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { role } = req.body;


        const result = await teacherService.updateTeacher(id, {
            roles: {
                [role]: true
            }
        })

        if (!result)
            return res.status(404).json({message: "Not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal error",
        })
    }
}

export const revokeRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const result = await teacherService.updateTeacher(id, {
            roles: {
                [role]: false
            }
        })

        if (!result)
            return res.status(404).json({message: "Not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal error",
        })
    }
}