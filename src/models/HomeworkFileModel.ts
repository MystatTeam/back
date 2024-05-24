import { model, Document, Schema } from 'mongoose';

// data type which must be provided from client for crud operation
export interface IHomeworkFile {
    homeworkFile: Buffer
    fileType: string;
}

// data type which will be returned after interaction with db and must be returned to client
export interface IHomeworkFileModel extends IHomeworkFile, Document {
    _doc?: any
}

// Schema for mongoDB
const HomeworkFileSchema: Schema = new Schema<IHomeworkFile>(
    {
        homeworkFile: {
            type: Buffer,
            required: true
        },
        
        fileType: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// model for interaction with db (operations: create, findById, find, etc.)
export const HomeworkFileModel = model<IHomeworkFileModel>('HomeworkFile', HomeworkFileSchema);