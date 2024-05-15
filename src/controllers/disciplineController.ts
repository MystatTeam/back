import { Request, Response } from "express";
import DisciplineService from "../services/disciplineService";
import { IDisciplineModel } from "../models/DisciplineModel";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...disciplineData } = req.body;

        const createdDiscipline: IDisciplineModel = await DisciplineService.createDiscipline({
                
            ...disciplineData
        });
        
        const { ...createdDisciplineData} = createdDiscipline._doc;
        
        res.status(200).json({
            createdDisciplineData,
        });
        
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const Disciplines: IDisciplineModel[] | null = await DisciplineService.findAllDisciplines();
        
        const result = Disciplines?.map(Discipline => {
            const {...DisciplineData} = Discipline._doc;
            return DisciplineData;
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
        else {
            const { ...DisciplineData} = result._doc;
            res.status(200).json({
                DisciplineData,
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