import { Request, Response } from "express";
import ClassInfoService from "../services/classInfoService.js";
import { IClassInfoModel } from "../models/ClassInfoModel.js";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...classInfoData } = req.body;

        const createdClass: IClassInfoModel = await ClassInfoService.createClass({
                
            ...classInfoData
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
        const classesInfos: IClassInfoModel[] | null = await ClassInfoService.findAllClasses();
        
        const result = classesInfos?.map(item => {
            const {...classInfoData} = item._doc;
            return classInfoData;
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
        const result: IClassInfoModel | null = await ClassInfoService.findClassById(id);

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

        const result: IClassInfoModel | null = await ClassInfoService.updateClass(id, newData);

        if (!result)
            return res.status(404).json({message: "Class Info not found"});
        
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

        const result: IClassInfoModel | null = await ClassInfoService.removeClass(id);

        if (!result)
            return res.status(404).json({message: "Class Info not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}