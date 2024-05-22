import { IStudent, IStudentModel, StudentModel } from "../models/StudentModel";
import { StudentGroupModel } from "../models/StudentGroupModel";
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
    async updateStudent(id: string, password: string | null, studentData: Partial<IStudent>): Promise<IStudentModel | null> {
        if (password){
            const passwordHash = await this.generateHash(password);
            studentData.passwordHash = passwordHash;
        }

        return await StudentModel.findByIdAndUpdate({_id: id}, studentData, {
            new: true
        });
    }
    async removeStudent(id: string): Promise<IStudentModel | null> {
        await StudentGroupModel.deleteMany({studentID: id})
        return await StudentModel.findByIdAndDelete(id);
    }
    async checkIfUserExists(login: string): Promise<IStudentModel | null> {
        return await StudentModel.findOne({ login: login}).exec();
    }
    async generateHash(pwd: string): Promise<string> {
        return await bcrypt.hash(pwd, 10);
    }
    async signAccessToken(login: string): Promise<string> {
        return jwt.sign(
            { "username": login },
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