import { Request, Response } from "express";
import TeacherService from "../services/teacherService";
import { ITeacherModel } from "../models/TeacherModel";

export const post = async (req: Request, res: Response) => {
    try {
        const { password, ...userData } = req.body;
        const file = req.file;

        const duplicate = await TeacherService.checkIfUserExists(userData.login)
        if (duplicate) return res.sendStatus(409); //Conflict 

        const createdTeacher: ITeacherModel = await TeacherService.createTeacher(password, {
            userPhoto: {
                data: file?.buffer,
                contentType: file?.mimetype
            },
            ...userData
        });
        
        const {passwordHash, ...teacherData} = createdTeacher._doc;
        
        res.status(200).json({
            teacherData,
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const teachers: ITeacherModel[] | null = await TeacherService.findAllTeachers();
        
        const result = teachers?.map(teacher => {
            const {passwordHash, ...teacherData} = teacher._doc;
            return teacherData;
        });

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: ITeacherModel | null = await TeacherService.findTeacherById(id);

        if (!result)
            return res.status(404).json({message: "Teacher not found"});

        const { passwordHash, ...teacherData } = result._doc;

        res.status(200).json(
            teacherData
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
        const {...newData} = req.body;

        const result: ITeacherModel | null = await TeacherService.updateTeacher(id, newData);

        if (!result)
            return res.status(404).json({message: "Teacher not found"});

        const {passwordHash, ...teacherData} = result._doc;

        res.status(200).json(
            teacherData,
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

        const result: ITeacherModel | null = await TeacherService.removeTeacher(id);

        if (!result)
            return res.status(404).json({message: "Teacher not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}