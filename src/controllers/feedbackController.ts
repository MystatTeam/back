import { NextFunction, Request, Response } from "express";
import { FeedbackModel, IFeedbackModel } from "../models/FeedbackModel.js";
import FeedbackService from "../services/feedbackService.js";

export const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            teacherName, 
            teacherSurname, 
            teacherAfterFatherName,
            subjectName,
            text,
            date,
            studentId
        } = req.body;

        const feedback: IFeedbackModel = await FeedbackService.createFeedback({
            teacherName, 
            teacherSurname, 
            teacherAfterFatherName,
            subjectName,
            text,
            date,
            studentId
        });

        res.status(200).json(
            feedback
        );
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const feedbacks: IFeedbackModel[] | null = await FeedbackService.findAllFeedbacks();

        res.status(200).json(
            feedbacks
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAllByStudentId = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;

        const feedbacks: IFeedbackModel[] | null = await FeedbackService.findAllFeedbacksByStudentId(studentId);

        if (!feedbacks || feedbacks.length === 0)
            return res.status(404).json({message: "Feedbacks not found"});

        res.status(200).json(
            feedbacks
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
        const feedback: IFeedbackModel | null = await FeedbackService.findFeedbackById(id);

        res.status(200).json(
            feedback
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
        const newData = req.body;

        const updatedFeedback: IFeedbackModel | null = await FeedbackService.updateFeedback(id, newData);

        res.status(200).json(
            updatedFeedback
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

        const removeFeedback: IFeedbackModel | null = await FeedbackService.removeFeedback(id);

        res.status(200).json(
            removeFeedback
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}