import { NextFunction, Request, Response } from "express";
import studentService from "../services/studentService.js";
import { IStudentModel } from "../models/StudentModel.js";

export const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, ...userData } = req.body;
        const file = req.file;

        const duplicate = await studentService.checkIfUserExists(userData.login)
        if (duplicate) return res.sendStatus(409); //Conflict 

        const createdStudent: IStudentModel = await studentService.createStudent(password, {
            userPhoto: {
                data: file?.buffer,
                contentType: file?.mimetype
            },
            ...userData
        });
        
        const {passwordHash, ...studentData} = createdStudent._doc;
        
        res.status(200).json(
            studentData,
        );
        
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const students: IStudentModel[] | null = await studentService.findAllStudents();
        
        const result = students?.map(student => {
            const {passwordHash, ...studentData} = student._doc;
            return studentData;
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: IStudentModel | null = await studentService.findStudentById(id);

        if (!result)
            return res.status(404).json({message: "Student not found"});

        const {passwordHash, ...studentData} = result._doc;

        res.status(200).json(
            studentData
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getStudentRewards = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        
    } catch (error) {
        
    }
}

export const patch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {password, ...newData} = req.body;
        
        const result: IStudentModel | null = await studentService.updateStudent(id, password, newData);

        if (!result)
            return res.status(404).json({message: "Student not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: IStudentModel | null = await studentService.removeStudent(id);

        if (!result)
            return res.status(404).json({message: "Student not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}