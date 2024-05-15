import { IGroupDiscipline, IGroupDisciplineModel, GroupDisciplineModel } from "../models/GroupDisciplineModel";
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

class GroupDisciplineService {
    async createGroupDiscipline(studentData: Partial<IGroupDiscipline>): Promise<IGroupDisciplineModel> {    
        try {
            const result = await GroupDisciplineModel.create({ ...studentData});
            return result
        }
        catch (error: any) {
            return error.errorResponse
        }
    }
    async findAllGroupDisciplines(): Promise<IGroupDisciplineModel[] | null> {
        return await GroupDisciplineModel.find();
    }
    async findGroupDisciplineById(id: string): Promise<IGroupDisciplineModel | null> {
        return await GroupDisciplineModel.findById(id);
    }
    async updateGroupDiscipline(id: string, userData: Partial<IGroupDiscipline>): Promise<IGroupDisciplineModel | null> {
        return await GroupDisciplineModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async removeGroupDiscipline(id: string): Promise<IGroupDisciplineModel | null> {
        return await GroupDisciplineModel.findByIdAndDelete(id);
    }
}

export default new GroupDisciplineService();