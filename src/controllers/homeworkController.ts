import { Request, Response } from "express";
import HomeworkService from "../services/homeworkService.js";
import { IHomework, IHomeworkModel } from "../models/HomeworkModel.js";
import { IHomeworkFileModel } from "../models/HomeworkFileModel.js";
import StudentGroupService from "../services/studentGroupService";
import { IStudentGroupModel } from "models/StudentGroupModel.js";


export const post = async (req: Request, res: Response) => {
    try {
        const {groupID, classID, publicationDate, deadlineDate, comment, teacherID, disciplineID } = req.body;
        const file = req.file;

        const studentsInGroup: IStudentGroupModel[] = await StudentGroupService.findAllStudentsInGroup(groupID);
        
        if (studentsInGroup?.length === 0){
            res.status(404).json("Group doesn't have student")
        }
        else {
            const createdHomeworkFile: IHomeworkFileModel = await HomeworkService.createHomeworkFile({
                homeworkFile: file?.buffer,
                fileType: file?.mimetype
            });
    
            let reqArray: IHomework[] = []
            for (let index = 0; index < studentsInGroup.length; index++) {
                reqArray.push({
                    classID : classID,
                    publicationDate: publicationDate,
                    deadlineDate: deadlineDate,
                    comment: comment,
                    fileId: createdHomeworkFile._id,
                    studentID: studentsInGroup[index].studentID,
                    teacherID: teacherID,
                    disciplineID: disciplineID,
                    needsToBeChecked: false
                })
            }
    
            const createdHomework: IHomeworkModel[] | null = await HomeworkService.createHomework(reqArray);
            
            res.status(200).json(createdHomework);
        }


    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getAllOfTeachersHomeworksFilteredByID = async (req: Request, res: Response) => {
    try {
        const {...homeworkData } = req.body;

        const homeworks: IHomeworkModel[] | null = await HomeworkService.findHomeworkByTeacherAndDiscipline(homeworkData);

        res.status(200).json(homeworks);
    }
    catch {
        res.status(500).json({
            message: "Internal error",
        });
    }
    

}

export const submitHomework = async (req: Request, res: Response) => {
    try {
        const {id, ...homeworkData } = req.body;
        const file = req.file;
        homeworkData.studentHomework = file?.buffer
        homeworkData.studentHomeworkFileType = file?.mimetype
        const homeworks: IHomeworkModel | null = await HomeworkService.submitHomework(id, homeworkData);

        res.status(200).json(homeworks);
    }
    catch {
        res.status(500).json({
            message: "Internal error",
        });
    }
    

}

export const gradeHomework = async (req: Request, res: Response) => {
    try {
        const {id, ...homeworkData } = req.body;
        const homeworks: IHomeworkModel | null = await HomeworkService.gradeHomework(id, homeworkData);

        res.status(200).json(homeworks);
    }
    catch {
        res.status(500).json({
            message: "Internal error",
        });
    }
    

}

export const getAll = async (req: Request, res: Response) => {
    try {
        const homeworks: IHomeworkModel[] | null = await HomeworkService.findAllHomeworks();

        res.status(200).json(homeworks);
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}
export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: IHomeworkModel | null = await HomeworkService.findHomeworkById(id);

        if (!result)
            return res.status(404).json({message: "Homework not found"});
        
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
        const file = req.file;

        if (file) {
            newData.file = {
                data: file.buffer,
                contentType: file.mimetype
            }
        }
        
        const result: IHomeworkModel | null = await HomeworkService.updateHomework(id, newData);

        if (!result)
            return res.status(404).json({message: "Homework not found"});

        res.status(200).json(
            result
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

        const result: IHomeworkModel | null = await HomeworkService.removeHomework(id);

        if (!result)
            return res.status(404).json({message: "Homework not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}