import { IHomework, IHomeworkModel, HomeworkModel } from "../models/HomeworkModel";

class HomeworkService {
    async createHomework(homeworkData: Partial<IHomework>): Promise<IHomeworkModel> {        
        return await HomeworkModel.create({ ...homeworkData});
    }
    async findAllHomeworks(): Promise<IHomeworkModel[] | null> {
        return await HomeworkModel.find().populate('classID');
    }
    async findHomeworkById(id: string): Promise<IHomeworkModel | null> {
        return await HomeworkModel.findById(id).populate('classID');;
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