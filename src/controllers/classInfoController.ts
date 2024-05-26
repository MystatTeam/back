import { Request, Response } from "express";
import ClassInfoService from "../services/classInfoService.js";
import { IClassInfoModel } from "../models/ClassInfoModel.js";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...classInfoData } = req.body;

        const createdClassInfo: IClassInfoModel = await ClassInfoService.createClassInfo({
                
            ...classInfoData
        });
        
        res.status(200).json({
            createdClassInfo,
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
        const classesInfos: IClassInfoModel[] | null = await ClassInfoService.findAllClassInfos();

        res.status(200).json(classesInfos);
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: IClassInfoModel | null = await ClassInfoService.findClassInfoById(id);

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

export const getByStudentId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: IClassInfoModel[] | null = await ClassInfoService.findClassInfoByStudentId(id);

        if (!result || result.length === 0)
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

export const patch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {...newData} = req.body;

        const result: IClassInfoModel | null = await ClassInfoService.updateClassInfo(id, newData);

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
export const patchMany = async (req: Request, res: Response) => {
    console.log("Hellooo");
    try {
        const { dataArr } = req.body;
        console.log(dataArr);

        const result: IClassInfoModel | null = await ClassInfoService.updateManyClassInfos(dataArr);

        if (!result)
            return res.status(404).json({message: "Class Info not found"});
        
        console.log(result);
        res.status(200).json(
            result
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal error",
        });
    }
}
export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: IClassInfoModel | null = await ClassInfoService.removeClassInfo(id);

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