import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IStudent {
    login: string;
    passwordHash: string;
    name: string;
    surname: string;
    afterFatherName: string;
    phoneNumber: string;
    birthday: Date;
    group: string;
    userPhoto: {
        data: Buffer,
        contentType: string
    };
    stats: {
        diamonds: number;
        coins: number;
        rewards: number;
    };
    refreshToken: string
    roles: Object
}

// data type which will be returned after interaction with db and must be returned to client
export interface IStudentModel extends IStudent, Document {
    _doc?: any
}

// Schema for mongoDB
const StudentSchema: Schema = new Schema<IStudent>(
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
        birthday: {
            type: Date,
            required: true,
        },
        group: {
            type: String,
            required: true,
        },
        userPhoto: {
            data: Buffer,
            contentType: String,
        },
        stats: {
            diamonds: {
                type: Number,
                default: 0,
            },
            coins: {
                type: Number,
                default: 0,
            },
            rewards: {
                type: Number,
                default: 0,
            },
        },
        refreshToken: {
            type: String
        },
        roles: {
            Editor: Number,
            Admin: Number
        }
    },
    {
        timestamps: true,
    }
);

// model for interaction with db (operations: create, findById, find, etc.)
export const StudentModel = model<IStudentModel>('Student', StudentSchema);