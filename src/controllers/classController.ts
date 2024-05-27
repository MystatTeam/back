import { Request, Response } from "express";
import ClassService from "../services/classService.js";
import { IClassModel } from "../models/ClassModel.js";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...classData } = req.body;

        const createdClass: IClassModel = await ClassService.createClass({
            ...classData
        });
        
        res.status(200).json(
            createdClass,
        );
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const classes: IClassModel[] | null = await ClassService.findAllClasses();

        res.status(200).json(classes);
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

export const getByGroupId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await ClassService.findAllClassesByGroupId(id);

        if (!result || result.length === 0)
            return res.status(404).json({message: "not found"});

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

        console.log(result);
        if (!result)
            return res.status(404).json({message: "Class not found"});

        res.status(200).json(
            result,
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