import { Request, Response } from "express";
import GroupDisciplineService from "../services/groupDisciplineService";
import { IGroupDisciplineModel } from "../models/GroupDisciplineModel";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...GroupDisciplineData } = req.body;

        const createdGroupDiscipline: IGroupDisciplineModel | any = await GroupDisciplineService.createGroupDiscipline({
                
            ...GroupDisciplineData
        });
        
        if (createdGroupDiscipline.code === 11000){
            res.status(409).json({
                createdGroupDiscipline
            })
        }
        else {
            const { ...GroupDisciplineData} = createdGroupDiscipline._doc;
        
            res.status(200).json({
                GroupDisciplineData,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const GroupDisciplines: IGroupDisciplineModel[] | null = await GroupDisciplineService.findAllGroupDisciplines();
        
        const result = GroupDisciplines?.map(GroupDiscipline => {
            const {...GroupDisciplineData} = GroupDiscipline._doc;
            return GroupDisciplineData;
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
export const patch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {...newData} = req.body;

        const result: IGroupDisciplineModel | null = await GroupDisciplineService.updateGroupDiscipline(id, newData);

        if (!result)
            return res.status(404).json({message: "GroupDiscipline not found"});
        else {
            const { ...GroupDisciplineData} = result._doc;
            res.status(200).json({
                GroupDisciplineData,
            });
        }
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