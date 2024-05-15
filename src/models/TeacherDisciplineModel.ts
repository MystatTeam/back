import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface ITeacherDiscipline {
    teacherID: Schema.Types.ObjectId;
    disciplineID: Schema.Types.ObjectId;
}

// data type which will be returned after interaction with db and must be returned to client
export interface ITeacherDisciplineModel extends ITeacherDiscipline, Document {
    _doc?: any
}

// Schema for mongoDB
const TeacherDisciplineSchema: Schema = new Schema<ITeacherDiscipline>(
    {
        teacherID: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        disciplineID: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

TeacherDisciplineSchema.index({teacherID: 1, disciplineID: 1}, {unique: true});
// model for interaction with db (operations: create, findById, find, etc.)
export const TeacherDisciplineModel = model<ITeacherDisciplineModel>('TeacherDiscipline', TeacherDisciplineSchema);