import { Request, Response } from "express";
import TeacherDisciplineService from "../services/teacherDisciplineService";
import { ITeacherDisciplineModel } from "../models/TeacherDisciplineModel";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...TeacherDisciplineData } = req.body;

        const createdTeacherDiscipline: ITeacherDisciplineModel | any = await TeacherDisciplineService.createTeacherDiscipline({
                
            ...TeacherDisciplineData
        });
        
        if (createdTeacherDiscipline.code === 11000){
            res.status(409).json({
                createdTeacherDiscipline
            })
        }
        else {
            const { ...TeacherDisciplineData} = createdTeacherDiscipline._doc;
        
            res.status(200).json({
                TeacherDisciplineData,
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
        const TeacherDisciplines: ITeacherDisciplineModel[] | null = await TeacherDisciplineService.findAllTeacherDisciplines();
        
        const result = TeacherDisciplines?.map(TeacherDiscipline => {
            const {...TeacherDisciplineData} = TeacherDiscipline._doc;
            return TeacherDisciplineData;
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
        const result: ITeacherDisciplineModel | null = await TeacherDisciplineService.findTeacherDisciplineById(id);
        if (!result)
            return res.status(404).json({message: "TeacherDiscipline not found"});
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

        const result: ITeacherDisciplineModel | null = await TeacherDisciplineService.updateTeacherDiscipline(id, newData);

        if (!result)
            return res.status(404).json({message: "TeacherDiscipline not found"});
        else {
            const { ...TeacherDisciplineData} = result._doc;
            res.status(200).json({
                TeacherDisciplineData,
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

        const result: ITeacherDisciplineModel | null = await TeacherDisciplineService.removeTeacherDiscipline(id);

        if (!result)
            return res.status(404).json({message: "TeacherDiscipline not found"});
        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}