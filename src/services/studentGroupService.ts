import { IStudentGroup, IStudentGroupModel, StudentGroupModel } from "../models/StudentGroupModel";
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

class StudentGroupService {
    async createStudentGroup(studentData: Partial<IStudentGroup>): Promise<IStudentGroupModel> {    
        try {
            const result = await StudentGroupModel.create({ ...studentData});
            return result
        }
        catch (error: any) {
            return error.errorResponse
        }
    }
    async findAllStudentGroups(): Promise<IStudentGroupModel[] | null> {
        return await StudentGroupModel.find().populate(['groupID', 'studentID']);
    }
    async findStudentGroupById(id: string): Promise<IStudentGroupModel | null> {
        return await StudentGroupModel.findById(id).populate(['groupID', 'studentID']);
    }
    async updateStudentGroup(id: string, userData: Partial<IStudentGroup>): Promise<IStudentGroupModel | null> {
        return await StudentGroupModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async removeStudentGroup(id: string): Promise<IStudentGroupModel | null> {
        return await StudentGroupModel.findByIdAndDelete(id);
    }
}

export default new StudentGroupService();