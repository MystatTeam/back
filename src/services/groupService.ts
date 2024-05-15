import { IGroup, IGroupModel, GroupModel } from "../models/GroupModel";
import { StudentGroupModel } from "../models/StudentGroupModel";
import { GroupDisciplineModel } from "../models/GroupDisciplineModel";
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

class GroupService {
    async createGroup(studentData: Partial<IGroup>): Promise<IGroupModel> {        
        return await GroupModel.create({ ...studentData});
    }
    async findAllGroups(): Promise<IGroupModel[] | null> {
        return await GroupModel.find();
    }
    async findGroupById(id: string): Promise<IGroupModel | null> {
        return await GroupModel.findById(id);
    }
    async updateGroup(id: string, userData: Partial<IGroup>): Promise<IGroupModel | null> {
        return await GroupModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async removeGroup(id: string): Promise<IGroupModel | null> {   // тут должен быть каскад еще 2 таблиц
        await StudentGroupModel.deleteMany({groupID: id})
        await GroupDisciplineModel.deleteMany({groupID: id})

        return await GroupModel.findByIdAndDelete(id);
    }
}

export default new GroupService();