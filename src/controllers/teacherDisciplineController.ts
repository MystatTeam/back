import { Request, Response } from "express";
import TeacherDisciplineService from "../services/teacherDisciplineService";
import { ITeacherDisciplineModel, TeacherDisciplineModel } from "../models/TeacherDisciplineModel";
import teacherDisciplineService from "../services/teacherDisciplineService";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...teacherDisciplineData } = req.body;

        const createdTeacherDiscipline: ITeacherDisciplineModel | any = await TeacherDisciplineService.createTeacherDiscipline({
                
            ...teacherDisciplineData
        });
        
        if (createdTeacherDiscipline.code === 11000){
            return res.status(409).json(
                createdTeacherDiscipline
            );
        }
    
        res.status(200).json(
            createdTeacherDiscipline,
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const teacherDisciplines: ITeacherDisciplineModel[] | null = await TeacherDisciplineService.findAllTeacherDisciplines();
        
        res.status(200).json(
            teacherDisciplines
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

export const getByDisciplineId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await teacherDisciplineService.findTeachersByDisciplineId(id);
        console.log(result);

        if (!result)
            return res.status(404).json({message: "Not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal error"
        })
    }
}

export const patch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {...newData} = req.body;

        const result: ITeacherDisciplineModel | null = await TeacherDisciplineService.updateTeacherDiscipline(id, newData);

        if (!result)
            return res.status(404).json({message: "TeacherDiscipline not found"});

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