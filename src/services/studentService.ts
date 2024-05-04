import { IStudent, IStudentModel, StudentModel } from "../models/StudentModel";

class StudentService {
    async createStudent(studentData: Partial<IStudent>): Promise<IStudentModel> {
        // const passwordHash = authService.hashPassword(password);
        return await StudentModel.create(studentData);
    }
    async findAllStudents(): Promise<IStudentModel[] | null> {
        return await StudentModel.find();
    }
    async findStudentById(id: string): Promise<IStudentModel | null> {
        return await StudentModel.findById(id);
    }
    async updateStudent(id: string, userData: Partial<IStudent>): Promise<IStudentModel | null> {
        return await StudentModel.findByIdAndUpdate({_id: id}, userData);
    }
    async removeStudent(id: string): Promise<IStudentModel | null> {
        return await StudentModel.findByIdAndDelete(id);
    }
}

export default new StudentService();