import { Request, Response } from "express";
import studentService from "../services/studentService.js";
import { IStudentModel } from "../models/StudentModel.js";

export const post = async (req: Request, res: Response) => {
    try {
        const { password, ...userData } = req.body;
        const file = req.file;

        const createdStudent: IStudentModel = await studentService.createStudent(password, {
            userPhoto: {
                data: file?.buffer,
                contentType: file?.mimetype
            },
            ...userData
        });
        
        const {passwordHash, ...studentData} = createdStudent._doc;
        
        res.status(200).json({
            studentData,
            password
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal error",
        });
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
        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}
export const patch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {password, ...newData} = req.body;
        console.log(newData);
        if (password)
            // newData.passwordHash = authService.hashPassword(password);
            newData.passwordHash = 'fk0wfj'+password;
        const result: IStudentModel | null = await studentService.updateStudent(id, newData);

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