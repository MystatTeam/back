import { Request, Response } from "express";
import groupService from "../services/groupService";
import { IGroupModel } from "../models/GroupModel";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...groupData } = req.body;

        const createdGroup: IGroupModel = await groupService.createGroup({
            ...groupData
        });

        res.status(200).json(
            createdGroup,
        );
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const groups: IGroupModel[] | null = await groupService.findAllGroups();

        res.status(200).json(
            groups
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