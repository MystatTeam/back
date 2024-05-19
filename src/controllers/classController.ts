import { Request, Response } from "express";
import ClassService from "../services/classService.js";
import { IClassModel } from "../models/ClassModel.js";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...classData } = req.body;

        const createdClass: IClassModel = await ClassService.createClass({
                
            ...classData
        });
        
        const { ...createdClassData} = createdClass._doc;
        
        res.status(200).json({
            createdClassData,
        });
        
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const classes: IClassModel[] | null = await ClassService.findAllClasses();
        
        const result = classes?.map(item => {
            const {...classData} = item._doc;
            return classData;
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
        const result: IClassModel | null = await ClassService.findClassById(id);

        if (!result)
            return res.status(404).json({message: "Class not found"});
        
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

        const result: IClassModel | null = await ClassService.updateClass(id, newData);

        if (!result)
            return res.status(404).json({message: "Class not found"});
        
        const { ...classData} = result._doc;
        res.status(200).json({
            classData,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}
export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: IClassModel | null = await ClassService.removeClass(id);

        if (!result)
            return res.status(404).json({message: "Class not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}