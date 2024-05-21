import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IHomework {
    classID: Schema.Types.ObjectId;
    publicationDate: Date;
    deadlineDate: Date;
    comment: String;
    file: {
        data: Buffer,
        contentType: string
    }
}

// data type which will be returned after interaction with db and must be returned to client
export interface IHomeworkModel extends IHomework, Document {
    _doc?: any
}

// Schema for mongoDB
const HomeworkSchema: Schema = new Schema<IHomework>(
    {
        classID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Class'
        },
        publicationDate: {
            type: Date,
            required: true,
        },
        deadlineDate: {
            type: Date,
            required: true,
        },
        comment: String,
        file: {
            contentType: {
                type: String,
                required: true,
            },
            data: {
                type: Buffer,
                required: true,
            },
        }
    },
    {
        timestamps: true,
    }
);

// model for interaction with db (operations: create, findById, find, etc.)
export const HomeworkModel = model<IHomeworkModel>('Homework', HomeworkSchema);