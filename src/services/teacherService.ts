import { ITeacher, ITeacherModel, TeacherModel } from "../models/TeacherModel";
import { TeacherDisciplineModel } from "../models/TeacherDisciplineModel";
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

class TeacherService {
    async createTeacher(password: string, teacherData: Partial<ITeacher>): Promise<ITeacherModel> {        
        const passwordHash = await this.generateHash(password);
        
        return await TeacherModel.create({passwordHash, ...teacherData});
    }
    async findAllTeachers(): Promise<ITeacherModel[] | null> {
        return await TeacherModel.find();
    }
    async findTeacherById(id: string): Promise<ITeacherModel | null> {
        return await TeacherModel.findById(id);
    }
    async updateTeacher(id: string, userData: Partial<ITeacher>): Promise<ITeacherModel | null> {
        return await TeacherModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async removeTeacher(id: string): Promise<ITeacherModel | null> {   // тут должен быть каскад еще 2 таблиц
        await TeacherDisciplineModel.deleteMany({teacherID: id})
        return await TeacherModel.findByIdAndDelete(id);
    }
    async generateHash(pwd: string): Promise<string> {
        return await bcrypt.hash(pwd, 10);
    }
    async checkIfUserExists(login: string): Promise<ITeacherModel | null> {
        return await TeacherModel.findOne({ login: login}).exec();
    }

}

export default new TeacherService();