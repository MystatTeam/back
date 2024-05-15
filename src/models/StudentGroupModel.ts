import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IStudentGroup {
    groupID: Schema.Types.ObjectId;
    studentID: Schema.Types.ObjectId;
}

// data type which will be returned after interaction with db and must be returned to client
export interface IStudentGroupModel extends IStudentGroup, Document {
    _doc?: any
}

// Schema for mongoDB
const StudentGroupSchema: Schema = new Schema<IStudentGroup>(
    {
        groupID: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        studentID: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

StudentGroupSchema.index({groupID: 1, studentID: 1}, {unique: true});
// model for interaction with db (operations: create, findById, find, etc.)
export const StudentGroupModel = model<IStudentGroupModel>('StudentGroup', StudentGroupSchema);