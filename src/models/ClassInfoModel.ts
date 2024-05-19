import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IClassInfo {
    classID: Schema.Types.ObjectId;
    studentID: Schema.Types.ObjectId;
    state: string;
    mark: number;
}

// data type which will be returned after interaction with db and must be returned to client
export interface IClassInfoModel extends IClassInfo, Document {
    _doc?: any
}

// Schema for mongoDB
const ClassInfoSchema: Schema = new Schema<IClassInfo>(
    {
        classID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Class'
        },
        studentID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Student'
        },
        state: {
            type: String,
            enum: ['present', 'absent', 'late'],
            default: 'absent'
        },
        mark: {
            type: Number,
            min: 1,
            max: 12,
        }
    },
    {
        timestamps: true,
    }
);

ClassInfoSchema.index({disciplineID: 1, startTime: 1, groupID: 1}, {unique: true});
// model for interaction with db (operations: create, findById, find, etc.)
export const ClassInfoModel = model<IClassInfoModel>('ClassInfo', ClassInfoSchema);