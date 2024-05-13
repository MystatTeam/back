import { IStudent, IStudentModel, StudentModel } from "../models/StudentModel";
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

class StudentService {
    async createStudent(password: string, studentData: Partial<IStudent>): Promise<IStudentModel> {
        const passwordHash = await this.generateHash(password);
        
        return await StudentModel.create({passwordHash, ...studentData});
    }
    async findAllStudents(): Promise<IStudentModel[] | null> {
        return await StudentModel.find();
    }
    async findStudentById(id: string): Promise<IStudentModel | null> {
        return await StudentModel.findById(id);
    }
    async updateStudent(id: string, userData: Partial<IStudent>): Promise<IStudentModel | null> {
        return await StudentModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async removeStudent(id: string): Promise<IStudentModel | null> {
        return await StudentModel.findByIdAndDelete(id);
    }
    async checkIfUserExists(login: string): Promise<IStudentModel | null> {
        return await StudentModel.findOne({ login: login}).exec();
    }
    async generateHash(pwd: string): Promise<string> {
        return await bcrypt.hash(pwd, 10);
    }
    async signAccessToken(login: string, roles: Object): Promise<string> {
        return jwt.sign(
            {
                "UserInfo": {
                    "login": login,
                    "roles": roles
                } 
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        );
    }
    async signRefreshToken(login: string): Promise<string> {
        return jwt.sign(
            { "username": login },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
    }
}

export default new StudentService();