import { IClassInfo, IClassInfoModel, ClassInfoModel } from "../models/ClassInfoModel.js";

class ClassService {
    async createClassInfo(studentData: Partial<IClassInfo>): Promise<IClassInfoModel> {
        return await ClassInfoModel.create({ ...studentData});
    }
    async findAllClassInfos(): Promise<IClassInfoModel[] | null> {
        return await ClassInfoModel.find().populate(['classID', 'studentID']);
    }
    async findClassInfoById(id: string): Promise<IClassInfoModel | null> {
        return await ClassInfoModel.findById(id).populate(['classID', 'studentID']);
    }
    async findClassInfoByStudentId(id: string): Promise<IClassInfoModel[] | null> {
        return await ClassInfoModel.find({
            studentID: id
        }).populate(['classID', 'studentID']);
    }
    async updateClassInfo(id: string, userData: Partial<IClassInfo>): Promise<IClassInfoModel | null> {
        return await ClassInfoModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async removeClassInfo(id: string): Promise<IClassInfoModel | null> {
        return await ClassInfoModel.findByIdAndDelete(id);
    }
}

export default new ClassService();