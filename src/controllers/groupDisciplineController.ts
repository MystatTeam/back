import { Request, Response } from "express";
import GroupDisciplineService from "../services/groupDisciplineService";
import { IGroupDisciplineModel } from "../models/GroupDisciplineModel";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...groupDisciplineData } = req.body;

        const createdGroupDiscipline: IGroupDisciplineModel | any = await GroupDisciplineService.createGroupDiscipline({
            ...groupDisciplineData
        });
        
        if (createdGroupDiscipline.code === 11000){
            return res.status(409).json({
                createdGroupDiscipline
            })
        }
    
        res.status(200).json({
            createdGroupDiscipline,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const groupDisciplines: IGroupDisciplineModel[] | null = await GroupDisciplineService.findAllGroupDisciplines();

        res.status(200).json(
            groupDisciplines
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

        const result: IGroupDisciplineModel | null = await GroupDisciplineService.findGroupDisciplineById(id);

        if (!result)
            return res.status(404).json({message: "GroupDiscipline not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getByDisciplineId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await GroupDisciplineService.findGroupsByDisciplineId(id);

        if (!result)
            return res.status(404).json({message: "Not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        
    }
}

export const patch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {...newData} = req.body;

        const result: IGroupDisciplineModel | null = await GroupDisciplineService.updateGroupDiscipline(id, newData);

        if (!result)
            return res.status(404).json({message: "GroupDiscipline not found"});
        
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

        const result: IGroupDisciplineModel | null = await GroupDisciplineService.removeGroupDiscipline(id);

        if (!result)
            return res.status(404).json({message: "GroupDiscipline not found"});
        
        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}