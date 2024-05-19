import { IClass, IClassModel, ClassModel } from "../models/ClassModel";

class ClassService {
    async createClass(studentData: Partial<IClass>): Promise<IClassModel> {        
        return await ClassModel.create({ ...studentData});
    }
    async findAllClasses(): Promise<IClassModel[] | null> {
        return await ClassModel.find().populate(['disciplineID', 'teacherID']);
    }
    async findClassById(id: string): Promise<IClassModel | null> {
        return await ClassModel.findById(id).populate(['disciplineID', 'teacherID']);
    }
    async updateClass(id: string, userData: Partial<IClass>): Promise<IClassModel | null> {
        return await ClassModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async removeClass(id: string): Promise<IClassModel | null> {
        return await ClassModel.findByIdAndDelete(id);
    }
}

export default new ClassService();