import { IDiscipline, IDisciplineModel, DisciplineModel } from "../models/DisciplineModel";
import { TeacherDisciplineModel } from "../models/TeacherDisciplineModel";
import { GroupDisciplineModel } from "../models/GroupDisciplineModel";

import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

class DisciplineService {
    async createDiscipline(studentData: Partial<IDiscipline>): Promise<IDisciplineModel> {        
        return await DisciplineModel.create({ ...studentData});
    }
    async findAllDisciplines(): Promise<IDisciplineModel[] | null> {
        return await DisciplineModel.find();
    }
    async findDisciplineById(id: string): Promise<IDisciplineModel | null> {
        return await DisciplineModel.findById(id);
    }
    async updateDiscipline(id: string, userData: Partial<IDiscipline>): Promise<IDisciplineModel | null> {
        return await DisciplineModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async removeDiscipline(id: string): Promise<IDisciplineModel | null> {   // тут должен быть каскад еще 2 таблиц
        await TeacherDisciplineModel.deleteMany({disciplineID: id})
        await GroupDisciplineModel.deleteMany({disciplineID: id})

        return await DisciplineModel.findByIdAndDelete(id);
    }
}

export default new DisciplineService();