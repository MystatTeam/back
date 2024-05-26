import { IClassInfo, IClassInfoModel, ClassInfoModel } from "../models/ClassInfoModel.js";
import studentService from "./studentService.js";

class ClassService {
    async createClassInfo(studentData: Partial<IClassInfo>): Promise<IClassInfoModel> {
        return await ClassInfoModel.create({ ...studentData});
    }
    async findAllClassInfos(): Promise<IClassInfoModel[] | null> {
        return await ClassInfoModel.find().populate(['classID', 'studentID']);
    }
    async findClassInfoById(id: string): Promise<IClassInfoModel | null> {
        return await ClassInfoModel.findById(id).populate(['classID', 'studentID']);
    }
    async findClassInfoByStudentId(id: string): Promise<IClassInfoModel[] | null> {
        return await ClassInfoModel.find({
            studentID: id
        }).populate(['classID', 'studentID']);
    }
    async updateClassInfo(id: string, userData: Partial<IClassInfo>): Promise<IClassInfoModel | null> {
        return await ClassInfoModel.findByIdAndUpdate({_id: id}, userData, {
            new: true
        });
    }
    async updateManyClassInfos(data: any[]): Promise<any> {
        async function updateStudentStats(studentID: string, diamonds: number, coins: number) {
            await studentService.updateStudentStats(studentID, {
                diamonds,
                coins
            });
        }
        const updatePromises = data.map(item => {
            return new Promise((res, rej) => {
                const { _id, studentID, state, mark } = item;
                ClassInfoModel.findByIdAndUpdate(
                    {_id},
                    {
                        state,
                        mark
                    },
                    { new: true }
                )
                .then(async result => {
                    if (state === 'present' || state === 'late') {
                        await updateStudentStats(studentID, 1, mark > 7 ? mark - 7 : 0)
                    }
                    res(result);
                })
                .catch(error => {
                    console.log(error);
                    rej(error);
                });
            })
        });

        return await Promise.all(updatePromises)

        
    }
    async removeClassInfo(id: string): Promise<IClassInfoModel | null> {
        return await ClassInfoModel.findByIdAndDelete(id);
    }
}

export default new ClassService();