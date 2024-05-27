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
        console.log(userData);
        console.log(id);
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
    async signAccessToken(login: string, roles: object): Promise<string> {
        console.log(process.env.ACCESS_TOKEN_SECRET);
        return jwt.sign(
            { "username": login, roles },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '1d' }
        );
    }
    async signRefreshToken(login: string, roles: object): Promise<string> {
        return jwt.sign(
            { "username": login },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '1d' }
        );
    }
}

export default new TeacherService();