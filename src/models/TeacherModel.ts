import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface ITeacher {
    login: string;
    passwordHash: string;
    name: string;
    surname: string;
    afterFatherName: string;
    phoneNumber: string;
    userPhoto: {
        data: Buffer,
        contentType: string
    };
    refreshToken: string
    roles: Object
}

// data type which will be returned after interaction with db and must be returned to client
export interface ITeacherModel extends ITeacher, Document {
    _doc?: any
}

// Schema for mongoDB
const TeacherSchema: Schema = new Schema<ITeacher>(
    {
        login: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        afterFatherName: {
            type: String,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        
        userPhoto: {
            data: Buffer,
            contentType: String,
        },
        
        refreshToken: {
            type: String
        },
        roles: {
            Teacher: Boolean,
            Editor: Boolean,
            Admin: Boolean
        }
    },
    {
        timestamps: true,
    }
);

// model for interaction with db (operations: create, findById, find, etc.)
export const TeacherModel = model<ITeacherModel>('Teacher', TeacherSchema);