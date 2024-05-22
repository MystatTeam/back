import { Request, Response } from "express";
import StudentGroupService from "../services/studentGroupService";
import { IStudentGroupModel } from "../models/StudentGroupModel";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...studentGroupData } = req.body;

        const createdStudentGroup: IStudentGroupModel | any = await StudentGroupService.createStudentGroup({
            ...studentGroupData
        });
        
        if (createdStudentGroup.code === 11000){
            return res.status(409).json(
                createdStudentGroup
            )
        }
        
        res.status(200).json(
            createdStudentGroup,
        );
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const studentGroups: IStudentGroupModel[] | null = await StudentGroupService.findAllStudentGroups();

        res.status(200).json(
            studentGroups
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

        const result: IStudentGroupModel | null = await StudentGroupService.findStudentGroupById(id);

        if (!result)
            return res.status(404).json({message: "StudentGroup not found"});

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

        const result: IStudentGroupModel | null = await StudentGroupService.updateStudentGroup(id, newData);

        if (!result)
            return res.status(404).json({message: "StudentGroup not found"});

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

        const result: IStudentGroupModel | null = await StudentGroupService.removeStudentGroup(id);

        if (!result)
            return res.status(404).json({message: "StudentGroup not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}