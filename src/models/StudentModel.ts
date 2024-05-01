import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IStudent {
    username: string;
    passwordHash: string;
    stats: {
        diamonds: number;
        coins: number;
        rewards: number;
    };
}

// data type which will be returned after interaction with db and must be returned to client
export interface IStudentModel extends IStudent, Document {
    _doc?: any
}

// Schema for mongoDB
const StudentSchema: Schema = new Schema<IStudent>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true
        },
        stats: {
            diamonds: {
                type: Number,
                default: 0
            },
            coind: {
                type: Number,
                default: 0,
            },
            rewards: {
                type: Number,
                default: 0
            }
        }
    },
    {
        timestamps: true,
    }
);

// model for interaction with db (operations: create, findById, find, etc.)
export const StudentModel = model<IStudentModel>('Student', StudentSchema);