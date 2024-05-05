import { StudentModel } from '../models/StudentModel';
const bcrypt = require('bcrypt');
import studentService from "../services/studentService.js";
import { Request, Response } from "express";

export const handleNewUser = async (req: Request, res: Response) => {
    const { user, pwd, name, surname, phoneNumber, dateOfBirth, group } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await studentService.checkIfUserExists(user)
    const duplicate1 = await StudentModel.findOne({ login: user}).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await StudentModel.create({
            "login": user,
            "passwordHash": hashedPwd,
            "name": name,
            "surname": surname,
            "phoneNumber": phoneNumber,
            "birthday": dateOfBirth,
            "group": group,
        });

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err: any) {
        res.status(500).json({ 'message': err.message });
    }
}