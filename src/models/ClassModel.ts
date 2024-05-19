import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IClass {
    disciplineID: Schema.Types.ObjectId;
    teacherID: Schema.Types.ObjectId;
    startTime: Date;
    endTime: Date;
    room: String;
    groupID: Schema.Types.ObjectId;
    classTitle: String;
    homeworkID: Schema.Types.ObjectId;
}

// data type which will be returned after interaction with db and must be returned to client
export interface IClassModel extends IClass, Document {
    _doc?: any
}

// Schema for mongoDB
const ClassSchema: Schema = new Schema<IClass>(
    {
        disciplineID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Discipline'
        },
        teacherID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Teacher'
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        room: {
            type: String,
            required: true,
        },
        groupID: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        classTitle: {
            type: String,
        },
        homeworkID: {
            type: Schema.Types.ObjectId,
        }
    },
    {
        timestamps: true,
    }
);

ClassSchema.index({disciplineID: 1, startTime: 1, groupID: 1}, {unique: true});
// model for interaction with db (operations: create, findById, find, etc.)
export const ClassModel = model<IClassModel>('Class', ClassSchema);