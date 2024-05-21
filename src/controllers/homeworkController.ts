import { Request, Response } from "express";
import HomeworkService from "../services/homeworkService.js";
import { IHomeworkModel } from "../models/HomeworkModel.js";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...homeworkData } = req.body;
        const file = req.file;

        const createdHomework: IHomeworkModel = await HomeworkService.createHomework({
            file: {
                data: file?.buffer,
                contentType: file?.mimetype
            },
            ...homeworkData
        });
        
        res.status(200).json(createdHomework);
        
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const homeworks: IHomeworkModel[] | null = await HomeworkService.findAllHomeworks();

        res.status(200).json(homeworks);
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}
export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: IHomeworkModel | null = await HomeworkService.findHomeworkById(id);

        if (!result)
            return res.status(404).json({message: "Homework not found"});
        
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
        const {...newData} = req.body;

        const result: IHomeworkModel | null = await HomeworkService.updateHomework(id, newData);

        if (!result)
            return res.status(404).json({message: "Homework not found"});

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

        const result: IHomeworkModel | null = await HomeworkService.removeHomework(id);

        if (!result)
            return res.status(404).json({message: "Homework not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}