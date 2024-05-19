import { IClassInfo, IClassInfoModel, ClassInfoModel } from "../models/ClassInfoModel.js";

class ClassService {
    async createClass(studentData: Partial<IClassInfo>): Promise<IClassInfoModel> {
        return await ClassInfoModel.create({ ...studentData});
    }
    async findAllClasses(): Promise<IClassInfoModel[] | null> {
        return await ClassInfoModel.find().populate(['classID', 'studentID']);
    }
    async findClassById(id: string): Promise<IClassInfoModel | null> {
        return await ClassInfoModel.findById(id).populate(['classID', 'studentID']);
    }
    async updateClass(id: string, userData: Partial<IClassInfo>): Promise<IClassInfoModel | null> {
        return await ClassInfoModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async removeClass(id: string): Promise<IClassInfoModel | null> {
        return await ClassInfoModel.findByIdAndDelete(id);
    }
}

export default new ClassService();