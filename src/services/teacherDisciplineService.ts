import { ITeacherDiscipline, ITeacherDisciplineModel, TeacherDisciplineModel } from "../models/TeacherDisciplineModel";
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

class TeacherDisciplineService {
    async createTeacherDiscipline(studentData: Partial<ITeacherDiscipline>): Promise<ITeacherDisciplineModel> {    
        try {
            const result = await TeacherDisciplineModel.create({ ...studentData});
            return result
        }
        catch (error: any) {
            return error.errorResponse
        }
    }
    async findAllTeacherDisciplines(): Promise<ITeacherDisciplineModel[] | null> {
        return await TeacherDisciplineModel.find().populate(['teacherID', 'disciplineID']);
    }
    async findTeacherDisciplineById(id: string): Promise<ITeacherDisciplineModel | null> {
        return await TeacherDisciplineModel.findById(id).populate(['teacherID', 'disciplineID']);
    }
    async findTeachersByDisciplineId(id: string): Promise<ITeacherDisciplineModel[] | null> {
        return await TeacherDisciplineModel.find({
            disciplineID: id
        }).populate(['teacherID', 'disciplineID']);
    }
    async updateTeacherDiscipline(id: string, userData: Partial<ITeacherDiscipline>): Promise<ITeacherDisciplineModel | null> {
        return await TeacherDisciplineModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async removeTeacherDiscipline(id: string): Promise<ITeacherDisciplineModel | null> {
        return await TeacherDisciplineModel.findByIdAndDelete(id);
    }
}

export default new TeacherDisciplineService();