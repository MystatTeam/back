import { Request, Response } from "express";
import groupService from "../services/groupService";
import { IGroupModel } from "../models/GroupModel";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...userData } = req.body;

        const createdGroup: IGroupModel = await groupService.createGroup({
                
            ...userData
        });
        
        const { ...groupData} = createdGroup._doc;
        
        res.status(200).json({
            groupData,
        });
        
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const groups: IGroupModel[] | null = await groupService.findAllGroups();
        
        const result = groups?.map(group => {
            const {...groupData} = group._doc;
            return groupData;
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
        const result: IGroupModel | null = await groupService.findGroupById(id);
        if (!result)
            return res.status(404).json({message: "Group not found"});
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

        const result: IGroupModel | null = await groupService.updateGroup(id, newData);

        if (!result)
            return res.status(404).json({message: "Group not found"});
        else {
            const { ...groupData} = result._doc;
            res.status(200).json({
                groupData,
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

        const result: IGroupModel | null = await groupService.removeGroup(id);

        if (!result)
            return res.status(404).json({message: "Group not found"});
        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}