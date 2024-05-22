import { Request, Response } from "express";
import DisciplineService from "../services/disciplineService";
import { IDisciplineModel } from "../models/DisciplineModel";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...disciplineData } = req.body;

        const createdDiscipline: IDisciplineModel = await DisciplineService.createDiscipline({
                
            ...disciplineData
        });
        
        
        res.status(200).json(
            createdDiscipline,
        );
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const disciplines: IDisciplineModel[] | null = await DisciplineService.findAllDisciplines();

        res.status(200).json(disciplines);
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}
export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: IDisciplineModel | null = await DisciplineService.findDisciplineById(id);
        if (!result)
            return res.status(404).json({message: "Discipline not found"});
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

        const result: IDisciplineModel | null = await DisciplineService.updateDiscipline(id, newData);

        if (!result)
            return res.status(404).json({message: "Discipline not found"});

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

        const result: IDisciplineModel | null = await DisciplineService.removeDiscipline(id);

        if (!result)
            return res.status(404).json({message: "Discipline not found"});
        
        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}