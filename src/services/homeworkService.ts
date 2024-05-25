import { IHomework, IHomeworkModel, HomeworkModel } from "../models/HomeworkModel";
import { IHomeworkFile, IHomeworkFileModel, HomeworkFileModel } from "../models/HomeworkFileModel";

class HomeworkService {
    async createHomeworkFile(homeworkData: Partial<IHomeworkFile>): Promise<IHomeworkFileModel> {        
        return await HomeworkFileModel.create({ ...homeworkData});
    }
    
    async createHomework(homeworkData: IHomework[]): Promise<IHomeworkModel[] | null> {        
        return await HomeworkModel.insertMany(homeworkData);
    }
    async findAllHomeworks(): Promise<IHomeworkModel[] | null> {
        return await HomeworkModel.find().populate('classID');
    }
    async findHomeworkById(id: string): Promise<IHomeworkModel | null> {
        return await HomeworkModel.findById(id).populate('classID');;
    }
    async findHomeworkByTeacherAndDiscipline(homeworkData: Partial<IHomework>): Promise<IHomeworkModel[] | null> {
        homeworkData.needsToBeChecked = true
        return await HomeworkModel.find(homeworkData).populate('classID').populate('teacherID');;
    }
    async findAllHomeworksByStudentId(id: string): Promise<IHomeworkModel[] | null> {
        return await HomeworkModel.find({
            studentID: id
        }).populate(['teacherID', 'classID', 'disciplineID']);
    }
    async findAllHomeworksByStudentIdAndDisciplineId(studentID: string, disciplineID: string): Promise<IHomeworkModel[] | null> {
        return await HomeworkModel.find({
            studentID,
            disciplineID
        }).populate(['teacherID', 'classID', 'disciplineID']);
    }
    async submitHomework(id: string, homeworkData: Partial<IHomework>): Promise<IHomeworkModel | null> {
        homeworkData.needsToBeChecked = true
        return await HomeworkModel.findOneAndUpdate({_id: id}, homeworkData);
    }
    async gradeHomework(id: string, homeworkData: Partial<IHomework>): Promise<IHomeworkModel | null> {
        homeworkData.needsToBeChecked = false
        return await HomeworkModel.findOneAndUpdate({_id: id}, homeworkData);
    }
    async updateHomework(id: string, homeworkData: Partial<IHomework>): Promise<IHomeworkModel | null> {
        return await HomeworkModel.findByIdAndUpdate({_id: id}, homeworkData, {
            new: true
        });
    }
    async removeHomework(id: string): Promise<IHomeworkModel | null> {
        return await HomeworkModel.findByIdAndDelete(id);
    }
}

export default new HomeworkService();